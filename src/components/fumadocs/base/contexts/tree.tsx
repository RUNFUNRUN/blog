'use client';
import { searchPath } from 'fumadocs-core/breadcrumb';
import { usePathname } from 'fumadocs-core/framework';
import type * as PageTree from 'fumadocs-core/page-tree';
import { createContext, type ReactNode, use, useMemo, useRef } from 'react';

type MakeRequired<O, K extends keyof O> = Omit<O, K> & Pick<Required<O>, K>;
interface TreeContextType {
  root: MakeRequired<PageTree.Root | PageTree.Folder, '$id'>;
  full: PageTree.Root;
}
const TreeContext = createContext<TreeContextType | null>(null);
const PathContext = createContext<PageTree.Node[]>([]);
export const TreeContextProvider = ({
  tree: rawTree,
  children,
}: {
  tree: PageTree.Root;
  children: ReactNode;
}) => {
  const nextIdRef = useRef(0);
  const pathname = usePathname();
  // Server components can reconstruct the same tree; its ID preserves the cached identity.
  // biome-ignore lint/correctness/useExhaustiveDependencies: Trees with the same ID represent the same content.
  const tree = useMemo(() => rawTree, [rawTree.$id ?? rawTree]);
  const path = useMemo(() => {
    return (
      searchPath(tree.children, pathname) ??
      (tree.fallback ? searchPath(tree.fallback.children, pathname) : null) ??
      []
    );
  }, [tree, pathname]);
  const root =
    path.findLast((item) => item.type === 'folder' && item.root) ?? tree;
  root.$id ??= String(nextIdRef.current++);
  return (
    <TreeContext
      value={useMemo(
        () => ({ root, full: tree }) as TreeContextType,
        [root, tree],
      )}
    >
      <PathContext value={path}>{children}</PathContext>
    </TreeContext>
  );
};
export const useTreePath = (): PageTree.Node[] => {
  return use(PathContext);
};
export const useTreeContext = (): TreeContextType => {
  const ctx = use(TreeContext);
  if (!ctx)
    throw new Error('You must wrap this component under <DocsLayout />');
  return ctx;
};
