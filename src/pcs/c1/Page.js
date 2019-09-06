import AdjustTextSize from '../../transform/AdjustTextSize'
import BodySpacingTransform from '../../transform/BodySpacingTransform'
import CollapseTable from '../../transform/CollapseTable'
import DimImagesTransform from '../../transform/DimImagesTransform'
import EditTransform from '../../transform/EditTransform'
import L10N from './L10N'
import LazyLoadTransformer from '../../transform/LazyLoadTransformer'
import PlatformTransform from '../../transform/PlatformTransform'
import Scroller from './Scroller'
import ThemeTransform from '../../transform/ThemeTransform'

/**
 * @typedef {function} OnSuccess
 * @return {void}
 */

/**
 * Makes multiple page modifications based on client specific settings, which should be called
 * during initial page load.
 * @param {?{}} optionalSettings client settings
 *   { platform, clientVersion, l10n, theme, dimImages, margins, areTablesInitiallyExpanded,
 *   scrollTop, textSizeAdjustmentPercentage }
 * @param {?Page~Function} onSuccess callback
 * @return {void}
 */
const setup = (optionalSettings, onSuccess) => {
  const settings = optionalSettings || {}
  if (settings.platform !== undefined) {
    PlatformTransform.setPlatform(document, settings.platform)
  }
  if (settings.l10n !== undefined) {
    L10N.localizeLabels(settings.l10n)
  }
  if (settings.theme !== undefined) {
    ThemeTransform.setTheme(document, settings.theme)
  }
  if (settings.dimImages !== undefined) {
    DimImagesTransform.dimImages(document, settings.dimImages)
  }
  if (settings.margins !== undefined) {
    BodySpacingTransform.setMargins(document.body, settings.margins)
  }
  if (settings.areTablesInitiallyExpanded) {
    CollapseTable.toggleCollapsedForAll(document.body)
  }
  if (settings.scrollTop !== undefined) {
    Scroller.setScrollTop(settings.scrollTop)
  }
  if (settings.textSizeAdjustmentPercentage !== undefined) {
    AdjustTextSize.setPercentage(
      document.body,
      settings.textSizeAdjustmentPercentage
    )
  }
  if (settings.loadImages === undefined || settings.loadImages === true) {
    const lazyLoader = new LazyLoadTransformer(window, 2)
    lazyLoader.collectExistingPlaceholders(document.body)
    lazyLoader.loadPlaceholders()
  }

  if (onSuccess instanceof Function) {
    if (window && window.requestAnimationFrame) {
      // request animation frame before callback to ensure theme is set
      window.requestAnimationFrame(() => {
        onSuccess()
      })
    } else {
      onSuccess()
    }
  }
}

/**
 * Sets the theme.
 * @param {!string} theme one of the values in Themes
 * @param {?OnSuccess} onSuccess callback
 * @return {void}
 */
const setTheme = (theme, onSuccess) => {
  ThemeTransform.setTheme(document, theme)

  if (onSuccess instanceof Function) {
    onSuccess()
  }
}

/**
 * Toggles dimming of images.
 * @param {!boolean} dimImages true if images should be dimmed, false otherwise
 * @param {?OnSuccess} onSuccess callback
 * @return {void}
 */
const setDimImages = (dimImages, onSuccess) => {
  DimImagesTransform.dimImages(document, dimImages)

  if (onSuccess instanceof Function) {
    onSuccess()
  }
}

/**
 * Sets the margins.
 * @param {!{BodySpacingTransform.Spacing}} margins
 * @param {?OnSuccess} onSuccess callback
 * @return {void}
 */
const setMargins = (margins, onSuccess) => {
  BodySpacingTransform.setMargins(document.body, margins)

  if (onSuccess instanceof Function) {
    onSuccess()
  }
}

/**
 * Sets the top scroll position for collapsing of tables (when bottom close button is tapped).
 * @param {!number} scrollTop height of decor covering the top portion of the Viewport in pixel
 * @param {?OnSuccess} onSuccess callback
 * @return {void}
 */
const setScrollTop = (scrollTop, onSuccess) => {
  Scroller.setScrollTop(scrollTop)

  if (onSuccess instanceof Function) {
    onSuccess()
  }
}

/**
 * Sets text size adjustment percentage of the body element
 * @param  {!string} textSize percentage for text-size-adjust in format of string, like '100%'
 * @param  {?OnSuccess} onSuccess onSuccess callback
 * @return {void}
 */
const setTextSizeAdjustmentPercentage = (textSize, onSuccess) => {
  AdjustTextSize.setPercentage(document.body, textSize)

  if (onSuccess instanceof Function) {
    onSuccess()
  }
}

