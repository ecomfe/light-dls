> ⚠️ - Breaking Changes

## 1.0.0

- Adjusted the implementation of `loading` so that it won't trigger Chrome's bug that sometimes animation of different eleeents is not synchronized.

## 1.0.0-alpha.2

- Added `blank`, `partial-blank`, `partial-blank-brush` and `image-placeholder`.

## 1.0.0-alpha.2

- New design for `forbidden`, `not-found` and `server-error`.
- Added `partial-error` and `partial-forbidden`.

## 1.0.0-alpha.1

- ⚠️ Removed `dist/separate/index.js`.
- All exports are merged in the main entry. For an asset named `foo`, we always export `foo`, `fooContent` and `fooCss` at the same time.
- Provided a CJS entry at `dist/index.cjs.js`.

## 0.1.4

- Fix `module` entry.

## 0.1.3

- Export `<name>Css` even when no styles can be extracted so that implementation can be more transparent.

## 0.1.2

- ⚠️ Adjuted the output of separate data. Move CSS content to individual export statements.

## 0.1.1

- ⚠️ Renamed `dist/separated` to `dist/separate`.
- Added separate data to ES output.

## 0.1.0

- First release, add loading/forbidden/not-found/server-error.
