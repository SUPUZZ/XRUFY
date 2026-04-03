/**
 * Next.js 会在 Node 与 Edge 两侧都加载本文件，因此这里只用运行时通用 API。
 * 结构化 JSON 行写到 stderr，便于 `docker logs` / 终端重定向 / 日志采集器解析。
 */
export function register() {
  // 预留：如需接入 OpenTelemetry 等可写在此处。
}

export async function onRequestError(
  error: unknown,
  request: Readonly<{
    path: string;
    method: string;
    headers: NodeJS.Dict<string | string[]>;
  }>,
  context: Readonly<{
    routerKind: string;
    routePath: string;
    routeType: string;
    renderSource?: string;
    revalidateReason?: "on-demand" | "stale" | undefined;
  }>,
): Promise<void> {
  const err = error instanceof Error ? error : new Error(String(error));
  const digest = err && "digest" in err ? String((err as Error & { digest?: string }).digest ?? "") : "";

  const line = {
    ts: new Date().toISOString(),
    service: "xrufy-web",
    event: "onRequestError",
    runtime: process.env.NEXT_RUNTIME ?? "unknown",
    message: err.message,
    name: err.name,
    stack: err.stack,
    digest: digest || undefined,
    path: request.path,
    method: request.method,
    routePath: context.routePath,
    routeType: context.routeType,
    routerKind: context.routerKind,
    renderSource: context.renderSource,
  };

  console.error(JSON.stringify(line));
}
