<template>
	<div class="video-wp" :class="$attrs.class">
		<div v-if="!hideControls" class="buttons-area">
			<svg class="svg-timeline" viewBox="0 0 100 100" preserveAspectRatio="none">
				<circle class="timeline-path" :class="{isPlaying}" cx="50" cy="50" r="50" :style="styles" />
			</svg>
			<button v-show="!isPlaying" @click.prevent="play" type="button" aria-label="play video" class="c-button c-play">
				<svg class="button-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M4 11.9999V8.43989C4 4.01989 7.13 2.2099 10.96 4.4199L14.05 6.1999L17.14 7.9799C20.97 10.1899 20.97 13.8099 17.14 16.0199L14.05 17.7999L10.96 19.5799C7.13 21.7899 4 19.9799 4 15.5599V11.9999Z" stroke="#fff" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</button>

			<button v-show="isPlaying" @click.prevent="pause" type="button" aria-label="play video" class="c-button c-pause">
				<svg class="button-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M10.65 19.11V4.89C10.65 3.54 10.08 3 8.64 3H5.01C3.57 3 3 3.54 3 4.89V19.11C3 20.46 3.57 21 5.01 21H8.64C10.08 21 10.65 20.46 10.65 19.11Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M21 19.11V4.89C21 3.54 20.43 3 18.99 3H15.36C13.93 3 13.35 3.54 13.35 4.89V19.11C13.35 20.46 13.92 21 15.36 21H18.99C20.43 21 21 20.46 21 19.11Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</button>
		</div>
		<video @click.prevent="toggle" class="c-video" v-bind="theVideo" ref="video"></video>
	</div>
</template>


<style scoped lang='scss'>
	@use '@scss/color.scss';

	$accent-color: color.$accent;
	$button-color: #fff;
	$button-size: 44px;
	$timeline-color: #fff;

	.video-wp {
		width: 100%;
		display: inline-block;
		position: relative;
		line-height: 0;
		font-size: 0;
		background-color: $accent-color;
	}

	.c-video {
		width: 100%;
		position: relative;
		z-index: 1;
		cursor: pointer;
	}

	.svg-timeline {
		pointer-events: none;
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0px;
		top: 0px;
		z-index: 5;
		overflow: visible;
	}

	.timeline-path {
		fill: none;
		stroke: $timeline-color;
		stroke-dasharray: 0 320;
		overflow: visible;
		stroke-width: 6px;
		// transition: stroke-dasharray .12s ease;

		animation-name: timeline;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
		animation-play-state:paused;

		&.isPlaying {
			animation-play-state: running;
		}
	}

	@keyframes timeline {
		from {
			stroke-dasharray: 0 320;
		}
		to {
			stroke-dasharray: 320 320;
		}
	}

	.buttons-area {
		position: absolute;
		right: 4%;
		top: 4%;
		z-index: 3;
		width: $button-size;
		height: $button-size;
	}

	.c-button {
		padding: 8px;
		background-color: $accent-color;
		border: none;
		border-radius: 100%;
		width: 100%;
		height: 100%;
		z-index: 2;
		cursor: pointer;
	}

	.button-svg {
		width: 100%;
		height: 100%;
	}
</style>


<script>
	export default {
		inheritAttrs: true,
	}
</script>
<script setup>
	const props = defineProps({
		src: String,
		poster: String,
		url: String,
		autoplay: {
			type: Boolean,
			default: true,
		},
		loop: {
			type: Boolean,
			default: true,
		},
		muted: {
			type: Boolean,
			default: true,
		},
		controls: {
			type: Boolean,
			default: false,
		},
		defaultMuted: {
			type: Boolean,
			default: true,
		},
		playsInline: {
			type: Boolean,
			default: true,
		},
		hideControls: {
			type: Boolean,
			default: false,
		}
	})

	const video = ref(null)

	const theVideo = {
		poster: props.poster,
		src: props.src,
		autoplay: props.autoplay,
		loop: props.loop,
		muted: props.muted,
		playsInline: props.playsInline,
		controls: props.controls,
	}



	function toggle() {
		if (isPlaying.value) {
			return pause()
		}

		return play()
	}

	function play() {
		video?.value?.play()
	}

	function pause() {
		video?.value?.pause()
	}

	const isPlaying = ref(null)

	const animationDuration = ref('1.5s')

	const styles = ref({
		animationDuration,
	})

	const durationListener = ()=> animationDuration.value = `${video?.value?.duration}s`

	onMounted(()=>{
		isPlaying.value = !video?.value?.paused

		video.value.onpause = ()=>{isPlaying.value = false}
		video.value.onplay = ()=>{isPlaying.value = true}
		video.value.addEventListener('playing', durationListener)
		durationListener()
	})

	onBeforeUnmount(()=>{
		video.value.removeEventListener('playing', durationListener)
	})
</script>