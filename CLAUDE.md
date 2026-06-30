# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Static export to out/
npm run lint     # ESLint via next lint
```

No test suite is configured.

## Architecture

This is a **single-page portfolio** built with Next.js 14 App Router and statically exported (`output: 'export'`). All content lives in Markdown files under `content/`, which are read at build time by `src/lib/content.ts` and passed as props to section components.

### Content → Component flow

`src/app/page.tsx` fetches all content in parallel via functions from `src/lib/content.ts`, then renders section components in order:

```
Hero → About → Experience → Featured → Projects → Contact → Footer
```

Each section has a corresponding React component in `src/components/sections/`.

### Content directory layout

| Path | Purpose |
|---|---|
| `content/hero/index.md` | Hero section (frontmatter: `title`, `name`, `subtitle`, `buttonText`) |
| `content/about/index.md` | About section (frontmatter: `title`, `skills[]`) |
| `content/jobs/{Company}/index.md` | Work experience entries — sorted descending by `date` frontmatter |
| `content/featured/{Project}/index.md` | Featured project cards (frontmatter: `title`, `cover`, `external`, `tech[]`) |
| `content/projects/*.md` | Other projects — rendered only when `showInProjects: true`; sorted by `date` |
| `content/contact/index.md` | Contact section (frontmatter only: `title`, `buttonText`) |
| `content/posts/` | Blog post drafts — not yet wired into the app |

Markdown body content is converted to HTML by `remark` + `remark-html` and passed as `content: string` (raw HTML) to components.

### Styling

Tailwind CSS with a custom dark theme defined in `tailwind.config.ts`. Key design tokens:

- `navy` / `dark-navy` / `light-navy` / `lightest-navy` — background layers
- `green` (`#64ffda`) — accent / interactive color
- `slate` / `light-slate` / `lightest-slate` — text hierarchy
- `font-mono` — SF Mono / Fira Code stack used for labels and code

Body uses `bg-navy text-slate` as base; main content is padded with responsive horizontal padding in `layout.tsx`.

### Static export notes

Because `output: 'export'` is set, Next.js Image optimization is disabled (`images: { unoptimized: true }`). The built site lands in `out/`. Images referenced from `content/` markdown (e.g. `cover` frontmatter) must be copied to `public/images/` and referenced by absolute path from the root.
