import { TIMER_STATES } from '../app-constants'

export type TimerState = (typeof TIMER_STATES)[number]

export interface Settings {
	focusLength: number
	shortBreakLength: number
	longBreakLength: number
	hasNotifications: boolean
	darkmode: boolean
}
