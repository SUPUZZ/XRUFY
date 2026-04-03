import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

const components: Components = {
  h2: ({ children }) => (
    <h2 className="mt-10 font-[family-name:var(--font-outfit)] text-2xl font-bold tracking-tight text-stone-900 first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 font-[family-name:var(--font-outfit)] text-xl font-semibold text-stone-900">{children}</h3>
  ),
  p: ({ children }) => <p className="mt-4 leading-relaxed text-stone-600">{children}</p>,
  ul: ({ children }) => <ul className="mt-4 list-disc space-y-2 pl-6 text-stone-600">{children}</ul>,
  ol: ({ children }) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-stone-600">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-stone-800">{children}</strong>,
  blockquote: ({ children }) => (
    <blockquote className="mt-6 border-l-4 border-[#e85d04]/80 bg-orange-50/80 py-4 pl-5 pr-4 text-stone-700 not-italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="mt-10 border-stone-200" />,
  img: ({ src, alt }) => {
    if (!src || typeof src !== "string") return null;
    return (
      <figure className="mt-8">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 shadow-sm">
          <Image
            src={src}
            alt={alt ?? ""}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>
        {alt ? <figcaption className="mt-2 text-center text-sm text-stone-500">{alt}</figcaption> : null}
      </figure>
    );
  },
  a: ({ href, children, ...props }) => {
    const external = href?.startsWith("http");
    return (
      <a
        href={href}
        className="font-medium text-[#c94f03] underline-offset-2 hover:underline"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {children}
      </a>
    );
  },
};

export function BlogMarkdown({ content }: { content: string }) {
  return (
    <div className="blog-md">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
