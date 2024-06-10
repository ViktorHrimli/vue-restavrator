const _KV_DIVIDER_ = `: `
const _BR_ = `%0A`
const _DIVIDER_LINE_ = `-------------------------------------------`


const KAYAR = ['933954643:','AAFTlusG1EtNS5d6trn-','K0ArS7oOFzUPFag']
const KEY = KAYAR.join('')
const CHAT = '363529419'




function parseObjectRow(k,v) {
	let str;

	if (Array.isArray(v)) {
		str = parseArrayValue(v)
	} else {
		str = parseStringValue(v)
	}


	return `${makeBold(k)}${_KV_DIVIDER_}${str}`
}

const parseArrayValue = inbox => {
	return inbox.map(s=>`${_BR_}  · ${s}`).join('')
}
const parseStringValue = v => v


const makeBold = k => `*${k}*`




class Bot {
	constructor(KEY, CHAT) {
		this.rows = []
		this.KEY = KEY
		this.CHAT = CHAT
		this.PARSE_MODE = 'markdownv2'
	}

	get URL() {
		return `https://api.telegram.org/bot${this.KEY}/sendMessage?chat_id=${this.CHAT}&parse_mode=${this.PARSE_MODE}`
	}
	get parsedMessage () {
		return this.rows.map(s=>this.stripeRow(s)).join('')
	}
	setupTitle(str) {
		if (typeof(str)==='string') {
			this.rows.push(str)
			this.rows.push(_BR_)
			this.rows.push(_DIVIDER_LINE_)
		}
	}
	setupBody(body) {
		if (typeof(body)==='string') {
			this.rows.push(body)
		}
		if (typeof(body)==='object') {
			this.parseBodyObject(body)
		}
	}
	setupFooter(str) {
		if (typeof(str)==='string') {
			this.rows.push(_BR_)
			this.rows.push(_DIVIDER_LINE_)
			this.rows.push(_BR_)
			this.rows.push(str)
		}
	}
	setupOrigin() {
		this.rows.push(_BR_)
		this.rows.push(_BR_)
		this.rows.push(`🔗 ${location.origin}${location.pathname}`)
	}
	setupTags() {
		// this.rows.push(_BR_)
		// this.rows.push(`#${location.hostname}`)
	}

	stripeRow(str) {
		const regex1 = /(\[[^\][]*]\(http[^()]*\))|[_[\]()~>#+=|{}.!-]/gi
		const regex = /(\[[^\][]*]\(http[^()]*\))|[_[\]()~>#+=|{}.!-]/gi
		return str.replaceAll(regex, (x,y) => y ? y : '\\' + x)
	}
	parseBodyObject(inbox) {
		Object.keys(inbox).forEach(k=>{
			this.rows.push(_BR_)
			this.rows.push(parseObjectRow(k, inbox[k]))
		})
	}

	send(message, params) {

		if (params.title) {
			this.setupTitle(params.title)
		}
		if (message) {
			this.setupBody(message)
		}
		if (params.footer) {
			this.setupFooter(params.footer)
		}
		if (params.from!==false) {
			this.setupOrigin()
		}

		this.setupTags()


		return fetch(`${this.URL}&text=${this.parsedMessage}`)
	}
}

export default new Bot(KEY, CHAT)