"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, PlayCircle } from "lucide-react";

type Lesson = {
  _id: string;
  title: string | null;
  slug: string | null;
  duration: number | null;
};

type Module = {
  title: string | null;
  lessons: Lesson[] | null;
};

export default function LessonSidebar({
  courseSlug,
  activeLessonSlug,
  modules,
}: {
  courseSlug: string;
  activeLessonSlug: string;
  modules: Module[];
}) {
  // Find which module contains the active lesson to keep it expanded
  const activeModuleIndex = modules.findIndex((mod) => 
    mod.lessons?.some((l) => l.slug === activeLessonSlug)
  );

  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(
    new Set([activeModuleIndex !== -1 ? activeModuleIndex : 0])
  );

  const toggleModule = (index: number) => {
    const next = new Set(expandedIndices);
    if (next.has(index)) {
      next.delete(index);
    } else {
      next.add(index);
    }
    setExpandedIndices(next);
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return "";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col h-full bg-[var(--panel)] border border-[var(--line)] rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-[var(--line)] bg-white">
        <h3 className="font-semibold text-[var(--foreground)]">Course Content</h3>
      </div>
      <div className="overflow-y-auto flex-grow p-4 space-y-4">
        {modules.map((mod, i) => {
          const isExpanded = expandedIndices.has(i);
          
          return (
            <div key={i} className="border-b border-[var(--line)] last:border-0 pb-3">
              <button 
                onClick={() => toggleModule(i)}
                className="w-full flex items-start justify-between text-left group"
              >
                <h4 className="text-sm font-medium text-[var(--foreground)] pr-4">
                  Module {i + 1}: {mod.title}
                </h4>
                <div className="flex-shrink-0 pt-0.5 text-[var(--muted)]">
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </button>
              
              {isExpanded && mod.lessons && mod.lessons.length > 0 && (
                <div className="mt-3 flex flex-col gap-1">
                  {mod.lessons.map((lesson, j) => {
                    const isActive = lesson.slug === activeLessonSlug;
                    return (
                      <Link 
                        href={`/courses/${courseSlug}/lessons/${lesson.slug}`} 
                        key={lesson._id || j} 
                        className={`flex items-start gap-3 p-2 rounded-lg transition-colors ${
                          isActive 
                            ? "bg-[#f7d8c3]/30 text-[#f26a3c]" 
                            : "text-[var(--muted)] hover:bg-[var(--line)] hover:text-[var(--foreground)]"
                        }`}
                      >
                        <PlayCircle size={16} className={`mt-0.5 flex-shrink-0 ${isActive ? "text-[#f26a3c]" : ""}`} />
                        <div className="flex-grow">
                          <span className={`text-sm block ${isActive ? "font-medium" : ""}`}>{lesson.title}</span>
                        </div>
                        <span className="text-xs flex-shrink-0 mt-0.5 opacity-70">
                          {formatDuration(lesson.duration)}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
