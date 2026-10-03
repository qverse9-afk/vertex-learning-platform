"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

interface VideoPlayerProps {
  url: string;
  title?: string;
}

export default function VideoPlayer({ url, title }: VideoPlayerProps) {
  const searchParams = useSearchParams();
  const startParam = searchParams.get("start");
  
  const startSeconds = useMemo(() => {
    if (!startParam) return null;
    const parsed = parseInt(startParam, 10);
    return isNaN(parsed) || parsed < 0 ? null : parsed;
  }, [startParam]);

  const embedUrl = useMemo(() => {
    if (!url) return "";
    
    // Validate scheme
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
        return "";
      }
    } catch {
      return "";
    }

    let finalUrl = url;
    
    // YouTube
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoIdMatch = url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([^&?]+)/);
      if (videoIdMatch && videoIdMatch[1]) {
        finalUrl = `https://www.youtube.com/embed/${videoIdMatch[1]}?autoplay=0`;
        if (startSeconds !== null) {
          finalUrl += `&start=${startSeconds}`;
        }
      }
    } 
    // Vimeo
    else if (url.includes("vimeo.com")) {
      const videoIdMatch = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
      if (videoIdMatch && videoIdMatch[1]) {
        finalUrl = `https://player.vimeo.com/video/${videoIdMatch[1]}`;
        if (startSeconds !== null) {
          finalUrl += `#t=${startSeconds}s`;
        }
      }
    }
    // Bunny (assuming format like iframe.mediadelivery.net)
    else if (url.includes("mediadelivery.net")) {
      finalUrl = url;
      if (startSeconds !== null) {
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
        title={title || "Video player"}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
