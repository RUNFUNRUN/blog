import Link from 'next/link';
import { getPages } from '../source';

export default function HomePage() {
  const pages = getPages().sort(
    (a, b) => (b.data.exports.lastModified ?? 0) - (a.data.exports.lastModified ?? 0),
  );

  return (
    <main>
      <div className="mx-4 lg:mx-auto lg:w-[992px]">
        <div className="my-8 text-2xl font-bold">
          <p>
            RUNFUNRUNのブログです。プロフィールは
            <Link href="https://www.runfunrun.info" className="text-blue-500 mx-1 underline">
              こちら
            </Link>
            。
          </p>
          <p>質問等はプロフィールのコンタクトかDiscordのDMからお願いします。</p>
        </div>
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
