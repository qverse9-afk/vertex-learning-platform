import React from 'react';
import { SignInButton, SignUpButton, Show, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';
import { sanityFetch } from '@/sanity/lib/live';
import { allCoursesQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';


function LogoMark() {
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

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="5.8" />
      <path d="M16 16l5 5" />
    </svg>
  );
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 10h11" />
      <path d="M10.5 4.5 16 10l-5.5 5.5" />
    </svg>
  );
}

function SignalIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
      <rect x="3" y="13" width="2.5" height="5" rx="0.5" />
      <rect x="8.5" y="9" width="2.5" height="9" rx="0.5" />
      <rect x="14" y="4" width="2.5" height="14" rx="0.5" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="10" cy="10" r="6.5" />
      <path d="M10 5.5v4.5l3 2" />
    </svg>
  );
}

function PageIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7l-3-5z" />
      <path d="M13 2v5h5" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2.8 14.8 8.5l6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2-4.5-4.4 6.2-.9L12 2.8Z" />
    </svg>
  );
}

export default async function Home() {
  const { data } = await sanityFetch({ query: allCoursesQuery });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const courses = data as any[];

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return "0m";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  };

  return (
    <main className="page-shell min-h-screen text-[#1b1a1a]">
      <div className="mx-auto max-w-[1180px] px-4 pb-12 pt-5 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <LogoMark />
            <span className="font-display text-[2.25rem] leading-none tracking-[-0.06em] text-[#1d1d1d]">
              Vertex
            </span>
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

        <section className="mx-auto max-w-[980px] pt-10 text-center sm:pt-14">
          <div className="mx-auto inline-flex items-center justify-center rounded-full border border-[#ef6b45]/30 bg-[#f8efe8] px-5 py-2 text-[0.8rem] font-semibold uppercase tracking-[0.28em] text-[#ef6b45]">
            Intelligent Learning
          </div>

          <h1 className="mt-7 font-display text-[3.5rem] leading-[0.88] tracking-[-0.065em] text-[#1d1d1d] sm:text-[4.2rem] md:text-[5.3rem]">
            Search your learning
            <span className="block text-[#1d1d1d]">in plain English.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-[640px] text-[1.05rem] leading-[1.5] text-[#4d4a47] md:text-[1.25rem]">
            Vertex understands what you want to learn and finds the exact lessons across all your courses.
          </p>

          <Link
            href="/courses"
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-[#ef6b45] px-8 py-4 text-[1.08rem] font-medium text-white shadow-[0_10px_18px_rgba(239,107,69,0.24)] transition-transform hover:-translate-y-[1px]"
          >
            Explore Courses
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </section>

        <div className="mx-auto mt-10 max-w-[980px]">
          <Link href="/search" className="flex items-center justify-between gap-3 rounded-[18px] border border-[#d9d1ca] bg-[#f8f5f2] px-5 py-4 shadow-[0_1px_0_rgba(17,24,39,0.02)] sm:px-6 hover:border-[#ef6b45] transition-colors cursor-text">
            <span className="flex items-center gap-4 text-[#4b4744]">
              <SearchIcon />
              <span className="text-[1.1rem] sm:text-[1.3rem]">Ask anything about your learning...</span>
            </span>
            <span className="rounded-md border border-[#d4cdc6] bg-[#f1ece7] px-2 py-1 text-[0.77rem] font-medium text-[#59524d]">
              ⌘K
            </span>
          </Link>
        </div>

        <section className="mt-16">
          <div className="mb-6 flex items-center justify-between gap-3">
            <h2 className="font-display text-[2.2rem] leading-none tracking-[-0.06em] text-[#1d1d1d] sm:text-[2.4rem]">
              All Courses
            </h2>
            <Link href="/courses" className="inline-flex items-center gap-2 text-[1.08rem] font-medium text-[#ef6b45]">
              View all courses
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {courses.slice(0, 3).map((course: any) => (
              <Link 
                href={`/courses/${course.slug}`}
                key={course._id}
                className="group relative rounded-[20px] border border-[#d8d1cb] bg-[#f7f4f1] p-5 shadow-[0_1px_0_rgba(17,24,39,0.02)] transition-all hover:-translate-y-1 hover:shadow-md block"
              >
                <div className="flex h-[86px] w-[86px] overflow-hidden rounded-[18px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] relative bg-white">
                  {course.coverImage ? (
                    <Image src={urlFor(course.coverImage).width(172).height(172).url()} alt={course.title} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#ef6b45]/10 flex items-center justify-center">
                      <PageIcon />
                    </div>
                  )}
                </div>

                <h3 className="mt-5 font-display text-[1.3rem] leading-tight font-medium text-[#1d1d1d] sm:text-[1.4rem] group-hover:text-[#ef6b45] transition-colors">
                  {course.title}
                </h3>

                <p className="mt-3 min-h-[72px] text-[1.02rem] leading-[1.5] text-[#4d4a47] line-clamp-3">
                  {course.summary}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[#e2dbd4] pt-4 text-[0.78rem] text-[#58514d]">
                  <span className="inline-flex items-center gap-2">
                    <SignalIcon />
                    {course.level || 'Intermediate'}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <ClockIcon />
                    {formatDuration(course.totalDuration)}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <PageIcon />
                    {course.modulesCount || 0} modules
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-14 flex justify-center">
          <div className="inline-flex items-center gap-3 text-[1.02rem] font-medium text-[#2c2c2d]">
            <span className="flex h-6 w-6 items-center justify-center text-[#ef6b45]">
              <StarIcon />
            </span>
            New courses and lessons added every week.
          </div>
        </div>

        <div className="mt-16 h-[180px] w-full overflow-hidden [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_10%,rgba(0,0,0,0)_100%)]">
          <div className="mx-auto flex h-full w-full max-w-[1200px] items-end justify-center">
            {[
              40, 60, 85, 50, 90, 130, 95, 60, 105, 145, 100, 70, 50, 110, 80, 55, 70, 40
            ].map((height, index) => (
              <div
                key={index}
                className="flex-1 bg-gradient-to-t from-[#ef6b45]/5 to-[#ef6b45]/40 mix-blend-multiply"
                style={{ height: `${height}px`, marginLeft: index > 0 ? '-1px' : '0' }}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
