import { SectionUtilities } from '../../build/wpl_transform'
import assert from 'assert'
import domino from 'domino'

describe('SectionUtilities', () => {
  describe('.getSectionOffsets()', () => {
    it('no values', () => {
      const document = domino.createDocument(`<section data-mw-section-id="0" id="content_block_0">
          </section>
              <section data-mw-section-id="1">
                  <div class="pagelib_edit_section_header">
                      <h2 id="section1" class="pagelib_edit_section_title">Section 1</h2>
                  </div>
          </section>
          <section data-mw-section-id="2">
              <div class="pagelib_edit_section_header">
                  <h2 id="section2" class="pagelib_edit_section_title">Section 2</h2>
              </div>
              <section data-mw-section-id="4">
                  <div class="pagelib_edit_section_header">
                      <h3 id="section4" class="pagelib_edit_section_title">Section 4</h3>
                  </div>
              </section>
          </section>`)

      // TODO: use a better tool to extract yOffset, domino seems to no support it, maybe puppeteer?
      const expected = { sections: [
        { heading: 'Section 1', id: 1, yOffset: undefined },
        { heading: 'Section 2', id: 2, yOffset: undefined },
        { heading: 'Section 4', id: 4, yOffset: undefined },
      ] }
      assert.deepEqual(SectionUtilities.getSectionOffsets(document.body), expected)
    })
  })
})