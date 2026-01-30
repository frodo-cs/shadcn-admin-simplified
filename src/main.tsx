import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import './config/i18n'
import { DirectionProvider } from './context/direction-provider'
import { FontProvider } from './context/font-provider'
import { ThemeProvider } from './context/theme-provider'
import './styles/index.css'
import { queryClient } from './query-client'
import { App } from './app'

async function enableMocking() {
  if (import.meta.env.VITE_ENVIRONMENT !== 'mock') {
    return
  }

  const { worker } = await import('./mocks/browser')
  return worker.start()
}

const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  enableMocking().then(() => {
    root.render(
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <FontProvider>
              <DirectionProvider>
                <App />
              </DirectionProvider>
            </FontProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </StrictMode>
    )
  })
}
