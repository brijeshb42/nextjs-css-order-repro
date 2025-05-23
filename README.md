# CSS import order repro

TLDR: The import order of css files changes between dev (with Turbpack) and prod (without Turbopack).

## Setup

1. `git clone https://github.com/brijeshb42/nextjs-css-order-repro.git`
2. `pnpm install`

## Dev mode

1. `pnpm docs:dev` will start the docs in dev mode (with Turbopack enabled). Open the URL [http://localhost:3000/preview-card](http://localhost:3000/preview-card) and you'll see that the `Size 1`, `Size 2` etc text is underlined and has a color.
2. Right click on the `Size 1` text and goto `Inspect` to inspect the element in devtools. On the right, you'll see `text-decoration-line` and `color` properties applied with relevant values. Clicking the Layer `components` will show the layer order as `theme`, `base`, `components`, `utilities` and `tokens`.

## Prod mode

1. `pnpm docs:build` will build the app with Webpack.
2. `pnpm docs:start` will start the built app. Goto the same url [http://localhost:3000/preview-card](http://localhost:3000/preview-card). You'll see that the `Size 1`, `Size 2` etc text now not underlined and the color is black.
3. Right click on the `Size 1` text and goto `Inspect` to inspect the element in devtools. On the right, clicking the Layer `base` will show the layer order as `tokens`, `components`, `theme`, `base` and `utilities`.

## Issue

In dev mode, the css order is as expected, which is declared in [docs/src/app/layout.tsx](docs/src/app/layout.tsx). First `test-package/index.css` is imported which has an explicit layer order defined and then local [./reset.css](docs/src/app/reset.css) is imported.

In prod mode, its not the same case. Looking at the built files in browser, the order is

1. [./reset.css](docs/src/app/reset.css)
2. [ThemeToggle.module.css](docs/src/app/ThemeToggle.module.css)

and `test-package/index.css` seems to be imported at the end. So the css layer order gets defined implicitly as and when components get imported.
