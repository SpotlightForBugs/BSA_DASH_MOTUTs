<template>
	<section class="relative h-7.5 w-screen overflow-clip pr-1" :class="color">
		<article
			class="flex justify-end gap-3 py-1.5 h-fit"
			:class="dashboard ? 'px-dashboard' : 'container-fluid'"
		>
			<img
				@click="locale = 'en-US'"
				src="/images/en.webp"
				alt="english translation"
				class="transition duration-200 ease-out cursor-pointer w-4 h-4 rounded-3xl object-cover"
				:class="locale == 'en-US' ? 'opacity-100' : 'opacity-60'"
			/>
			<img
				@click="locale = 'de'"
				src="/images/de.webp"
				alt="french translation"
				class="transition duration-200 ease-out cursor-pointer w-4 h-4 rounded-3xl object-cover"
				:class="locale == 'de' ? 'opacity-100' : 'opacity-60'"
			/>
		</article>
	</section>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';

export default {
	props: {
		color: { type: String, default: 'bg-tertiary' },
		dashboard: { type: Boolean, default: false },
	},
	setup() {
		const { t, locale } = useI18n();

		const cookie_locale = useCookie('locale');

		watch(
			() => locale.value,
			(newValue, oldValue) => {
				cookie_locale.value = newValue;
			},
			{ deep: true, immediate: true }
		);

		return { locale };
	},
};
</script>

<style scoped></style>
