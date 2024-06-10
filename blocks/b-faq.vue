<template>
	<root-section>
		<block-title v-bind="theTitle"/>
		<div class="c-faq-container">
			<ui-faq
				class="theFAQ"
				v-bind="theFaq"
			/>
			<div class="faq-help">
				<ui-paragraph class="footer-content text-uppercase" v-bind="footerContent"/>
				<ui-button v-bind="footerButton" @click="openModal" />
			</div>
		</div>
	</root-section>
</template>


<style scoped lang='scss'>
	@use '@scss/style';
	@use '@scss/color';
	@use '@scss/helpers/media';
	@use '@scss/modules/container';

	.c-faq-container {

	}

	.faq-help {
		display: grid;
		align-items: center;
		grid-template-columns: 1fr;
		gap: 1.4em;
		color: #fff;
		background-color: #202020;
		border-radius: style.$border-radius;
		padding: 40px 20px 20px;
		margin-top: - style.$border-radius*1.4;
		z-index: 3;
		position: relative;
		border: 2px solid #fff;
	}

	@include media.mobile {
		.c-faq-container {
			@include container.absorb(50);
		}
	}
	@include media.from(760px) {
		.faq-help {
			grid-template-columns: 1fr auto;
			gap: 40px;
			padding: 3.449% 5.173%;
		}
	}
</style>


<script setup>
	const props = defineProps({
		title: String,
		footerContent: String,
		buttonText: String,
		content: Array,
	})
	const theTitle = {
		content: props.title
	}

	const theFaq = {
		content: props.content
	}

	const footerButton = {
		content: props.buttonText,
		color: 'yellow',
	}
	const footerContent = {
		content: props.footerContent
	}

	const openModal = ()=>{
		try {
			const { $bookingModal } = useNuxtApp()
			$bookingModal.value.open('faq-help')
			useGaTrack('openModal',{
				placement:'faq-help',
				target:'bookingModal',
			})
		} catch(e) {
			console.error('Помилка відкриття модального вікна')
		}
	}
</script>