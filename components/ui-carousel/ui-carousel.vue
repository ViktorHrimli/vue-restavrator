<template>
  <div class="vs-carousel">
    <div
      ref="vsWrapper"
      class="vs-carousel__wrapper"
    >
      <!-- @slot Slot for Slides -->
      <slot />
    </div>

    <!-- @slot Slot for Arrows -->
    <slot
      v-if="!hideArrows"
      name="arrows"
      :change-slide="changeSlide"
      :bound-left="boundLeft"
      :bound-right="boundRight"
    >
      <!-- <v-button
        v-if="hideArrowsOnBound ? !boundLeft : true"
        type="button"
        :aria-label="i18n.slideLeft"
        :disabled="boundLeft"
        class="
          vs-carousel__arrows
          vs-carousel__arrows--left
        "
        @click="changeSlide(-1)"
      >
				<v-svg class="c-svg" src="/images/arrow-left.svg"/>
			</v-button>

      <v-button
        v-show="hideArrowsOnBound ? !boundRight : true"
        type="button"
        :aria-label="i18n.slideRight"
        :disabled="boundRight"
        class="
          vs-carousel__arrows
          vs-carousel__arrows--right
        "
        @click="changeSlide(1)"
      ><v-svg class="c-svg" src="/images/arrow-right.svg"/></v-button> -->
    </slot>
  </div>
</template>

<style lang='scss'>
	@use '@scss/helpers/media';

	@mixin mobile {
		@include media.mobile {
			@content;
		}
	}
	@mixin desktop {
		@include media.from-mobile {
			@content;
		}
	}

	.vs-carousel {
		position: relative;
	}

.vs-carousel__wrapper {
	display: flex;
	overflow-x: scroll;
	overflow-y: hidden;
	scroll-snap-type: x mandatory;
	scroll-behavior: smooth;
	scrollbar-width: none;
	-webkit-overflow-scrolling: touch;
	-ms-overflow-style: none;
	list-style: none;
	margin: 0;

	@include media.mobile {
		padding: 0 10px;
		max-width: calc(100% + 40px);
    margin-left: -20px;
    margin-right: -20px;
	}
}

.vs-carousel__wrapper::-webkit-scrollbar {
	display: none;
}

.vs-carousel__slide {
	flex: 0 0 100%;
	height: 100%;
	scroll-snap-align: start;
	display: flex;
	justify-content: center;
	align-items: center;
	outline: none;
	flex-shrink: 0;

	@include media.from-mobile {
		scroll-snap-align: start;
	}
	@include media.mobile {
		scroll-snap-align: start;
	}
}

.vs-carousel__arrows {
	padding: 0;
	cursor: pointer;

	display: none;

	@include media.from-mobile {
		display: block;
	}
}

.vs-carousel__arrows:disabled {
	cursor: not-allowed;
}

.vs-carousel__arrows--left {
	left: 10px;
}

.vs-carousel__arrows--right {
	right: 10px;
}

</style>

<script>
import { onMounted, ref, onBeforeUnmount, watch } from 'vue'
import debounce from 'lodash/debounce'
import { approximatelyEqual, isClient } from './utils'
import vButton from './slider-button.vue'
import vSvg from 'vue-inline-svg'

const SCROLL_DEBOUNCE = 100
const RESIZE_DEBOUNCE = 410

const props = {
  /**
   * Disable arrows
   */
  hideArrows: {
    type: Boolean,
    default: false
  },
  /**
   * Disable arrows on bound
   */
  hideArrowsOnBound: {
    type: Boolean,
    default: false
  },
  /**
   * Custom tag
   */
  tag: {
    type: String,
    default: 'ul'
  },
  /**
   * Translations
   */
  i18n: {
    type: Object,
    default: () => ({ slideLeft: 'Slide left', slideRight: 'Slide right' }),
    validator: config => {
      const translations = ['slideLeft', 'slideRight']
      return translations.every(key => key in config)
    }
  }
}

