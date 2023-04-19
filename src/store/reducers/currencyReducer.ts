import {
   CurrencyState,
   CurrencyAction,
   CurrencyActionTypes,
} from '../../types/currency'

const initialState: CurrencyState = {
   currencies: [],
   loading: false,
   error: null,
   finalCurrency: '',
}

export const currencyReducer = (
   state = initialState,
   action: CurrencyAction
): CurrencyState => {
   switch (action.type) {
      case CurrencyActionTypes.FETCH_CURRENCIES:
         return {
            loading: true,
            error: null,
            currencies: [],
            finalCurrency: '',
         }
      case CurrencyActionTypes.FETCH_CURRENCIES_SUCCESS:
         return {
            loading: false,
            error: null,
            currencies: action.payload,
            finalCurrency: action.payload[0],
         }
      case CurrencyActionTypes.FETCH_CURRENCIES_ERROR:
         return {
            loading: false,
            error: action.payload,
            currencies: [],
            finalCurrency: '',
         }
      case CurrencyActionTypes.SET_FINAL_CURRENCY:
         return {
            loading: false,
            error: null,
            currencies: [...state.currencies],
            finalCurrency: action.payload,
         }
      default:
         return state
   }
}
