<template>
	<div class="c-wp" :class="wpClassList" v-bind="$attrs" ref="wrapperRef">
		<p
			v-for="(p,pi) in theContent"
			:key="pi"

			v-html="p"
			class="c-text"
			ref="paragraphsRef"
		></p>
	</div>
</template>

<script setup>
	import makeClassName from '@js/helpers/makeClassName'
	import { filters, useFilters } from '~~/composables/useTextFilter'

	const paragraphsRef = ref(null)
	const wrapperRef = ref(null)

	const	props = defineProps({
		content: [String, Array],
		size: {
			type: String,
			default:'m',
			// validator: s=>['xxs','xs','s','m','l'].includes(s)
		},
		cropped: {
			type: Boolean,
			default: false,
		}
	})

	const wpClassList = [
		makeClassName('fs-adaptive',props.size),
		{cropped: props.cropped},
	]

	const paragraphs = computed(()=>{
		if (Array.isArray(props.content)) {
			if (typeof(props.content[0])=='string') {
				return props.content
			}

			if (Object.keys(props.content[0]).length>0) {
				return props.content.map(c=>c.item)
			}
			return props.content
		}

		return [props.content]
	})

	const theContent = computed(()=> {
		if (filters) {
			const filteredParagraphs = []
			paragraphs.value.forEach(p=>{
				filteredParagraphs.push(useFilters(filters, p))
			})

			return filteredParagraphs
		}

		return paragraphs
	})

	defineExpose({
		paragraphsRef,
		wrapperRef,
	})
</script>

<style scoped lang="scss">
	@use '@scss/color';
	// $text-color: color.$text;
	$cropped-content-width: 825px;
	$sizes: (xxs,xs,s,m,l);


	.c-wp {
    width: 100%;
		color: inherit;
		line-height: 1.2em;

		&>p {
			font-size: inherit;
		}

		&.cropped {
			max-width: $cropped-content-width;
		}
	}

	.f-text-align-center>p {
		margin-left: auto;
		margin-right: auto;
	}

	.f-text-align-right>p {
		margin-left: auto;
		margin-right: 0;
	}

	.c-text~.c-text {
		margin-top: .8em;
	}

	.c-text {
		line-height: inherit;
		text-align: inherit;
    margin-right: auto;
		color: inherit;
	}
	::v-global(.c-text>mark) {
			background-color: color.$accent;
			color: #fff;
			padding: 0.25em 0.25em;
			border-radius: 2em;
		}
</style>
