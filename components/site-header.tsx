"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";

const nav = [
  { href: "/blog", label: "Articles" },
  { href: "/book-summaries", label: "Book Summaries" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0a0a0f]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.25rem] w-full max-w-6xl items-center justify-between px-5">
        <Link href="/" className="text-[15px] font-bold tracking-tight">
          <span className="text-green">Toby</span> Sinclair
        </Link>
        <nav className="hidden items-center gap-7 text-sm md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-ink-muted transition-colors hover:text-white">
              {item.label}
            </Link>
          ))}
          <a href={site.realTalk} className="btn-primary !px-4 !py-2 text-sm">
            Real Talk Studio
          </a>
        </nav>
        <button
          type="button"
          className="md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="block h-0.5 w-5 bg-white" />
          <span className="mt-1.5 block h-0.5 w-5 bg-white" />
        </button>
      </div>
      {open ? (
        <div className="border-t border-white/10 px-5 py-4 md:hidden">
          <div className="flex flex-col gap-4 text-sm">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <a href={site.realTalk} className="font-bold text-green" onClick={() => setOpen(false)}>
              Real Talk Studio
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
