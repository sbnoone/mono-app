<script setup lang="ts">
import { toRefs } from 'vue'
import { Switch as HeadlessSwitch } from '@headlessui/vue'

const props = defineProps<{ enabled: boolean }>()
const { enabled } = toRefs(props)
const emit = defineEmits<{
	(e: 'update:enabled', value: boolean): void
}>()

const toggle = (value: boolean) => {
	emit('update:enabled', value)
}
</script>

<template>
	<HeadlessSwitch
		v-model="enabled"
		:value="enabled ? 'on' : 'off'"
		name="darkmode"
		v-slot="{ checked: enabled }"
		@update:modelValue="toggle"
		class="relative inline-flex h-5 w-[34px] items-center rounded-full"
		:class="{
			'bg-black-200 dark:bg-white-200': !enabled,
			'bg-primary-a-600': enabled,
		}"
	>
		<span className="sr-only">Toggle dark mode</span>
		<span
			class="inline-block h-4 w-4 transform rounded-full bg-primary-50 dark:bg-primary-900 transition"
			:class="{
				'translate-x-0.5': !enabled,
				'translate-x-4': enabled,
			}"
		/>
	</HeadlessSwitch>
</template>
