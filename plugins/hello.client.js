export default defineNuxtPlugin((NuxtApp) => {
  (function hello() {
		if(typeof(window)=='undefined') return;

		let ua = navigator.userAgent.toLowerCase();
		if (ua.indexOf('chrome') > -1 || ua.indexOf('firefox') > -1) {
			let args = [
				'%c %c  Site by wyle.agency. %c %c  https://wyle.agency  %c ',
				'background: #2C5EE7; border: 1px solid #2C5EE7; padding:5px 0; margin:3px 0 10px 0;',
				'background: #ffffff; border: 1px solid #2C5EE7; color: #2C5EE7; padding:5px 0; margin:3px 0 10px 0;',
				'background: #2C5EE7; border: 1px solid #2C5EE7; padding:5px 0; margin:3px 0 10px 0;',
				'background: #ffffff; border: 1px solid #2C5EE7; color: #2C5EE7; padding:5px 0; margin:3px 0 10px 0;',
				'background: #2C5EE7; border: 1px solid #2C5EE7; padding:5px 0; margin:3px 0 10px 0;',
			];

			window.console.log.apply(console, args);
		}
		else window.console.log('Розроблено у Вайл - https://wyle.agency');
	})();
})
