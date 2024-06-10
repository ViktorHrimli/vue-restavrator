class utmManager {
	constructor() {
		this.storageKey = 'wa_utms'

		this.save()
	}


	get search() {
		if (typeof(window)==='undefined') return

		return window.location.search.split('?')[1] || null
	}

	get utms() {
		return this.getUtms()
	}

	get paramsPairs() {
		if (!this.search) return

		const pairs = {}

		new URLSearchParams(this.search).forEach((value,key)=>{
			pairs[key]=value
		})

		return pairs
	}

	getUtms() {
		const utms = {}
		if (!this.paramsPairs) return

		const keys = Object.keys(this.paramsPairs)
		const filteredKeys = keys.filter(k=>k.startsWith('utm_'))

		filteredKeys.forEach(k=>{
			utms[k] = this.paramsPairs[k]
		})

		return utms
	}


	getPairObject(str) {
		const pair = str.split('=')
		const pairKey = pair[0] || null
		const pairValue = pair[1] || null

		return {
			key: pairKey,
			value: pairValue
		}

	}

	save() {
		if (typeof(localStorage)==='undefined') return
		if (this.utms) {
			localStorage.setItem(this.storageKey, JSON.stringify(this.utms))
		}
	}

	clear() {
		if (typeof(localStorage)==='undefined') return
		localStorage.removeItem(this.storageKey)
	}

	get savedUtms() {
		if (typeof(localStorage)==='undefined') return
		const saved = localStorage.getItem(this.storageKey)
		if (saved!==undefined){
			return JSON.parse(saved)
		}
	}
}

export default defineNuxtPlugin((nuxtApp) => {
	const $manager = new utmManager()

	return {
		provide: {
			utmManager: $manager
		}
	}
})
