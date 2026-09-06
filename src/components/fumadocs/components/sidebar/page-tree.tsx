import type * as PageTree from 'fumadocs-core/page-tree';
import { type FC, Fragment, type ReactNode, useMemo } from 'react';
import type * as Base from '@/components/fumadocs/components/sidebar/base';
import {
  useTreeContext,
  useTreePath,
} from '@/components/fumadocs/contexts/tree';
export interface SidebarPageTreeComponents {
  Item: FC<{
    item: PageTree.Item;
  }>;
  Folder: FC<{
    item: PageTree.Folder;
    children: ReactNode;
  }>;
  Separator: FC<{
    item: PageTree.Separator;
  }>;
}
type InternalComponents = Pick<
  typeof Base,
  | 'SidebarSeparator'
  | 'SidebarFolder'
  | 'SidebarFolderLink'
  | 'SidebarFolderContent'
  | 'SidebarFolderTrigger'
  | 'SidebarItem'
>;
export const createPageTreeRenderer = ({
  SidebarFolder,
  SidebarFolderContent,
  SidebarFolderLink,
  SidebarFolderTrigger,
  SidebarSeparator,
  SidebarItem,
}: InternalComponents) => {
  const PageTreeFolder = ({
    item,
    children,
  }: {
    item: PageTree.Folder;
    children: ReactNode;
  }) => {
    const path = useTreePath();
    return (
      <SidebarFolder
        collapsible={item.collapsible}
        active={path.includes(item)}
        defaultOpen={item.defaultOpen}
      >
        {item.index ? (
          <SidebarFolderLink
            href={item.index.url}
            external={item.index.external}
          >
            {item.icon}
            {item.name}
          </SidebarFolderLink>
        ) : (
          <SidebarFolderTrigger>
            {item.icon}
            {item.name}
          </SidebarFolderTrigger>
        )}
        <SidebarFolderContent>{children}</SidebarFolderContent>
      </SidebarFolder>
    );
  };
  /**
   * Render sidebar items from page tree
   */
  return (components: Partial<SidebarPageTreeComponents>) => {
    const { root } = useTreeContext();
    const { Separator, Item } = components;
    const Folder = components.Folder ?? PageTreeFolder;
    // biome-ignore lint/correctness/useExhaustiveDependencies: Changing the folder renderer must invalidate the memoized JSX.
    return useMemo(() => {
      const renderSidebarList = (items: PageTree.Node[]) => {
        return items.map((item, i) => {
          if (item.type === 'separator') {
            if (Separator) return <Separator key={item.$id ?? i} item={item} />;
            return (
              <SidebarSeparator key={item.$id ?? i}>
                {item.icon}
                {item.name}
              </SidebarSeparator>
            );
          }
          if (item.type === 'folder') {
            return (
              <Folder key={item.$id ?? i} item={item}>
                {renderSidebarList(item.children)}
              </Folder>
            );
          }
          if (Item) return <Item key={item.url} item={item} />;
          return (
            <SidebarItem
              key={item.url}
              href={item.url}
              external={item.external}
              icon={item.icon}
            >
              {item.name}
            </SidebarItem>
          );
        });
      };
      return (
        <Fragment key={root.$id}>{renderSidebarList(root.children)}</Fragment>
      );
    }, [Folder, Item, Separator, root]);
  };
};
