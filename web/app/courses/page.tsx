import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { sanityFetch } from '@/sanity/lib/live';
import { allCoursesQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';

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

export default async function CoursesPage() {
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
      <div className="mx-auto max-w-[1180px] px-4 pb-12 pt-10 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="font-display text-[2.5rem] leading-none tracking-[-0.06em] text-[#1d1d1d] sm:text-[3rem]">
            All Courses
          </h1>
          <p className="mt-3 max-w-[600px] text-[1.1rem] leading-[1.5] text-[#4d4a47]">
            Browse our entire catalog of courses and start learning today.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {courses.map((course: any) => (
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
      </div>
    </main>
  );
}
