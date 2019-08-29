import assert from 'assert'
import domino from 'domino'
import fixtureIO from '../utilities/FixtureIO'
import pagelib from '../../build/wpl_transform'
import styleMocking from '../utilities/StyleMocking'

const maybeWidenImage = pagelib.WidenImage.maybeWidenImage
const shouldWidenImage = pagelib.WidenImage.test.shouldWidenImage
const widenAncestors = pagelib.WidenImage.test.widenAncestors
const updateExistingStyleValue = pagelib.WidenImage.test.updateExistingStyleValue
const ancestorsToWiden = pagelib.WidenImage.test.ancestorsToWiden
const widenElementByUpdatingStyles = pagelib.WidenImage.test.widenElementByUpdatingStyles
const widenElementByUpdatingExistingStyles =
  pagelib.WidenImage.test.widenElementByUpdatingExistingStyles

let document

describe('WidenImage', () => {
  beforeEach(() => {
    document = fixtureIO.documentFromFixtureFile('WidenImage.html')
  })

  describe('shouldWidenImage()', () => {
    it('should indicate image with usemap attribute not be widened', () => {
      assert.ok(!shouldWidenImage(document.getElementById('imageWithUsemap')))
    })

    it('should indicate image in div w/noresize class not be widened', () => {
      assert.ok(!shouldWidenImage(document.getElementById('imageInNoResizeDiv')))
    })

    it('should indicate image in div w/tsingle class not be widened', () => {
      // tsingle is often used for side-by-side images
      assert.ok(!shouldWidenImage(document.getElementById('imageInTSingleDiv')))
    })

    it('should indicate image in table not be widened', () => {
      assert.ok(!shouldWidenImage(document.getElementById('imageInTable')))
    })

    it('should indicate image nested in absolutely positioned div not be widened', () => {
      assert.ok(!shouldWidenImage(document.getElementById('imageNestedInAbsoluteDiv')))
    })

    it('should indicate two images from the fixture be widened', () => {
      const images = Array.from(document.getElementsByTagName('img')).filter(image =>
        shouldWidenImage(image) && image.classList.contains('imageWhichShouldWiden'))
      assert.ok(images.length === 2)
    })

    it('should indicate five images from the fixture not be widened', () => {
      const images = Array.from(document.getElementsByTagName('img')).filter(image =>
        !shouldWidenImage(image) && image.classList.contains('imageWhichShouldNotWiden'))
      assert.ok(images.length === 5)
    })
  })

  describe('maybeWidenImage()', () => {
    it('maybeWidenImage always has same return value as shouldWidenImage', () => {
      const images = Array.from(document.getElementsByTagName('img')).filter(image =>
        shouldWidenImage(image) === maybeWidenImage(image))
      assert.ok(images.length === 7)
    })

    it('widened image has pagelib_widen_image_override class added to its classList', () => {
      const image = document.querySelector('.imageWhichShouldWiden')
      maybeWidenImage(image)
      assert.ok(image.classList.contains('pagelib_widen_image_override'))
    })

    it('widened image ancestors make room for widened image', () => {
      const ancestors = Array.from(document.querySelectorAll('.widthConstrainedAncestor'))

      styleMocking.mockStylesInElements(ancestors, {
        width: '50%',
        maxWidth: '50%',
        float: 'right'
      })

      const image = document.getElementById('imageInWidthConstrainedAncestors')
      widenAncestors(image)

      // maybeWidenImage should have changed the style properties we manually set above.
      styleMocking.verifyStylesInElements(ancestors, {
        width: '100%',
        maxWidth: '100%',
        float: 'none'
      })
    })

    it('widening ancestors stops at content_block', () => {
      const body = document.getElementsByTagName('body')[0]
      styleMocking.mockStylesInElement(body, { width: '50%' })
      const image = document.getElementById('imageInWidthConstrainedAncestors')
      widenAncestors(image)
      // widenAncestors should have bailed at the content_block div, thus never reaching
      // the body element - so we can just check that the body element width has not changed.
      styleMocking.verifyStylesInElement(body, { width: '50%' })
    })

    it('two images from the fixture are actually widened', () => {
      const images = Array.from(document.getElementsByTagName('img')).filter(image =>
        maybeWidenImage(image) && image.classList.contains('pagelib_widen_image_override'))
      assert.ok(images.length === 2)
    })
  })

  describe('updateExistingStyleValue()', () => {
    it('updates existing style values', () => {
      const doc = domino.createDocument()
      const element = doc.createElement('div')
      styleMocking.mockStylesInElement(element, {
        width: '50%',
        maxWidth: '50%',
        float: 'right'
      })
      updateExistingStyleValue(element.style, 'width', '100%')
      updateExistingStyleValue(element.style, 'maxWidth', '25%')
      updateExistingStyleValue(element.style, 'float', 'left')
      styleMocking.verifyStylesInElement(element, {
        width: '100%',
        maxWidth: '25%',
        float: 'left'
      })
    })

    it('does not update unset style values', () => {
      const doc = domino.createDocument()
      const element = doc.createElement('div')
      element.style.width = ''
      element.style.float = ''
      updateExistingStyleValue(element.style, 'width', '100%')
      updateExistingStyleValue(element.style, 'float', 'left')
      updateExistingStyleValue(element.style, 'maxWidth', '25%')
      assert.equal(element.style.width, '')
      assert.equal(element.style.float, '')
      assert.equal(element.style.maxWidth, '')
    })
  })

  describe('ancestorsToWiden()', () => {
    it('ancestors which need widening for image inside width constrained elements', () => {
      const image = document.getElementById('imageInWidthConstrainedAncestors')
      const ancestors = ancestorsToWiden(image)
      assert.ok(ancestors.length === 3)
      assert.ok(ancestors[0].id === 'widthConstrainedAncestor1')
      assert.ok(ancestors[1].id === 'widthConstrainedAncestor2')
      assert.ok(ancestors[2].id === 'widthConstrainedAncestor3')
    })
  })

  describe('widenElementByUpdatingStyles()', () => {
    it('styles updated whether they exist or not', () => {
      const element = document.querySelector('#widthConstrainedAncestor1')
      assert.equal(element.style.width, '')
      assert.equal(element.style.height, '')
      styleMocking.mockStylesInElement(element, {
        maxWidth: '50%',
        float: 'right'
      })
      widenElementByUpdatingStyles(element)
      styleMocking.verifyStylesInElement(element, {
        width: '100%',
        height: 'auto',
        maxWidth: '100%',
        float: 'none'
      })
    })
  })

  describe('widenElementByUpdatingExistingStyles()', () => {
    it('only existing styles updated', () => {
      const element = document.querySelector('#widthConstrainedAncestor1')
      assert.equal(element.style.width, '')
      assert.equal(element.style.height, '')
      styleMocking.mockStylesInElement(element, {
        maxWidth: '50%',
        float: 'right'
      })
      widenElementByUpdatingExistingStyles(element)
      styleMocking.verifyStylesInElement(element, {
        width: '',
        height: '',
        maxWidth: '100%',
        float: 'none'
      })
    })
  })
})