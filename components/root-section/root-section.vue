<template>
  <m-tag
		:tag="tag"
		v-bind="$attrs"

		:class="wrapperClassList"
		class="section-wp"
  >
		<div class="section-body"
			:class="bodyClasslist"
		>
			<slot name="header"/>

			<div class="section-container"
				:class="containerClassList"
			>
				<slot/>
			</div>

			<slot name="footer"/>

		</div>
  </m-tag>
</template>


<style scoped lang='scss'>
	// @use '@scss/modules/gutter';
	// @use '@scss/modules/container';

	@use './style.module.scss' with (
		$x-padding: 20px,
		$absorbSlug: abp,
		$sizeSlug: cw,
		$horizontalPaddingSlug: cp,
		$paddingTopSlug: pt,
		$paddingBottomSlug: pb,
		$marginTopSlug: mt,
		$marginBottomSlug: mb,
	);
</style>


<script>
export default {
  inheritAttrs: false
}
</script>

<script setup>
	import makeClassName from '@js/helpers/makeClassName'
	const PARAMS = {
		marginTopSlug: 'mt',
		marginBottomSlug: 'mb',
		paddingTopSlug: 'pt',
		paddingBottomSlug: 'pb',
		horizontalPaddingSlug: 'cp',
		sizeSlug: 'cw',
		absorbSlug: 'abp',
	}

	const props = defineProps({
		tag: {
			type: String,
			default:'section',
			validator: v => ['section','div','article','header','footer']
		},
		size: {
			type: String,
			default:'m',
			validator: s => ['borderless','xs','m'].includes(s)
		},
		paddingTop: {
			type: String,
			default: 'l',
			// validator: p => cssGutters.includes(p)
		},
		paddingBottom: {
			type: String,
			default:'i',
			// validator: p => cssGutters.includes(p)
		},
		marginTop: {
			type: String,
			// default:'i',
			// validator: p => cssGutters.includes(p)
		},
		marginBottom: {
			type: String,
			// default:'i',
			// validator: p => cssGutters.includes(p)
		},
		absorbPadding: {
			type: [Number, String],
			default: 0,
			// validator: ap => cssAbsorbs.includes(String(ap))
		},
		horizontalPadding: {
			type: Boolean,
			default: true,
		},
	})

	const wrapperClassList = [
		makeClassName(PARAMS.marginTopSlug, props.marginTop),
		makeClassName(PARAMS.marginBottomSlug, props.marginBottom),
		makeClassName(PARAMS.paddingTopSlug, props.paddingTop),
		makeClassName(PARAMS.paddingBottomSlug, props.paddingBottom),
		{[PARAMS.horizontalPaddingSlug]: props.horizontalPadding}
	]

	const bodyClasslist = [
		makeClassName(PARAMS.sizeSlug, props.size),
	]

	const containerClassList = [
		makeClassName(PARAMS.absorbSlug, props.absorbPadding)
	]
</script>