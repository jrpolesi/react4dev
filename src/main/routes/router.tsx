import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter
} from '@/main/adapters/current-account-adapter'
import { makeLogin, makeSignUp, makeSurveyList } from '@/main/factories/pages'
import { PrivateRoute } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'
import { SurveyResult } from '@/presentation/pages'
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
          <Route
            index
            element={<PrivateRoute component={makeSurveyList()} />}
          />
          <Route
            path="/surveys"
            element={<PrivateRoute component={<SurveyResult />} />}
          />
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
