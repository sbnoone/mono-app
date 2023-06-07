<script setup lang="ts">
import { ref, onUnmounted, watch, computed } from 'vue'
import { secondsToMs, milisecondsToSec, formatSecondsToMinSec } from '@pomo/utils'
const props = defineProps<{
	isPlaying: boolean
	initialTimeInSeconds: number
	onComplete?: () => void
}>()

let currentTime = secondsToMs(props.initialTimeInSeconds)
let previousTime = currentTime
const timerTime = ref<number>(props.initialTimeInSeconds)

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
		<div class="relative w-[289px] h-[217px]">
			<div class="absolute h-full flex place-content-center will-change-[transform,opacity]">
				{{ time.m1 }}
			</div>

			<div
				class="absolute right-0 h-full flex place-content-center will-change-[transform,opacity]"
			>
				{{ time.m2 }}
			</div>
		</div>
		<div class="relative w-[289px] h-[217px]">
			<div class="absolute h-full flex place-content-center will-change-[transform,opacity]">
				{{ time.s1 }}
			</div>
			<div
				class="absolute right-0 h-full flex place-content-center will-change-[transform,opacity]"
			>
				{{ time.s2 }}
			</div>
		</div>
	</div>
</template>
