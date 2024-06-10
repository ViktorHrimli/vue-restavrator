<template>
	<div class="div-cta-container">
		<button
			class="c-button"
			:class="{active}"

			@click="openModal"
			role="button"
		>
			<inline-svg
				src="/icons/message-question.svg"
			/>
			<div class="c-fb-row" :class="{active}" v-html="content"></div>
		</button>
	</div>
</template>


<style scoped lang='scss'>
	@use '@scss/color';

	.div-cta-container {
		position: fixed;
		bottom: 0;
		right: 0;
		display: flex;
		align-items: flex-end;

		pointer-events: none;
		z-index: 99;
		$p:10px;
		padding-right: $p;
		padding-bottom: $p;
	}

	.c-button {
		position: relative;
		z-index: 3;
		pointer-events: all;
		font-size: 14px;
		border-radius: 10px;
		padding: 1em 1em;
		fill: none;
		$color: #fff;
		stroke: $color;
		color: $color;
		stroke-width: 2px;
		border: 2px solid $color;
		background-color: color.$accent;
		margin: 0 auto;

		display: inline-grid;
    grid-auto-flow: column;
    align-items: center;
    text-align: center;
    column-gap: 0.8em;

		cursor: pointer;


		text-transform: uppercase;
		font-weight: 900;

		transform: translateY(150%);
		opacity: .4;

		$t: .5s;
		$tf: ease;
		transition: transform $t $tf, opacity .25s $tf, background-color .25s $tf;


		&>svg {
			width: 1.4em;
		}
		&>div {
			padding-top: .2em;
		}
		&:hover {
			background-color: color.$accent-hover;
		}
		&.active {
			transform: translateY(0%);
			opacity: 1;
		}
	}

	::v-global(.c-fb-row.active>span)  {
		animation: 5s ease infinite both anim;
		display: inline-block;
	}

	@for $i from 1 through 20 {
		::v-global(.c-fb-row>span:nth-child(#{$i}n)) {
			$d: .1s * $i;
			animation-delay: #{$d};
		}
	}

	@keyframes anim {
		0% {
			transform: translateY(-0%);
		}
		25% {
			transform: translateY(-25%);
		}
		40% {
			transform: translateY(-0%);
		}
		100% {
			transform: translateY(-0%);
		}
	}
</style>


<script setup>
	import throttleFN from '@js/helpers/throttle'
	import inlineSvg from 'vue-inline-svg'

	const contentString = 'Дізнатись вартість'
	const content = contentString.split('').map(s=>{
		if (s!==' ') {
			return `<span>${s}</span>`
		}

		return s
	}).join('')

	const openModal = ()=> {
		useNuxtApp().$bookingModal?.value?.open('float-button')
		useTrackEvent('openModal',{
			placement:'float-button',
			content: contentString,
			target:'bookingModal'
		})
	}


	const offsetTop = ref(150)
	const active = ref(false)

	function checkVisabitily() {
		const scrollToBottom =  document.body.scrollHeight - (window.scrollY + window.innerHeight)

		if (offsetTop.value<=window.scrollY && window.innerHeight < scrollToBottom) {
			return active.value = true
		}

		active.value = false
	}


	const throttled = throttleFN(checkVisabitily, 150)

	onMounted(()=>{
		window.addEventListener('scroll', throttled)
		throttled()
	})

	onBeforeUnmount(()=>{
		window.addEventListener(throttled)
		console.log('removed')
	})


</script>