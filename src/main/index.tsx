import '@/presentation/styles/global.scss'

import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { makeSignUp } from '@/main/factories/pages/signup/signup-factory'
import { Router } from '@/presentation/components'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement as Element)

root.render(
  <StrictMode>
    <Router makeLogin={makeLogin} makeSignUp={makeSignUp} />
  </StrictMode>
)
