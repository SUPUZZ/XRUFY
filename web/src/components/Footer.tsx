import Link from "next/link";
import { AMAZON_PRODUCT_URL, BRAND_EMAIL, BRAND_TAGLINE } from "@/lib/constants";

/** In-page anchors — only for the home landing; kept out of the top nav on purpose. */
const homeSections = [
  { href: "/#gallery", label: "Gallery" },
  { href: "/#play", label: "Play & design" },
  { href: "/#learn", label: "Learning" },
  { href: "/#safety", label: "Safety" },
];

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-[#f7f7f5] py-14">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link
            href="/"
            className="font-[family-name:var(--font-outfit)] text-lg font-extrabold text-stone-900"
          >
            XRUFY
          </Link>
          <p className="mt-3 max-w-xs text-sm text-stone-600">{BRAND_TAGLINE}</p>
          <p className="mt-3 text-sm font-semibold">
            <a href={`mailto:${BRAND_EMAIL}`} className="text-stone-900 hover:text-[#e85d04]">
              {BRAND_EMAIL}
            </a>
          </p>
          <p className="mt-2 max-w-xs text-xs text-stone-400">
            Preschool construction toys for families in the United States and Canada. Order on Amazon with fast, reliable shipping.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-stone-500">Site</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/" className="text-stone-700 hover:text-[#e85d04]">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-stone-700 hover:text-[#e85d04]">
                About
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-stone-700 hover:text-[#e85d04]">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/support" className="text-stone-700 hover:text-[#e85d04]">
                Support
              </Link>
            </li>
            <li>
              <Link href="/support#faq" className="text-stone-700 hover:text-[#e85d04]">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-stone-500">Homepage sections</p>
          <p className="mt-2 max-w-[14rem] text-xs leading-snug text-stone-500">
            Jump to blocks on the home page (not separate pages).
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {homeSections.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-stone-700 hover:text-[#e85d04]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-stone-500">Orders &amp; legal</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={AMAZON_PRODUCT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-700 hover:text-[#e85d04]"
              >
                Buy on Amazon
              </a>
            </li>
            <li>
              <a
                href="https://www.amazon.com/gp/help/customer/display.html?nodeId=GKM69DUUYKQWKWX7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-700 hover:text-[#e85d04]"
              >
                Returns &amp; shipping
              </a>
            </li>
            <li>
              <Link href="/support#newsletter" className="text-stone-700 hover:text-[#e85d04]">
                Email newsletter
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-stone-700 hover:text-[#e85d04]">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-stone-700 hover:text-[#e85d04]">
                Terms of Use
              </Link>
            </li>
          </ul>
          <p className="mt-6 text-xs text-stone-500">&copy; {new Date().getFullYear()} XRUFY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
