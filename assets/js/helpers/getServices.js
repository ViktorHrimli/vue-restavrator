export default str =>{
	const s = str?.map(s=>`${s}&nbsp∙ `)?.join('')
	return s?.substring(0, s.length - 2)
}