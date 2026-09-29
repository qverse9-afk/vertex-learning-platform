"use client";

import { ArrowRight, Bookmark } from "lucide-react";
import { captureEvent } from "@/lib/posthog-client";

export default function CourseActions({ courseId }: { courseId: string }) {
  const captureCourseAction = (action: "bookmark" | "continue_learning") => {
    captureEvent("course_action_clicked", {
      action,
      course_id: courseId,
    });
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => captureCourseAction("continue_learning")}
        className="bg-[#f26a3c] hover:bg-[#d95d32] text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm"
      >
        Continue Learning <ArrowRight size={18} />
      </button>
      <button
        onClick={() => captureCourseAction("bookmark")}
        className="bg-white border border-[var(--line)] hover:bg-[var(--panel)] px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 text-[var(--foreground)]"
      >
        <Bookmark size={18} /> Bookmark
      </button>
    </div>
  );
}
