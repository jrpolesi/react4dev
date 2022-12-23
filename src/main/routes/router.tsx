import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { makeSignUp } from '@/main/factories/pages/signup/signup-factory'
import { SurveyList } from '@/presentation/pages'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={makeLogin()} />
        <Route path="/signup" element={makeSignUp()} />
        <Route index element={<SurveyList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
