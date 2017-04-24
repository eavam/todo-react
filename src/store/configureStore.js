import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/rootReducer'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

const loggerMiddleware = createLogger()

let middlewares = [thunkMiddleware]

if( process.env.NODE_ENV !== 'production' ) {
  middlewares = [ ...middlewares, loggerMiddleware ]
}

const configureStore = (initialState) => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  )

  return store
}

export default configureStore