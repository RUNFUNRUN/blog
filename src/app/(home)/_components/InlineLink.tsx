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
      className='text-blue-500 hover:underline hover:text-blue-400 mx-1'
      target={blank ? '_blank' : undefined}
    >
      {children}
    </Link>
  );
};
