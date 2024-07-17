import { makeBlock, makePage } from '../assets/js/utils/page'
import { instagram } from './_contacts'

const body = [
	makeBlock('hero',
		{
			title: 'Відновимо пошкоджені предмети у вас вдома за&nbsp;кілька годин',
			title: 'Зробимо непомітними опали, тріщини, сколи, подряпини – відновимо естетичний вигляд вашого житла',
			label: '+1 рік гарантії',
			content: 'Залиште заявку і ми безкоштовно порахуємо вартість реставрації без виїзду майстра',
			buttonText: 'Дізнатися вартість',
			media: {
				src:'/hero.mp4',
				poster:'/images/hero-poster.jpg',
				autoplay: true,
			}
		},
		{
			id:'hero',
		}
	),

	makeBlock('services',
		{
			content: 'Усунемо пошкодження інтер‘єру та екстер‘єру —&nbsp;відновимо візерунок, текстуру та колір',
			title: 'Зробимо непомітним:',
			list: [
				{ content:'Пошкодження стільниці', icon:'stop' },
				{ content:'Пошкодження на паркеті/ламінаті', icon:'grid-3' },
				{ content:'Опали від вогню', icon:'flame' },
				{ content:'Пошкодження фасадів корпусних меблів', icon:'element-1' },
				{ content:'Зайві отвори під час ремонту', icon:'graph' },
				{ content:'Пошкодження ванни та умивальника', icon:'moyka' },
				{ content:'Тріщини та&nbsp;сколи на плитці', icon:'picture-frame' },
				{ content:'Двері, коробка та лиштва', icon:'sidebar-left' },
				{ content:'Пошкодження від домашніх улюбленців', icon:'pet' },
				{ content:'Пошкодження від&nbsp;води', icon:'drop' },
			],
			helpTitle:'У вас унікальний випадок?',
			helpContent:'Залиште заявку на сайті і наші  менеджерки підкажуть чим ми можемо вам допомогти',
			helpButton: {
				content:'Задати питання',
				href:'/#fooo',
			}
		},
		{
			id:'services',
		}
	),
	makeBlock('cases',
		{
			title:'Зробили помітне непомітним',
			content:'Більше виконаних робіт у нас в&nbsp;Інстаграмі',
			instagram: instagram,
			list: [
				['/images/case/0.before.mp4','/images/case/0.after.jpg', 'Пошкодження на паркеті/ламінаті'],
				['/images/case/1.before.jpg','/images/case/1.after.jpg', 'Тріщини та сколи на плитці'],
				['/images/case/2.before.jpg','/images/case/2.after.jpg', 'Пошкодження фасадів корпусних меблів'],
				['/images/case/3.before.jpg','/images/case/3.after.jpg', 'Тріщини та сколи на плитці'],
				['/images/case/4.before.jpg','/images/case/4.after.jpg', 'Пошкодження від домашніх улюбленців'],
				['/images/case/5.before.jpg','/images/case/5.after.jpg', 'Опали від вогню'],
				['/images/case/6.before.jpg', '/images/case/6.after.jpg', 'Зайві отвори під час ремонту'],
				['/images/case/7.before.jpg', '/images/case/7.after.jpg', 'Пошкодження ванни та умивальника'],

				
			]
		},
		{
			id:'cases',
		}
	),
	makeBlock('advantages',
		{
			title:'Чому варто обрати&nbsp;нас?',
			content: [
				{
					title:'Зробимо реставрацію непомітною',
					content: 'Наші художники-реставратори зроблять все аби реставроване місце було непомітним. Відновлять колір, текстуру та візерунок.',
				},
				{
					title:'Надамо рік гарантії',
					content: 'Безкоштовно поправимо реставроване місце, якщо щось піде не так.',
				},
				{
					title:'Використовуємо довговічні матеріали',
					content: 'Реставроване місце не боїться зовнішньої взаємодії, прибирання чи неагресивної побутової хімії.',
				},
				{
					title:'Оплата по факту виконаної роботи',
					content: 'Менеджер узгодить з вами вартість реставрації <nobr>ще на етапі консультації.</nobr>',
				},
			]
		},
		{
			id:'advantages',
		}
	),
	makeBlock('feedbacks',
		{
			media: {
				src:'/feedbacks.mp4',
				muted: false,
				// controls: false,
				autoplay: false,
				loop: false,
				poster:'/images/case/1.before.jpg'
			},
			count: 3000,
			content: 'виконаних реставрацій та понад 500 відгуків',
			footerContent: `Більше відгуків у нас в Інстаграмі//@${instagram}`,
		},
		{
			id:'feedbacks',
		}
	),
	makeBlock('faq',
		{
			title:'Відповіді на часті запитання',
			footerContent:'Якщо не знайшли відповідь на своє запитання —&nbsp;задайте його нашому менеджеру.',
			buttonText: 'Запитати менеджера',
			content: [
				{
					question: 'Чи буде видно реставроване місце?',
					answer: [
						'Ми робимо все, щоб реставрація була максимально непомітною.',
						'Якщо є ризик, що реставрацію “буде видно” ми чесно попередимо про це ще на етапі консультації - до початку будь-яких робіт.',
					]
				},
				{
					question: 'Відреставроване місце не зітреться, можна використовувати хімію?',
					answer: [
						'Покриття служитиме довго - ви можете прибирати як звикли. Ми використовуємо лише високоякісні та спеціалізовані матеріали а реставрацію виконує професійний майстер. А ще ми надаємо один рік гарантії',
					]
				},
				{
					question: 'Ви надаєте гарантію?',
					answer: [
						'Ми впевнені у своїй роботуі, тому надаємо <b>рік гарантії</b>. Наші професійні майстри використовують лише <b>високоякісні та спеціалізовані матеріали</b> для реставрації тож ми впевнені у результаті.',
					]
				},
				{
					question: 'Скільки часу займає реставрація?',
					answer: [
						'Час на реставрацію залежить від розміру пошкодження та матеріалу. Зазвичай це 30хв - 3 год. На етапі консультації ми повідомимо скільки часу може зайняти відновлення.',
					]
				},
				{
					question: 'Чи потрібно демонтувати / вивозити речі?',
					answer: [
						'Ні - ми проводимо реставрацію на місці. Це економить ваш час та кошти',
					]
				},
				{
					question: 'Дешевше купити нове чи реставрувати?',
					answer: [
						'Якщо порахувати також час та супутні витрати то частіше все ж дешевше відновити. Коли мова ведеться про рідкісні, дорогі, дорогі вашій пам‘яті речі - дешевше відновити. Проте справді бувають вападки, коли дешевше замінити зіпсований об‘єкт ніж реставрувати його.',
					]
				},
				{
					question: 'Як відбувається розрахунок?',
					answer: [
						'Ви оплачуєте послугу по факту її виконання на рахунок ФЛП.',
					]
				},
			]
		},
		{
			id:'faq',
		}
	),
	makeBlock('cta',
		{
			content: 'Залиште свої контакти на сайті і&nbsp;ми безкоштовно оцінимо вартість реставрації без виїзду&nbsp;майстра',
			buttonText: 'Дізнатись вартість',
		},
		{
			id:'cta',
		}
	),
]

export default makePage(
	{
		title:'Зробимо непомітними опали, тріщини, сколи, подряпини – відновимо естетичний вигляд вашого житла. Надамо рік гарантії 🛡️',
		description: 'Усунемо пошкодження інтер‘єру та екстер‘єру — відновимо візерунок, текстуру та колір.',
		ogTitle: 'Зробимо непомітними опали, тріщини, сколи, подряпини – відновимо естетичний вигляд вашого житла. Надамо рік гарантії 🛡️',
		ogDescription: '👌 Усунемо пошкодження інтер‘єру та екстер‘єру — відновимо візерунок, текстуру та колір.',
	},
	body,
)