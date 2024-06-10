<template>
	<root-section v-bind="theRootSection">
		<slot name="header">
			<root-section padding-top="i" padding-bottom="i" :horizontal-padding="false" v-if="title">
				<block-title class="mb-s" v-bind="theBlockTitle"/>
			</root-section>
		</slot>
		<slot/>
	</root-section>
</template>

<script setup>
	const props = defineProps({
		title: String,
		rootSection: Object,
	})



	const theBlockTitle = {
		content: props.title,
		// marginBottom: true,
	}

	const theRootSection = {
		paddingTop:'xxl',
		paddingBottom:'i',
		// ...props?.rootSection,
	}
</script>