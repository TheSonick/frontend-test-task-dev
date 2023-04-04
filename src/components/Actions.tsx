import React, { FC, useMemo } from 'react'
import { ICartItem, ICurrency } from '../types/types'
import { Select, Button, ButtonGroup } from '@shopify/polaris'

interface ActionsProps {
   cartItems: ICartItem[]
   currencies: ICurrency[] | undefined
   total: number
   finalCurrency: string
   isLoading: boolean
   isSending: boolean
   handleFinalCurrencyChange: (value: string) => void
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
const Actions: FC<ActionsProps> = ({
   cartItems,
   currencies,
   total,
   finalCurrency,
   isLoading,
   isSending,
   handleSaveButton,
   handleFinalCurrencyChange,
   handleAddItem,
}) => {
   const currenciesForSelect = useMemo(
      () =>
         currencies?.map(({ code }: ICurrency) => ({
            label: code,
            value: code,
         })),
      [currencies]
   )
   return (
      <ButtonGroup>
         <Button
            disabled={isLoading ? true : false}
            onClick={() => handleAddItem(cartItems, currencies)}
            outline
         >
            Add product +
         </Button>
         <Select
            labelInline
            label="Final Currency:"
            options={currenciesForSelect}
            onChange={handleFinalCurrencyChange}
            value={finalCurrency}
         />
         <Button
            loading={isSending ? true : false}
            disabled={isLoading ? true : false}
            onClick={() => handleSaveButton(cartItems, finalCurrency, total)}
            primary
         >
            Save
         </Button>
      </ButtonGroup>
   )
}
export default Actions
