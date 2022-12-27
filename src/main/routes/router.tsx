import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter
} from '@/main/adapters/current-account-adapter'
import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { makeSignUp } from '@/main/factories/pages/signup/signup-factory'
import { PrivateRoute } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'
import { SurveyList } from '@/presentation/pages'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={makeLogin()} />
          <Route path="/signup" element={makeSignUp()} />
          <Route index element={<PrivateRoute component={<SurveyList />} />} />
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
