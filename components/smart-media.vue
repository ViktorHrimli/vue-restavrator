<template>
	<component ref="componentRef" :is="theComponent" v-bind="binding" />
</template>

<script>
	export default {
		inheritAttrs: true
	}
</script>

<script setup>
	import uiVideo from '@components/ui-video/ui-video.vue'
	import adaptiveImage from '@components/adaptive-image/adaptive-image.vue'

	const componentRef = ref(null)

	const props = defineProps({
		src: {
			type: String,
			required: true,
		},
		sizes: String,
	})

	const theComponent = computed(()=>{
		if (!props.src) return 'img'

		if (props.src?.endsWith('.mp4') || props.src?.endsWith('.mov')) {
			return uiVideo
		} else if (props.src?.endsWith('.gif')) {
			return 'img'
		} else {
			return adaptiveImage
		}
	})
	const binding = {
		alt:'img',
		...useAttrs(),
		...props,
	}
</script>