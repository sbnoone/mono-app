<script setup lang="ts">
import { inject, ref, computed, watch } from 'vue'
import { useToast } from 'vue-toastification'
import DotsSvg from '@pomo/assets/icons/ph_dots-three-outline-fill.svg'
import PlaySvg from '@pomo/assets/icons/ph_play-fill.svg'
import PauseSvg from '@pomo/assets/icons/ph_pause-fill.svg'
import ForwardSvg from '@pomo/assets/icons/ph_fast-forward-fill.svg'

import Timer from './components/Timer.vue'
import Chip from './components/Chip.vue'
import AppButton from './components/AppButton.vue'
import { TIMER_STATES, NOTIFICATION_MESSAGES } from '@pomo/constants'

import SettingsModal from './components/SettingsModal.vue'
import { Settings, TimerState } from './types'

const initialState: number = parseInt(localStorage.getItem('state') || '0')

const settings = inject<Settings>('settings')!
const state = ref<number>(initialState)

watch(state, (newState) => {
	localStorage.setItem('state', newState.toString())
})

const isPlaying = ref(false)
const toast = useToast()

const changeState = () => {
	isPlaying.value = false
	const nextState = (state.value + 1) % TIMER_STATES.length
	state.value = nextState

	if (settings.hasNotifications) {
		toast.success(`Current state - ${NOTIFICATION_MESSAGES[TIMER_STATES[state.value]]}`)
	}
}

const toggleIsPlaying = () => {
	isPlaying.value = !isPlaying.value
}
const onTimerComplete = () => {
	isPlaying.value = false
}

const isOpen = ref(false)
const openModal = () => {
	isOpen.value = true
}
const closeModal = () => {
	isOpen.value = false
}

const initialTimes = computed<Record<TimerState, number>>(() => ({
	focus: settings.focusLength,
	'break-long': settings.longBreakLength,
	'break-short': settings.shortBreakLength,
}))
const initialTimeInSeconds = computed(() => initialTimes.value[TIMER_STATES[state.value]])
</script>

<template>
	<div
		className="h-full flex bg-primary-50 dark:bg-primary-950 text-primary-900 dark:text-primary-50 overflow-hidden"
	>
		<SettingsModal
			:isOpen="isOpen"
			@close="closeModal"
		/>
		<div className="max-w-[340px] px-[10px] m-auto flex-grow">
			<div className="flex items-center flex-col gap-y-3 md:gap-y-8">
				<Chip :variant="TIMER_STATES[state]" />
				<Timer
					:onComplete="onTimerComplete"
					:isPlaying="isPlaying"
					:initialTimeInSeconds="initialTimeInSeconds"
				/>
				<div className="flex items-center gap-x-2 xs:gap-x-4">
					<AppButton
						size="md"
						variant="secondary"
						@click="openModal"
					>
						<span className="sr-only">settings</span>
						<DotsSvg />
					</AppButton>
					<AppButton
						size="lg"
						variant="primary"
						@click="toggleIsPlaying"
					>
						<span class="sr-only">{{ isPlaying ? 'pause' : 'play' }}</span>
						<component :is="isPlaying ? PauseSvg : PlaySvg" />
					</AppButton>
					<AppButton
						size="md"
						variant="secondary"
						@click="changeState"
					>
						<span className="sr-only">next state</span>
						<ForwardSvg />
					</AppButton>
				</div>
			</div>
		</div>
	</div>
</template>
