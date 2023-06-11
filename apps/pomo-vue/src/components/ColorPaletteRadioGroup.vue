<script setup lang="ts">
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import { colorsPalette, ColorsPaletteEnum } from '@pomo/constants'
import { ref, watch } from 'vue'

const colorPalette = ref(ColorsPaletteEnum.blue)

watch(colorPalette, (palette) => {
	colorsPalette.forEach((s) => {
		document.documentElement.classList.remove(s)
	})
	document.documentElement.classList.add(palette)
})
</script>

<template>
	<RadioGroup
		v-model="colorPalette"
		:value="colorPalette"
		as="ul"
		class="flex gap-2"
	>
		<RadioGroupLabel class="sr-only">Color palette</RadioGroupLabel>
		<RadioGroupOption
			v-for="color in colorsPalette"
			:key="color"
			:value="color"
			as="template"
			v-slot="{ checked }"
		>
			<li
				class="w-6 h-6 rounded-full bg-black-100 dark:bg-white-100 relative before:absolute before:w-4 before:h-4 before:rounded-full before:top-1 before:left-1 cursor-pointer hover:before:bg-primary-a-700 transition-colors"
				:class="{
					'before:bg-primary-a-800': checked,
					'before:bg-primary-a-300': !checked,
					red: color === ColorsPaletteEnum.red,
					green: color === ColorsPaletteEnum.green,
					blue: color === ColorsPaletteEnum.blue,
				}"
			>
				<span class="sr-only">{{ color }}</span>
			</li>
		</RadioGroupOption>
	</RadioGroup>
</template>
