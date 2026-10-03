
"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { captureEvent } from "@/lib/posthog-client";

type Lesson = {
  _id: string;
  title: string | null;
  slug: string | null;
  duration: number | null;
};

type Module = {
  title: string | null;
  summary: string | null;
  lessons: Lesson[] | null;
};

export default function CourseContent({
  courseId,
  courseSlug,
  modules,
}: {
  courseId: string;
  courseSlug: string;
  modules: Module[];
}) {
  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(new Set());

  const toggleModule = (index: number) => {
    const next = new Set(expandedIndices);
    const expanded = !next.has(index);
    if (expanded) {
      next.add(index);
    } else {
      next.delete(index);
    }
    setExpandedIndices(next);
    captureEvent("course_module_toggled", {
      course_id: courseId,
      expanded,
      module_index: index,
    });
  };

  const toggleAll = () => {
    const expanded = expandedIndices.size !== modules.length;
    if (expanded) {
      setExpandedIndices(new Set(modules.map((_, i) => i)));
    } else {
      setExpandedIndices(new Set());
    }
    captureEvent("course_modules_toggled", {
      course_id: courseId,
      expanded,
      module_count: modules.length,
    });
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return "";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  };

  const isAllExpanded = expandedIndices.size === modules.length && modules.length > 0;

  return (
    <div className="flex flex-col gap-4">
      {modules.map((mod, i) => {
        const isExpanded = expandedIndices.has(i);
        const totalDuration = mod.lessons?.reduce((acc, lesson) => acc + (lesson.duration || 0), 0) || 0;
        
        return (
          <div key={i} className="border-b border-[var(--line)] last:border-0 pb-4">
            <button 
              onClick={() => toggleModule(i)}
              className="w-full flex items-start text-left gap-4 group"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full border border-[var(--line)] flex items-center justify-center text-sm font-medium bg-[var(--background)] text-[var(--foreground)] group-hover:bg-[var(--line)] transition-colors">
                {i + 1}
              </div>
              <div className="flex-grow pt-1">
                <h3 className="font-semibold text-[var(--foreground)]">{mod.title}</h3>
                {mod.summary && (
                  <p className="text-sm text-[var(--muted)] mt-1 pr-4">{mod.summary}</p>
                )}
              </div>
              <div className="flex-shrink-0 pt-1 flex items-center gap-3 text-[var(--muted)]">
                <span className="text-sm">{formatDuration(totalDuration)}</span>
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </button>
            
            {isExpanded && mod.lessons && mod.lessons.length > 0 && (
              <div className="mt-4 ml-12 flex flex-col gap-3">
                {mod.lessons.map((lesson, j) => {
                  const content = (
                    <>
                      <span className="text-sm font-medium text-[var(--foreground)]">{lesson.title}</span>
                      <span className="text-xs text-[var(--muted)]">{formatDuration(lesson.duration)}</span>
                    </>
                  );

                  const commonClass = "flex justify-between items-center bg-[var(--panel)] p-3 rounded-lg border border-[var(--line)]";
                  
                  if (!lesson.slug) {
                    return (
                      <div key={lesson._id || j} className={`${commonClass} opacity-70`}>
                        {content}
                      </div>
                    );
                  }

                  return (
                    <Link 
                      href={`/courses/${courseSlug}/lessons/${lesson.slug}`} 
                      key={lesson._id || j} 
                      className={`${commonClass} hover:border-[var(--foreground)] transition-colors`}
                    >
                      {content}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
      
      {modules.length > 0 && (
        <button 
          onClick={toggleAll}
          className="mx-auto mt-4 px-4 py-2 border border-[var(--line)] rounded-full text-sm font-medium hover:bg-[var(--panel)] transition-colors flex items-center gap-2"
        >
          {isAllExpanded ? `Collapse all ${modules.length} modules` : `Show all ${modules.length} modules`} 
          {isAllExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      )}
    </div>
  );
}
