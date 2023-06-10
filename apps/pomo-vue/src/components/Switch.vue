<script setup lang="ts">
import { Switch as HeadlessSwitch } from '@headlessui/vue'

const props = defineProps<{ enabled: boolean }>()

const emit = defineEmits<{
	(e: 'update:enabled', value: boolean): void
}>()

const toggle = (value: boolean) => {
	emit('update:enabled', value)
}
</script>

<template>
	<HeadlessSwitch
		:default-checked="props.enabled"
		@update:modelValue="toggle"
		class="relative inline-flex h-5 w-[34px] items-center rounded-full"
		:class="{
			'bg-black-200 dark:bg-white-200': !props.enabled,
			'bg-primary-a-600': props.enabled,
		}"
	>
		<span className="sr-only">Toggle dark mode</span>
		<span
			class="inline-block h-4 w-4 transform rounded-full bg-primary-50 dark:bg-primary-900 transition"
			:class="{
				'translate-x-0.5': !props.enabled,
				'translate-x-4': props.enabled,
			}"
		/>
	</HeadlessSwitch>
</template>
