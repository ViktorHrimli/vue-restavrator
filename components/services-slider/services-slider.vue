<template>
	<div class="c-slider-body">
		<!-- <ClientOnly fallback-tag="div" fallback="Завантажуємо приклади робіт..."> -->
			<ui-carousel class="c-carousel" hideArrowsOnBound @page="emitPage" :hideArrows="true" ref="theSlider">
				<Slide class="single-slide"
					v-for="(item, ii) in slides" :key="ii"
				>
					<div class="c-slide before">
						<smart-media class="slider-image" :src="item[0]" alt="item"
							sizes="mobile:350px tablet:560px"
							loading="lazy"
						/>
						<div class="slide-label fs-adaptive-l fw-900 text-uppercase">До</div>
					</div>
					<div class="c-slide after">
						<smart-media class="slider-image" :src="item[1]" alt="item"
							sizes="mobile:350px tablet:560px"
							loading="lazy"
						/>
						<div class="slide-label fs-adaptive-l fw-900 text-uppercase">Після</div>
					</div>
					<h3 class="slide-description fs-adaptive-l fw-900 text-uppercase" v-text="item[2]"></h3>
				</Slide>
			</ui-carousel>
		<!-- </ClientOnly> -->
		<div class="slider-footer">
			<button class="c-button" :disabled="theSlider?.boundLeft" @click="prev" aria-label="slide prev">
				<inline-svg src="/images/arrow-left.svg" />
			</button>
			<button class="c-button" :disabled="theSlider?.boundRight" @click="next" aria-label="slide next">
				<inline-svg src="/images/arrow-right.svg" />
			</button>
		</div>
	</div>
</template>

<style lang='scss'>
	.slider-image,
	.slider-image>img,
	.video-wp.slider-image,
	.video-wp.slider-image>video{
		object-fit: cover;
		object-position: center center;
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1;
	}
</style>

<style scoped lang='scss'>
	@use '@scss/style';
	@use '@scss/color';
	@use '@scss/mixins/cssSlider';
	@use '@scss/helpers/media';
	@use '@scss/modules/container';

	$breakpoint: 600px;
	$desktopPoint: 900px;

	.slider-container {
		position: relative;
		overflow: hidden;

		@include media.to($breakpoint) {
			@include container.absorb(100);
		}
	}

	.c-slides-row {
		display: flex;
		flex-wrap: nowrap;
		@include cssSlider.slider;

		@include media.to($breakpoint) {
			// padding:0 20px;
		}
	}

	.single-slide {
		display: grid;
		grid-template-columns: 1fr;
		gap: 10px;
		width: 100%;
		flex-basis: 100%;
		flex-shrink: 0;
		@include media.to($breakpoint) {
			padding-left: 10px;
			&:not(:first-child) {
				// margin-left: 5px;
			}
		}
	}

	.c-slide {
		position: relative;
		overflow: hidden;
		border-radius: style.$border-radius;
		padding-top: 85%;
		@include media.from($breakpoint) {
			padding-top: 100%;
		}
	}

	.slide-label {
		position: absolute;
    left: 0;
    right: 0;
    bottom: 7%;
    margin: 0 auto;
    text-align: center;
    z-index: 5;
    color: #fff;
		// padding: .14em .75em;
		// border-radius: 15px;
		// background-color: color.$accent;
	}

	.slide-description {
    color: inherit;
	margin-right: auto;
	margin-left: auto;

	@include media.from($breakpoint) {	
	// margin-right: -110px;
  	}	
	}

	.slider-footer {
		display: none;
		align-items: center;
		justify-content: space-between;
		margin-top: 3em;
	}

	.c-button {
		line-height: 0;
		font-size: 1em;
		background-color: transparent;
		border: none;
		padding: .2em;
		cursor:  pointer;

		&:hover {
			color: color.$accent
		}

		&:disabled {
			opacity: .6;
		}

		& * {
			transition: .25s ease;
			fill: #202020;
		}
		&:not(:disabled):hover * {
			fill: color.$accent;
		}
	}


	@include media.from($breakpoint) {
		.single-slide {
			grid-template-columns: 1fr 1fr;
			gap: 40px;
		}
		.slider-footer {
			display: flex;
		}
	}
</style>


<script setup>
	import inlineSvg from 'vue-inline-svg';
	import Slide from '@component/ui-carousel/slide';

	const props = defineProps({
		slides: Array,
	})

	const emit = defineEmits()

	const theSlider = ref()


	const prev = ()=> {
		theSlider.value.changeSlide(-1)
		theSlider.value.stopAutoSlide()
	}
	const next = ()=> {
		theSlider.value.changeSlide(1)
		theSlider.value.stopAutoSlide()
	}

	const emitPage = (e)=> {
		emit('page', e)
	}
</script>