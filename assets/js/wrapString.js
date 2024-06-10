const wrapElement = (word='', tag='div')=> `<${tag}><${tag}>${word}</${tag}></${tag}>`

const wrapText = (input, options) => {
	let formated =''

	const tag = options?.tag || 'span'


	const splited = input.split(' ')
	const taged = splited.map(word=>wrapElement(word, tag)).join(' ')

	formated = taged


	return formated
}


export default (nodeElement, selectNodes=false)=>{
	nodeElement.classList.add('wt-animation')
	nodeElement.innerHTML = wrapText(nodeElement.innerHTML)

	if (selectNodes) {
		return nodeElement.querySelectorAll('&>span>span')
	}
}