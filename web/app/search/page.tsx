"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentQuery = query.trim();
    if (!currentQuery) return;

    setIsLoading(true);
    setError('');
    setResults([]);
    setHasSearched(false);
    
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: currentQuery }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to search');
      
      // Only set results if the query hasn't changed since request started
      setResults(currentQuery === query.trim() ? (data.results || []) : results);
      if (currentQuery === query.trim()) setHasSearched(true);
    } catch (err: unknown) {
      if (currentQuery === query.trim()) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setHasSearched(true);
      }
    } finally {
      if (currentQuery === query.trim()) {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f8efe8] text-[#1b1a1a]">
      <Navbar />
      <main className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <h1 className="font-display text-[2.5rem] leading-none tracking-[-0.06em] text-[#1d1d1d] sm:text-[3rem]">
            Search
          </h1>
          <form onSubmit={handleSearch} className="mt-6">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask anything about your learning..."
                className="w-full rounded-[18px] border border-[#d9d1ca] bg-[#f8f5f2] px-5 py-4 pl-14 text-[1.1rem] shadow-[0_1px_0_rgba(17,24,39,0.02)] focus:border-[#ef6b45] focus:outline-none"
              />
              <svg viewBox="0 0 24 24" className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4b4744]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="5.8" />
                <path d="M16 16l5 5" />
              </svg>
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl bg-[#ef6b45] px-4 py-2 text-[0.95rem] font-medium text-white shadow-sm transition-transform hover:-translate-y-[1px] disabled:opacity-50"
              >
                {isLoading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
        </div>

        {error && (
          <div className="mb-8 rounded-xl bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        {hasSearched && !error && results.length === 0 && (
          <div className="mb-8 rounded-[20px] border border-[#d8d1cb] bg-[#f7f4f1] p-8 text-center shadow-[0_1px_0_rgba(17,24,39,0.02)]">
            <h3 className="text-xl font-medium text-[#1d1d1d] mb-2">No results found</h3>
            <p className="text-[#58514d]">We couldn&apos;t find anything matching your search. Try different keywords or check out the full catalog.</p>
            <Link href="/courses" className="inline-block mt-4 text-[#ef6b45] hover:underline font-medium">Browse Catalog &rarr;</Link>
          </div>
        )}

        {results.length > 0 && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-[1.2rem] font-medium text-[#1d1d1d]">
                Found {results.length} result{results.length !== 1 ? 's' : ''}
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {results.map((result, i) => (
                <Link
                  key={i}
                  href={`/courses/${result.courseSlug}/lessons/${result.lessonSlug}${result.timestamp ? `?start=${result.timestamp}` : ''}`}
                  className="group block rounded-[20px] border border-[#d8d1cb] bg-[#f7f4f1] p-5 shadow-[0_1px_0_rgba(17,24,39,0.02)] transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mb-3 inline-flex items-center gap-2 text-[0.8rem] font-medium text-[#ef6b45]">
                    <span className="uppercase tracking-wider">{result.type === 'video' ? 'Video Moment' : 'Lesson'}</span>
                    <span className="text-[#d8d1cb]">•</span>
                    <span className="text-[#58514d]">{result.courseTitle}</span>
                  </div>
                  <h3 className="font-display text-[1.3rem] font-medium leading-tight text-[#1d1d1d] group-hover:text-[#ef6b45]">
                    {result.title}
                  </h3>
                  {result.description && (
                    <p className="mt-3 text-[1.02rem] leading-[1.5] text-[#4d4a47] line-clamp-2">
                      {result.description}
                    </p>
                  )}
                  <div className="mt-5 flex items-center gap-4 text-[0.85rem] text-[#58514d]">
                    {result.moduleLabel && <span>{result.moduleLabel}</span>}
                    {result.timestamp && (
                      <span className="inline-flex items-center gap-1 rounded bg-[#e8e2dc] px-2 py-0.5 font-medium">
                        ⏱️ {Math.floor(result.timestamp / 60)}:{(result.timestamp % 60).toString().padStart(2, '0')}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
