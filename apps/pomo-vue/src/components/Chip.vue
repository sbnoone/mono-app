<script setup lang="ts">
import BrainSvg from '@pomo/assets/icons/ph_brain-fill.svg'
import CoffeeSvg from '@pomo/assets/icons/ph_coffee.svg'
import { TimerState } from '../types'

defineProps<{
	variant: TimerState
}>()

const config = {
	focus: {
		icon: BrainSvg,
		text: 'Focus',
	},
	'break-long': {
		icon: CoffeeSvg,
		text: 'Break long',
	},
	'break-short': {
		icon: CoffeeSvg,
		text: 'Break short',
	},
}
</script>

<template>
	<div
		class="flex items-center gap-x-[9px] border-2 border-solid border-primary-900 dark:border-primary-50 bg-primary-a-100 text-primary-900 dark:text-primary-50 rounded-[999px] px-4 py-2 font-medium"
	>
		<component
			class="stroke-primary-900 dark:stroke-primary-50"
			:is="config[variant].icon"
		/>
		{{ config[variant].text }}
	</div>
</template>
