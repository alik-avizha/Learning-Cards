import { Provider } from 'react-redux'

import { Header } from './components/ui'
import { Router } from './router.tsx'
import { store } from './services/store.ts'

export function App() {
  return (
    <Provider store={store}>
      <Header isAuth={true} />
      <Router />
    </Provider>
  )
}
