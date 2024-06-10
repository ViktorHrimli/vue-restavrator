<template>
	<ui-title class="fw-900 text-uppercase c-bt" v-bind="theTitle" ref="theComponentRef"/>
</template>


<style scoped lang='scss'>
	.c-bt {
		margin-bottom: 2.66666em;
	}
</style>


<script setup>
	const theComponentRef = ref(null)
	const props = defineProps({
		content: String,
		animated: {
			type: Boolean,
			default: true,
		},
	})
	const theTitle = {
		content: props.content,
		size:'l',
	}

	onMounted(()=>{
		if (props.animated!=false) {
			useGsap().effects.string(theComponentRef?.value?.component,{
				scrollTrigger:{
					trigger: theComponentRef?.value?.component,
					start: 'top: 75%',
				}
			})
		}
	})
</script>