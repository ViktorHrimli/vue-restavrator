<template>
	<div
		class="input-group"
		:class="classList"
		:style="theStyles"
	>
		<slot/>
	</div>
</template>


<style scoped lang='scss'>

	$gap-v: .75em;
	$gap-h: .6em;

	.input-group+.input-group {
		margin-top: $gap-v;
	}
	.input-group {
		width: 100%;

		&.flow-inline {
			display: flex;
			flex-flow: row;
			&> ::v-deep(.input-wp~.input-wp)  {
				margin-left: $gap-h;
			}
		}

		&.flow-block {
			display: grid;
			grid-template-columns: 1fr;
			gap: $gap-v;
		}

		&.flow-cols {
			display: grid;
			gap: $gap-h;
		}

		// @for $i from 1 through 12 {
		// 	&[data-cols='#{$i}'] {
		// 		grid-template-columns: repeat($i, 1fr);
		// 	}
		// }
	}
</style>


<script setup>
	import makeClassName from '@js/helpers/makeClassName.js'

	const _FLOW_DELIMETR_ = '/'

	function isColsType(s) {
		return(s && s.indexOf(_FLOW_DELIMETR_)>=0)
	}

	const props = defineProps({
		flow: {
			type: String,
			default: 'block',
		},
		cols: {
			type: String,
		},
	})

	const flowType = unref(computed(()=> {
		if (isColsType(props.flow))  {
			return 'cols'
		}

		return props.flow
	}))

	const classList = [makeClassName('flow', flowType)]

	const makeGridFromFlow = (str) => {
		const cols = str.split(_FLOW_DELIMETR_)
		const maked = cols.map(c=> `${c}fr`)
		const template = maked.join(' ')

		return {
			gridTemplateColumns: template,
		}
	}

	const colsStyles = computed(()=> {
		if (flowType==='cols') {
			return makeGridFromFlow(props.flow)
		}

		return {}
	})

	const theStyles = colsStyles.value
</script>