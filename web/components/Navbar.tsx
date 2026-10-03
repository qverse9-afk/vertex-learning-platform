import React from 'react';
import { SignInButton, SignUpButton, Show, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export function LogoMark() {
  return (
    <div className="h-8 w-8">
      <svg viewBox="0 0 36 36" className="h-full w-full" aria-label="Vertex logo" role="img">
        <path d="M4 11.5 11 6h14l7 5.5L18.8 30h-2.8L4 11.5Z" fill="#ef6b45" />
        <path d="M10 14.5 15.5 8.3h5.5L26 14.5l-8 15.2h-2L10 14.5Z" fill="#fff" opacity={0.15} />
        <path d="M12 16.8 17 10h2l5 6.8-6.3 12.2h-2.3L12 16.8Z" fill="#fff" opacity={0.9} />
      </svg>
    </div>
  );
}

export function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </svg>
  );
}

export default function Navbar() {
  return (
    <div className="w-full bg-[#f8efe8] border-b border-[#e2dbd4]">
      <div className="mx-auto max-w-[1180px] px-4 py-3 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
              <LogoMark />
              <span className="font-display text-[2.25rem] leading-none tracking-[-0.06em] text-[#1d1d1d]">
                Vertex
              </span>
            </Link>
          </div>

          <nav className="hidden items-center gap-10 text-[1.05rem] text-[#2a2a2a] md:flex">
            <Link href="/courses" className="transition-opacity hover:opacity-80">Courses</Link>
            <a href="#" className="transition-opacity hover:opacity-80">My Learning</a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Notifications"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d6d0c9] bg-[#f5f1ed] text-[#262626] transition-transform hover:scale-[1.02]"
            >
              <BellIcon />
            </button>
            <Show when="signed-out">
              <SignInButton>
                <button className="text-[1.05rem] font-medium text-[#2a2a2a] transition-opacity hover:opacity-80">Log in</button>
              </SignInButton>
              <SignUpButton>
                <button className="rounded-[10px] bg-[#1d1d1d] px-4 py-2.5 text-[0.95rem] font-medium text-white shadow-sm transition-transform hover:-translate-y-[1px]">Sign up</button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </div>
        </header>
      </div>
    </div>
  );
}
