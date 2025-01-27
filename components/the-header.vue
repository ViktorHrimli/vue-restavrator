<template>
	<header class="the-header">
		<div class="c-container">
			<div class="c-content-section">
				<a href="/" class="c-logo-wp c-ie">
					<img class="the-logo " src="/images/logo.svg" alt="restavrator logo" width="inherit">
				</a>
				<div class="c-contacts">
					<ui-button-icon class="c-instagram" target="blank" :href="telegramLink"
						@click.once="trackContact('telegram')" icon="telegram" />
					<!-- <ui-button-icon class="c-instagram" target="blank" :href="instagramLink" @click.once="trackContact('instagram')" icon="instagram"/> -->
					<ui-link :content="phone" :href="useGetTel(phone)" color="black" :show-arrow="false"
						@click.once="trackContact('phone')" />
				</div>
			</div>
		</div>
	</header>
</template>


<style scoped lang='scss'>
@use '@scss/style';
@use '@scss/color';
@use '@scss/helpers/media';

$breakpoint: 1340px;

.the-header {
	z-index: 99;
	// position: fixed;
	width: 100%;
	// top: 0;
	// left: 0;
}

.c-container {
	// width: 90%;
	max-width: 1160px;
	margin: 0 auto;
	padding: 20px;

	@media (max-width: 1200px) {
		padding-left: 20px 0;
	}
}

.c-content-section {
	display: flex;
	align-items: center;
	flex-wrap: nowrap;
	justify-content: space-between;
}

.c-logo-wp {}

.c-ie {
	// width: 30px;
	font-size: 0;
	line-height: 0;
}

.the-logo {
	width: 100%;
}

.c-contacts {
	display: grid;
	align-items: center;
	line-height: 0.9;
	gap: .8em;
	grid-template-columns: auto auto auto;
}



@include media.to($breakpoint) {

	.c-instagram,
	.c-ie {
		width: 32px;
	}

	// .c-container {
	// background-color: #fff;
	// $br: style.$border-radius - 5px;
	// border-radius: 0 0 $br $br;
	// $st: 2px solid color.$gray;
	// border-left: $st;
	// border-bottom: $st;
	// border-right: $st;
	// }
}

@include media.from($breakpoint) {
	.the-header {
		position: absolute;
		left: 0;
		top: 4vh;
	}

	.c-content-section {
		max-width: 560px;
	}

	.c-ie {
		width: 38px;
	}

	.c-logo-wp {
		width: 38px;
	}

	.c-container {
		padding: 0;
	}
}
</style>


<script setup>
import { instagramLink, phone, telegramLink } from '@content/_contacts'

const trackContact = (content = '') => useTrack('Contact', {
	gaPayload: {
		placement: 'footer',
		content: content,
	}
})
</script>