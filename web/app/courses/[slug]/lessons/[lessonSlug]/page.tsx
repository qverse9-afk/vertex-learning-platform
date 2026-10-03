import { notFound } from "next/navigation";
import { after } from "next/server";
import Link from "next/link";
import { ChevronRight, FileText, CheckCircle, Lightbulb, Link as LinkIcon } from "lucide-react";
import { SeverityNumber } from "@opentelemetry/api-logs";
import { sanityFetch } from "@/sanity/lib/live";
import { lessonBySlugQuery } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import { loggerProvider, posthogLogger } from "@/instrumentation";
import VideoPlayer from "@/components/lesson/VideoPlayer";
import LessonSidebar from "@/components/lesson/LessonSidebar";

type PageProps = {
  params: Promise<{ slug: string; lessonSlug: string }>;
};

export const dynamic = "force-dynamic";

export default async function LessonPage({ params }: PageProps) {
  const resolvedParams = await params;
  
  const { data } = await sanityFetch({
    query: lessonBySlugQuery,
    params: { 
      lessonSlug: resolvedParams.lessonSlug,
      courseSlug: resolvedParams.slug
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lesson = data as any;

  if (!lesson) {
    notFound();
  }

  // Fallback to params if parent course is missing (though our query tries to fetch it)
  const course = lesson.course;
  const courseSlug = course?.slug || resolvedParams.slug;
  const courseTitle = course?.title || "Course";
  const modules = course?.modules || [];

  const activeLoggerProvider = loggerProvider;
  if (posthogLogger && activeLoggerProvider) {
    posthogLogger.emit({
      body: "Lesson content loaded",
      severityNumber: SeverityNumber.INFO,
      severityText: "INFO",
      attributes: {
        event: "lesson_viewed",
        lesson_id: String(lesson._id),
        course_id: String(course?._id || ""),
      },
    });
    after(() => activeLoggerProvider.forceFlush());
  }

  return (
    <main className="min-h-screen bg-[var(--background)] pb-24">
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-[var(--line)] bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center text-sm text-[var(--muted)]">
            <Link href="/courses" className="hover:text-[var(--foreground)] transition-colors">Courses</Link>
            <ChevronRight size={16} className="mx-2 flex-shrink-0" />
            <Link href={`/courses/${courseSlug}`} className="hover:text-[var(--foreground)] transition-colors truncate max-w-[200px] sm:max-w-none">
              {courseTitle}
            </Link>
            <ChevronRight size={16} className="mx-2 flex-shrink-0" />
            <span className="text-[var(--foreground)] font-medium truncate">{lesson.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content (Left) */}
          <div className="flex-grow lg:w-[70%]">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-display font-medium text-[var(--foreground)] mb-4">
                {lesson.title}
              </h1>
              <VideoPlayer url={lesson.videoUrl} title={lesson.title} />
            </div>

            {/* Content Tabs / Sections */}
            <div className="bg-white border border-[var(--line)] rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="space-y-12">
                
                {/* Notes Section */}
                {lesson.notes && lesson.notes.length > 0 && (
                  <section>
                    <div className="flex items-center gap-2 mb-4 text-[var(--foreground)]">
                      <FileText size={20} className="text-[#f26a3c]" />
                      <h2 className="text-xl font-semibold">Lesson Notes</h2>
                    </div>
                    <div className="prose prose-slate max-w-none text-[var(--muted)] prose-headings:text-[var(--foreground)] prose-a:text-[#f26a3c] hover:prose-a:text-[#d9582d]">
                      <PortableText value={lesson.notes} />
                    </div>
                  </section>
                )}

                {/* Key Points */}
                {lesson.keyPoints && lesson.keyPoints.length > 0 && (
                  <section>
                    <div className="flex items-center gap-2 mb-4 text-[var(--foreground)]">
                      <CheckCircle size={20} className="text-[#f26a3c]" />
                      <h2 className="text-xl font-semibold">Key Points</h2>
                    </div>
                    <ul className="space-y-3">
                      {lesson.keyPoints.map((point: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-[var(--muted)]">
                          <CheckCircle size={18} className="mt-0.5 text-green-500 flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Pro Tip */}
                {lesson.proTip && (
                  <section>
                    <div className="bg-[#f7d8c3]/20 border border-[#f7d8c3] rounded-xl p-6 flex gap-4">
                      <Lightbulb size={24} className="text-[#f26a3c] flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Pro Tip</h3>
                        <p className="text-[var(--muted)] leading-relaxed">{lesson.proTip}</p>
                      </div>
                    </div>
                  </section>
                )}

                {/* Resources */}
                {lesson.resources && lesson.resources.length > 0 && (
                  <section>
                    <div className="flex items-center gap-2 mb-4 text-[var(--foreground)]">
                      <LinkIcon size={20} className="text-[#f26a3c]" />
                      <h2 className="text-xl font-semibold">Resources</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {lesson.resources.map((resource: any, idx: number) => {
                        let safeUrl = "#";
                        try {
                          const parsed = new URL(resource.url);
                          if (parsed.protocol === "http:" || parsed.protocol === "https:") {
                            safeUrl = resource.url;
                          }
                        } catch {
                          // Invalid URL
                        }
                        
                        return (
                          <a 
                            key={idx}
                            href={safeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-4 rounded-xl border border-[var(--line)] hover:border-[#f26a3c] transition-colors group bg-[var(--panel)]"
                          >
                            <div className="flex items-start gap-3">
                              <div className="bg-white p-2 rounded-lg border border-[var(--line)] group-hover:border-[#f7d8c3] shadow-sm">
                                <LinkIcon size={18} className="text-[var(--muted)] group-hover:text-[#f26a3c] transition-colors" />
                              </div>
                              <div>
                                <h3 className="font-medium text-[var(--foreground)] group-hover:text-[#f26a3c] transition-colors mb-1">
                                  {resource.title}
                                </h3>
                                <p className="text-sm text-[var(--muted)] line-clamp-2">
                                  {resource.description}
                                </p>
                              </div>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </section>
                )}

              </div>
            </div>
          </div>

          {/* Sidebar (Right) */}
          <div className="lg:w-[30%] lg:flex-shrink-0">
            <div className="sticky top-6 h-[calc(100vh-120px)]">
              <LessonSidebar 
                courseSlug={courseSlug} 
                activeLessonSlug={resolvedParams.lessonSlug} 
                modules={modules} 
              />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
