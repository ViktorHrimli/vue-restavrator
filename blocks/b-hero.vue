<template>
	<root-section v-bind="wp">
		<div class="c-body">
			<section class="c-content-section">
				<div class="c-content-wp">
					<ui-title class="the-title the-title-title" ref="titleAnimationRef" v-bind="theTitle"
						:content="title" v-if="title" />
					<div class="c-label-wp">
						<ui-title class="the-title the-label" ref="labelAnimationRef" v-bind="theTitle" :content="label"
							tag="div" v-if="label" />
						<adaptive-image class="the-scratch" src="/images/scratch-hero.png" alt="hero scratch"
							sizes="mobile:150px tablet:300px" width="100%" />
					</div>
					<ui-paragraph class="the-content" ref="contentAnimationRef" v-bind="theContent" v-if="content" />
					<ui-button class="the-button" v-bind="theButton" v-if="buttonText" @click="openModal" />
				</div>
			</section>
			<section class="c-media-section">
				<div class="el" ref="mediaCover"></div>
				<smart-media id="mediaEl" class="the-media-wp" v-bind="theMedia"
					@click.once="useTrackEvent('playVideo', { placement: 'hero', title: 'promo' })" />
			</section>
		</div>
	</root-section>
</template>

<style lang='scss'>
.c-media-section>.the-media-wp.video-wp,
.c-media-section>.the-media-wp.video-wp video {
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	z-index: 1;
	object-position: center;
	object-fit: cover;
}
</style>
<style scoped lang='scss'>
@use '@scss/style';
@use '@scss/helpers/media';
@use '@scss/modules/container';


$breakpoint: 760px;

@mixin desktop {
	@include media.from($breakpoint) {
		@content;
	}
}

@mixin mobile {
	@include media.to($breakpoint) {
		@content;
	}
}

.c-body {
	display: grid;
	grid-template-columns: 1fr;
	gap: 40px;
}

.c-content-section {
	align-self: center;
}

.c-content-wp {
	max-width: 560px;

	@include media.to($breakpoint) {
		// padding-left: 20px;
		padding-right: 20px;
	}

	@include media.to(1200px) {
		padding-left: 20px;
	}
}

.c-media-section {
	padding-top: 125%;
	position: relative;
	overflow: hidden;
	margin-left: 10px;
	margin-right: 10px;

	border-radius: style.$border-radius;
}

.c-media-section>.el {
	z-index: 33;
	position: absolute;
	pointer-events: none;
	width: 100%;
	height: 100%;
	background-color: rgb(241, 241, 241);
	bottom: 0;
	left: 0;
	transform-origin: center bottom;
}

.the-title {
	font-weight: 900;
	text-transform: uppercase;
}

.the-title-title {
	max-width: 540px;
}

.the-label {
	// margin-top: 1em;
}

.c-label-wp {
	margin-top: 1em;
	display: flex;
	align-items: center;
	white-space: nowrap;
}

.the-scratch {
	max-width: 298px;
	flex-shrink: 2;
	transform: translateY(-15%);
}

.the-content {
	margin-top: 1em;
}

.the-button {
	margin-top: 2em;
}


@include mobile {
	.c-body {
		margin-top: 15vw;
	}
}

@include desktop {
	.the-scratch {
		flex-shrink: 1;
	}

	.c-body {
		grid-template-columns: 1fr 1fr;
		gap: 40px;
	}

	.c-content-wp {
		margin-left: auto;
	}

	.c-media-section {
		margin: 0;
		border-radius: style.$border-radius 0px 0px style.$border-radius;
	}

	.the-content {
		margin-top: 5em;
	}

	.the-button {
		margin-top: 5em;
	}

	.c-content-section {
		margin-top: 6vh;
	}
}
</style>

<script setup>
const props = defineProps({
	title: [String, Array],
	label: String,
	content: [String, Array],
	buttonText: String,
	media: [Object, String]
})


const mediaCover = ref(null)
const titleAnimationRef = ref(null)
const labelAnimationRef = ref(null)
const contentAnimationRef = ref(null)

const animateMedia = () => {
	useGsap().fromTo(mediaCover.value,
		{
			scaleY: 1,
		},
		{
			scaleY: 0,
			duration: .75,
			ease: "power4.out",
		}
	)
	useGsap().fromTo('#mediaEl',
		{
			scale: 1.4,
		},
		{
			scale: 1,
			duration: 1.8,
			ease: "power2.out",
		}
	)
}

onMounted(() => {
	animateMedia()
	useGsap().effects.string(titleAnimationRef.value.component)
	useGsap().effects.string(labelAnimationRef.value.component, { delay: .35 })
	useGsap().effects.string(contentAnimationRef.value.paragraphsRef, { delay: .7 })
})


const wp = {
	size: 'borderless',
	horizontalPadding: false,
	paddingTop: 'i',
	paddingBottom: 'i',
}

const theTitle = {
	tag: 'h1',
	content: props.title,
	size: 'l',
	cropped: false,
}
const theContent = {
	content: props.content,
}

const theButton = {
	content: props.buttonText,
	expandOnMobile: true,
}

const theMedia = {
	...props.media,
	preload: 'metadata',
}


const openModal = () => {
	try {
		const { $bookingModal } = useNuxtApp()
		$bookingModal.value.open('hero')

		useGaTrack('openModal', {
			placement: 'hero',
			content: props.title,
			target: 'bookingModal'
		})
	} catch (e) {
		console.error('Помилка відкриття модального вікна')
	}
}
</script>