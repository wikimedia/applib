
/**
 * Type representing article source endpoints.
 * @enum {ArticleRefSourceType}
 */
const ArticleRefSourceType = {
  mobileView: 1,
  mobileContentService: 2
}

/**
 * Display name for a given ArticleRefSourceType.
 * @param {!ArticleRefSourceType} type
 * @return {!string}
 */
const displayNameForArticleRefSourceType = type => {
  switch (type) {
  case ArticleRefSourceType.mobileView:
    return 'MV'
  case ArticleRefSourceType.mobileContentService:
    return 'MCS'
  default:
    return ''
  }
}

/**
 * Model for article data in ./articles.json
 */
class ArticleRef {
  /**
   * Constructor
   * @param {!string} lang
   * @param {!string} title
   * @param {!number} revision
   * @param {!ArticleRefSourceType} sourceType
   * @return {!object}
   */
  constructor(lang, title, revision, sourceType) {
    this.lang = lang
    this.title = title
    this.revision = revision
    this.sourceType = sourceType
  }

  /**
   * String which can be used to for serialization.
   * @return {!string}
   */
  fileName() {
    return `${this.lang}.${this.title}.${this.revision}.${
      displayNameForArticleRefSourceType(this.sourceType)
    }.json`
  }

  /**
   * String which can be used for display name.
   * @return {!string}
   */
  displayName() {
    return `${this.lang} > ${this.title} > ${displayNameForArticleRefSourceType(this.sourceType)}`
  }

  /**
   * URL string used to fetch JSON for this article revision.
   * @return {!string}
   */
  url() {
    switch (this.sourceType) {
    case ArticleRefSourceType.mobileView:
      return `https://${this.lang}.wikipedia.org/w/api.php?action=mobileview&page=${encodeURI(this.title)}&revision=${this.revision}&format=json&noheadings=true&prop=sections%7Ctext%7Clastmodified%7Clastmodifiedby%7Clanguagecount%7Cid%7Cprotection%7Ceditable%7Cdisplaytitle%7Cthumb%7Cdescription%7Cimage%7Crevision%7Cnamespace&sectionprop=toclevel%7Cline%7Canchor%7Clevel%7Cnumber%7Cfromtitle%7Cindex&sections=all&thumbwidth=640`
    case ArticleRefSourceType.mobileContentService:
      return `https://${this.lang}.m.wikipedia.org/api/rest_v1/page/mobile-sections/${encodeURI(this.title)}/${this.revision}`
    default:
      return ''
    }
  }

  /**
   * Extracts array of article sections from article JSON.
   * @param {!object} json
   * @return {!Array<object>}
   */
  sectionsArrayFromJSON(json) {
    switch (this.sourceType) {
    case ArticleRefSourceType.mobileView:
      return json.mobileview.sections
    case ArticleRefSourceType.mobileContentService:
      return [json.lead.sections[0]].concat(json.remaining.sections)
    default:
      return []
    }
  }

  /**
   * Fetch promise resolving to array of section JSON from local data file.
   * @param {!string} dataFilePath
   * @return {!Promise}
   */
  fetchSectionsJSON(dataFilePath) {
    return fetch(`${dataFilePath}${this.fileName()}`)
      .then(resp => resp.json())
      .then(json => this.sectionsArrayFromJSON(json))
  }
}

if (window.module) {
  module.exports = {
    ArticleRef,
    ArticleRefSourceType
  }
}
