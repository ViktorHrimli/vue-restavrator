<template>
	<div class="input-wp">
		<input tabindex="0" class="c-checkbox" type="checkbox" :name="name" :id="theId"
			@change="changeValue"
			:value="value"
		/>
		<label :for="theId" class="c-label">
			<div class="checkbox-wp">
				<svg class="c-svg" width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path class="c-path" d="M2.33301 5.19222L5.66634 8.52555L12.333 1.85889" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</div>
			<div class="c-label-content">{{ label }}</div>
		</label>
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

	.c-checkbox {
		// visibility: hidden;
		width: 0px;
		height: 0px;
		// display: none;
		opacity: 0;
		font-size: 0;
		line-height: 0;

		&:focus~.c-label {
			color: color.$accent;
		}
	}

	.checkbox-wp {
		width: $line-height;
		height: $line-height;
		padding: .14em;
		flex-shrink: 0;
		position: relative;
		line-height: 0;

		&:after {
			content:'';
			transition: .35s cubic-bezier(.4,0,.2,1);
			border: 2px solid color.$accent;
			border-radius: .24em;
			width: 100%;
			height: 100%;
			position: absolute;
			z-index: 5;
			left: 0;
			top: 0;
		}
	}

	.c-svg {
		width: 100%;
		height: 100%;
		fill: transparent;
		stroke: color.$accent;
	}

	input:checked+.c-label .c-path {
		opacity: 1;
		stroke-dasharray: 20 20;
	}

	.c-path {
		stroke-dasharray: 0 20;
		opacity: 0;
		transition: stroke-dasharray .35s cubic-bezier(.4,0,.2,1), opacity .35s cubic-bezier(.4,0,.2,1);
	}

	.c-label {
		display: flex;
		align-items: flex-start;


		font-size: inherit;
		cursor: pointer;
		outline: none;

		&:hover,
		&:focus {
			color: color.$accent;
		}
	}

	.c-label-content {
		font-size: inherit;
		padding-left: .4em;
		line-height: 1.4em;
	}
</style>


<script setup>
	const $attrs = useAttrs()
	const emit = defineEmits(['update:modelValue'])
	const props = defineProps({
		label: String,
		name: String,
		checked: String,
		value: [String, Number, Array],
		modelValue: [Array, Boolean],
	})

	const isChecked = ref(null)

	const changeValue =({target:{value, checked}})=>{
		isChecked.value = checked
		if (Array.isArray(props.modelValue)) {
			if (checked) {
				props.modelValue.push(value)
			} else {
				const index = props.modelValue.indexOf(value)
				props.modelValue.splice(index, 1)
			}
			emit('update:modelValue', props.modelValue)
		} else {
			emit('update:modelValue', checked)
		}
	}


	const model = ref({
		get() {
			return props.modelValue
		},
		set(v) {
			console.log(v,"<<<v")
			emit('update:modelValue', v)
		}
	})


	const theId = computed(()=>{
		if ($attrs?.id) {
			return $attrs?.id
		}
		const rand = Math.random()
		const hash = rand.toString().slice(2,8)

		return `input-checkbox-${props.name}-${hash}`
	})
</script>