import { createApp, reactive, watch } from 'vue'
import Toast, { POSITION, PluginOptions as ToastOptions } from 'vue-toastification'
import './style.css'
import App from './App.vue'
import { Settings } from './types'
import 'vue-toastification/dist/index.css'

// const focusLength = ref(30)
// const shortBreakLength = ref(5)
// const longBreakLength = ref(15)
// const hasNotifications = ref(false)
// const darkmode = ref(false)

const settings = reactive<Settings>({
	focusLength: 30,
	shortBreakLength: 5,
	longBreakLength: 15,
	hasNotifications: true,
	darkmode: false,
})

watch(
	() => settings.darkmode,
	(isDarkMode) => {
		if (isDarkMode) {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}
)

// watch(s, (value) => console.log(value))

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

const app = createApp(App).use(Toast, options).provide('settings', settings)

app.mount('#root')
