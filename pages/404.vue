<template>
	<root-section padding-bottom="l">
		<ui-title
			content="Уууупссс..."
			size="xxl"
			tag="div"
		/>
		<ui-title
			content="Схоже цієї сторінки більше не існує."
			size="l"
			tag="div"
			class="mt-s"
		/>
		<ui-button
			content="На головну"
			to="/"

			class="mt-m"
		/>
	</root-section>
</template>

<script setup>
	useSeoMeta({
		title:'404',
	})
</script>