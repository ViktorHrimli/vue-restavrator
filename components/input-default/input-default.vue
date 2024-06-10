<template>
	<div class="c-wp">
		<input
			v-bind="$attrs"
			:type="type"
			:placeholder="title"
			class="c-input"

			:has-value="isHasValue"

			v-model="value"
			:name="name"
		>
		<label v-if="title" class="c-title">{{ title }}</label>
		<div class="el"></div>
	</div>
</template>


<style scoped lang='scss'>
	@use '@scss/color.scss';

	$label-font-size: .5em;

	.c-wp {
		display: flex;
		flex-flow: column;
		position: relative;
		overflow: visible;
		margin-top: $label-font-size;
	}

	.c-input {
		width: 100%;
		position: relative;
		line-height: 1.5em;

		border: none;
		border-radius: 0;
		outline: none;

		padding-left: 0;
		padding-left: 0;


		border-bottom: 2px solid color.$text-light;

		&::placeholder {
			color: color.$text;
			transition: .34s ease;
			line-height: 1em;
			padding: 0;
		}

		&::selection {
			color: #fff;
			background-color: #202020;
		}

		&:focus::placeholder {
			opacity: 0;
			transform: translateY(-100%);
		}
		&:focus ~ .c-title,
		&[has-value=true] ~ .c-title
		{
			transform: translateY(0%);
			opacity: 1;
		}
		&:focus ~ .el,
		&[has-value=true] ~ .el
		{
			transform: scaleX(1);
		}



		&[name="name"] {
			text-transform: capitalize;
		}
	}

	.c-title {
		position: absolute;
		bottom: 100%;
		left: 0;
		line-height: 1em;

		font-size: $label-font-size;
		color: color.$text-light;
		order: -1;

		opacity: 0;
		transform: translateY(50%);
		transition: .34s ease;
	}

	.el {
		width: 100%;
		height: 2px;
		position: absolute;
		left: 0;
		bottom: 0;
		transform: scaleX(0);
		background-color: #000;
		transition: .34s ease;
		transform-origin: left center;
	}
</style>

<script>
export default {
	inheritAttrs: false
}
</script>

<script setup>
	const emit = defineEmits(['update:modelValue'])
	const props = defineProps({
		title: String,
		name: String,
		type: {
			type: String,
			default:'text',
		},
		modelValue: String,
	})


	const value = computed({
		get() {
			return props.modelValue
		},
		set(value) {
			emit('update:modelValue', value)
		}
	})

	const isHasValue = computed(()=>{
		return value?.value?.length>0
	})
</script>