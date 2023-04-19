import React from 'react'
import { ICartItem } from '../types/types'
import { ICurrency } from '../types/currency'
import { useTypedSelector } from '../hooks/useTypedSelector'
import SelectCurrencies from './CurrencySelection'
import { Button, ButtonGroup } from '@shopify/polaris'

interface ActionsProps {
   cartItems: ICartItem[]
   total: number
   isSending: boolean
   handleAddItem: (
      cartItems: ICartItem[],
      currencies: ICurrency[] | undefined
   ) => void
   handleSaveButton: (
      cartItems: ICartItem[],
      finalCurrency: string,
      total: number
   ) => void
}
const Actions: React.FC<ActionsProps> = ({
   cartItems,
   total,
   isSending,
   handleSaveButton,
   handleAddItem,
}) => {
   const { currencies, loading, finalCurrency } = useTypedSelector(
      (state) => state.currencies
   )

   return (
      <ButtonGroup>
         <Button
            disabled={loading ? true : false}
            onClick={() => handleAddItem(cartItems, currencies)}
            outline
         >
            Add product +
         </Button>
         <SelectCurrencies />
         <Button
            loading={isSending ? true : false}
            disabled={loading ? true : false}
            onClick={() => handleSaveButton(cartItems, finalCurrency, total)}
            primary
         >
            Save
         </Button>
      </ButtonGroup>
   )
}
export default Actions
