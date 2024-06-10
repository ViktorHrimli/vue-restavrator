<template>
	<fieldset class="c-fieldset">
		<legend class="c-title" v-if="title">{{ title }}</legend>
		<div class="c-body">
			<slot/>
		</div>
	</fieldset>
</template>


<style scoped lang='scss'>
	.c-fieldset {
		padding: 0;
		border: none;

		&~& {
			margin-top: 2em;
		}
	}
	.c-title {
		font-size: 1.24em;
		font-weight: bold;
		margin-bottom: .7em;
		line-height: 1.24em;
	}
	.c-body {}
</style>


<script setup>
const props = defineProps({
	title:String,
})
</script>