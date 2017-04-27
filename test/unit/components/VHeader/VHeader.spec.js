import Vue from 'vue'
import VHeader from '@/components/VHeader/VHeader'

describe('(Component VHeader)', () => {
  let vh

  beforeEach(() => {
    const Constructor = Vue.extend(VHeader)
    vh = new Constructor().$mount()
  })

  describe('Nav links', () => {
    it('Should render a Link to Home route', () => {
      //
    })
  })
})
