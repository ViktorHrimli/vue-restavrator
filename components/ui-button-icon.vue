<template>
	<m-tag :tag="tag" v-bind="$attrs" class="c-button" aria-label="social link">
		<inline-svg
			:src="src"
			stroke-width="1.5px"

			class="c-svg"
		/>
	</m-tag>
</template>


<style scoped lang='scss'>
	@use '@scss/color';

	.c-button {
		$base: 38px;
		$p: 0px;
		$w: $base + $p*2;

		padding: $p;
		width: $w;
		height: $w;
		border-radius: 300px;
		margin: 0;
		background-color: transparent;
		font-size: 1em;
		line-height: 1em;
		display: flex;
    flex-shrink: 0;

		&:hover {
			// background-color: color.$gray;
			fill: color.$accent;
			::v-global(&>svg>path) {
				fill: color.$accent;
			}
		}
	}

	.c-svg {
		width: 100%;
		height: 100%;
		stroke-width: 1px;
	}

	.c-button,
	.c-svg>path {
		transition: .25s ease;
	}
</style>


<script setup>
	import inlineSvg from 'vue-inline-svg'

	const props = defineProps({
		icon: {
			type: String,
			required: true,
		},
		tag: {
			type: String,
			default:'a',
			validator: v=>['a','button'].includes(v)
		}
	})

	const src = `/icons/${props.icon}.svg`

</script>