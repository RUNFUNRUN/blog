# Local UI

These components are maintained in this repository. They were copied from
Fumadocs 16.4.9, commit `db7b83482c0b2923faa6f348eeef32d71ec99f71`:

- `packages/radix-ui/src` → this directory
- `packages/ui/src` → `base/`
- The corresponding CSS and typography plugin → `src/styles/fumadocs/`

Only the modules reached by this blog's layouts, provider, MDX components,
and accordion are included. Keep the upstream MIT notices in `LICENSE` and
the styles directory when distributing this code.

Imports use `@/components/fumadocs/`. Functions use arrow syntax. The original
markup, Tailwind classes, themes, and interactions are retained, with local
accessibility and hook adjustments for the project's Biome rules. The `base/cn`
helper retains the upstream Tailwind merge behavior; the blog's existing
`src/lib/utils.ts` helper is independent.

Fumadocs Core still supplies routing, search, page trees, and table-of-contents
primitives. MDX compilation and the TypeScript remark plugin remain in use.
Neither `fumadocs-ui` nor `@fumadocs/ui` is required at runtime or build time.

Validate changes with `bun run check` and `bun run build`. When changing UI,
also check desktop/mobile layouts, both themes, search, code copying, image
zoom, accordions, and the table of contents.
