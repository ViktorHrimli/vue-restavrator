<template>
	<nuxt-layout>
		<NuxtPage />
	</nuxt-layout>
</template>

<style>

.page-enter-from{
  opacity: 0;
  transform: translateY(15px);
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.35s ease-in, transform 0.35s ease-out;
	transform-origin: center;
}
.page-enter,
.page-leave-to {
	transform: translateY(-15px);
  opacity: 0;
}

body.isLocked {
	overflow: hidden;
}
</style>
