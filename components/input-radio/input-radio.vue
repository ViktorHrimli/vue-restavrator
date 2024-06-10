<template>
	<div class="input-wp">
		<input v-bind="$attrs" class="c-radio" type="radio" :name="name" :id="theId" @change="updateValue" />
		<div class="checkbox-wp" :class="{isChecked}"></div>
		<label :for="theId" class="c-label">{{ label }}</label>
	</div>
</template>


<style scoped lang='scss'>
	@use '@scss/color.scss';

	$line-height: 1.24em;

	.input-wp {
		display: flex;
		flex-flow: row;
		flex-wrap: nowrap;
		align-items: flex-start;
		justify-content: flex-start;

		transition: .15s ease;
	}

	.c-radio {
		width: 0px;
		height: 0px;
		opacity: 0;
		font-size: 0;
		line-height: 0;

		&:focus~.c-label {
			color: color.$accent;
		}

		&:checked ~ .checkbox-wp:after {
			opacity: 1;
			transform: scale(.74);
		}
	}

	.checkbox-wp {
		width: $line-height;
		height: $line-height;
		padding: .14em;
		flex-shrink: 0;
		position: relative;
		line-height: 0;

		border: 3px solid color.$accent;
		border-radius: 100%;

		&:after {
			content:'';
			transition: .35s cubic-bezier(.4,0,.2,1);
			border-radius: 100%;
			width: 100%;
			height: 100%;
			position: absolute;
			z-index: 5;
			left: 0;
			top: 0;
		}

		&:after {
			background-color: color.$accent;
			opacity: 0;
		}
	}

	.c-label {
		font-size: inherit;
		margin-left: .4em;
		line-height: $line-height;
		cursor: pointer;
		outline: none;

		&:hover,
		&:focus {
			color: color.$accent;
		}
	}
</style>

<script>
export default {
	inheritAttrs: false,
}
</script>
<script setup>
	const $attrs = useAttrs()
	const emit = defineEmits(['update:modelValue'])
	const props = defineProps({
		label: String,
		name: String,
		value: String,
	})

	const updateValue = (v)=>{
		emit('update:modelValue', props.value)
	}


	const isChecked = computed(()=>{

		return false
	})

	const theId = computed(()=>{
		if ($attrs?.id) {
			return $attrs?.id
		}
		const rand = Math.random()
		const hash = rand.toString().slice(2,8)

		return `input-radio-${props.name}-${hash}`
	})
</script>