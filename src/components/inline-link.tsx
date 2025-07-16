import Link from 'next/link';
import type { ReactNode } from 'react';

export const InlineLink = ({
  href,
  children,
  blank = false,
}: {
  href: string;
  children: ReactNode;
  blank?: boolean;
}) => {
  return (
    <Link
      href={href}
      className='text-fd-primary underline hover:text-fd-primary/70 duration-300'
      target={blank ? '_blank' : undefined}
    >
      {children}
    </Link>
  );
};
