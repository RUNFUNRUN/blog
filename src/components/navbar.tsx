'use client';

import Link, { type LinkProps } from 'fumadocs-core/link';
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuViewport,
} from 'fumadocs-ui/components/ui/navigation-menu';
import { cn } from 'fumadocs-ui/utils/cn';
import { type HTMLAttributes, useState } from 'react';

export const Navbar = (props: HTMLAttributes<HTMLElement>) => {
  const [value, setValue] = useState('');

  return (
    <NavigationMenu value={value} onValueChange={setValue} asChild>
      <header
        {...props}
        className={cn(
          'fixed top-[var(--fd-banner-height)] z-30 box-content w-full border-b border-fd-foreground/10 transition-colors backdrop-blur-lg bg-fd-background/80',
          value.length > 0 ? 'shadow-lg' : 'shadow-xs',
          props.className,
        )}
      >
        <div className='mx-auto h-14 flex size-full flex-row items-center px-4 md:gap-1.5 lg:px-8'>
          {props.children}
        </div>
        <NavigationMenuViewport />
      </header>
    </NavigationMenu>
  );
};

export const NavbarMenuLink = (props: LinkProps) => {
  return (
    <NavigationMenuLink asChild>
      <Link
        {...props}
        className={cn(
          'flex flex-col gap-2 rounded-lg border bg-fd-card p-3 transition-colors hover:bg-fd-accent/80 hover:text-fd-accent-foreground',
          props.className,
        )}
      >
        {props.children}
      </Link>
    </NavigationMenuLink>
  );
};
