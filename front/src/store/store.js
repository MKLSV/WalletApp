import { createStore, combineReducers } from 'redux'

import { incomesReducer } from './incomes.reducer.js'
import { spendsReducer } from './spends.reducer.js'

const rootReducer = combineReducers({
    incomesModule: incomesReducer,
    spendsModule: spendsReducer,    
})


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)



