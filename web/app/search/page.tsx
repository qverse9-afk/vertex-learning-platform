import SearchView from '@/components/search/SearchView';

interface PageProps {
  searchParams: Promise<{ q?: string | string[] }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const initialQuery = typeof q === 'string' ? q.trim() : '';

  return <SearchView initialQuery={initialQuery} />;
}