export default {
  name: 'Carousel',
	components: {
		vButton,
		vSvg,
	},
	// emits: ['scroll'],
  props,
  setup(_, { emit }) {
    const vsWrapper = ref(null)
    const boundLeft = ref(true)
    const boundRight = ref(false)
    const slidesWidth = ref([])
    const wrapperScrollWidth = ref(0)
    const wrapperVisibleWidth = ref(0)
    const currentPage = ref(0)
    const currentPos = ref(0)
    const maxPages = ref(0)
    const onResizeFn = ref(null)
    const onScrollFn = ref(null)

    // Watchers
    watch(currentPage, (current, previous) => {
      if (current !== previous) {
        /**
         * Page changed
         * @event page
         * @type {Event}
         */
        emit('page', { current, previous })
      }
    })

    // Calculations
    const calcBounds = () => {
      // Find the closest point, with 5px approximate.
      const isBoundLeft = approximatelyEqual(currentPos.value, 0, 5)
      const isBoundRight = approximatelyEqual(
        wrapperScrollWidth.value - wrapperVisibleWidth.value,
        currentPos.value,
        5
      )

      if (isBoundLeft) {
        /**
         * Reach first item
         * @event bound-left
         * @type {Event}
         */
        emit('bound-left', true)
        boundLeft.value = true
      } else {
        boundLeft.value = false
      }

      if (isBoundRight) {
        /**
         * Reach last item
         * @event bound-right
         * @type {Event}
         */
        emit('bound-right', true)
        boundRight.value = true
      } else {
        boundRight.value = false
      }
    }
    const calcWrapperWidth = () => {
      wrapperScrollWidth.value = vsWrapper.value.scrollWidth
      wrapperVisibleWidth.value = vsWrapper.value.offsetWidth
    }
    const calcSlidesWidth = () => {
      const childNodes = [ ...vsWrapper.value.children ]

      slidesWidth.value = childNodes.map(node => ({
        offsetLeft: node.offsetLeft,
        width: node.offsetWidth
      }))
    }
    const calcNextWidth = direction => {
      const nextSlideIndex = direction > 0 ? currentPage.value : currentPage.value + direction
      const width = slidesWidth.value[nextSlideIndex].width || 0

      if (!width) {
        return
      }

      return width * direction
    }
    const calcCurrentPage = () => {
      const getCurrentPage = slidesWidth.value.findIndex(slide => {
        // Find the closest point, with 5px approximate.
        return approximatelyEqual(slide.offsetLeft, currentPos.value, 5)
      })

      if (getCurrentPage !== -1 && getCurrentPage !== -2) {
        currentPage.value = getCurrentPage || 0
      }
    }
    const calcCurrentPosition = () => {
      currentPos.value = vsWrapper.value.scrollLeft || 0
    }
    const calcMaxPages = () => {
      const maxPos = wrapperScrollWidth.value - wrapperVisibleWidth.value
      maxPages.value = slidesWidth.value.findIndex(({ offsetLeft }) => offsetLeft > maxPos) - 1
    }
    const calcOnInit = () => {
      if (!vsWrapper.value) {
        return
      }

      calcWrapperWidth()
      calcSlidesWidth()
      calcCurrentPosition()
      calcCurrentPage()
      calcBounds()
      calcMaxPages()
    }
    const calcOnScroll = () => {
      if (!vsWrapper.value) {
        return
      }

      calcCurrentPosition()
      calcCurrentPage()
      calcBounds()
    }

    const changeSlide = direction => {
      const nextSlideWidth = calcNextWidth(direction)

      if (nextSlideWidth) {
        vsWrapper.value.scrollBy({ left: nextSlideWidth, behavior: 'smooth' })
      }
    }

    onMounted(() => {
      calcOnInit()

      if (isClient) {
        // Assign to new variable and keep reference for removeEventListener (Avoid Memory Leaks)
        onScrollFn.value = debounce(calcOnScroll, SCROLL_DEBOUNCE)
        onResizeFn.value = debounce(calcOnInit, RESIZE_DEBOUNCE)

        // Events
        vsWrapper.value.addEventListener('scroll', onScrollFn.value)
        window.addEventListener('resize', onResizeFn.value)
      }
    })
    onBeforeUnmount(() => {
      if (isClient) {
        // Events
        vsWrapper.value.removeEventListener('scroll', onScrollFn.value)
        window.removeEventListener('resize', onResizeFn.value)
      }
    })
    return { boundLeft, boundRight, changeSlide, vsWrapper }
  }
}
</script>
