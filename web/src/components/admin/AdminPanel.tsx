"use client";

import { useCallback, useEffect, useState } from "react";

type Me = { ok: boolean; authenticated?: boolean; configured?: boolean };

type FormRow = {
  id: number;
  formType: string;
  email: string | null;
  name: string | null;
  topic: string | null;
  message: string | null;
  createdAt: string;
};

type SubmissionsRes = {
  ok: boolean;
  database?: boolean;
  items: FormRow[];
  total: number;
  hint?: string;
};

type LocalNl = { ok: boolean; items: { email: string; at: string }[]; total: number };

const formTypeLabel: Record<string, string> = {
  all: "全部",
  contact: "联系 / 支持",
  feedback: "反馈",
  subscribe: "订阅（数据库）",
};

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const hasJsonBody = Boolean(init?.body);
  const res = await fetch(path, {
    ...init,
    credentials: "include",
    headers: {
      ...(hasJsonBody ? { "Content-Type": "application/json" } : {}),
      ...(init?.headers as Record<string, string> | undefined),
    },
  });
  let data: unknown;
  try {
    data = await res.json();
  } catch {
    if (!res.ok) throw new Error(res.statusText);
    throw new Error("Invalid JSON");
  }
  const obj = data as { error?: string };
  if (!res.ok) {
    throw new Error(obj.error ?? res.statusText);
  }
  return data as T;
}

