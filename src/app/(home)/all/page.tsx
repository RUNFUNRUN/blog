import Link from 'next/link';
import { getPages } from '@/app/source';

export default function HomePage() {
  const pages = getPages().sort(
    (a, b) => (b.data.exports.lastModified ?? 0) - (a.data.exports.lastModified ?? 0),
  );

  return (
    <main>
      <div className="mx-4 my-8 lg:mx-auto lg:w-[992px]">
        <h2 className="text-3xl font-bold my-4">全記事一覧({pages.length})</h2>
        <div className="flex flex-col gap-4 text-left">
          {pages.map((page, i) => {
            const lastModified = page.data.exports.lastModified;
            let date = 'unknown date';
            if (lastModified !== undefined) {
              date = new Date(lastModified).toLocaleDateString();
            }
            return (
              <Link
                href={page.url}
                className="rounded-lg border bg-card p-4 text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground w-full"
                key={i}
              >
                <h2 className="mt-2 text-xl font-medium">{page.data.title}</h2>
                <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-medium text-muted-foreground">
                  {page.data.description}
                </p>
                <h3 className="text-right font-medium">{date}</h3>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}