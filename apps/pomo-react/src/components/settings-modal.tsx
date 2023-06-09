import { Dialog, Transition } from '@headlessui/react'
import { FC, Fragment } from 'react'
import { ReactComponent as XSvg } from '@pomo/assets/icons/ph_x.svg'
import { MAX_TIME_IN_SECONDS, MIN_TIME_IN_SECONDS } from '@pomo/constants'

import { Button } from './button'
import { Switch } from './switch'
import { InputNumber } from './input-number'
import { useSettings } from '../store/settings'
import { ColorPaletteRadioGroup } from './color-palette-radio-group'
import { useTheme } from '../hooks/use-theme'

export const SettingsModal: FC<{ closeModal: () => void; isOpen: boolean }> = ({
	closeModal,
	isOpen,
}) => {
	const { isDarkMode, setIsDarkMode } = useTheme()

	const {
		focusLength,
		shortBreakLength,
		longBreakLength,
		hasNotifications,
		setFocusLength,
		setShortBreakLength,
		setLongBreakLength,
		setHasNotifications,
	} = useSettings()
	return (
		<Transition
			appear
			show={isOpen}
			as={Fragment}
		>
			<Dialog
				onClose={closeModal}
				className='relative z-50 text-primary-900 dark:text-primary-50'
			>
				<div className='fixed inset-0 flex items-center justify-center p-4'>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0 scale-95'
						enterTo='opacity-100 scale-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100 scale-100'
						leaveTo='opacity-0 scale-95'
					>
						<Dialog.Panel className='flex flex-col bg-primary-50 dark:bg-primary-900 max-w-[448px] rounded-md shadow-modal w-full overflow-hidden'>
							<Dialog.Title className='font-bold flex justify-between p-6'>
								<span className='text-lg leading-7'>Settings</span>
								<Button
									size='sm'
									variant='transparent'
									onClick={closeModal}
								>
									<XSvg className='w-[18px] h-[18px]' />
								</Button>
							</Dialog.Title>

							<ul className='flex flex-col pb-4'>
								<li className='px-6 h-16 flex justify-between items-center'>
									<p>Dark mode</p>
									<Switch
										checked={isDarkMode}
										onChange={setIsDarkMode}
									/>
								</li>
								<li className='px-6 h-16 flex justify-between items-center'>
									<p>Focus length (s)</p>
									<InputNumber
										step={1}
										value={focusLength}
										min={MIN_TIME_IN_SECONDS}
										max={MAX_TIME_IN_SECONDS}
										handleChange={setFocusLength}
									/>
								</li>
								<li className='px-6 h-16 flex justify-between items-center'>
									<p>Short break length (s)</p>
									<InputNumber
										step={1}
										value={shortBreakLength}
										min={MIN_TIME_IN_SECONDS}
										max={MAX_TIME_IN_SECONDS}
										handleChange={setShortBreakLength}
									/>
								</li>
								<li className='px-6 h-16 flex justify-between items-center'>
									<p>Long break length (s)</p>
									<InputNumber
										step={1}
										value={longBreakLength}
										min={MIN_TIME_IN_SECONDS}
										max={MAX_TIME_IN_SECONDS}
										handleChange={setLongBreakLength}
									/>
								</li>
								<li className='px-6 h-16 flex justify-between items-center'>
									<p>Notifications</p>
									<Switch
										checked={hasNotifications}
										onChange={setHasNotifications}
									/>
								</li>

								<li className='px-6 h-16 flex justify-between items-center'>
									<p>Color palette</p>
									<ColorPaletteRadioGroup />
								</li>
							</ul>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	)
}
