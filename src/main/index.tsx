import './global.scss'

import Login from '@/presentation/pages/login/login'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement as Element)

root.render(
  <StrictMode>
    <Login />
  </StrictMode>
)
