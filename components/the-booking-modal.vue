<template>
	<div>
		<wa-modal
			ref="theModal"
		>
			<template #header>
				<ui-title v-bind="modalTitle" />
			</template>

			<ui-paragraph class="c-modal-content" v-bind="modalContent" />

			<the-booking-form @submit="onSubmited" class="the-modal" />

			<!-- <template v-slot:footer>
				<ui-paragraph class="c-footer-content" v-bind="modalFooterContent" />
			</template> -->
		</wa-modal>

		<wa-modal
			ref="tnxModal"
		>
			<template #header>
				<ui-title v-bind="tnxModalTitle" />
			</template>

			<ui-paragraph class="c-modal-content" v-bind="tnxModalContent" />


			<template v-slot:footer>
				<ui-button v-bind="tnxButton" />
			</template>
		</wa-modal>
	</div>

</template>


<style scoped lang='scss'>
	@use '@scss/color';

	.the-modal {
		margin-top: 20px;
	}

	.c-modal-content {
		color: color.$gray-text;
	}

	.c-close-button {
		display: block;
		padding: 5px 10px;
		background-color: transparent;
		margin: 0;
		border: none;
		color: color.$dark;
		text-align: center;
		align-self: center;
	}

	.c-footer-content {
		color: color.$gray-text;
		font-size: 14px;
	}
</style>


<script setup>
	const theModal = ref()
	const tnxModal = ref()

	const modalTitle = {
		content:'Безкоштовно розрахуємо вартість реставрації без виїзду майстра',
		size:'m'
	}
	const modalContent = {
		content:[
			'залиште контакти і наші менеджери зв‘яжуться з вами та&nbsp;безкоштовно порахують вартість реставрації',
		],
		size:'s'
	}
	const modalFooterContent = {
		content:[
			'Натискаючи кнопку Надіслати» ви погоджуєтеся на обробку персональних даних.',
		]
	}

	const tnxModalTitle = {
		content:'Запит надіслано',
	}
	const tnxModalContent = {
		content:'Невдовзі ми зв‘яжемось з&nbsp;вами в&nbsp;одному з&nbsp;мессенджерів за вказаним номером чи по&nbsp;телефону 💬',
	}

	const tnxButton = {
		content:'Зрозуміло',
		expandOnMobile: true,
		onClick: ()=> tnxModal.value.close()
	}



	const onSubmited = (formData) => {
		close()
		tnxModal.value.open()
	}
	const open = (trackSource)=>{
		theModal.value.open()
		useTrackEvent('openBookingModal', {source:trackSource, title: modalTitle?.content})
	}
	const close = ()=>{
		theModal.value.close()
	}

	defineExpose({open,close})
</script>