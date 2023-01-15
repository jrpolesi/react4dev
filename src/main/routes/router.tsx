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
import { currentAccountState, PrivateRoute } from '@/presentation/components'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

const Router: React.FC = () => {
  const state = {
    setCurrentAccount: setCurrentAccountAdapter,
    getCurrentAccount: getCurrentAccountAdapter
  }

  return (
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, state)}>
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
    </RecoilRoot>
  )
}

export default Router
