import brFilter from '@js/filters/brFilter'
import nbspFilter from '@js/filters/nbspFilter'
import hangingExcuseFilter from '@js/filters/hangingExcuseFilter'

export const filters = [
	brFilter,
	nbspFilter,
	hangingExcuseFilter,
]

export const useFilters = (filters, str) => {
	if (!filters || !str) return

	let filteredString = unref(str)

	filters.forEach(filter=> {
		if (typeof(filter)==='function') {
			filteredString = filter(filteredString)
		}
	})

	return filteredString
}