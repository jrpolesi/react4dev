import PrivateRoute from '@/presentation/components/private-route/private-route'
import { render } from '@testing-library/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const makeSut = (): void => {
  render(
    <BrowserRouter>
      <Routes>
        <Route index element={<PrivateRoute />} />
      </Routes>
    </BrowserRouter>
  )
}

describe('PrivateRoute', () => {
  test('Should redirect to /login if token is empty', () => {
    makeSut()

    expect(location.pathname).toBe('/login')
  })
})
