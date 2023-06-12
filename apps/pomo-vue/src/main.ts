import { createApp, reactive, watch } from 'vue'
import Toast, { POSITION, PluginOptions as ToastOptions } from 'vue-toastification'
import '@pomo/styles/style.css'
import App from './App.vue'
import {
	DEFAULT_FOCUS_LENGTH_IN_SECONDS,
	DEFAULT_LONG_BREAK_LENGTH_IN_SECONDS,
	DEFAULT_SHORT_BREAK_LENGTH_IN_SECONDS,
	ThemeModeEnum,
} from '@pomo/constants'
import { Settings } from './types'
import 'vue-toastification/dist/index.css'

const initialSettings = JSON.parse(localStorage.getItem('settings') || '{}') as Settings

const settings = reactive<Settings>({
	focusLength: initialSettings?.focusLength || DEFAULT_FOCUS_LENGTH_IN_SECONDS,
	shortBreakLength: initialSettings?.shortBreakLength || DEFAULT_SHORT_BREAK_LENGTH_IN_SECONDS,
	longBreakLength: initialSettings?.longBreakLength || DEFAULT_LONG_BREAK_LENGTH_IN_SECONDS,
	hasNotifications: !!initialSettings?.hasNotifications,
	darkmode: !!initialSettings?.darkmode,
})

watch(settings, (newSettings) => {
	localStorage.setItem('settings', JSON.stringify(newSettings))
})

watch(
	() => settings.darkmode,
	(isDarkMode) => {
		if (isDarkMode) {
			document.documentElement.classList.add(ThemeModeEnum.dark)
		} else {
			document.documentElement.classList.remove(ThemeModeEnum.dark)
		}
	},
	{
		immediate: true,
	}
)

const options: ToastOptions = {
	position: POSITION.TOP_RIGHT,
	timeout: 2000,
	pauseOnHover: false,
	hideProgressBar: true,
	pauseOnFocusLoss: false,
	toastClassName:
		'!bg-primary-a-600 dark:!text-primary-50 !text-primary-900 !p-2 !min-h-[auto] !min-w-[auto] [&>svg]:m-0 !items-center',
	bodyClassName: 'my-1 mx-2.5',
	closeButton: false,
	draggable: false,
	closeOnClick: false,
}

createApp(App).use(Toast, options).provide('settings', settings).mount('#root')
