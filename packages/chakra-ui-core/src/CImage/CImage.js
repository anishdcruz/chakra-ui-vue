/**
 * Hey! Welcome to @chakra-ui/vue Image
 *
 * The CImage component is used to display images.
 *
 * CImage composes CBox so you can use all the style props and add responsive styles as well.
 *
 * @see Docs     https://vue.chakra-ui.com/image
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CImage/CImage.js
 */

import { baseProps } from '../config/props'
import CBox from '../CBox'
import CNoSsr from '../CNoSsr'
import { forwardProps } from '../utils'

/**
 * CImage component
 *
 * The CImage component is used to display images.
 *
 * @extends CButton
 * @see Docs https://vue.chakra-ui.com/image
 */
const CImage = {
  name: 'CImage',
  props: {
    ...baseProps,
    src: String,
    fallbackSrc: String,
    ignoreFalback: Boolean,
    htmlWidth: String,
    htmlHeight: String,
    size: [String, Number]
  },
  data () {
    return {
      image: undefined,
      hasLoaded: false
    }
  },
  created () {
    // Should only invoke window.Image in the browser.
    if (process.browser) {
      this.loadImage(this.src)
    }
  },
  methods: {
    loadImage (src) {
      const image = new window.Image()
      image.src = src

      image.onload = (event) => {
        this.hasLoaded = true
        this.$emit('load', event)
      }

      image.onError = (event) => {
        this.hasLoaded = false
        this.$emit('error', event)
      }
    }
  },
  render (h) {
    let imageProps
    if (this.ignoreFallback) {
      imageProps = { src: this.src }
    } else {
      imageProps = { src: this.hasLoaded ? this.src : this.fallbackSrc }
    }
    return h(CNoSsr, [
      h(CBox, {
        props: {
          as: 'img',
          w: this.size,
          h: this.size,
          ...forwardProps(this.$props)
        },
        domProps: {
          width: this.htmlWidth,
          height: this.htmlHeight
        },
        attrs: {
          ...imageProps,
          ...this.$attrs,
          'data-chakra-component': 'CImage'
        }
      })
    ])
  }
}

export default CImage
