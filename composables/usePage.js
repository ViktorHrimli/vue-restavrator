import fs from 'fs'
import _FAKE_PAGES_ from '@content/_fakePages'

const getQueryPath = (str)=> {
	let path = str

	if (str.endsWith('/')) {
		path = path.slice(0, -1)
	}

	return path
}

const getTime = (path) =>{
	try {
		const t = fs.statSync(path)
		return t.mtimeMs
	} catch(e) {
		return null
	}
}

async function generateJSON(importFile, pageImport, fromDir, toDir, fi) {
	if (process.client) return

	if (!importFile || !pageImport) {
		console.error('Відсутній файл іморту')
		return
	}


	const JSfilePath = `.${importFile}`
	const JSONfilePath = '.'+importFile.replace(fromDir, toDir).replace(/.js$/g,'.json')

	const JSCT = getTime(JSfilePath)
	const JSONCT = getTime(JSONfilePath)

	if (JSONCT===null || JSONCT<JSCT) {
		const module = await pageImport()
		const $page = JSON.stringify(module.default)

		try {
			fs.writeFileSync(JSONfilePath, $page)
			console.log(`✅ WRITE: ${JSONfilePath}`)
			// location.reload()
		} catch(e) {
			console.error(e,"<<<e")
		}
	}
}

const findImport = (queryPath, imports) =>{
	const files = Object.keys(imports)

	const path = files.find(file=>{
		const preparedPath = file.replace(/(\d+.)|.js/gm,'').replace('/content','')
		return (queryPath===preparedPath)
	})

	if (path) {
		return {
			path,
			import:imports[path]
		}
	}
}


const writeFakePage = (page) => {
	if (process.client) return


	const pageJsonContent = JSON.stringify(page.data)

	const filepath = `./contentJSON${page.url}.json`

	try {
		fs.writeFileSync(filepath, pageJsonContent)
		console.log(`✅ WRITE: ${filepath}`)
	} catch(e) {
		console.error(e,"<<<e")
	}
}

const isFakePage = url => {
	return _FAKE_PAGES_.find(page=>page.url==url)
}

export default async (inputPath, params) => {

	const { $router, _useHead } = useNuxtApp()
	const routePath = (inputPath!=='/') ? inputPath : '/index'
	const queryPath = getQueryPath(routePath)
	const _isFakePage_ = isFakePage(routePath)

	const pages = import.meta.glob(['@content/**/*.js','!@content/.**/.**','!@content/_*',]);
	const fileImport = findImport(queryPath, pages)


	if (_isFakePage_) {
		writeFakePage(_isFakePage_)
	}

	if (fileImport) {
		generateJSON(fileImport.path, fileImport.import,'/content','/contentJSON', fileImport)
	}

	if (!fileImport && !_isFakePage_) {
		$router.push('/404')
	}

	const query = await useAsyncData(`page:${inputPath}`, ()=>queryContent().where({_path:{$eq: inputPath}}).findOne())


	const $page = query.data.value
	const queryError = query.error.value

	if (queryError) {
		console.error(queryError)
		$router.push('/404')
	}

	if ($page?.head) {
		// _useHead($page.head)
	}

	return $page
}
