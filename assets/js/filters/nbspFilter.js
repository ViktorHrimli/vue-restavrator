export default (string)=> {
	const reg = /\\\//gmi
	return string.replace(reg,'&nbsp;')
}