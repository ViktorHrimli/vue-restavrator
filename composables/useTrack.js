export default (event, payload) => {
	try {
		useNuxtApp().$pixel.track(event, payload?.pixelPayload)
		useNuxtApp().$gtag.event(event, payload?.gaPayload)
	} catch (e) {
		console.error('Cant track',e)
	}
}