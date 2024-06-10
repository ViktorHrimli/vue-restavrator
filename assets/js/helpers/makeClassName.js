/**
 * @param { string } prefix - class prefix
 * @param { string } value - sufix
 * @param { string } divider - divider of prefix and sufix
 */

export default (prefix, value, divider='-') => {
	if (prefix && value) {
		return `${prefix}${divider}${value}`
	}
}
