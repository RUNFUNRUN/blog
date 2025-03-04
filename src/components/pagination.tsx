import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

const Card = ({
  children,
  num,
  path,
  disable,
}: {
  children: ReactNode;
  num: number;
  path: string;
  disable: boolean | undefined;
}) => {
  if (disable) {
    return (
      <div className='rounded-full border bg-card p-2 text-fd-accent'>
        {children}
      </div>
    );
  }
  return (
    <Link
      href={`${path}/${num.toString()}`}
      className='rounded-full border bg-card p-2 text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground'
    >
      {children}
    </Link>
  );
};

export const Pagination = ({
  current,
  end,
  path,
}: {
  current: number;
  end: number;
  path: string;
}) => {
  return (
    <div className='flex justify-center gap-2'>
      <Card num={1} path={path} disable={current === 1}>
        <h2 className='text-xl font-medium'>
          <ChevronsLeft />
        </h2>
      </Card>
      <Card num={current - 1} path={path} disable={current === 1}>
        <h2 className='text-xl font-medium'>
          <ChevronLeft />
        </h2>
      </Card>
      <div className='my-auto text-2xl mx-2'>
        {current} / {end}
      </div>
      <Card num={current + 1} path={path} disable={current === end}>
        <h2 className='text-xl font-medium'>
          <ChevronRight />
        </h2>
      </Card>
      <Card num={end} path={path} disable={current === end}>
        <h2 className='text-xl font-medium'>
          <ChevronsRight />
        </h2>
      </Card>
    </div>
  );
};
