"use client";

import { ArrowRight } from "lucide-react";
import { captureEvent } from "@/lib/posthog-client";

export default function CourseProgress({
  courseId,
  percentage = 35,
}: {
  courseId: string;
  percentage?: number;
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 z-50 pointer-events-none">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl border border-[var(--line)] shadow-xl rounded-2xl p-4 flex items-center justify-between gap-6 pointer-events-auto relative overflow-hidden">
        {/* Soft orange glow effect inside */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f7d8c3]/30 to-[#f7d8c3]/50 -z-10" />
        
        <div className="flex items-center gap-4 md:gap-6 flex-grow max-w-xl">
          <div className="flex flex-col whitespace-nowrap">
            <span className="text-xs text-[var(--muted)]">Your Progress</span>
            <span className="font-semibold text-sm">{percentage}% complete</span>
          </div>
          <div className="flex-grow h-2 bg-[var(--line)]/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#f26a3c] rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        
        <button
          onClick={() =>
            captureEvent("continue_learning_clicked", {
              course_id: courseId,
              progress_percentage: percentage,
              source: "progress_bar",
            })
          }
          className="bg-[#f26a3c] hover:bg-[#d95d32] text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap"
        >
          Continue Learning <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
