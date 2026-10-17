# lembos.dev

The Lembos website and its documentation: a static Next.js site with
[Fumadocs](https://fumadocs.dev) under `/docs`, exported and published to GitHub
Pages by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

## Improving the docs

The documentation is the [`docs/`](./docs) folder: one `.mdx` file per page.
Edit a page, run the site, and the change appears as you save.

- A page starts with a `title` and a `description` in its front matter.
- Its place in the sidebar comes from the `meta.json` beside it.
- Link between pages by URL — `/docs/install/helm`.
- Callouts, cards and tabs need no import:

  ```mdx
  <Callout type="warn">Back these up.</Callout>
  ```

- Portal screenshots are in `src/frontend/public/portal/`; use them as
  `![What it shows](/portal/catalog-light.png)`.

## Running it

You need [pnpm](https://pnpm.io). Running it under Aspire also takes the
[.NET 10 SDK](https://dotnet.microsoft.com/download) and the
[Aspire CLI](https://aspire.dev/get-started/install-cli/); Docker is not needed.

```shell
aspire start      # the site under Aspire, with its dashboard; `aspire stop` ends it
```

```shell
pnpm install
pnpm dev          # the site alone, at http://localhost:3000
pnpm build        # the static export, into src/frontend/dist/
```

pnpm runs every script under Node 22.12 (`pnpm-workspace.yaml`), downloading
it if needed — Fumadocs' build loaders are ES modules that Next loads with
`require()`, which older Node cannot do.

## Layout

| Path                              | What it is                                                     |
|-----------------------------------|----------------------------------------------------------------|
| `docs/`                           | The documentation, as MDX                                      |
| `src/frontend/`                   | The Next.js site                                               |
| `src/apphost/Lembos.Dev.AppHost/` | The Aspire AppHost that runs the site locally                  |

Inside `src/frontend/`:

| Path                 | What it is                                                       |
|----------------------|------------------------------------------------------------------|
| `app/page.tsx`       | The landing page, section by section                             |
| `app/docs/`          | The docs layout and the page that renders every MDX file         |
| `app/api/search/`    | The search index, written to a static file at export             |
| `app/layout.tsx`     | Fonts, metadata and the theme and search providers               |
| `components/site/`   | The site's own components — header, footer, figures, primitives  |
| `components/ui/`     | shadcn/ui primitives                                             |
| `components/mdx.tsx` | The components every docs page can use without an import         |
| `lib/site.ts`        | Name, links and navigation, in one place so every surface agrees |
| `lib/source.ts`      | Where Fumadocs finds the docs                                    |
| `public/portal/`     | Portal screenshots, in light and dark pairs                      |
| `tools/og-image.tsx` | The source of `public/og-image.png` — see the note in the file   |

## Theme

The palette is the Portal's, copied value for value from
`src/Lembos.Components/Services/LembosTheme.cs` in the platform repository and
converted to the HSL triplets the components here expect. Changing a colour
means changing it there first, then mirroring it in
`src/frontend/app/globals.css`, where Fumadocs' `--color-fd-*` tokens are also
mapped onto it so the docs match the landing page.

## Adding pages outside the docs

Pages added under `src/frontend/app/` pick up the chrome by rendering
`<SiteHeader />` and `<SiteFooter />`, and join the navigation by being added to
`nav` in `lib/site.ts`.
