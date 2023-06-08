<script setup lang="ts">
import { toRefs } from 'vue'
import { Switch as HeadlessSwitch } from '@headlessui/vue'

const { checked, onChange } = toRefs(
	defineProps<{ checked: boolean; onChange: (value: boolean) => void }>()
)
</script>

<template>
	<HeadlessSwitch
		:checked="checked"
		:onChange="onChange"
		class="relative inline-flex h-5 w-[34px] items-center rounded-full"
		:class="{
			'bg-black-200 dark:bg-white-200': !checked,
			'bg-primary-a-600': checked,
		}"
	>
		<span className="sr-only">Toggle dark mode</span>
		<span
			class="inline-block h-4 w-4 transform rounded-full bg-primary-50 dark:bg-primary-900 transition"
			:class="{
				'translate-x-0.5': !checked,
				'translate-x-4': checked,
			}"
		/>
	</HeadlessSwitch>
</template>
