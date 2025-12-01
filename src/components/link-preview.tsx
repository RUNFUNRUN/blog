import { cn } from 'fumadocs-ui/utils/cn';
import { ExternalLinkIcon, LinkIcon, NewspaperIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { fetchOGMetadata } from '@/actions/fetch-og-metadata';
import { title as homeTitle } from '@/app/layout.config';
import { getPost } from '@/lib/source';
import { ImageWithFallback } from './image-with-fallback';

const isInternalBlogLink = (url: string) => {
  try {
    const urlObj = new URL(url);
    return urlObj.pathname.startsWith('/posts/');
  } catch {
    return url.startsWith('/posts/');
  }
};

const getSlugFromUrl = (url: string) => {
  try {
    const urlObj = new URL(url);
    const parts = urlObj.pathname.split('/');
    return parts[parts.length - 1];
  } catch {
    const parts = url.split('/');
    return parts[parts.length - 1];
  }
};

export const LinkCard = ({
  url,
  title,
  description,
  image,
  className,
  error = false,
}: {
  url: string;
  title?: string;
  description?: string;
  image?: string;
  className?: string;
  error?: boolean;
}) => {
  const isExternal = url.startsWith('http');
  const hostname = isExternal ? new URL(url).hostname : '';

  const CardContent = (
    <>
      <div className='flex flex-1 flex-col gap-1 p-3 h-[126px]'>
        <div className='flex items-center gap-1'>
          <div className='flex items-center gap-1.5 text-xs font-medium text-fd-card-foreground'>
            {isExternal ? (
              <>
                <div className='relative size-4 overflow-hidden'>
                  {hostname && (
                    <Image
                      src={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&size=64&url=https://${hostname}`}
                      alt=''
                      className='object-cover'
                      width={16}
                      height={16}
                    />
                  )}
                </div>
                <span>{hostname.replace(/^www\./, '')}</span>
                <ExternalLinkIcon className='size-3 text-fd-card-foreground' />
              </>
            ) : (
              <span className='flex items-center gap-1.5'>
                <div className='size-4'>
                  <Image
                    src='/favicon.ico'
                    alt=''
                    className='object-cover'
                    width={16}
                    height={16}
                  />
                </div>
                <span>{homeTitle}</span>
              </span>
            )}
          </div>
        </div>
        <div className='flex-1'>
          <p className='not-prose line-clamp-2 font-semibold text-md leading-tight text-foreground transition-colors'>
            {error ? 'Page Not Found' : (title ?? 'Untitled')}
          </p>
          <p className='not-prose line-clamp-2 mt-1 text-sm text-fd-card-foreground'>
            {error ? 'This page may have been moved or deleted.' : description}
          </p>
        </div>
      </div>

      {image ? (
        <div className='hidden w-60 shrink-0 sm:block'>
          <div className='relative h-full w-full'>
            <ImageWithFallback src={image} alt={title || 'Link preview'} />
          </div>
        </div>
      ) : (
        <div className='hidden w-60 shrink-0 sm:block'>
          <div className='flex h-full w-full items-center justify-center'>
            {isExternal ? (
              <LinkIcon size={32} className='text-fd-card-foreground' />
            ) : (
              <NewspaperIcon size={32} className='text-fd-card-foreground' />
            )}
          </div>
        </div>
      )}
    </>
  );

  const cardClasses = cn(
    'not-prose group my-4 flex overflow-hidden rounded-lg border bg-fd-card transition-all duration-200 hover:bg-fd-accent/80 shadow-md',
    className,
  );

  return isExternal ? (
    <a
      href={url}
      target='_blank'
      rel='noopener noreferrer'
      className={cardClasses}
    >
      {CardContent}
    </a>
  ) : (
    <Link href={url} className={cardClasses}>
      {CardContent}
    </Link>
  );
};

const InternalLinkCard = async ({
  url,
  className,
}: {
  url: string;
  className?: string;
}) => {
  const slug = getSlugFromUrl(url);
  const post = getPost([slug]);

  if (!post) {
    return <LinkCard url={url} error={true} className={className} />;
  }

  const title = post.data.title;
  const description = post.data.description;

  const imageParams = new URLSearchParams();
  imageParams.set('title', title);
  imageParams.set('description', description ?? '');

  return (
    <LinkCard
      url={url}
      title={title}
      description={description}
      image={`/api/og?${imageParams}`}
      className={className}
    />
  );
};

const ExternalLinkCard = async ({
  url,
  className,
}: {
  url: string;
  className?: string;
}) => {
  try {
    const ogData = await fetchOGMetadata(url);

    if (!ogData.title) {
      return <LinkCard url={url} error={true} className={className} />;
    }

    return (
      <LinkCard
        url={url}
        title={ogData.title}
        description={ogData.description}
        image={ogData.image}
        className={className}
      />
    );
  } catch {
    return <LinkCard url={url} error={true} className={className} />;
  }
};

export const LinkPreview = ({
  url,
  className,
}: {
  url: string;
  className?: string;
}) => {
  const isInternal = !url.startsWith('http') && isInternalBlogLink(url);

  return (
    <Suspense
      fallback={
        <div
          className={cn(
            'my-4 h-[126px] animate-pulse rounded-lg border bg-fd-card',
            className,
          )}
        />
      }
    >
      {isInternal ? (
        <InternalLinkCard url={url} className={className} />
      ) : (
        <ExternalLinkCard url={url} className={className} />
      )}
    </Suspense>
  );
};
