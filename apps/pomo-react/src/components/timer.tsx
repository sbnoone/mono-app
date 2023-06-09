import { FC, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

import { formatSecondsToMinSec, milisecondsToSec, secondsToMs } from '@pomo/utils'
import { AnimatedDigits } from './animated-digits'

export const Timer: FC<{
	isPlaying: boolean
	initialTimeInSeconds: number
	onComplete?: () => void
}> = ({ isPlaying, initialTimeInSeconds, onComplete }) => {
	const currentTime = useRef(secondsToMs(initialTimeInSeconds))
	const previousTime = useRef(currentTime.current)
	const [timer, setTimer] = useState(initialTimeInSeconds)

	useEffect(() => {
		setTimer(initialTimeInSeconds)
		currentTime.current = secondsToMs(initialTimeInSeconds)
	}, [initialTimeInSeconds])

	useEffect(() => {
		if (!isPlaying || currentTime.current <= 0) return

		const effectInitialTimeMs: number = currentTime.current
		let effectInitialTimeStamp: number | undefined = undefined
		let rafId = 0

		const step = (timestampMs: number) => {
			if (effectInitialTimeStamp === undefined) {
				effectInitialTimeStamp = timestampMs
			}
			const elapsedTime = timestampMs - effectInitialTimeStamp
			currentTime.current = effectInitialTimeMs - elapsedTime

			if (currentTime.current <= 0) {
				setTimer(0)
				cancelAnimationFrame(rafId)
				onComplete?.()
			} else {
				const seconds = Math.floor(milisecondsToSec(currentTime.current))
				const isUpdate = seconds !== Math.floor(milisecondsToSec(previousTime.current))
				previousTime.current = currentTime.current

				if (isUpdate) {
					setTimer(seconds)
				}

				if (isPlaying) {
					rafId = requestAnimationFrame(step)
				}
			}
		}

		rafId = requestAnimationFrame(step)

		return () => {
			cancelAnimationFrame(rafId)
		}
	}, [isPlaying, onComplete])

	const [min, sec] = formatSecondsToMinSec(timer)
	const [m1, m2] = min
	const [s1, s2] = sec

	return (
		<div
			className={clsx('text-[256px] flex flex-col leading-[85%] select-none', {
				'font-extralight': !isPlaying,
				'font-extrabold': isPlaying,
			})}
		>
			<AnimatedDigits
				d1={m1}
				d2={m2}
			/>
			<AnimatedDigits
				d1={s1}
				d2={s2}
			/>
		</div>
	)
}
