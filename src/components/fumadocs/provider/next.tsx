'use client';
import type { Framework } from 'fumadocs-core/framework';
import { NextProvider } from 'fumadocs-core/framework/next';
import type { ComponentProps } from 'react';
import { RootProvider as BaseProvider } from '@/components/fumadocs/provider/base';
export interface RootProviderProps extends ComponentProps<typeof BaseProvider> {
  /**
   * Custom framework components to override Next.js defaults
   */
  components?: {
    Link?: Framework['Link'];
    Image?: Framework['Image'];
  };
}
export const RootProvider = ({ components, ...props }: RootProviderProps) => {
  return (
    <NextProvider Link={components?.Link} Image={components?.Image}>
      <BaseProvider {...props}>{props.children}</BaseProvider>
    </NextProvider>
  );
};
