import { ReactElement } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

type Factory = {
  makeLogin: () => ReactElement
  makeSignUp: () => ReactElement
}

const Router: React.FC<Factory> = (factory: Factory) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={factory.makeLogin()} />
        <Route path="/signup" element={factory.makeSignUp()} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
