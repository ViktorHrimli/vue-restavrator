import wrapString from "@js/wrapString"

export default (gsap)=> {
	return {
		name:"string",
		extendTimeline:false,
		defaults:{
			duration: 1,
			ease:"power4.out",
			stagger: 0.075,
		},
		effect: (target, config) => {
			const nodeTarget = target[0]
			const wrappedNodes = wrapString(nodeTarget, true)

			gsap.fromTo(wrappedNodes,
				{
					opacity:.4,
					y:'100%',
					rotationX: 100,
				},
				{
					opacity:1,
					y:'0%',
					rotationX: 0,
					...config
				},
			)

		}
	}
}