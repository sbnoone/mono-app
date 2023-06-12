import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import '@pomo/styles/style.css'

import { ThemeProvider } from './context/theme/theme.provider'
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider>
			<Toaster
				position='top-right'
				toastOptions={{
					className: 'bg-primary-a-600 dark:text-primary-50 text-primary-900',
				}}
			/>
			<App />
		</ThemeProvider>
	</React.StrictMode>
)
