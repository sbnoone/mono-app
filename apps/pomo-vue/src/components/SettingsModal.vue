<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { inject } from 'vue'
import { MAX_TIME_IN_SECONDS, MIN_TIME_IN_SECONDS } from '../app-constants'
import { Settings } from '../types'
import AppButton from './AppButton.vue'
import InputNumber from './InputNumber.vue'
import Switch from './Switch.vue'
import XSvg from '@pomo/assets/icons/ph_x.svg'

const settings = inject<Settings>('settings')!

const props = defineProps<{ isOpen: boolean }>()

const emit = defineEmits(['close'])
const emitClose = () => emit('close')
</script>

<template>
	<TransitionRoot
		appear
		:show="props.isOpen"
		as="div"
	>
		<Dialog
			@close="emitClose"
			class="relative z-50 text-primary-900 dark:text-primary-50"
		>
			<TransitionChild
				class="fixed inset-0 flex items-center justify-center p-4"
				enter="ease-out duration-300"
				enterFrom="opacity-0 scale-95"
				enterTo="opacity-100 scale-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100 scale-100"
				leaveTo="opacity-0 scale-95"
			>
				<DialogPanel
					class="flex flex-col bg-primary-50 dark:bg-primary-900 max-w-[448px] rounded-md shadow-modal w-full overflow-hidden"
				>
					<DialogTitle class="font-bold flex justify-between p-6">
						<span class="text-lg leading-7">Settings</span>
						<AppButton
							size="sm"
							variant="transparent"
							@click="emitClose"
						>
							<XSvg class="w-[18px] h-[18px]" />
						</AppButton>
					</DialogTitle>

					<ul class="flex flex-col pb-4">
						<li class="px-6 h-16 flex justify-between items-center">
							<p>Dark mode</p>
							<Switch v-model:enabled="settings.darkmode" />
						</li>
						<li class="px-6 h-16 flex justify-between items-center">
							<p>Focus length (s)</p>
							<InputNumber
								step="1"
								v-model="settings.focusLength"
								:min="MIN_TIME_IN_SECONDS"
								:max="MAX_TIME_IN_SECONDS"
							/>
						</li>
						<li class="px-6 h-16 flex justify-between items-center">
							<p>Short break length (s)</p>
							<InputNumber
								step="1"
								v-model="settings.shortBreakLength"
								:min="MIN_TIME_IN_SECONDS"
								:max="MAX_TIME_IN_SECONDS"
							/>
						</li>
						<li class="px-6 h-16 flex justify-between items-center">
							<p>Long break length (s)</p>
							<InputNumber
								step="1"
								v-model="settings.longBreakLength"
								:min="MIN_TIME_IN_SECONDS"
								:max="MAX_TIME_IN_SECONDS"
							/>
						</li>
						<li class="px-6 h-16 flex justify-between items-center">
							<p>Notifications</p>
							<Switch v-model:enabled="settings.hasNotifications" />
						</li>

						<li class="px-6 h-16 flex justify-between items-center">
							<p>Color palette</p>
							<!-- <ColorPaletteRadioGroup /> -->
						</li>
					</ul>
				</DialogPanel>
			</TransitionChild>
		</Dialog>
	</TransitionRoot>
</template>
