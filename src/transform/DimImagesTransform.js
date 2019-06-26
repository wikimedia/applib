import './DimImagesTransform.css'
const CLASS = 'pagelib_dim_images'

/**
 * @param {!Document} document
 * @param {!boolean} enable
 * @return {void}
 */
const dimImages = (document, enable) => {
  document.querySelector('html').classList[enable ? 'add' : 'remove'](CLASS)
}

/**
 * @deprecated Use dimImages instead, which only requires a Document
 * @param {!Window} window
 * @param {!boolean} enable
 * @return {void}
 */
const dim = (window, enable) => dimImages(window.document, enable)

/**
 * @param {!Document} document
 * @return {boolean}
 */
const areImagesDimmed = document => document.querySelector('html').classList.contains(CLASS)

/**
 * @deprecated Use areImagesDimmed instead, which only requires a Document
 * @param {!Window} window
 * @return {boolean}
 */
const isDim = window => areImagesDimmed(window.document)

export default {
  CLASS,
  dim,
  isDim,
  dimImages,
  areImagesDimmed,
}