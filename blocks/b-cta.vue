<template>
	<root-section v-bind="wp">
		<div class="c-card" ref="containerRef">
			<smart-media sizes="mobile:150px tablet:450px" class="c-scratch left" src="/images/scratch-cta-left.jpg" alt="scratch" />
			<smart-media sizes="mobile:150px tablet:450px" class="c-scratch right" src="/images/scratch-cta-right.jpg" alt="scratch" />
			<div class="c-section">
				<ui-title class="text-uppercase fw-900" ref="titleAnimationRef" v-bind="theContent" v-if="content"/>
				<ui-button class="the-button" v-bind="theButton" v-if="buttonText" @click="openModal"/>
			</div>
		</div>
	</root-section>
</template>


<style scoped lang='scss'>
	@use '@scss/style';
	@use '@scss/color';
	@use '@scss/helpers/media';

	.c-card {
		background-color: color.$accent;
		color: #fff;
		border-radius: style.$border-radius;
		text-align: center;
		position: relative;
	}

	.c-section {
		max-width: 800px;
		margin: 0 auto;
		padding: 0 20px;
		padding-top: 7.055%;
		padding-bottom: calc(15% + (style.$border-radius * 2));
		z-index: 4;
		position: relative;
	}


	.the-button {
		margin-top: 2.4em;
	}

	.c-scratch {
		position: absolute;
		z-index: 1;
		pointer-events: none;
	}
	.c-scratch.left {
		max-width: 416px;
    width: 30%;
    left: -3%;
    bottom: 0%;
	}

	.c-scratch.right {
		max-width: 475px;
    width: 29%;
    right: 0;
    bottom: 10%;
	}


	@include media.mobile() {
		.c-section {
			padding-top: 14%;
			// padding-bottom: 7.055%;
		}

		.c-scratch.left {
			width: 44%;
		}
		.c-scratch.right {
			display: none;
		}
	}

	@include media.from-mobile() {
		.c-section {
			padding-bottom: calc(7.055% + (style.$border-radius * 2));
		}
		.the-button {
			margin-top: 4em;
		}
	}
</style>


<script setup>

	const titleAnimationRef = ref(null)
	const containerRef = ref(null)

	const props = defineProps({
		content: [String, Array],
		buttonText: String,
	})

	const wp = {
		size:'borderless',
		paddingBottom: 'i',
		horizontalPadding: false,
	}

	const theContent = {
		content: props.content,
	}

	const theButton = {
		content: props.buttonText,
		color:'yellow',
		expandOnMobile: true,
	}

	const openModal = ()=>{
		try {
			const { $bookingModal } = useNuxtApp()
			$bookingModal.value.open('cta')

			useGaTrack('openModal',{
				placement:'cta',
				content:props.content,
				target:'bookingModal'
			})
		} catch(e) {
			console.error('Помилка відкриття модального вікна')
		}
	}

	onMounted(()=>{
		useGsap().effects.string(titleAnimationRef.value.component,{
			scrollTrigger:{
				trigger: containerRef.value,
				start: 'top: 70%',
			}
		})
	})

</script>