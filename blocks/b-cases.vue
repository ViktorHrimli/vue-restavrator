<template>
	<root-section>
		<div class="c-header fs-adaptive-l">
			<block-title class="theTitle" v-bind="theTitle"/>
			<!-- <div class="fw-900 c-cases-counter">01.</div> -->
		</div>
		<services-slider class="the-slider" v-bind="slider"/>
		<div class="c-footer">
			<ui-paragraph class="c-footer-content fs-fixed-s" v-bind="helpContent" />
			<div class="c-footer-links">
				<ui-button-icon class="c-instagram" :href="instagramLink" @click.once="trackContact('instagram')" target="blank" icon="instagram"/>
			</div>
		</div>
	</root-section>
</template>


<style scoped lang='scss'>
	@use '@scss/helpers/media';
	@use '@scss/modules/container';

	.c-header {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		// margin-bottom: 2.66666em;
	}

	.theTitle {
		// margin-bottom: 0;
	}

	.c-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 3em;
	}

	.c-footer-content {
		max-width: 330px;
	}
</style>


<script setup>
	import {instagramLink} from '@content/_contacts'

 const props = defineProps({
	title: String,
	content: String,
	instagram: String,
	list: Array,
 })


 const theTitle = {
	content: props.title,
 }

 const helpContent = {
	content: `${props.content} @${props.instagram}`,
 }

 const slider = {
	slides: props.list,
 }

 const trackContact  = (content='')=> useTrack('Contact', {
		gaPayload: {
			placement:'footer',
			content: content,
		}
	})
</script>