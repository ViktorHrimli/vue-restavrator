import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsapStringAnimation from '@js/gsapStringAnimation';
import gsapCounterAnimation from '@js/gsapCounterAnimation';

gsap.registerPlugin(ScrollTrigger);
gsap.registerEffect(gsapStringAnimation(gsap))
gsap.registerEffect(gsapCounterAnimation(gsap))

export default defineNuxtPlugin((nuxtApp)=>{

	return {
		provide: {
			gsap,
		}
	}
})