export default (gsap)=> {
	return {
		name:"counter",
		extendTimeline:true,
		defaults:{
			duration:0.5,
			ease:"power2.out",
			increment:1,
		},
		effect: (targets, config) => {
			let tl = gsap.timeline()
			let num = targets[0].innerText.replace(/\,/g,'')
			targets[0].innerText = num

			tl.to(targets, {
				duration:config.duration,
				innerText:config.end,
				ease:config.ease,
				modifiers:{
					innerText:function(innerText){
						return  gsap.utils.snap(config.increment, innerText).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
					}
				}
			},
			0)
			return tl
		}
	}
}