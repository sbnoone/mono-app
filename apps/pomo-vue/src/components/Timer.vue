<script setup lang="ts">
import { ref, onUnmounted, watch, computed } from 'vue'
import { secondsToMs, milisecondsToSec, formatSecondsToMinSec } from '@pomo/utils'
import AnimatedDigits from './AnimatedDigits.vue'
const props = defineProps<{
	isPlaying: boolean
	initialTimeInSeconds: number
	onComplete?: () => void
}>()

let currentTime = secondsToMs(props.initialTimeInSeconds)
let previousTime = currentTime
const timerTime = ref<number>(props.initialTimeInSeconds)

watch(
	() => props.initialTimeInSeconds,
	(t) => {
		timerTime.value = t
		currentTime = secondsToMs(props.initialTimeInSeconds)
		previousTime = currentTime
	}
)

const time = computed(() => {
	const [min, sec] = formatSecondsToMinSec(timerTime.value)
	const [m1, m2] = min
	const [s1, s2] = sec
	return {
		m1,
		m2,
		s1,
		s2,
	}
})

let rafId: number

watch(
	() => props.isPlaying,
	(isPlaying) => {
		if (currentTime <= 0) return

		const effectInitialTimeMs = currentTime
		let effectInitialTimeStamp: number | undefined = undefined

		const step = (timestampMs: number) => {
			if (effectInitialTimeStamp === undefined) {
				effectInitialTimeStamp = timestampMs
			}
			const elapsedTime = timestampMs - effectInitialTimeStamp
			currentTime = effectInitialTimeMs - elapsedTime

			if (currentTime <= 0) {
				timerTime.value = 0
				cancelAnimationFrame(rafId)
				props.onComplete?.()
			} else {
				const seconds = Math.floor(milisecondsToSec(currentTime))
				const isUpdate = seconds !== Math.floor(milisecondsToSec(previousTime))
				previousTime = currentTime

				if (isUpdate) {
					timerTime.value = seconds
				}

				if (isPlaying) {
					rafId = requestAnimationFrame(step)
				}
			}
		}
		if (isPlaying) {
			rafId = requestAnimationFrame(step)
		} else {
			cancelAnimationFrame(rafId)
		}
	}
)

onUnmounted(() => {
	cancelAnimationFrame(rafId)
})
</script>

<template>
	<div
		class="text-[256px] flex flex-col leading-[85%] select-none"
		:class="{
			'font-extralight': !isPlaying,
			'font-extrabold': isPlaying,
		}"
	>
		<AnimatedDigits
			:d1="time.m1"
			:d2="time.m2"
		/>
		<AnimatedDigits
			:d1="time.s1"
			:d2="time.s2"
		/>
	</div>
</template>
