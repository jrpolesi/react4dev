import '@/presentation/styles/global.scss'

import { Router } from '@/presentation/components'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement as Element)

root.render(
  <StrictMode>
    <Router />
  </StrictMode>
)
