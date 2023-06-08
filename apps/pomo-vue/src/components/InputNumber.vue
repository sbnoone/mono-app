<script setup lang="ts">
import { toRefs } from 'vue'
import TriangleSvg from '@pomo/assets/icons/ph_triangle.svg'
import { MAX_TIME_IN_SECONDS, MIN_TIME_IN_SECONDS } from '../app-constants'

const props = defineProps<{ modelValue: number }>()

const { modelValue } = toRefs(props)

const emit = defineEmits<{ (e: 'update:modelValue', value: number): void }>()

const emitValue = (event: Event) => {
	emit('update:modelValue', parseFloat((event.target as HTMLInputElement).value))
}

const increment = () => {
	emit(
		'update:modelValue',
		modelValue.value < MAX_TIME_IN_SECONDS ? modelValue.value + 1 : MAX_TIME_IN_SECONDS
	)
}

const decrement = () => {
	emit(
		'update:modelValue',
		modelValue.value > MIN_TIME_IN_SECONDS ? modelValue.value - 1 : MIN_TIME_IN_SECONDS
	)
}
</script>

<template>
	<div
		class="flex border-[1px] h-10 border-black-100 dark:border-white-100 rounded-sm overflow-hidden max-w-[96px] w-full"
	>
		<input
			v-bind="$attrs"
			:value="modelValue.toString()"
			@input="emitValue"
			type="number"
			class="h-10 bg-transparent border-none max-w-[66px] flex-1 text-center outline-none px-1 tracking-[0.15px]"
		/>
		<div class="border-l-[1px] border-l-black-100 dark:border-l-white-100">
			<button
				@click="increment"
				type="button"
				class="flex justify-center items-center w-[30px] h-[19px] -outline-offset-2"
			>
				<TriangleSvg
					class="stroke-blue-900 dark:stroke-blue-50 fill-blue-900 dark:fill-blue-50 [&_path]:fill-blue-900 [&_path]:dark:fill-blue-50"
				/>
			</button>
			<button
				@click="decrement"
				type="button"
				class="flex justify-center items-center w-[30px] h-[19px] border-t-[1px] border-t-black-100 dark:border-t-white-100 -outline-offset-2"
			>
				<TriangleSvg
					class="stroke-blue-900 dark:stroke-blue-50 fill-blue-900 dark:fill-blue-50 [&_path]:fill-blue-900 [&_path]:dark:fill-blue-50 rotate-180"
				/>
			</button>
		</div>
	</div>
</template>
