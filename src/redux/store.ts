import { createStore, applyMiddleware } from 'redux'

// REDUCER
import reducers from './reducers'
import { loggerApp, InitialAppState} from './middlewares'

export const Store = createStore(
  reducers,
  InitialAppState,
  applyMiddleware(loggerApp)
)

export default Store
