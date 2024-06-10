<template>
	<div class="icon-dropdown-wp icon-wp">
		<svg viewBox="0 0 20 20" class="icon-svg" :class="[directionCssClass, {active}]" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="3" y="10.071" class="icon-rect" width="10" height="10" transform="rotate(-45 3 10.071)" stroke-width="2"/>
		</svg>
	</div>
</template>

<script setup>
		const props = defineProps({
			active: Boolean,
			direction:{
				type: String,
				default:'down',
				validator(v) {
					return (['left','top','right','down'].indexOf(v));
				}
			},
		})

		const directionCssClass = computed(()=>{
			return `direction-${props.direction}`
		})
</script>

<style scoped="" lang="scss">
	$t: .25s ease;


	.icon-wp {
		width: 1em;
		position: relative;
		overflow: hidden;
		font-size: inherit;
		line-height: 0;
	}

	.icon-svg {
		width: 100%;
		height: 100%;
		position: relative;

		transition: transform $t;
	}

	.icon-rect {
		stroke: #000;
    	stroke-linecap: round;
    	stroke-dasharray: 40 40;
    	stroke-dashoffset: -20;

    	transition: stroke-dashoffset $t;
	}



	.direction-left {
		transform: translateX(15%);
	}
	button:focus .direction-left,
	.direction-left.active {
		transform: translateX(-15%);
	}


	.direction-top {
		stroke-dashoffset: 20;
		transform: translateY(15%);
	}
	button:focus .direction-top,
	.direction-top.active {
		// stroke-dashoffset: -20;
		transform: translateY(-15%);
	}


	.direction-right {
		transform: translateX(-15%);
	}
	.direction-right.active {
		transform: translateX(15%);
	}


	.direction-down {
		transform: translateY(-15%);
	}

	button:focus .direction-down,
	.direction-down.active {
		transform: translateY(15%);
	}


	button:focus .direction-down>.icon-rect,
	.direction-down.active>.icon-rect,
	.direction-top:not(.active)>.icon-rect {
    	stroke-dashoffset: 20;
	}
</style>