<template>
	<root-section>
		<div class="c-container" ref="containerAnimationRef">
			<div class="section-media">
				<smart-media class="the-media" v-bind="theMedia" @click.once="useTrackEvent('playVideo', {placement:'feedbacks',title:'feedbacksMix'})" />
			</div>
			<div class="section-content">
				<div class="c-count fs-adaptive-xxl fw-900 "><span ref="counterRef" v-html="count"></span>+</div>
				<ui-paragraph class="c-content fs-adaptive-xl fw-900 text-uppercase" ref="contentAnimationRef" v-bind="theContent"/>
				<div class="content-footer">
					<ui-paragraph class="c-footer-content fs-fixed-s" v-bind="theFooterContent"/>
					<ui-button-icon class="c-instagram-button" target="blank" @click.once="trackContact('instagram')" :href="instagramLink" icon="instagram"/>
				</div>
			</div>
		</div>
	</root-section>
</template>


<style scoped lang='scss'>
	@use '@scss/style';
	@use '@scss/color';
	@use '@scss/helpers/media';
	@use '@scss/modules/container';

	.c-container {
		display: grid;
		grid-template-columns: 1fr;
		gap: 40px;
		align-items: center;
	}

	.section-media {
		border-radius: style.$border-radius;
		position: relative;
		overflow: hidden;
		padding-top: 125%;

		@include media.mobile {
			@include container.absorb(50);
			order: 1;
		}
	}
	.the-media,
	::v-global(.the-media video) {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}

	.c-count {
		color: color.$accent;
		line-height: 1;
	}

	.c-count+.c-content {
		margin-top: 1em;
	}


	.content-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 14.3%;
	}

	@include media.from(700px) {
		.c-container {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>


<script setup>
	import {instagramLink, instagram} from '@content/_contacts'

	const counterRef = ref(null)
	const containerAnimationRef = ref(null)
	const contentAnimationRef = ref(null)

	const props = defineProps({
		media: [Object, String],
		count: [Number, String],
		content: [String, Array],
		footerContent: String,
		instagram: String,
	})

	const theMedia = {
		...props.media,
		preload:'metadata',
	}

	const theContent = {
		content: props.content,
	}
	const theFooterContent = {
		content: props.footerContent,
	}

	const trackContact  = (content='')=> useTrack('Contact', {
		gaPayload: {
			placement:'footer',
			content: content,
		}
	})


	onMounted(()=>{
		const st = {
			once: true,
			trigger:containerAnimationRef.value,
			start: 'top: 70%',
		}
		useGsap().effects.string(contentAnimationRef.value.paragraphsRef,{
			scrollTrigger: {
				...st,
			},
			delay: .35,
		})
		useGsap().fromTo(counterRef.value.parentElement,
			{ opacity:0 },
			{
				opacity:1,
				scrollTrigger: {
					...st,
					onEnter: ()=> useGsap().effects.counter(counterRef.value,
						{
							end: props.count,
							ease:'expo.out',
							duration: 2,
						})
				}
			})
	})

</script>