<template>
	<div class="c-container">
		<ui-faq-item
			v-for="(item, ii) in content"
			:key="ii"
			:index="ii"

			v-bind="item"
		/>
	</div>
</template>


<style scoped lang='scss'>
	.c-container {
		width: 100%;
		display: grid;
		grid-auto-flow: row;
		grid-template-columns: 1fr;
	}
</style>

<script setup>

	const props = defineProps({
		content: Array,
	})
</script>
