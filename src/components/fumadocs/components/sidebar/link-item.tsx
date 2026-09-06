import type { HTMLAttributes } from 'react';
import type { LinkItemType } from '@/components/fumadocs/base/link-item';
import type * as Base from '@/components/fumadocs/components/sidebar/base';

type InternalComponents = Pick<
  typeof Base,
  | 'SidebarFolder'
  | 'SidebarFolderLink'
  | 'SidebarFolderContent'
  | 'SidebarFolderTrigger'
  | 'SidebarItem'
>;
export const createLinkItemRenderer = ({
  SidebarFolder,
  SidebarFolderContent,
  SidebarFolderLink,
  SidebarFolderTrigger,
  SidebarItem,
}: InternalComponents) => {
  /**
   * Render sidebar items from page tree
   */
  const SidebarLinkItem = ({
    item,
    ...props
  }: HTMLAttributes<HTMLElement> & {
    item: Exclude<
      LinkItemType,
      {
        type: 'icon';
      }
    >;
  }) => {
    if (item.type === 'custom') return <div {...props}>{item.children}</div>;
    if (item.type === 'menu')
      return (
        <SidebarFolder {...props}>
          {item.url ? (
            <SidebarFolderLink href={item.url} external={item.external}>
              {item.icon}
              {item.text}
            </SidebarFolderLink>
          ) : (
            <SidebarFolderTrigger>
              {item.icon}
              {item.text}
            </SidebarFolderTrigger>
          )}
          <SidebarFolderContent>
            {item.items.map((child, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: Navigation configuration has a fixed order and custom items have no ID.
              <SidebarLinkItem key={i} item={child} />
            ))}
          </SidebarFolderContent>
        </SidebarFolder>
      );
    return (
      <SidebarItem
        href={item.url}
        icon={item.icon}
        external={item.external}
        {...props}
      >
        {item.text}
      </SidebarItem>
    );
  };
  return SidebarLinkItem;
};
