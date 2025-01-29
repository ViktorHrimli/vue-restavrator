<template>
	<root-section>
		<ui-title tag="h2" class="fw-900 text-uppercase the-label" ref="animatedLabelRef" v-bind="theContent"
			v-if="content" />
		<div class="c-content-section">
			<section class="services-section" ref="servicesSectionRef">
				<block-title :animated="false" class="the-title" v-bind="theTitle" tag="h3" v-if="title" />
				<ul class="c-services-container">
					<li class="c-single-service" v-for="(service, si) in list" :key="si" ref="servicesRefs">
						<inline-svg v-if="service?.icon" class="ss-number" width="34px" height="34px"
							:src='iconSrc(service.icon)' />
						<ui-title v-else tag="div" class="ss-number fw-900" size="l" :content="useListNumber(si)" />
						<p class="ss-content" v-html="service?.content || service"></p>
					</li>
				</ul>
				<img class="c-scratch" src="/images/scratch-services.png" alt="scratch">
			</section>
			<section class="help-section">
				<img class="c-scratch-help" src="/images/scratch-services-help.jpg" alt="scratch">
				<div class="help-container">
					<div>
						<ui-title class="c-help-title fw-900" v-bind="theHelpTitle" />
						<ui-paragraph class="c-help-content fs-fixed-s" v-bind="theHelpContent" />
					</div>
					<ui-button v-bind="theHelpButton" @click="openModal" />
				</div>
			</section>
		</div>
	</root-section>
</template>


<style scoped lang='scss'>
@use '@scss/style';
@use '@scss/color';
@use '@scss/helpers/media';
@use '@scss/modules/container';

$card-padding: 5.173%;

.c-content-section {
	@include media.mobile {
		@include container.absorb(50);
	}
}

.ss-number {
	@include media.mobile {
		// font-size: 20px;
	}

	&>svg {
		width: 100%;
		width: 30px;
	}
}

::v-global(.ss-number *) {
	// fill: #000;
	stroke: #fff;
	stroke-width: 1.5px;
}

.the-label {
	margin-bottom: 2em;
}

.the-title {
	margin-bottom: 2em;
}

.services-section {
	color: #fff;
	border-radius: style.$border-radius;
	background-color: color.$accent;
	padding: $card-padding*2.4 $card-padding $card-padding*1.6;
	position: relative;
	z-index: 3;
	overflow: hidden;

	@include media.from-mobile {
		padding: $card-padding;
	}
}

.c-scratch {
	position: absolute;
	right: -5px;
	top: -4px;
	width: 34%;
	rotate: 270deg;
	max-width: 138px;
	z-index: 1;
	pointer-events: none;
	z-index: -1;

	@include media.mobile {
		transform: rotate(35deg);
		top: 10%;
		right: -15%;
	}
}

.c-services-container {
	display: grid;
	gap: 32px;
	grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));

	@include media.from-mobile {
		gap: 60px 20px;
	}
}

.c-single-service {

	@include media.mobile {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 1em;
		align-items: flex-start;
	}
}

.ss-content {

	font-size: 20px;
	align-self: center;

	@include media.from-mobile {
		font-size: 16px;
		margin-top: .625em;
		margin-top: 1.2em;
	}
}


.help-section {
	position: relative;
	background-color: color.$gray;
	border-radius: style.$border-radius;
	margin-top: - style.$border-radius * 2;
	padding-top: style.$border-radius;
	z-index: 1;
}

.c-scratch-help {
	position: absolute;
	left: 4%;
	top: -1%;
	width: 60%;
	z-index: -1;
	pointer-events: none;
}

.help-container {
	padding: $card-padding;
	margin-top: style.$border-radius;
	display: grid;

	grid-template-columns: 1fr;
	gap: 20px;

	align-items: center;

	@include media.from(700px) {
		grid-template-columns: 1fr auto;
		gap: 40px;
	}
}

.c-help-content {
	margin-top: 0.625em;
}
</style>


<script setup>
import inlineSvg from 'vue-inline-svg'

const servicesRefs = ref(null)
const servicesSectionRef = ref(null)
const animatedLabelRef = ref(null)

const props = defineProps({
	content: String,
	title: String,
	list: Array,
	helpTitle: String,
	helpContent: String,
	helpButton: Object,
})

onMounted(() => {
	useGsap().fromTo(servicesRefs.value,
		{
			y: '20px',
		},
		{
			y: '0px',
			duration: .7,
			ease: 'back.out(1.7)',
			stagger: 0.05,
			scrollTrigger: {
				once: true,
				trigger: servicesSectionRef.value,
				start: 'top 70%',
			}
		},
	)
	useGsap().effects.string(animatedLabelRef.value.component, {
		scrollTrigger: {
			trigger: animatedLabelRef.value.component,
			start: 'top: 75%',
		}
	})
})

const theContent = {
	content: props.content,
	size: 'xl',
	cropped: false,
}

const theTitle = {
	content: props.title,
	size: 'l',
}


const theHelpTitle = {
	content: props.helpTitle,
	size: 'l',
	tag: 'div',
}
const theHelpContent = {
	content: props.helpContent,
}

const theHelpButton = {
	...props.helpButton,
	color: 'dark',
}

const iconSrc = icon => `/icons/${icon}.svg`

const openModal = () => {
	try {
		const { $bookingModal } = useNuxtApp()
		$bookingModal.value.open('services-help')
		useGaTrack('openModal', {
			placement: 'services-help',
			content: props.content,
			target: 'bookingModal'
		})
	} catch (e) {
		console.error('Помилка відкриття модального вікна')
	}
}

</script>