import '@/presentation/styles/global.scss'

import { Router } from '@/presentation/components'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { makeLogin } from '@/main/factories/pages/login/login-factory'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement as Element)

root.render(
  <StrictMode>
    <Router makeLogin={makeLogin} />
  </StrictMode>
)
