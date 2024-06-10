<template>
	<button v-bind="$attrs" type="button" class="c-button"><slot/></button>
</template>


<style scoped lang='scss'>
	@use '@scss/color';
	$size: 50px;

	.c-button {
		width: $size;
		height: $size;
		border-radius: 12px;
		border: none;
		padding: 5px;
		z-index: 33;
		transition: .15s ease;

		// background-color: color.$accent-lighten;
		color: color.$accent;
		stroke: color.$accent;
		cursor: pointer;

		&:hover {
			stroke: #fff;
			color: #fff;
			background-color: color.$accent;
		}
	}
</style>


<script setup>
</script>
