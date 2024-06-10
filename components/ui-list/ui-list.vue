<template>
	<div class="list-wp">
		<ul
			:class="listClassList"
		>
			<li v-for="(content, ci) in content" class="cb-listing-item" :key="ci" v-html="content"></li>
		</ul>
	</div>
</template>


<style scoped lang='scss'>
	.list-wp {
		width: 100%;
	}
	ul {
		padding: 0;
		counter-reset: cb-listing-ol;
	}

	li, ol {
		position: relative;
		font-size: inherit;
		padding-left: 1.4em;
		line-height: 1.24em;

		&+& {
			margin-top: .44em;
		}
	}

	li:before {
		content:'—';
		position: absolute;
		left: 0;
		top: 0;
		font-size: inherit;
	}

	ol:before {
    counter-increment: cb-listing-ol;
    content: counter(cb-listing-ol) ".";
    display: inline-block;
    width: 2em;
    font-weight: 600;

		position: absolute;
		left: 0;
		top: 0;
	}
</style>


<script setup>
import makeClassName from "@js/helpers/makeClassName"

	const props = defineProps({
		size: {
			type: String,
			default: 'm',
		},
		content: [String, Array]
	})

	const listClassList = [
		makeClassName('fs-adaptive', props.size)
	]
</script>