const _TOKEN_ = 'CJD4KHL6Mss5P3CtctgVuoP4Pwy1fc9htBysPS9U0vV'
const _URL_ = 'https://crm.sitniks.com/open-api/orders'
const _salesChannelId_ = 2721
const _statusId_ = 5421


class CRM {
	constructor(token, url) {
		this.token = _TOKEN_
		this.url = _URL_

		// return {
		// 	newLead: this.newLead
		// }
	}

	get bearerToken() {
		return `Bearer ${this.token}`
	}


	async newLead(userData={}, utmData={}) {
		const salesChannelId = _salesChannelId_ // Джерело замовлення - Сайт
		const statusId = _statusId_ // статус замовлення - Нове замовлення

		const client = this.getUserData(userData)
		const utm = this.getUtmData(utmData)

		const queryData = {
			client,
			utm,
			salesChannelId,
			statusId
		}


		return await this.send(queryData)
	}


	getUserData(data) {
		const userData = {}

		if (data?.fullname) userData.fullname = data?.fullname
		if (data?.phone) {
			userData.phone = data?.phone
		}
		if (data?.email) userData.email = data?.email

		return userData
	}

	getUtmData(data) {
		const utmData = {}

		if (data?.source) utmData.source = data?.source
		if (data?.medium) utmData.medium = data?.medium
		if (data?.campaign) utmData.campaign = data?.campaign
		if (data?.term) utmData.term = data?.term
		if (data?.content) utmData.content = data?.content

		return utmData
	}


	async send(body) {
		return await fetch(`https://api.restavrator.in.ua/?Authorization=${this.bearerToken}&redirect-url=${this.url}`, {
			method: 'POST',
			body: JSON.stringify(body),
		})
		.then(r=>r.json())
		.then(d=>d)
		.catch(e=>e)
	}
}

export default CRM