// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'
import {sitemap} from './content/_fakePages'

export default defineNuxtConfig({
	target: 'static',
	telemetry: false,
	devServer: {
		host:'0.0.0.0',
	},
	experimental: {
		// inlineSSRStyles: false,
	},
	css: [
		'@css/reset.css',
		'@css/normalize.css',
		'@scss/bootstrap.scss',
		'@css/modules.css',
		'@css/font.css',
	],
	modules:[
    '@nuxt/content',
		'@nuxt/image',
		'nuxt-gtag',
		'@nuxtjs/sitemap',
		'@zadigetvoltaire/nuxt-gtm',
	],
	content: {
    sources: {
      content: {
        driver: 'fs',
        base: './contentJSON'
      },
		}
	},
	gtag: {
    id: 'G-YRNSPJZL62', // new
    // id: 'G-H29VRB4ZMY', // main
    // id: 'G-7TN2XSG1SM', // dev
		loadingStrategy:'async',
		initialConsent: true,
		config: {},
  },
	gtm: {
    id: 'GTM-MGD8RGWW'
	},
	site: {
    url: 'https://restavrator.in.ua',
  },
	sitemap: {
    exclude: [
      '/test',
    ],
		discoverImages: false,
  },
	runtimeConfig: {
		public: {
			FacebookPixelId:'3663593593776255',
		}
	},
	image: {
		provider: 'ipx',
		format: ['webp'],
		quality: 90,
		densities:[1,2],
		screens: {
			mobile: 480,
			tablet: 768,
			desktop: 1200,
		},
  },
	nitro:{
		prerender:{
			routes: sitemap,
			ignore:['/test'],
		},
	},
	app: {
		pageTransition: { name: 'page', mode: 'out-in', },
		head: {
			htmlAttrs: {
				lang:'uk',
			},
			title:'@Restavrator_ua',
			charset: "utf-8",
			meta: [
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{ name:"msapplication-TileColor", content:"#5225ef" },
				{ name:"msapplication-config", content:"/images/favicons/browserconfig.xml?v=1" },
				{ name:"theme-color", content:"#ffffff" },
			],
			link: [
				{rel:"apple-touch-icon", sizes:"180x180", href:"/images/favicons/apple-touch-icon.png?v=1"},
				{rel:"icon", type:"image/png", sizes:"32x32", href:"/images/favicons/favicon-32x32.png?v=1"},
				{rel:"icon", type:"image/png", sizes:"16x16", href:"/images/favicons/favicon-16x16.png?v=1"},
				{rel:"manifest", href:"/images/favicons/site.webmanifest?v=1"},
				{rel:"mask-icon", href:"/images/favicons/safari-pinned-tab.svg?v=1", color:"#5225ef"},
				{rel:"shortcut icon", href:"/images/favicons/favicon.ico?v=1"},
				{rel:"icon", type:"image/svg", href:"/images/favicons/favicon.ico?v=1"},
			],
		},
	},
	components: [
		'~/blocks',
		'~/components',
	],
	alias: {
		'@scss': fileURLToPath(new URL('./assets/scss', import.meta.url)),
		'@css': fileURLToPath(new URL('./assets/css', import.meta.url)),
		'@js': fileURLToPath(new URL('./assets/js', import.meta.url)),
		'@helpers': fileURLToPath(new URL('./assets/js/helpers', import.meta.url)),
		'@utils': fileURLToPath(new URL('./assets/js/utils', import.meta.url)),
		'@services': fileURLToPath(new URL('./services', import.meta.url)),

		'@props': fileURLToPath(new URL('./assets/props', import.meta.url)),

		'@component': fileURLToPath(new URL('./components', import.meta.url)),
		'@components': fileURLToPath(new URL('./components', import.meta.url)),
		'@composables': fileURLToPath(new URL('./composables', import.meta.url)),
		'@block': fileURLToPath(new URL('./blocks', import.meta.url)),
		'@content': fileURLToPath(new URL('./content', import.meta.url)),
		'@page': fileURLToPath(new URL('./pages', import.meta.url)),
  },
})