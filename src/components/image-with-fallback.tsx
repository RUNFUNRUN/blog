'use client';

import { cn } from 'fumadocs-ui/components/api';
import Image from 'next/image';
import { useState } from 'react';

export const ImageWithFallback = ({
  src,
  alt,
  className,
}: {
  src?: string;
  alt: string;
  className?: string;
}) => {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className='flex h-full w-full items-center justify-center bg-fd-card'>
        <span className='text-4xl text-fd-card-foreground'>🔗</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={cn('object-cover', className)}
      fill
      sizes='240px'
      onError={() => setError(true)}
      unoptimized={src.startsWith('http')}
    />
  );
};
