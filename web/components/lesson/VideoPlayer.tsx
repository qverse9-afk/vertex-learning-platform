"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

interface VideoPlayerProps {
  url: string;
}

export default function VideoPlayer({ url }: VideoPlayerProps) {
  const searchParams = useSearchParams();
  const startSeconds = searchParams.get("start");

  const embedUrl = useMemo(() => {
    if (!url) return "";

    let finalUrl = url;
    
    // YouTube
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoIdMatch = url.match(/(?:v=|youtu\.be\/|embed\/)([^&?]+)/);
      if (videoIdMatch && videoIdMatch[1]) {
        finalUrl = `https://www.youtube.com/embed/${videoIdMatch[1]}?autoplay=0`;
        if (startSeconds) {
          finalUrl += `&start=${startSeconds}`;
        }
      }
    } 
    // Vimeo
    else if (url.includes("vimeo.com")) {
      const videoIdMatch = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
      if (videoIdMatch && videoIdMatch[1]) {
        finalUrl = `https://player.vimeo.com/video/${videoIdMatch[1]}`;
        if (startSeconds) {
          finalUrl += `#t=${startSeconds}s`;
        }
      }
    }
    // Bunny (assuming format like iframe.mediadelivery.net)
    else if (url.includes("mediadelivery.net")) {
      finalUrl = url;
      if (startSeconds) {
        finalUrl += (url.includes("?") ? "&" : "?") + `t=${startSeconds}`;
      }
    }

    return finalUrl;
  }, [url, startSeconds]);

  if (!embedUrl) {
    return (
      <div className="w-full aspect-video bg-[var(--panel)] flex items-center justify-center rounded-xl border border-[var(--line)]">
        <span className="text-[var(--muted)]">No video URL provided</span>
      </div>
    );
  }

  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden shadow-sm border border-[var(--line)] bg-black">
      <iframe
        src={embedUrl}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
