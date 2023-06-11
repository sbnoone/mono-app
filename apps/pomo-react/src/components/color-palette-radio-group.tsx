import { Fragment, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import clsx from 'clsx'
import { ColorsPaletteEnum, colorsPalette } from '@pomo/constants'

export const ColorPaletteRadioGroup = () => {
	const [colorPalette, setColorPalette] = useState(ColorsPaletteEnum.blue)

	const changeColorPalette = (palette: ColorsPaletteEnum) => {
		setColorPalette(palette)
		colorsPalette.forEach((s) => {
			document.documentElement.classList.remove(s)
		})
		document.documentElement.classList.add(palette)
	}

	return (
		<RadioGroup
			value={colorPalette}
			onChange={changeColorPalette}
			as='ul'
			className='flex gap-2'
		>
			<RadioGroup.Label className='sr-only'>Color palette</RadioGroup.Label>
			{colorsPalette.map((color) => (
				<RadioGroup.Option
					key={color}
					value={color}
					as={Fragment}
				>
					{({ checked }) => (
						<li
							className={clsx(
								'w-6 h-6 rounded-full bg-black-100 dark:bg-white-100 relative before:absolute before:w-4 before:h-4 before:rounded-full before:top-1 before:left-1 cursor-pointer  hover:before:bg-primary-a-700 transition-colors',
								{
									'before:bg-primary-a-800': checked,
									'before:bg-primary-a-300': !checked,
									red: color === ColorsPaletteEnum.red,
									green: color === ColorsPaletteEnum.green,
									blue: color === ColorsPaletteEnum.blue,
								}
							)}
						>
							<span className='sr-only'>{color}</span>
						</li>
					)}
				</RadioGroup.Option>
			))}
		</RadioGroup>
	)
}
