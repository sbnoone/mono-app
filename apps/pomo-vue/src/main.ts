import { createApp, reactive, watch } from 'vue'
import './style.css'
import App from './App.vue'
import { Settings } from './types'

// const focusLength = ref(30)
// const shortBreakLength = ref(5)
// const longBreakLength = ref(15)
// const hasNotifications = ref(false)
// const darkmode = ref(false)

const settings = reactive<Settings>({
	focusLength: 30,
	shortBreakLength: 5,
	longBreakLength: 15,
	hasNotifications: false,
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

const app = createApp(App).provide('settings', settings)

app.mount('#root')
