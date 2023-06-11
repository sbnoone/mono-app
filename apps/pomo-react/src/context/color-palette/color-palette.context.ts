import { createContext } from 'react'
import { ColorsPaletteEnum } from '@pomo/constants'

interface IColorsPaletteContext {
	colorPalette: ColorsPaletteEnum
	changeColorPalette: (schema: ColorsPaletteEnum) => void
}

export const ColorPaletteContext = createContext({} as IColorsPaletteContext)
