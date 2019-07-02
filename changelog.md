### v8.0.0
- Breaking: footer implementation used by iOS app removed a couple of public functions
- New: PCS: footer functionality
- New: PCS: get offsets for sections
- New: Collect references item which contain only href and text

### v7.2.0
- Fix: republish v7.1.0 which didn't "take" correctly

### v7.1.0
- New: Allow clients to adjust text size
- Fix: TemplateStyles CSS appearing in quick facts header

### v7.0.0
- Breaking: Remove callbacks from BodySpacingTransform
- New: PCS abstraction layer
- New: CollapseTable `toggleCollapsedForAll` method
- New: DimImagesTransform `dimImages` and `areImagesDimmed` methods which operates on a document instead of window
- New: PlatformTransform `setPlatform` method
- Fix: Unset any explicit height of collapsible tables
- Update: Bump patch version of vulnerable dependencies
- Deprecated: DimImagesTransform `dim` and `isDim`

### v6.5.0
- Update: Add nodenv and nvm support, set node version to current long term stable release 10.15.3
- Update: Re-resolve dependencies with node 10 and npm 6, run `npm audit fix`
- Fix: Remove background-color: initial on .content to fix mobile-html

### v6.4.0
- Fix: tablet landscape collapsed tables
- Fix: tablet landscape image widening
- Add: `build:debug` option which correctly builds sourcemaps and doesn't minify
- New: BodySpacingTransform 

### v6.3.0
- Fix: pre-emptively override upstream ordered list CSS changes
- Fix: absolutely positioned image widening bug
- Fix: dark / black theme white background bug - follow-up for older Android versions
- New: optional `value` parameter for `closestInlineStyle`
- Chore: upgrade dependency

### v6.2.1
- Fix: dark / black theme white background bug
- Chore: upgrade dependency

### v6.2.0
- Update: break up CollapseTables.adjustTables into two methods
- New: edit transform method for article header

### v6.1.4
- Fix: extracted references not removing styles 

### v6.1.3
- Fix: infobox too narrow issue

### v6.1.2
- Update: footer heading color, size and spacing (currently only used by iOS)

### v6.1.1
- Update: add LazyLoadTransformer.collectExistingPlaceholders() API for querying server-side transform image placeholders

### v6.1.0
- New: adjacent reference extraction

### v6.0.11
- Chore: upgrade dependencies
- Chore: add JavaScript type-checking support via TypeScript
- Fix: [brick, pie, bar, and stacked bar chart](https://phabricator.wikimedia.org/T179128), and [chessboard theming](https://phabricator.wikimedia.org/T183333).
- [Fix: infobox collapsing on frwiki](https://phabricator.wikimedia.org/T188096)

### v6.0.10
- Update: add optional parameter to EditTransform.newEditSectionButton() to allow edit pencil to be hidden

### v6.0.9
- Fix: workaround Node.js Webpack require issue https://github.com/webpack/webpack/issues/6525
- Fix: add source maps to debug builds

### v6.0.8
- Update: add event logging label to `Read more` item urls.

### v6.0.7
- Fix: use correct parameters for `Read more` display titles.

### v6.0.6
- Fix: second attempt to fix theme css regression. v6.0.5 did not fix it.

### v6.0.5
- Fix: theme css regression. Collapsed table borders were missing for sepia and dark themes.

### v6.0.4
- Update: update dependencies

### v6.0.3
- Update: slight adjustments to edit pencil spacing

### v6.0.2
- Update: use new parameters for `Read more` wikidata descriptions

### v6.0.1
- Fix: hiding edit pencils on iOS for sections H3 to H6

### v6.0.0
- Breaking: update section header presentation for multiline titles; integration notes:
  - Clients should now call EditTransform.newEditSectionHeader() instead of newEditSectionButton() and remove any custom code; please see JSDocs and demo
- Update: change the size of the edit pencil to make it look more compatible with other edit pencil views in the android app

### v5.0.1
- Chore: replace Rollup.js bundler with Webpack; there are no anticipated client changes necessary but integrators should smoke test CSS and JavaScript functionality, especially on older devices, and app devs should verify their development workflows
- Chore: rename NPM `dev` script to canonical `start`

### v5.0.0
- Breaking: removed 'fragment' parameter from 'hideRedLinks' method
- New: consolidated 1st paragraph relocation transform with 'moveLeadIntroductionUp' kickoff method
- Update: bump Babel iOS target version to 10.3 and Android to 4.4
- Fix: improved collapsed table header collection

### v4.8.0
- New: CollectionUtilities methods for gathering page issues and disambiguation information

### v4.7.12
- Fix: image maps were missing the usemap attribute after the lazy image load transform
- Fix: occassional console error when updating read more save buttons
- Fix: bug with determining image widening ancestors on certain signpost pages

### v4.7.11
- Fix: more follow-up "black" theme tweaks

### v4.7.10
- Fix: follow-up "black" theme tweaks

### v4.7.9
- Fix: encoding of titles when updating Read More save buttons

### v4.7.8
- Fix: lazy loading race condition in demos
- Fix: image widening not always working on iOS when used with lazy loading
- Fix: "black" theme collapsed table outline color

### v4.7.7
- New: add "black" theme, which features a fully-black background to optimize for AMOLED displays.

### v4.7.6
- New: adjustTables allows for setting up tables for expand / collapse behavior without initially collapsing them

### v4.7.5
- Fix: fix themes for code highlighting

### v4.7.4
- Fix: fix some of the graphs and charts issues for dark and sepia themes

### v4.7.3
- Fix: remove unneeded recursion in table collapse transform

### v4.7.2
- Fix: add missing talk page menu type

### v4.7.1
- Fix: override image ancestor inline heights (found in Parsoid HTML) with `height: 'auto'`

### v4.7.0
- New: add a footer link to view the article in browser

### v4.6.0
- New: add a link to a talk page as a footer menu item

### v4.5.11
- Fix: use 'pagelib_' prefix and snake_case consistently for transform CSS class naming

### v4.5.10
- Fix: some parts of football uniforms not being classified as presuming white background

### v4.5.9
- Fix: collapse table theming - increase specificity of collapse table theme selectors

### v4.5.8
- Fix: catch failed read more request Errors
- Update: footer wordmark
- Fix: dark and sepia theming on articles which contain color swatches and sports uniforms

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
