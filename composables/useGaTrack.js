export default (event, payload) => {
	try {
		useNuxtApp().$gtag.event(event, payload)
	} catch (e) {
		console.error('Cant track',e)
	}
}