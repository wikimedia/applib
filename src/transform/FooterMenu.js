import './FooterMenu.css'
import CollectionUtilities from './CollectionUtilities'

/**
 * @typedef {function} FooterMenuItemClickCallback
 * @param {!Array.<string>} payload Important - should return empty array if no payload strings.
 * @return {void}
 */

/**
 * @typedef {number} MenuItemType
 */

/**
 * Type representing kinds of menu items.
 * @enum {MenuItemType}
 */
const MenuItemType = {
  languages: 1,
  lastEdited: 2,
  pageIssues: 3,
  disambiguation: 4,
  coordinate: 5,
  talkPage: 6
}

/**
 * Menu item model.
 */
class MenuItem {
  /**
   * MenuItem constructor.
   * @param {!string} title
   * @param {?string} subtitle
   * @param {!MenuItemType} itemType
   * @param {FooterMenuItemClickCallback} clickHandler
   */
  constructor(title, subtitle, itemType, clickHandler) {
    this.title = title
    this.subtitle = subtitle
    this.itemType = itemType
    this.clickHandler = clickHandler
    this.payload = []
  }

  /**
   * Returns icon CSS class for this menu item based on its type.
   * @return {!string}
   */
  iconClass() {
    switch (this.itemType) {
    case MenuItemType.languages:
      return 'pagelib_footer_menu_icon_languages'
    case MenuItemType.lastEdited:
      return 'pagelib_footer_menu_icon_last_edited'
    case MenuItemType.talkPage:
      return 'pagelib_footer_menu_icon_talk_page'
    case MenuItemType.pageIssues:
      return 'pagelib_footer_menu_icon_page_issues'
    case MenuItemType.disambiguation:
      return 'pagelib_footer_menu_icon_disambiguation'
    case MenuItemType.coordinate:
      return 'pagelib_footer_menu_icon_coordinate'
    default:
      return ''
    }
  }

  /**
   * Extracts array of page issues, disambiguation titles, etc from element.
   * @typedef {function} PayloadExtractor
   * @param {!Document} document
   * @param {?Element} element
   * @return {!Array.<string>} Return empty array if nothing is extracted
   */

  /**
   * Returns reference to function for extracting payload when this menu item is tapped.
   * @return {?PayloadExtractor}
   */
  payloadExtractor() {
    switch (this.itemType) {
    case MenuItemType.pageIssues:
      return CollectionUtilities.collectPageIssuesText
    case MenuItemType.disambiguation:
      // Adapt 'collectDisambiguationTitles' method signature to conform to PayloadExtractor type.
      return (_, element) => CollectionUtilities.collectDisambiguationTitles(element)
    default:
      return undefined
    }
  }
}

/**
 * Makes document fragment for a menu item.
 * @param {!MenuItem} menuItem
 * @param {!Document} document
 * @return {!DocumentFragment}
 */
const documentFragmentForMenuItem = (menuItem, document) => {
  const item = document.createElement('div')
  item.className = 'pagelib_footer_menu_item'

  const containerAnchor = document.createElement('a')
  containerAnchor.addEventListener('click', () => {
    menuItem.clickHandler(menuItem.payload)
  })

  item.appendChild(containerAnchor)

  if (menuItem.title) {
    const title = document.createElement('div')
    title.className = 'pagelib_footer_menu_item_title'
    title.innerText = menuItem.title
    containerAnchor.title = menuItem.title
    containerAnchor.appendChild(title)
  }

  if (menuItem.subtitle) {
    const subtitle = document.createElement('div')
    subtitle.className = 'pagelib_footer_menu_item_subtitle'
    subtitle.innerText = menuItem.subtitle
    containerAnchor.appendChild(subtitle)
  }

  const iconClass = menuItem.iconClass()
  if (iconClass) {
    item.classList.add(iconClass)
  }

  return document.createDocumentFragment().appendChild(item)
}

/**
 * Adds a MenuItem to a container.
 * @param {!MenuItem} menuItem
 * @param {!string} containerID
 * @param {!Document} document
 * @return {void}
 */
const addItem = (menuItem, containerID, document) => {
  document.getElementById(containerID).appendChild(
    documentFragmentForMenuItem(menuItem, document)
  )
}

/**
 * Conditionally adds a MenuItem to a container.
 * @param {!string} title
 * @param {!string} subtitle
 * @param {!MenuItemType} itemType
 * @param {!string} containerID
 * @param {FooterMenuItemClickCallback} clickHandler
 * @param {!Document} document
 * @return {void}
 */
const maybeAddItem = (title, subtitle, itemType, containerID, clickHandler, document) => {
  const item = new MenuItem(title, subtitle, itemType, clickHandler)

  // Items are not added if they have a payload extractor which fails to extract anything.
  const extractor = item.payloadExtractor()
  if (extractor) {
    item.payload = extractor(document, document.querySelector('section[data-mw-section-id="0"]'))
    if (item.payload.length === 0) {
      return
    }
  }

  addItem(item, containerID, document)
}

/**
 * Sets heading element string.
 * @param {!string} headingString
 * @param {!string} headingID
 * @param {!Document} document
 * @return {void}
 */
const setHeading = (headingString, headingID, document) => {
  const headingElement = document.getElementById(headingID)
  headingElement.innerText = headingString
  headingElement.title = headingString
}

export default {
  MenuItemType, // todo: rename to just ItemType?
  setHeading,
  maybeAddItem
}