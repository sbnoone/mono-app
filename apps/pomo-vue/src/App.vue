<script setup lang="ts">
import { ref } from 'vue'
import DotsSvg from '@pomo/assets/icons/ph_dots-three-outline-fill.svg'
import PlaySvg from '@pomo/assets/icons/ph_play-fill.svg'
import PauseSvg from '@pomo/assets/icons/ph_pause-fill.svg'
import ForwardSvg from '@pomo/assets/icons/ph_fast-forward-fill.svg'

import Timer from './components/Timer.vue'
import Chip from './components/Chip.vue'
import AppButton from './components/AppButton.vue'
import { TIMER_STATES } from './app-constants'
import InputNumber from './components/InputNumber.vue'

const isPlaying = ref(false)
const state = ref(0)

const toggleTimer = () => {
	isPlaying.value = !isPlaying.value
}
const onTimerComplete = () => {
	isPlaying.value = false
}
const openModal = () => {}
const changeState = () => {}

const inputValue = ref(30)
</script>

<template>
	<div
		className="h-full flex bg-primary-50 dark:bg-primary-950 text-primary-900 dark:text-primary-50 overflow-hidden"
	>
		<InputNumber v-model="inputValue" />
		<!-- <SettingsModal
				closeModal={closeModal}
				isOpen={isModalOpen}
			/> -->
		<div className="max-w-[340px] px-[10px] m-auto flex-grow">
			<div className="flex items-center flex-col gap-y-3 md:gap-y-8">
				<Chip :variant="TIMER_STATES[state]" />
				<Timer
					:onComplete="onTimerComplete"
					:isPlaying="isPlaying"
					:initialTimeInSeconds="10"
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
						@click="toggleTimer"
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
