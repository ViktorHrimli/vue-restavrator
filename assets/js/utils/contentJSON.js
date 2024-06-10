export default function CustomHmr(path) {
	return {
		name: 'content-json',
		enforce: 'post',
		// HMR
		handleHotUpdate(data) {
			const file = data.file
			// const readed = import(file)
			console.log(data.read(),"<<<readed")

			// console.log(data.read().then(d=>console.log(JSON.parse(d))))
			// console.log(data,"<")
			// if (file.endsWith('.js')) {}
			// 	console.log(file,'reloading file...');

				// server.ws.send({
				// 	type: 'full-reload',
				// 	path,
				// });
		},
	}
}