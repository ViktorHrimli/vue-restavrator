<template>
	<component
		:is="theTitleComponent"
		class="c-title"
		ref="refComponent"

		:class="titleClassList"
	/>
</template>

<style scoped lang='scss'>
	.c-title {
		$mt: .69em*2;
		$mb: .65em;

		width: 100%;
		color: inherit;

		&.cropped {
			max-width: 810px;
		}

		&.mt {
			margin-top: $mt;
		}
		&.mb {
			margin-bottom: $mb;
		}
	}


</style>

<script setup>
import makeClassName from '@js/helpers/makeClassName'
import { filters, useFilters } from '~~/composables/useTextFilter'

const refComponent = ref(null)

const props = defineProps({
	tag: {
		type: String,
		default:'h2',
		validator: t => ['h1','h2','h3','h4','h5','h6','div'].includes(t)
	},
	content: [String, Number],
	size: {
		type: String,
		default:'xl',
	},
	cropped: {
		type: Boolean,
		default: true,
	},
	marginTop: Boolean,
	marginBottom: Boolean,
})


const theTitle = computed(()=> {
	return useFilters(filters, props.content)
})

const titleClassList = [
	makeClassName('fs-adaptive', props.size),
	{cropped:props.cropped},
	{mt: props.marginTop},
	{mb: props.marginBottom},
]

const theTitleComponent = () => h(props.tag, { innerHTML:theTitle.value })

defineExpose({component:refComponent})

</script>
