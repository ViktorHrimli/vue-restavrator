// https://developers.notion.com/reference/post-page
// https://developers.notion.com/reference/property-value-object#title-property-values

const _SK_ = 'secret_jjuwWfvKtYepnrK5wmxv0XlL6LbynX4L04kBmaScfJd'
const _DB_ = '14c1e9ee9a2c432f9dd8379e1ae6729c'


export default function (props) {
	const body = {
		parent: { database_id: _DB_ },
		properties: props,
	}
	return fetch(`https://notion-proxy.wyle.agency?body=${JSON.stringify(body)}&Auth=Bearer ${_SK_}&v=${Math.random()}`,{
		method:'GET',
		mode:'no-cors'
	})
}
