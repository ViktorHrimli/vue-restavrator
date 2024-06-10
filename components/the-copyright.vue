<template>
	<root-section
		padding-top="i"
		padding-bottom="i"
		class="c-wp"
	>
		<div class="content-container">
			<div class="component-copyright"><span v-html="showYear"/> @Restavrator_ua&nbsp;&trade;</div>
			<client-only>
				<a v-bind="waLink" class="c-link"><span class="before">розробка<br>та реклама</span><inline-svg src="/images/wyle.svg" fill="#2c5ee7" width="34px" /><span class="after">Wyle<br>agency</span></a>
			</client-only>
		</div>
	</root-section>
</template>

<style scoped lang="scss">
	@use '@scss/color';
	@use '@scss/helpers/media';

	.c-wp {
		background-color: #f7f7f7;
	}

	.content-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
		padding: 25px 0;
	}

	.component-copyright {
		color: color.$dark;
		font-size: 16px;
		line-height: 1.24;
		font-weight: 400;
	}

	.c-link {
		display: grid;
		align-items: center;
		justify-content: flex-start;
		grid-template-columns: auto auto auto;
		gap: .5em;
		text-decoration: none;
		color: #2c5ee7;
		color: color.$dark;
		font-size: 16px;
		vertical-align: baseline;
		line-height: 1em;

		&:hover {
			color: color.$accent;
		}
	}

	.c-link>span.before {
		text-align: right;
	}
	.c-link>span.before,
	.c-link>span.after {
		padding-top: 3px;
	}

	@include media.mobile() {
		.content-container {
			flex-direction: column-reverse;
		}
		.component-copyright {
			margin-top: 1em;
			opacity: .6;
		}
	}

</style>


<script setup>
	import inlineSvg from 'vue-inline-svg'
	const startYear = 2021

	const currentYear = computed(()=> {
		return new Date().getFullYear();
	})

	const showYear = computed(()=>{
		if (startYear<currentYear.value) {
			return `${startYear}&nbsp;—&nbsp;${currentYear.value}`;
		}

		return currentYear;
	})

	const waLink = computed(()=>{
		const domain = `wyle.agency`
		const utms = `utm_source=${location.hostname}&utm_medium=organic&utm_content=copyright&utm_page=${location.pathname}`
		const url = `https://${domain}?${utms}`

		return {
			target: 'blank',
			href: url
		}
	})
</script>