/**
 * Enables edit buttons to be shown (and which ones).
 * @param {?boolean} isEditable true if edit buttons should be shown
 * @param {?boolean} isProtected true if the protected edit buttons should be shown
 * @param {?OnSuccess} onSuccess onSuccess callback
 * @return {void}
 */
const setEditButtons = (isEditable, isProtected, onSuccess) => {
  EditTransform.setEditButtons(document, isEditable, isProtected)

  if (onSuccess instanceof Function) {
    onSuccess()
  }
}

/**
 * Sets up event handling for table collapsing/expanding.
 * @param {!Window} window
 * @param {!Document} document
 * @param {?OnSuccess} onSuccess onSuccess callback
 * @return {void}
 */
const setupTableEventHandling = (window, document, onSuccess) => {
  CollapseTable.setupEventHandling(window, document, true, Scroller.scrollWithDecorOffset)

  if (onSuccess instanceof Function) {
    onSuccess()
  }
}

/**
 * Gets the revision of the current mobile-html page.
 * @return {string}
 */
const getRevision = () => {
  const about = document.documentElement.getAttribute('about')
  return about.substring(about.lastIndexOf('/') + 1)
}

/**
 * Gets a remote document
 * @param {url} url to load
 * @return {promise} promise of a document created with the DOMParser
 */
const getRemoteDocument = url => fetch(url).then(response => response.text()).then(html => {
  const parser = new DOMParser()
  return parser.parseFromString(html, 'text/html')
})

// /**
//  * Copies head elements from source to target, expect CSS, JS, and base.
//  * @param {HTMLElement} target e.g. document.head
//  * @param {HTMLElement} source the source to copy head elements from
//  * @return {void}
//  */
// const mergeHead = (target, source) => {
//   for (let child = source.firstChild; child !== null; child = child.nextSibling) {
//     if (child.tagName === 'LINK' && child.getAttribute('rel') === 'stylesheet'
//       || child.tagName === 'SCRIPT'
//       || child.tagName === 'BASE') {
//       continue
//     }
//     target.appendChild(child.cloneNode())
//   }
//   // title doesn't seem to work with out this one
//   target.querySelector('title').innerHTML = source.querySelector('title').innerHTML
// }

/**
 * Loads another mobile-html page and replaces the content of this page.
 * @param {url} url to load
 * @return {promise}
 */
const load = url => getRemoteDocument(url).then(loadedDocument => {
  // mergeHead(document.head, loadedDocument.head)
  document.body.innerHTML = ''
  const header = loadedDocument.querySelector('header')
  document.body.appendChild(header)
  const sections = loadedDocument.querySelectorAll('section')
  for (let i = 0; i < sections.length; i++) {
    document.body.appendChild(sections[i])
  }
})


/**
 * Requests animation frame if it's available
 * @param {?OnSuccess} callback
 * @return {void}
 */
const requestAnimationFrameIfAvailable = callback => {
  if (window && window.requestAnimationFrame) {
    window.requestAnimationFrame(callback)
  } else {
    callback()
  }
}

/**
 * Loads another mobile-html page and replaces the content with the first section.
 * @param {url} url to load
 * @param {?long} delay in ms before attaching remaining sections
 * @param {?OnSuccess} firstSectionCallback after first section is attached
 * @param {?OnSuccess} callback after remaining sections are attached\
 * @return {void}
 */
const loadProgressively = (url, delay, firstSectionCallback, callback) => {
  getRemoteDocument(url).then(loadedDocument => {
    // mergeHead(document.head, loadedDocument.head)
    document.body.innerHTML = ''
    const header = loadedDocument.querySelector('header')
    document.body.appendChild(header)
    const sections = loadedDocument.querySelectorAll('section')
    if (sections.length > 0) {
      document.body.appendChild(sections[0])
    }
    requestAnimationFrameIfAvailable(() => {
      if (firstSectionCallback) {
        firstSectionCallback()
      }
      setTimeout(() => {
        for (let i = 1; i < sections.length; i++) {
          document.body.appendChild(sections[i])
        }
        requestAnimationFrameIfAvailable(() => {
          if (callback) {
            callback()
          }
        })
      }, delay || 100)
    })
  })
}

/**
 * Gets the Scroller object. Just for testing!
 * @return {{setScrollTop, scrollWithDecorOffset}}
 */
const getScroller = () => Scroller

export default {
  load,
  loadProgressively,
  setup,
  setTheme,
  setDimImages,
  setMargins,
  setScrollTop,
  setTextSizeAdjustmentPercentage,
  setEditButtons,
  setupTableEventHandling,
  getRevision,
  testing: {
    getScroller
  }
}