import glob from 'glob'
const files =  glob.sync('./content/**/*.js',{ignore:['./content/.**/.**','./content/_*']})

const arr = files.map(f=>{
	const path = f.replace('.js','').replace('./content','').replace(/\/\d+./g, '/')
	return path
})

export default arr
