import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter
} from '@/main/adapters/current-account-adapter'
import {
  makeLogin,
  makeSignUp,
  makeSurveyList,
  makeSurveyResult
} from '@/main/factories/pages'
import { PrivateRoute } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

const Router: React.FC = () => {
  return (
    <RecoilRoot>
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
            <Route
              index
              element={<PrivateRoute component={makeSurveyList()} />}
            />
            <Route
              path="/surveys/:id"
              element={<PrivateRoute component={makeSurveyResult()} />}
            />
          </Routes>
        </BrowserRouter>
      </ApiContext.Provider>
    </RecoilRoot>
  )
}

export default Router
