import '@/presentation/styles/global.scss'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from '@/main/routes/router'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement as Element)

root.render(
  <StrictMode>
    <Router />
  </StrictMode>
)
