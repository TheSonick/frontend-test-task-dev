import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as CurrencyActionCreators from '../store/action-creators/currency'

export const useActions = () => {
   const dispatch = useDispatch()
   return bindActionCreators(CurrencyActionCreators, dispatch)
}
