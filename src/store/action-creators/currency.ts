import { Dispatch } from 'redux'
import { CurrencyAction, CurrencyActionTypes } from './../../types/currency'
import { ICurrency } from '../../types/currency'

export const fetchCurrencies = () => {
   return async (dispatch: Dispatch<CurrencyAction>) => {
      try {
         dispatch({ type: CurrencyActionTypes.FETCH_CURRENCIES })
         const res = await fetch('https://floatrates.com/daily/uah.json')
         const currency = await res.json()
         dispatch({
            type: CurrencyActionTypes.FETCH_CURRENCIES_SUCCESS,
            payload: Object.values<ICurrency>(currency),
         })
         dispatch({
            type: CurrencyActionTypes.SET_FINAL_CURRENCY,
            payload: Object.values<ICurrency>(currency)[0].code,
         })
      } catch (e) {
         dispatch({
            type: CurrencyActionTypes.FETCH_CURRENCIES_ERROR,
            payload: 'An error occurred while loading currencies',
         })
      }
   }
}
export const setFinalCurrency = (finalCurrency: string) => {
   return (dispatch: Dispatch<CurrencyAction>) => {
      dispatch({
         type: CurrencyActionTypes.SET_FINAL_CURRENCY,
         payload: finalCurrency,
      })
   }
}
