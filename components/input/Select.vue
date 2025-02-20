<template>
	<article>
		<label
			v-if="!!label"
			class="text-body-2 text-body font-body block mb-2"
			:for="id ?? label"
		>
			{{ t(label) }}
		</label>
		<div
			class="relative h-fit w-fit cursor-pointer"
			:class="[
				btnType ? 'btn-type' : 'input-type',
				{
					sm: sm,
				},
			]"
		>
			<select
				:name="id"
				:id="id"
				v-model="input"
				class="relative z-20 appearance-none bg-transparent cursor-pointer"
			>
				<option
					v-for="option of options"
					:key="option?.value ?? ''"
					:value="option?.value ?? ''"
				>
					{{ t(option?.label ?? '') }}
				</option>
			</select>

			<ChevronDownIcon class="icon absolute z-10" />
		</div>
	</article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ChevronDownIcon } from '@heroicons/vue/24/solid/index.js';
import { useI18n } from 'vue-i18n';

export default defineComponent({
	props: {
		label: { type: String, default: '' },
		id: { type: String, default: 'select' },
		sm: { type: Boolean, default: false },
		btnType: { type: Boolean, default: false },
		options: {
			default: [
				{
					label: 'Headings.BestMatch',
					value: 'bestMatch',
				},
				{
					label: 'Headings.Latest',
					value: 'latest',
				},
			],
		},
		modelValue: { type: String, default: '' },
	},
	emits: ['update:modelValue', 'valid'],
	components: { ChevronDownIcon },
	setup(props, { emit }) {
		const { t } = useI18n();

		const input = computed({
			get() {
				return props.modelValue;
			},
			set(value: string) {
				if (!value) return;
				emit('update:modelValue', value);
			},
		});

		input.value = (input.value) ? input.value : props.options[0]?.value ?? '';

		const selectedOptionLabel = computed(() => {
			return (
				props.options.find((option) => option.value == input.value)?.label ?? ''
			).toString();
		});

		return { input, t, selectedOptionLabel };
	},
});
</script>

<style scoped>
/* ========================================= Input Type */
.input-type {
	@apply bg-secondary rounded-md;
}
.input-type select {
	@apply pl-4 pr-12 py-3 text-base font-body text-white transition ease-out duration-500 rounded-md focus:outline-none ring-2 ring-tertiary focus:ring-offset-2 focus:ring-offset-tertiary focus:ring-accent;
}
.input-type.sm select {
	@apply text-xs pl-3.5 pr-10 py-3;
}
.input-type .icon {
	@apply w-4 h-4 right-3 top-4 text-accent;
}
.input-type.sm .icon {
	@apply right-3 top-3.5;
}

/* ======================================= Btn type */
.btn-type {
	@apply bg-transparent hover:bg-transparent;
}
.btn-type select {
	@apply text-base pl-4 pr-12 py-3 rounded border border-accent focus:ring-4 focus:ring-tertiary h-fit w-fit text-white font-medium font-body transition-basic outline-none;
}
.btn-type.sm select {
	@apply text-xs pl-3.5 pr-10 py-3;
}
.btn-type .icon {
	@apply w-4 h-4 right-4 top-4 text-accent;
}
.btn-type.sm .icon {
	@apply right-3 top-3.5;
}
input {
	color-scheme: light;
}
</style>
