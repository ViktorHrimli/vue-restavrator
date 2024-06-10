<template>
  <component
    v-for="(component, ci) in components"
    :key="ci"

    :is="makeComponent(component[slug])"
    v-bind="component[propsSlug]"
  />
</template>

<script setup>
	const props = defineProps({
		components:Array,
		slug: {
			type:String,
			default: 'component',
		},
		propsSlug: {
			type:String,
			default: 'props',
		},
		dir: {
			type:String,
		},
	})

	const makeComponent = (conponentSlug) =>{
		const component = defineAsyncComponent({
			loader: () => import(`./../${props.dir}/${conponentSlug}.vue`)
		})
		return component
	}
</script>
