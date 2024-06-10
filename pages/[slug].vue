<template>
	<div>
		<components-tree
			v-bind="tree"
		/>

		<the-booking-modal ref="bookingModal"/>
	</div>
</template>

<script setup>
	import { instagram } from '@content/_contacts'

	const $route = useRoute()
	const $page = await usePage($route?.path)

	useSeoMeta({
		ogImage:'/images/ogImage.jpg',
		ogImageWidth: 600,
		ogImageHeight: 600,
		ogImageType: 'image/jpeg',
		ogImageAlt: 'restavrator',

		twitterImage: '/images/ogTwitterImage.jpg',
		twitterImageWidth: 1200,
		twitterImageHeight: 675,
		twitterImageType: 'image/jpeg',
		twitterCard: 'summary_large_image',
		ogSiteName: `@${instagram}`,
		...$page?.head,

		htmlAttrs: {
			lang: 'uk'
		}
	})

	const tree = {
		components: $page?.body || [],
		dir:'blocks',
	}

	const bookingModal = ref(null)

	onMounted(()=>{
		useNuxtApp().$bookingModal = bookingModal
	})
</script>
