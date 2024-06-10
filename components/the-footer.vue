<template>
	<div class="c-card up" id="footer">
		<root-section v-bind="wp">
			<div class="header-section">
				<div class="footer-content text-uppercase">
					{{ contacts.workingHours }}<br>
					<ui-link
						v-if="contacts.phone"
						v-bind="{
							content:contacts.phone,
							href:useGetTel(contacts.phone),
							color:'black',
							showArrow: false,
						}"
						@click.once="trackContact('phone')"
						class="fw-900 c-phone"
					/>
				</div>
				<nav class="footer-icons">
					<ui-button-icon class="footer-icon" target="blank" @click.once="trackContact('instagram')" :href="contacts.instagramLink" icon="instagram"/>
					<ui-button-icon class="footer-icon" target="blank" @click.once="trackContact('telegram')" :href="contacts.telegramLink" icon="telegram"/>
				</nav>
			</div>

			<div class="footer-section">
				<nav class="footer-menu">
					<ui-link
						v-for="(item, ii) in footerMenu"
						:key="ii"

						:content=item.content
						:href=item.href

						color="black"
						:showArrow=false

						class="menu-item"
					/>
				</nav>
				<div class="logo-wp">
					<img src="/images/logo.svg" alt="logo" width="100%">
				</div>
			</div>

		</root-section>
	</div>
</template>


<style scoped lang='scss'>
	@use '@scss/style';
	@use '@scss/color';
	@use '@scss/helpers/media';

	.c-card {
		border-radius: style.$border-radius;
		background-color: #fff;
		position: relative;
		z-index: 2;
		padding: 7.055% 0 4.055% 0;


		&.up {
			padding: style.$border-radius*2 0 style.$border-radius*2 0;
			margin-top: - style.$border-radius*2;
		}
	}


	.header-section {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.footer-section {
		margin-top: 10%;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}

	.footer-icons {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		line-height: 0;
	}

	.footer-icon+.footer-icon {
		margin-left: 1em;
	}


	.logo-wp {
		width: 40px;

		&>img {
			width: 100%;
		}
	}


	.footer-menu {
    display: inline-flex;
    align-items: flex-start;
    flex-flow: column;
    gap: 1.4em;
	}

	.menu-item {
		text-transform: uppercase;
		text-decoration: none;
		color: color.$dark;
	}

	.c-phone {
		margin-top: .3em;
	}


	@include media.from-mobile() {
		.c-card.up {
			padding: 7.055% 0 4.055% 0;
		}

		.footer-section {
			flex-flow: row-reverse;
		}

		.footer-menu {
			flex-flow: row;
			gap: 5em;
			margin-left: 40px;
		}
		.logo-wp {
			width: 20%;
			max-width: 170px;
		}
	}




</style>


<script setup>
	import contacts from '@content/_contacts'

	const wp = {
		paddingTop:'i',
		paddingBottom:'i',
	}

	const footerMenu = [
		{
			content:'faq',
			href:'#faq',
		},
		{
			content:'відгуки',
			href:'#feedbacks',
		},
		{
			content:'послуги',
			href:'#services',
		},
	]

	const trackContact  = (content='')=> useTrack('Contact', {
		gaPayload: {
			placement:'footer',
			content: content,
		}
	})
</script>