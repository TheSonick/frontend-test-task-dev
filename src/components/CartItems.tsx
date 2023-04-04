import React, { FC } from 'react'
import { ICartItem } from '../types/types'
import { DataTable } from '@shopify/polaris'

interface CartItemsProps {
   cartItems: ICartItem[]
   finalCurrency: string
   total: number
}

const CartItems: FC<CartItemsProps> = ({ cartItems, finalCurrency, total }) => {
   const rows = cartItems.map((item) => [
      item.title,
      'QTY: ' + item.qty,
      'Currency: ' + item.currency,
   ])
   return (
      <DataTable
         columnContentTypes={['text', 'numeric', 'numeric']}
         headings={[]}
         rows={rows}
         totals={[
            '',
            '',
            finalCurrency === '' ? '' : total + ` ` + finalCurrency,
         ]}
         showTotalsInFooter
      />
   )
}
export default CartItems
