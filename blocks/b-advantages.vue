<template>
	<root-section>
		<block-title :content="title" />
		<div class="c-container" ref="containerTrigger">
			<div class="c-card" v-for="(card, ci) in content" :key="ci" ref="cardsRef">
					<img v-if="ci==0" class="c-scratch c-scratch-1" src="/images/scratch-advantages-1.jpg" alt="scratch">
					<img v-if="ci==1" class="c-scratch c-scratch-2" src="/images/scratch-advantages-2.jpg" alt="scratch">
					<div class="card-number fw-900 fs-adaptive-l">{{useListNumber(ci)}}</div>
					<ui-title :content="card.title" size="m" tag="h3" class="card-title text-uppercase"/>
					<div class="card-content-wp fs-fixed-s">
						<ui-paragraph :content="card.content" class="card-content fs-fixed-s"/>
					</div>
			</div>
		</div>
	</root-section>
</template>


<style scoped lang='scss'>
	@use '@scss/style';
	@use '@scss/color';
	@use '@scss/helpers/media';
	@use '@scss/modules/container';

	.c-container {
		display: grid;
		grid-template-columns: 1fr;
		gap: 10px;

		@include media.mobile {
			@include container.absorb(50);
		}
		@include media.from(660px) {
			grid-template-columns: 1fr 1fr;
			gap: 40px;
		}
	}

	.c-card {
		padding: 7.145%;
		border-radius: style.$border-radius;

		&:nth-child(1),
		&:nth-child(2) {
			background-color: color.$gray;
		}
		&:nth-child(3),
		&:nth-child(4) {
			background-color: color.$accent;
			color: #fff;
		}

		display: flex;
		flex-flow: column;
		align-items: flex-start;
		justify-content: space-between;
		position: relative;
	}

	.c-scratch {
		position: absolute;
		pointer-events: none;
		z-index: 1;
	}
	.c-scratch-1 {
    left: 4%;
    top: 10%;
    width: 60%;
	}
	.c-scratch-2 {
    right: 4%;
    top: 10%;
    width: 36.8%;
	}

	.card-title {
		margin-top: .5em;
		margin-bottom: .5em;
		z-index: 2;
	}

	.card-content-wp {
		min-height: 6em;
		margin-top: auto;
		display: flex;
    align-items: flex-end;
		z-index: 2;
	}
	.card-number {
		z-index: 2;
	}
</style>


<script setup>

	const cardsRef = ref(null)

	const props = defineProps({
		title: String,
		content: Array,
	})

	onMounted(()=>{
		useGsap().fromTo(cardsRef.value,
			{
				y:'40px',
			},
			{
				y:'0px',
				duration: 0.75,
				ease:'power4.out',
				stagger: 0.1,
				scrollTrigger: {
					trigger: cardsRef.value[0].parentElement,
					start: 'top: 70%',
				}
			},
		)
	})

</script>