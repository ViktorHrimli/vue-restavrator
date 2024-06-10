// https://developers.notion.com/reference/post-page
// https://developers.notion.com/reference/property-value-object#title-property-values

const useFilters = s => {
	if (typeof(s)=='string') {
		return s.replaceAll(',','')
	}

	return s
}

export const titleField = (content)=>{
	return { title: [{type: "text", text: { content: useFilters(content) }}] }
}

export const phoneNumberField = (content)=>{
	return {phone_number:useFilters(content)}
}

export const selectField = (content, params)=>{
	return {select: {name:useFilters(content), ...params}}
}

export const multiSelectField = (list)=>{
	const filtered = list.map(e=>{
		e.name = useFilters(e.name)
		return e
	})
	return {multi_select: filtered}
}