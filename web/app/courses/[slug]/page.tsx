import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bookmark, Clock, BookOpen, Users, BarChart, Layers, Database, Gauge, Cloud, LayoutGrid } from "lucide-react";
import { sanityFetch } from "@/sanity/lib/live";
import { courseBySlugQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import CourseContent from "@/components/course/CourseContent";
import CourseProgress from "@/components/course/CourseProgress";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

const formatDuration = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
};

const IconMap: Record<string, React.ElementType> = {
  layers: Layers,
  database: Database,
  speedometer: Gauge,
  cloud: Cloud,
  default: LayoutGrid
};

export default async function CoursePage({ params }: PageProps) {
  const resolvedParams = await params;
  const { data } = await sanityFetch({
    query: courseBySlugQuery,
    params: { slug: resolvedParams.slug },
  });
  console.log("Fetching slug:", resolvedParams.slug);
  console.log("Fetched data:", data);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const course = data as any;

  if (!course) {
    notFound();
  }

  const modules = course.modules || [];
  const moduleCount = modules.length;
  
  // Calculate total duration in seconds
  let totalDurationSeconds = 0;
  modules.forEach((mod: { lessons?: { duration?: number | null }[] }) => {
    mod.lessons?.forEach((lesson: { duration?: number | null }) => {
      totalDurationSeconds += (lesson.duration || 0);
    });
  });

  const durationStr = formatDuration(totalDurationSeconds);

  return (
    <main className="min-h-screen pb-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-[var(--muted)] mb-8">
          <Link href="/courses" className="hover:text-[var(--foreground)] transition-colors">All Courses</Link>
          <span className="mx-2">›</span>
          <span className="text-[var(--foreground)]">{course.title}</span>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16 mb-16">
          <div className="flex-shrink-0 w-full max-w-[320px] mx-auto md:mx-0">
            {course.coverImage ? (
              <div className="w-full max-w-[320px] aspect-[4/5] relative rounded-2xl overflow-hidden shadow-lg border border-[var(--line)] mx-auto md:mx-0">
                <Image
                  src={urlFor(course.coverImage).width(640).height(800).url()}
                  alt={course.title || "Course cover"}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="w-full max-w-[320px] aspect-[4/5] bg-[var(--panel)] rounded-2xl border border-[var(--line)] flex items-center justify-center mx-auto md:mx-0">
                <span className="text-[var(--muted)]">No cover image</span>
              </div>
            )}
          </div>
          
          <div className="flex-grow pt-4">
            {course.isPopular && (
              <div className="inline-block bg-[#f7d8c3] text-[#f26a3c] text-[11px] font-bold tracking-widest uppercase px-2 py-1 rounded mb-4">
                Popular
              </div>
            )}
            
            <h1 className="text-4xl md:text-[2.75rem] font-display font-medium text-[var(--foreground)] mb-6 tracking-tight leading-tight">
              {course.title}
            </h1>
            
            <p className="text-lg md:text-[19px] text-[var(--muted)] mb-8 leading-relaxed max-w-2xl">
              {course.summary}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--muted)] mb-8">
              <div className="flex items-center gap-2">
                <BarChart size={18} />
                <span>{course.level || 'Intermediate'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{durationStr}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={18} />
                <span>{moduleCount} modules</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={18} />
                <span>{course.studentCount ? `${(course.studentCount / 1000).toFixed(1)}k students` : '0 students'}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="bg-[#f26a3c] hover:bg-[#d95d32] text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm">
                Continue Learning <ArrowRight size={18} />
              </button>
              <button className="bg-white border border-[var(--line)] hover:bg-[var(--panel)] px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 text-[var(--foreground)]">
                <Bookmark size={18} /> Bookmark
              </button>
            </div>
          </div>
        </div>

        {/* What you'll learn */}
        {course.learningOutcomes && course.learningOutcomes.length > 0 && (
          <div className="mb-12 bg-white/50 rounded-2xl border border-[var(--line)] p-6 md:p-10">
            <h2 className="text-2xl font-display font-medium text-[var(--foreground)] mb-8">What you&apos;ll learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {course.learningOutcomes.map((outcome: { icon?: string, title?: string, description?: string }, idx: number) => {
                const iconName = outcome.icon?.toLowerCase() || "";
                let IconComponent = IconMap.default;
                if (iconName.includes('layer') || iconName.includes('stack')) IconComponent = IconMap.layers;
                else if (iconName.includes('data')) IconComponent = IconMap.database;
                else if (iconName.includes('speed') || iconName.includes('perf')) IconComponent = IconMap.speedometer;
                else if (iconName.includes('cloud') || iconName.includes('deploy')) IconComponent = IconMap.cloud;

                return (
                  <div key={idx} className="bg-white border border-[var(--line)] p-6 rounded-xl flex gap-4 shadow-sm">
                    <div className="flex-shrink-0 text-[#f26a3c]">
                      <IconComponent size={28} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--foreground)] mb-2">{outcome.title}</h3>
                      <p className="text-sm text-[var(--muted)] leading-relaxed">{outcome.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Course Content */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <h2 className="text-2xl font-display font-medium text-[var(--foreground)]">Course Content</h2>
            <div className="text-sm text-[var(--muted)]">
              {moduleCount} modules • {durationStr}
            </div>
          </div>
          
          <div className="bg-white border border-[var(--line)] rounded-2xl p-6 md:p-8 shadow-sm">
            <CourseContent modules={modules} />
          </div>
        </div>
      </div>
      
      <CourseProgress percentage={35} />
    </main>
  );
}
