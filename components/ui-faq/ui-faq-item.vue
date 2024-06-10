<template>
	<div class="c-row"
		:class="{isActive}"
		@click.prevent="toggle"
	>
		<header class="c-header">
			<div class="c-counter fw-900 fs-adaptive-l">{{useListNumber(index)}}</div>
			<ui-title
				class="theTitle"
				v-bind="theQuestion"
			/>

			<icon-dropdown class="c-button" :active=isActive />
		</header>
		<div class="c-a"
			:style="answerStyles"

			ref="wpref"
		>
			<ui-paragraph
				class="c-content fs-fixed-s"
				:class="{isActive}"
				v-bind="theAnswer"
			/>
		</div>
	</div>
</template>


<style scoped lang='scss'>
	@use '@scss/style';
	@use '@scss/color';
	@use '@scss/helpers/media';

	$transition-duration: .3s;
	$transition-tf: cubic-bezier(0.46, 0.03, 0.52, 0.96);

	.c-row {
		width: 100%;
		color: color.$dark;
		background-color: color.$gray;
		border-radius: style.$border-radius;
		$pb:3.449%;
		padding: $pb 5.173%;
		padding-bottom: calc($pb + style.$border-radius);
		border: 2px solid #fff;

		&:not(:first-child) {
			margin-top: - style.$border-radius*1.4;
		}
		cursor: pointer;
	}

	.c-header {
		display: grid;
		grid-template-columns: 1.6em 1fr auto;
		align-content: center;
    align-items: center;
		gap: 20px;
	}

	.theTitle {
		padding: .75em 0;
		font-weight: normal;
	}

	.theTitle+.c-button {
		width: 24px;
		height: 24px;
	}

	.c-button {
		width: 1.24em;
		height: 1.24em;

		stroke-width: 2px;
	}

	.c-a {
		position: relative;
		overflow: hidden;
		transition: $transition-duration $transition-tf;
	}

	.c-content {
		padding-top: 3em;
		padding-bottom: .64em;
		transition: $transition-duration $transition-tf;

		transform: translateY(-2em);
		opacity: .3;
		&.isActive {
			transform: translateY(0);
			opacity: 1;
		}
	}



	@include media.mobile {
		.c-counter {
			font-size: 16px;
		}
		.c-header {
			gap: 10px;
		}
	}
</style>


<script setup>
	const props = defineProps({
		question: String,
		answer: [String, Array],
		index: Number,
	})

	const isActive = ref(false)
	const maxHeight = ref(0)
	const wpref = ref(null)

	function getContentHeight() {
		return wpref.value.firstChild.offsetHeight || 0
	}

	function toggle() {
		if (isActive.value) {
			maxHeight.value = `0px`
		} else {
			maxHeight.value = `${getContentHeight()}px`
			useTrackEvent('readFAQ', {placement:'faq',question: props?.question})
		}
		isActive.value = !isActive.value
	}

	const theQuestion = {
		content: props.question,
		size:'m',
		cropped: false,
		tag:'h4',
	}

	const theAnswer = {
		content: props.answer,
		size:'xs',
		cropped: true,
	}

	const answerStyles = computed(()=>{
		return {
			maxHeight: maxHeight.value,
		}
	})
</script>
