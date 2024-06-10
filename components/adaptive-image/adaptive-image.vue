<template>
	<nuxt-picture
		v-bind="theImage"
		class="c-img"
		@load="onloadEmit"
		ref="image"
	/>
</template>

<style scoped lang='scss'>
	.c-img {width:100%}
</style>

<script>
	export default {
		inheritAttrs: true,
	}
</script>
<script setup>
	const props = defineProps({
		src: String,
		preset: {
			type: String,
			default:'main',
		},
		sizes: {
			type: String,
			default: 'mobile:100vw tablet:100vw laptop:1340px desktop:1740px'
		},
		alt: String,
	})

	const emit = defineEmits(['load'])
	const onloadEmit = (e) => emit('load', e)
	const image = ref(null)

	const theImage = {
		src: props.src,
		// preset: props.preset,
		// placeholder: [4, 4 , 20],
		sizes: props.sizes,
		format: 'webp',
		legacyFormat:'jpeg',
		quality:90,
		// loading: 'eager',
		alt: props.alt || props.src
	}

	defineExpose({
		image,
	})
</script>