import referense from "./index";

const makeFakePage = (page) => {
	const data = JSON.parse(JSON.stringify(referense));
	data.body[0].props.title = page.title;

	return {
		url: page.url,
		data,
	};
};

const _PAGES_ = [
	// {
	// 	url:'/restavraciya-skoliv',
	// 	title:'Рестарація тріщин та сколів на плитці за декілька годин у&nbsp;вас вдома',
	// },
	// {
	// 	url:'/kompleksna-restavratsiia-prymishchennia',
	// 	title:'Відновимо пошкодження в приміщенні до або після продажу чи здачі в оренду',
	// },
	// {
	// 	url:'/restavraciya-propaliv',
	// 	title:'Усунемо пошкодження від пропалів на стільниці, підлозі та корпусних меблях',
	// },
	// {
	// 	url:'/vidnovlennya-lakofarbovogo-pokrittya',
	// 	title:'Відновлення лакофарбового покриття за кілька годин',
	// },
	// {
	// 	url:'/gliboka-restavraciya-poshkodzhen',
	// 	title:'Глибока реставрація пошкоджень інтер‘єру та екстер‘єру',
	// },
	// {
	// 	url:'/restavraciya-pislya-orendi-budinku',
	// 	title:'Комплексно відновимо пошкодження після оренди будинку',
	// },
	// {
	// 	url:'/restavratsiia-umyvalnykiv',
	// 	title:'Реставрація умивальників після пошкоджень, Усунемо сколи і тріщини',
	// },
	// {
	// 	url:'/remont-dvernih-korobok-ta-nalichnikiv',
	// 	title:'Відновимо дверні коробки та наличники за кілька годин у вас вдома не знімаючи їх',
	// },
	// {
	// 	url:'/restavratsiia-laminatu',
	// 	title:'Відновимо ламінат від опалів, царапин, тріщин, сколів, хімії, води, тощо..',
	// },
	// {
	// 	url:'/restavratsiia-dverej',
	// 	title:'Відновимо пошкоджені двері у вас вдома за кілька годин',
	// },
	// {
	// 	url:'/remont-plintusa',
	// 	title:'Проведемо ремонт плінтуса за кілька годин у вас вдома',
	// },
	// {
	// 	url:'/remont-laminatu',
	// 	title:'Відновимо ламінат у вас вдома за кілька годин',
	// },
];

export const sitemap = _PAGES_.map((p) => p.url);

export default _PAGES_.map((p) => makeFakePage(p));
