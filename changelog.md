### v4.5.10
- Fix: some parts of football uniforms not being classified as presuming white background

### v4.5.9
- Fix: collapse table theming - increase specificity of collapse table theme selectors

### v4.5.8
- Fix: catch failed read more request Errors
- Fix: dark and sepia theming on articles which contain color swatches and sports uniforms
- Update: footer wordmark
- Update: improve read more save page button presentation abilities

### v4.5.7
- Fix: add a few css properties to read more part of the footer

### v4.5.6
- Fix: hide edit pencils on iOS on H3, H4, H5 and H6

### v4.5.5
- Fix: dark and sepia themes fixes for various elements including those having inline style colors
- Chore: add theme demo. To add articles to theme demo update `articles.json` then run `update.js`

### v4.5.4
- Chore: trim read more data client

### v4.5.3
- Fix: add missing href on edit anchor

### v4.5.2
- Fix: LazyLoadTransformer deregistration

### v4.5.1
- Chore: add `dev` and `build:watch` scripts

### v4.5.0
- New: edit transform
- New: image dimming transform
- Fix: dark mode collapsed table secondary text and edit link colors

### v4.4.0
- New: add platform transform

### v4.3.1
- Fix: dark and sepia themes for tables
- Fix: dark and sepia themes for footer transforms

### v4.3.0
- New: add footer transforms

### v4.2.1
- Update: support lazily loading widened images without reflows
- Update: add loading and error states to lazily loaded images and retry handler
- Chore: update `LazyLoadTransform` demo to use image widening.

### v4.2.0
- New: add theme transform with dark mode support

### v4.1.0
- New: add lazily loaded image transform

### v4.0.2
- Chore: upgrade dependencies

### v4.0.1
- Breaking: require a Window instead of a Document in the first parameter of CollapseTable.collapseTables()
- New: update bundle to support AMD, ES, and IIFE / script usage, in addition to CJS
- New: emit a `section-toggled` CustomEvent when a table is expanded or collapsed
- Fix: use `Array.prototype.slice` instead of `Array.from` to fix compatibility bug

### v4.0.0
Broken package. Do not use.

### v3.1.0
- New: add RedLinks.hideRedLinks()

### v3.0.0
- Breaking: hide CollapseTable.getTableHeader()
- New: add CollapseElement.collapseTables() and toggleCollapseClickCallback();
  integration notes:
  - Android and iOS: "..." replaced with ellipsis character, "…"
  - Android:
    - Don't collapse main pages
    - Don't collapse `.mbox-small` elements
  - iOS: toggleCollapseClickCallback() now toggles caption visibility
- Chore: upgrade dependencies

### v2.0.1
- Fix: use polyfill for Element.matches()

### v2.0.0
- Breaking: rename applib to wikimedia-page-library including build products
- Breaking: divide build products into transform and override files

### v1.2.3
- Mislabeled package. Do not use.

### v1.2.2
- Fix: center widened image captions from Parsoid
- Chore: update CollapseTable tests to be more consistent

### v1.2.1
Broken package. Do not use.

### v1.2.0
- New: JS and CSS for image widening transform
  ([example integration](https://github.com/wikimedia/wikipedia-ios/pull/1313/))

### v1.1.0
- New: CSS delivered via "applib.css" by way of "rollup-plugin-css-porter"

### v1.0.1
- Fix: don't version build products
- Chore: respect arguments passed to `npm run lint`

### v1.0.0
- Breaking: rename CollapseElement to CollapseTable

### v0.1.2
- Fix: postversion script

### v0.1.1
- Fix: generate CommonJS output
- Chore: add source map
- Chore: change bundler from Browserify to Rollup
- Chore: test bundle directly not intermediates

### v0.1.0
- New: add CollapseElement.getTableHeader() function

### v0.0.1
- New: library