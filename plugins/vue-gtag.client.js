export default defineNuxtPlugin((nuxtApp) => {
	const { gtag } = useGtag()
	return {
		provide: {
			gtag:{
				event: (name, data={})=> gtag('event', name, data)
			}
		}
	}
})
