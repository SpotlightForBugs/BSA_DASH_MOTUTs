<template>
	<!-- <SkillTreeProgressSkeleton no-animate /> -->
	<Btn class="w-fit">Send Message to User</Btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
	setup() {
		const { t } = useI18n();

		return { t };
	},
});
</script>

<style scoped></style>
