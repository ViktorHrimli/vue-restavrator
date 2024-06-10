const isLocallhost = ()=> window?.location?.hostname==='localhost'

function uploadScript(PIXEL_ID, track=true) {
	if (typeof(window)==='undefined' || isLocallhost()) return
	if (!PIXEL_ID) return

	!function(f,b,e,v,n,t,s)
	{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
	n.callMethod.apply(n,arguments):n.queue.push(arguments)};
	if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
	n.queue=[];t=b.createElement(e);t.async=!0;
	t.src=v;s=b.getElementsByTagName(e)[0];
	s.parentNode.insertBefore(t,s)}(window, document,'script',
	'https://connect.facebook.net/en_US/fbevents.js');
	fbq('init', PIXEL_ID);

	if (track) {
		fbq('track', 'PageView');
	}
}

function track(event, eventOptions={}) {
	if (isLocallhost()) {
		console.warn('pixel is disabled on locallhost')
		return
	}
	try {
		fbq('track', event, eventOptions)
	} catch(e){
		console.warn(e)
	}
}

function trackCustom(event, eventOptions={}) {
	if (isLocallhost()) {
		console.warn('pixel is disabled on locallhost')
		return
	}
	try {
		fbq('trackCustom', event, eventOptions)
	} catch(e){
		console.warn(e)
	}
}


export default defineNuxtPlugin(nuxtApp => {
	const metaPixelID = nuxtApp?.$config?.public?.FacebookPixelId
	uploadScript(metaPixelID, true)
	return {
		provide: {
			pixel: {
				track,
				trackCustom
			}
		}
	}
})