export function AdminPanel() {
  const [me, setMe] = useState<Me | null>(null);
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState<"all" | "contact" | "feedback" | "subscribe">("all");
  const [subs, setSubs] = useState<SubmissionsRes | null>(null);
  const [localNl, setLocalNl] = useState<LocalNl | null>(null);
  const [loadErr, setLoadErr] = useState("");

  const refreshMe = useCallback(async () => {
    try {
      const m = await api<Me>("/api/admin/me");
      setMe(m);
    } catch {
      setMe({ ok: false, configured: false, authenticated: false });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshMe();
  }, [refreshMe]);

  const loadData = useCallback(async () => {
    setLoadErr("");
    try {
      const [s, l] = await Promise.all([
        api<SubmissionsRes>(`/api/admin/form-submissions?formType=${filter}&limit=200`),
        api<LocalNl>("/api/admin/local-newsletter?limit=200"),
      ]);
      setSubs(s);
      setLocalNl(l);
    } catch (e) {
      setLoadErr(e instanceof Error ? e.message : "加载失败");
    }
  }, [filter]);

  useEffect(() => {
    if (me?.authenticated) void loadData();
  }, [me?.authenticated, loadData]);

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginErr("");
    try {
      await api<{ ok: boolean }>("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ password }),
      });
      setPassword("");
      await refreshMe();
    } catch (err) {
      setLoginErr(err instanceof Error ? err.message : "登录失败");
    }
  }

  async function onLogout() {
    try {
      await api<{ ok: boolean }>("/api/admin/logout", { method: "POST" });
    } catch {
      /* ignore */
    }
    setSubs(null);
    setLocalNl(null);
    await refreshMe();
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-stone-500">加载中…</div>
    );
  }

  if (!me?.configured) {
    return (
      <main className="mx-auto max-w-lg px-4 py-16">
        <h1 className="text-xl font-semibold text-stone-800">管理后台未配置</h1>
        <p className="mt-3 text-sm leading-relaxed text-stone-600">
          请在 API 环境变量中设置 <code className="rounded bg-stone-200 px-1">ADMIN_PASSWORD</code>
          （例如 <code className="rounded bg-stone-200 px-1">server/.env</code> 或 Docker 的{" "}
          <code className="rounded bg-stone-200 px-1">docker.env</code>
          ），重启 API 后再访问此页。
        </p>
      </main>
    );
  }

  if (!me.authenticated) {
    return (
      <main className="mx-auto max-w-sm px-4 py-16">
        <h1 className="text-xl font-semibold text-stone-800">管理后台登录</h1>
        <p className="mt-1 text-sm text-stone-500">查看留言、联系表单与订阅数据</p>
        <form onSubmit={onLogin} className="mt-8 space-y-4">
          <label className="block text-sm font-medium text-stone-700">
            密码
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-stone-900 shadow-sm focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
              required
            />
          </label>
          {loginErr ? <p className="text-sm text-red-600">{loginErr}</p> : null}
          <button
            type="submit"
            className="w-full rounded-lg bg-stone-800 px-4 py-2.5 text-sm font-medium text-white hover:bg-stone-700"
          >
            登录
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <header className="flex flex-col gap-4 border-b border-stone-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">管理后台</h1>
          <p className="mt-1 text-sm text-stone-500">留言 / 联系 / 反馈 / 订阅</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-sm text-stone-600">
            筛选
            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value as "all" | "contact" | "feedback" | "subscribe")
              }
              className="ml-2 rounded-lg border border-stone-300 bg-white px-2 py-1.5 text-sm"
            >
              {(Object.keys(formTypeLabel) as (keyof typeof formTypeLabel)[]).map((k) => (
                <option key={k} value={k}>
                  {formTypeLabel[k]}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={() => void loadData()}
            className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm hover:bg-stone-50"
          >
            刷新
          </button>
          <button
            type="button"
            onClick={() => void onLogout()}
            className="rounded-lg bg-stone-200 px-3 py-1.5 text-sm text-stone-800 hover:bg-stone-300"
          >
            退出
          </button>
        </div>
      </header>

      {loadErr ? <p className="mt-4 text-sm text-red-600">{loadErr}</p> : null}

      <section className="mt-8">
        <h2 className="text-lg font-medium text-stone-800">数据库记录</h2>
        {subs?.hint ? <p className="mt-2 text-sm text-amber-800">{subs.hint}</p> : null}
        <div className="mt-3 overflow-x-auto rounded-lg border border-stone-200 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-stone-200 bg-stone-50 text-stone-600">
              <tr>
                <th className="px-3 py-2 font-medium">时间</th>
                <th className="px-3 py-2 font-medium">类型</th>
                <th className="px-3 py-2 font-medium">邮箱</th>
                <th className="px-3 py-2 font-medium">姓名</th>
                <th className="px-3 py-2 font-medium">主题</th>
                <th className="px-3 py-2 font-medium">内容</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {subs?.items?.length ? (
                subs.items.map((row) => (
                  <tr key={row.id} className="align-top">
                    <td className="whitespace-nowrap px-3 py-2 text-stone-500">
                      {new Date(row.createdAt).toLocaleString("zh-CN")}
                    </td>
                    <td className="px-3 py-2 text-stone-700">{row.formType}</td>
                    <td className="max-w-[10rem] break-all px-3 py-2">{row.email ?? "—"}</td>
                    <td className="max-w-[8rem] px-3 py-2">{row.name ?? "—"}</td>
                    <td className="max-w-[8rem] px-3 py-2">{row.topic ?? "—"}</td>
                    <td className="max-w-md px-3 py-2 text-stone-600">
                      {row.message ? (
                        <span className="line-clamp-4 whitespace-pre-wrap">{row.message}</span>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-3 py-8 text-center text-stone-400">
                    {subs?.database === false ? "未连接数据库，无表数据" : "暂无记录"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {subs ? (
          <p className="mt-2 text-xs text-stone-400">
            本页最多 200 条；当前筛选共 {subs.total} 条
          </p>
        ) : null}
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-medium text-stone-800">本地文件订阅（无数据库时）</h2>
        <p className="mt-1 text-xs text-stone-500">
          当未配置数据库且未接 Web3Forms 时，订阅会写入 server/data/newsletter-signups.jsonl
        </p>
        <div className="mt-3 overflow-x-auto rounded-lg border border-stone-200 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-stone-200 bg-stone-50 text-stone-600">
              <tr>
                <th className="px-3 py-2 font-medium">时间</th>
                <th className="px-3 py-2 font-medium">邮箱</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {localNl?.items?.length ? (
                localNl.items.map((row, i) => (
                  <tr key={`${row.at}-${row.email}-${i}`}>
                    <td className="whitespace-nowrap px-3 py-2 text-stone-500">
                      {new Date(row.at).toLocaleString("zh-CN")}
                    </td>
                    <td className="break-all px-3 py-2">{row.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="px-3 py-8 text-center text-stone-400">
                    无本地记录
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {localNl ? (
          <p className="mt-2 text-xs text-stone-400">文件中累计 {localNl.total} 行</p>
        ) : null}
      </section>
    </main>
  );
}
