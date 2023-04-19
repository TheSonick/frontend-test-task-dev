export interface ICurrency {
   code: string
   rate: number
}

export interface CurrencyState {
   currencies: any[]
   loading: boolean
   error: null | string
   finalCurrency: string
}
export enum CurrencyActionTypes {
   FETCH_CURRENCIES = 'FETCH_CURRENCIES',
   FETCH_CURRENCIES_SUCCESS = 'FETCH_CURRENCIES_SUCCESS',
   FETCH_CURRENCIES_ERROR = 'FETCH_CURRENCIES_ERROR',
   SET_FINAL_CURRENCY = 'SET_FINAL_CURRENCY',
}
interface FetchCurrenciesAction {
   type: CurrencyActionTypes.FETCH_CURRENCIES
}
interface FetchCurrenciesSuccessAction {
   type: CurrencyActionTypes.FETCH_CURRENCIES_SUCCESS
   payload: any[]
}
interface FetchCurrenciesErrorAction {
   type: CurrencyActionTypes.FETCH_CURRENCIES_ERROR
   payload: string
}
interface SetFinalCurrency {
   type: CurrencyActionTypes.SET_FINAL_CURRENCY
   payload: string
}

export type CurrencyAction =
   | FetchCurrenciesAction
   | FetchCurrenciesSuccessAction
   | FetchCurrenciesErrorAction
   | SetFinalCurrency
