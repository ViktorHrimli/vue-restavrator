<template>

	<div class="c-wrapper">

		<a href="https://t.me/m/ZiG5MYJZMGFi" target="_blank" rel="noopener noreferrer" class="k-button"
			style="width: 100%;">
			<ui-button v-bind="tg" id="gtm-btn-tg"></ui-button>
		</a>

		<a href="https://www.instagram.com/restavrator_ua/" target="_blank" rel="noopener noreferrer" class="k-button"
			style="width: 100%;">
			<ui-button v-bind="inst" id="gtm-btn-in"></ui-button>
		</a>

		<a href="https://viber.click/380684391984" target="_blank" rel="noopener noreferrer" class="k-button"
			style="width: 100%;">
			<ui-button v-bind="viber" id="gtm-btn-vb"></ui-button>
		</a>

	</div>

	<!-- <form @submit.prevent="submitForm" class="c-form fs-adaptive-m" ref="form">
		<div class="c-body">
			<form-fieldset>
				<inputs-group>
					<input-default
						title="Ваше ім‘я"
						name="name"
						v-model="formData.fullname"
						required
						autocomplete="false"
					/>
					<input-default
						title="Ваш телефон"
						placeholder="(0__) __ __ ___"
						name="phone"
						type="tel"
						v-model="formData.phone"
						required
						@input="parseNumber"
						autocomplete="false"
					/>
				</inputs-group>
			</form-fieldset>
		</div>

		<footer class="c-footer">
			<ui-button v-bind="submitButton" class="k-button" id="gtm-btn" />
		</footer>
	</form> -->
</template>

<style scoped lang="scss">
.c-wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 10px;
}

.c-body {
	font-size: 24px;
}

.c-footer {
	margin-top: 40px;
}

.k-button {
	stroke: #fff;
	fill: transparent;
}
</style>

<script setup>
import telegramNotify from "@/services/telegramNotifocations";
import CRM from "@services/crm";
const emit = defineEmits(["submit"]);

const $crm = new CRM();
const form = ref(null);


// const submitButton = {
// 	content: "Надіслати",
// 	expand: true,
// 	size: "m",
// 	icon: "send-2",
// 	type: "submit",
// };

const tg = {
	content: "Telegram",
	expand: true,
	size: "s",
	icon: "telegram",
	type: "button",
	href: 'https://t.me/m/ZiG5MYJZMGFi'
};

const viber = {
	content: "Viber",
	expand: true,
	size: "s",
	icon: "viber",
	type: "button",
	href: "https://www.viber.com/restavrator",
};

const inst = {
	content: "Instagram",
	expand: true,
	size: "s",
	icon: "instagram",
	type: "button",
	href: "https://www.instagram.com/restavrator_ua/",
};

const formData = {
	fullname: null,
	phone: null,
};

const parseNumber = ({ target }) => {
	target.value = target.value.replace(/[^0-9]/g, "");
};

function sendMessage(formFields) {
	telegramNotify.send(formFields, {
		title: "🔴 Нова заявка з сайту",
	});
}

const makePhone = (input) => {
	let result = "";
	result = input.replace(/[^0-9]/g, "");
	result = result.padStart(13, "+380000000000");

	return result;
};

const clearForm = () => {
	form.value.reset();

	formData.fullname = null;
	formData.phone = null;
};

const track = () => {
	try {
		useNuxtApp()?.$pixel.track("Lead");
		useNuxtApp()?.$gtag.event("Lead");
	} catch (e) {
		console.error("Form tracking error", e);
	}
};

async function submitForm(e) {
	formData.phone = makePhone(formData.phone);
	emit("submit", formData);
	track();

	await $crm.newLead(formData).then((d) => {
		console.log("✅ lead sended");
	});

	// sendMessage(formData)

	clearForm();

	return;
}
</script>
