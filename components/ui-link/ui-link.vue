<template>
	<a v-bind="$attrs" role="link" tabindex="0" class="c-link" :class="linkClasslist" @click="onClickAction">
		<div class="c-icon" v-if="icon || $slots.icon">
			<slot name="icon"/>
			<inlineSvg v-if="icon" class="svg-icon" :src="iconSrc" fill="transparent" stroke="inherit"/>
		</div>
		<span v-if="content || $slots.default" class="c-content">
			<slot>{{content}}<span class="link-arrow" v-if="showArrow" v-html="arrow"></span></slot>
		</span>
		<div class="c-icon" v-if="icon || $slots.icon">
			<slot name="icon"/>
			<inlineSvg v-if="icon" class="svg-icon" :src="iconSrc" fill="transparent" stroke="inherit"/>
		</div>
	</a>
</template>


<style scoped lang='scss'>
	@use '@scss/color';

	$animation-duration: .4s;

	.c-link {
		--accent: #{color.$accent};
    display: inline-flex;
    align-items: flex-start;
    justify-content: flex-start;
    line-height: 1;
    text-decoration: none;
    position: relative;
    flex-shrink: 1;
    // align-self: flex-start;
		cursor: pointer;

		outline:none;

		color: var(--accent);

		// overflow: hidden;

		&:after {
			content: '';
			left: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			height: .094em;
			min-height: 2px;
			background-color: var(--accent);
			position: absolute;
			z-index: 1;

			transition: transform $animation-duration, transform-origin 0s;
			transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
			transform: scaleX(0);
			transform-origin: right center;
		}

		&:hover:after,
		&:focus:after {
			transform: scaleX(1);
			transform-origin: left center;
		}
		&:hover>.c-content,
		&:focus>.c-content {
			transform: translateY(-.2em);
			transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		}


		&.color-black {
			--accent: #{color.$dark};
		}
	}

	.link-arrow {
		margin-left: .24em;
	}

	.c-content {
		z-index: 2;
		transform: translateY(0);
		transition-duration: $animation-duration;
		transition-timing-function: cubic-bezier(0.17, 0.71, 0.72, 0.95);
	}
</style>


<script setup>
	import makeClassName from '@js/helpers/makeClassName';
	import inlineSvg from 'vue-inline-svg'

	const $router = useRouter()
	const props = defineProps({
		content: String,
		icon: String,
		size: {
			type: String,
			default: 'm',
		},
		showArrow: {
			type: Boolean,
			default: true,
		},
		arrow: {
			type: String,
			default:'&#8599;',
		},
		to: String,
		color: {
			type: String,
			default:'accent',
			validator: c=> (['accent','black'].includes(c))
		}
	})

	const isActiveLink = computed(()=>$router.currentRoute.value.path===props.to)

	const iconSrc = `/icons/${props.icon}.svg`
	const linkClasslist = computed(()=>[
		makeClassName('fs-adaptive',props.size),
		makeClassName('color', props.color),
		{'is-current': isActiveLink.value},
	])


	const onClickAction = ()=>{
		if (props.to) {
			return  $router.push(props.to)
		}
	}
</script>