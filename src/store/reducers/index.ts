import { combineReducers } from 'redux'
import { currencyReducer } from './currencyReducer'

export const rootReducer = combineReducers({
   currencies: currencyReducer,
})

export type RootState = ReturnType<typeof rootReducer>
