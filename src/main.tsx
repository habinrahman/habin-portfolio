import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import { PortfolioDataProvider } from './state/usePortfolioStore'
import { PortfolioProvider } from './state/PortfolioProvider'
import './index.css'
import App from './utils/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <PortfolioDataProvider>
            <PortfolioProvider>
              <App />
            </PortfolioProvider>
          </PortfolioDataProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </HelmetProvider>
  </StrictMode>,
)
