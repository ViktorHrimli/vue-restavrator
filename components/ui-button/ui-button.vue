<template>
	<m-tag v-bind="$attrs" :tag="theTag" :class="buttonClasslist" @click="onButtonClick" tabindex="0" class="c-button">
		<span class="c-border"></span>
		<span class="c-ripple">
			<span></span>
		</span>
		<span class="c-content">
			<inline-svg class="c-icon left" v-if="icon" :src="iconSrc" />
			<span :data-text="content">{{ content }}</span>
		</span>
		<!-- <div class="c-icon c-icon-right" v-if="icon || $slots.icon">
			<slot name="icon"/>
			<inlineSvg v-if="icon" class="svg-icon" :src="iconSrc" fill="transparent" stroke="inherit"/>
		</div> -->
	</m-tag>
</template>

<style scoped lang='scss'>
@use '@scss/mixins/bnwContrast';
@use 'sass:map';
@use '@scss/color.scss';
@use '@scss/helpers/media.scss';
@use '@scss/style';

$breakpoint: 480px;


$buttonSizes: (
);

@mixin setup-color($hexColor) {
	// stroke: bnwContrast.get-contrast($hexColor);
	// fill: bnwContrast.get-contrast($hexColor);

	// color: bnwContrast.get-contrast($hexColor);
	// background-color: $hexColor;
}


@mixin button {
	overflow: hidden;
	padding: .9em 2.3em;
	transform: translateZ(0);
	border-radius: 15px;
	font-weight: 900;
	line-height: 110%;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	text-transform: uppercase;
	transition: transform .3s;
	line-height: 1em;
}

@mixin active {}

@mixin focus($color) {}

@mixin hover($backgroundColor) {}

////////////////////////////////////

button,
a {
	cursor: pointer;
	background-color: transparent;
	border: none;
	padding: 0;
	line-height: 1;
	outline-offset: 2px;
	text-decoration: none;
}

button:disabled,
a:disabled {
	opacity: .75;
	cursor: default;
}

.c-button {
	@include button;
	--color: #{color.$accent-hover};
	--font-color: #fff;
	background-color: color.$accent;

	&:hover {
		transform: scaleX(1.02);
		transition: transform .6s cubic-bezier(.34, 5.56, .64, 1);

		& .c-ripple>span {
			border-radius: 0;
			transform: translateY(0);
			transition-duration: .5s, .9s;
		}

		& .c-content>span {
			transform: translateY(-110%);
		}
	}


	&.color-dark {
		--color: #{color.$accent-hover};
		--font-color: #fff;
		background-color: #333;
	}

	&.color-yellow {
		--color: #{color.$yellow};
		// --color: #{#{color.$accent-hover}};
		--font-color: #202020;
		// background-color: color.$yellow;
		background-color: #fff;
	}


	// @each $size, $d in $buttonSizes {
	// 	&.size-#{$size} {
	// 		// @include typo.size($size);
	// 	}
	// }

	// @each $key, $color in $colors {
	// 	&.color-#{$key} {
	// 		@include setup-color($color);
	// 		&:focus:not(:hover) {
	// 			@include focus(rgba(map.get($colors,$key), 50%));
	// 		}
	// 		&:hover {
	// 			@include hover(lighten(map.get($colors,$key), 5%));
	// 		}
	// 		&:active {
	// 			@include active;
	// 		}
	// 	}
	// }


	&:not(.as-link) {}

	&.expand {
		width: 100%;
	}

	@include media.to($breakpoint) {
		&.expand-m {
			width: 100%;
			flex-basis: 100%;
			flex-grow: 1;
			// padding-left: $padding;
			// padding-right: $padding;
		}
	}

	&>.c-ripple>span {}
}

.c-border {
	content: "";
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 1px;
	z-index: 3;
	border: 1px solid;
	border: none;
	border-radius: 15px;
}

.c-ripple {
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 1;
	overflow: hidden;
	transform: translateZ(0);
	border-radius: inherit;

	&>span {
		display: block;
		width: 100%;
		height: 100%;
		transform: translateY(101%);
		border-radius: 50% 50% 0 0;
		transition: transform .5s cubic-bezier(.4, 0, 0, 1), border-radius .5s cubic-bezier(.4, 0, 0, 1);
		background-color: var(--color);
	}
}

.c-content {
	position: relative;
	display: inline-grid;
	grid-auto-flow: column;
	align-items: center;
	text-align: center;
	overflow: hidden;
	z-index: 2;
	column-gap: .8em;
	// grid-template-columns: auto 1fr;
	// fill:var(--font-color);

	&>span {
		display: block;
		transition: transform .8s cubic-bezier(.16, 1, .3, 1);
		color: var(--font-color);
		padding-top: 0.2em;

		&:after {
			content: attr(data-text);
			display: block;
			position: absolute;
			top: 110%;
			left: 0;
			color: #fff;
			width: 100%;
			text-align: center;
			padding-top: 0.2em;
		}
	}
}





.c-icon {
	stroke: inherit;
	// fill: inherit;
	fill: #fff;
	width: 1.4em;
	height: 1.4em;
	line-height: 0;
}

.c-content {
	white-space: nowrap;
	word-break: keep-all;
}


.link-arrow {
	display: inline-block;
	will-change: transform;
	margin-left: 1em;
	transition: .3s ease;
}

.svg-icon {
	stroke: inherit;
	fill: transparent;
	position: relative;

	width: 1.667em;
	height: 1.667em;
	margin-left: -0.333em;
	margin-top: -0.333em;
}

.svg-icon::v-deep(path) {
	stroke: inherit;
}
</style>

<script setup>
import makeClassName from '@js/helpers/makeClassName'
import inlineSvg from 'vue-inline-svg'

const props = defineProps({
	// текст кнопки
	content: String,
	// SVG иконка
	icon: String,
	// Во всю ширину родительского блока
	expand: {
		type: Boolean,
		default: false,
	},
	// Во всю ширину только на мобильных устройствах
	expandOnMobile: {
		type: Boolean,
		default: false,
	},
	// размер кнопки
	size: {
		type: String,
		default: 'm',
		validator: (s) => ['xxs', 'xs', 's', 'm', 'l', 'xl'].includes(s)
	},
	color: {
		type: String,
		default: 'default',
	},
	to: {
		type: String,
	},
	href: {
		type: String,
	},
	showArrow: {
		type: Boolean,
		default: true,
	},
	arrow: {
		type: String,
		default: '&rarr;',
	},
})

const attrs = useAttrs()
const slots = useSlots()
const $router = useRouter()

const theTag = (attrs.href || props.to) ? 'a' : 'button'
const iconSrc = `/icons/${props.icon}.svg`

const onButtonClick = computed(() => {
	if (props.to) {
		return () => $router.push(props.to)
	}

	return attrs?.onClick
})

const buttonClasslist = [
	{ 'expand': props.expand },
	{ 'expand-m': props.expandOnMobile },
	makeClassName('fs-adaptive', props.size),
	makeClassName('color', props.color),
]
</script>
