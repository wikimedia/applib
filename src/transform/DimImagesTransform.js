import './DimImagesTransform.css'
const CLASS = 'pagelib_dim_images'

// todo: only require a Document
/**
 * @param {!Window} window
 * @param {!boolean} enable
 * @return {void}
 */
const dim = (window, enable) => {
  window.document.querySelector('html')
    .classList[enable ? 'add' : 'remove'](CLASS)
}

// todo: only require a Document
/**
 * @param {!Window} window
 * @return {boolean}
 */
const isDim = window => window.document.querySelector('html')
  .classList.contains(CLASS)

export default {
  CLASS,
  isDim,
  dim
}