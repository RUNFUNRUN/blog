import Link from 'next/link';
import type { ReactNode } from 'react';

export const InlineLink = ({
  href,
  children,
  blank = false,
}: { href: string; children: ReactNode; blank?: boolean }) => {
  return (
    <Link
      href={href}
      className='text-fd-primary hover:underline mx-1'
      target={blank ? '_blank' : undefined}
    >
      {children}
    </Link>
  );
};
