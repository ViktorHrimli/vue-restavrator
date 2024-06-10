<template>
	<teleport to="body">
		<div ref="modal">
			<transition name="wp">
				<div class="c-wp" v-show="isActive">
					<transition name="button">
						<div v-show="isActive" class="bg-button" @click.prevent="close"></div>
					</transition>
					<transition name="container">
						<div v-show="isActive" class="c-container">
							<div v-show="isActive" class="close-chevron" @click.prevent="close">
								<inline-svg width="100%" src="/icons/close.svg" />
							</div>
							<!-- <div class="swipe-dot"></div> -->
							<div class="modal-header" v-if="$slots.header">
								<slot name="header"/>
							</div>
							<div class="modal-content" v-if="$slots.default">
								<slot/>
							</div>
							<div class="modal-footer" v-if="$slots.footer">
								<slot name="footer">
									<!-- <ui-button @click.prevent="close" v-bind="footerCloseButton" /> -->
								</slot>
							</div>
						</div>
					</transition>
				</div>
			</transition>
		</div>
	</teleport>
</template>


<style scoped lang="scss">
	@use "./styles.scss";
</style>


<script setup>
	import inlineSvg from 'vue-inline-svg'

	const modal = ref(null)
	const isActive = ref(false)

	const open = () => {
		isActive.value = true

		fixBody()
	}
	const close = () => {
		isActive.value = false

		unlockBody()
	}

	const fixBody = () => {
		document.body.style.overflow='hidden'
		document.body.style.height='100%'
	}

	const unlockBody = () => {
		document.body.style.overflow=''
		document.body.style.height=''
	}

	const containerOptions = {
		size:'xs',
		paddingTop:'m',
		paddingBottom:'m',
	}

	const footerCloseButton ={
		content: 'Закрити',
		size:'s',
		color:'white',
		expand: true,
	}


	defineExpose({
		open,
		close,
		isActive,
		ref:modal,
	})
</script>
