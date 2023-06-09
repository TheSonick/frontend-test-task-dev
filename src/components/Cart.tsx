import React, { useState, useCallback, useEffect } from 'react'
import { ICartItem, ISavedData } from '../types/types'
import { ICurrency } from '../types/currency'
import { LegacyStack, Divider } from '@shopify/polaris'
import { useTypedSelector } from '../hooks/useTypedSelector'
import defaultCartItems from '../cartItems'
import CartItems from './CartItems'
import Actions from './Actions'

const Cart = () => {
   const [cartItems, setCartItems] = useState<ICartItem[]>(defaultCartItems)
   const [isSending, setIsSending] = useState<boolean>(false)
   const [total, setTotal] = useState<number>(0)

   //Work with currencies
   const { currencies, finalCurrency } = useTypedSelector(
      (state) => state.currencies
   )
   //----------------------------------------------------------

   //Calculating total cart value
   const calculateTotal = useCallback(
      (
         cartItems: ICartItem[],
         currencies: ICurrency[] | undefined,
         finalCurrency: string
      ) => {
         setTotal(
            Number(
               cartItems
                  .reduce((acc: number, item) => {
                     const finalCurrencyRate = currencies?.find(
                        (currency) => currency.code === finalCurrency
                     )?.rate
                     const itemCurrencyRate = currencies?.find(
                        (currency) => currency.code === item.currency
                     )?.rate
                     if (finalCurrencyRate && itemCurrencyRate) {
                        const ratio = finalCurrencyRate / itemCurrencyRate
                        acc += item.price * item.qty * ratio
                     }
                     return acc
                  }, 0)
                  .toFixed(2)
            )
         )
      },
      []
   )
   //----------------------------------------------------------

   //Adding item to cart
   const handleAddItem = (
      cartItems: ICartItem[],
      currencies: ICurrency[] | undefined
   ) => {
      const id = cartItems.length + 1
      const title = `Product Text Field ` + (cartItems.length + 1)
      const price = Number((Math.random() * 100).toFixed(2))
      if (currencies) {
         const currency =
            currencies[Math.floor(Math.random() * currencies.length)].code
         const qty = Math.ceil(Math.random() * 10)
         const item: ICartItem = {
            id,
            title,
            price,
            currency,
            qty,
         }
         const newCartItems = [...cartItems, item]
         setCartItems(newCartItems)
      }
   }
   //----------------------------------------------------------

   //Save button handler
   const sendData = async (url: string, data: string) => {
      const response = await fetch(url, {
         method: 'POST',
         body: data,
      })
      if (!response.ok) {
         throw new Error(`Data wasn't send`)
      }
      setIsSending(false)
      return await response.json()
   }
   const handleSaveButton = (
      cartItems: ICartItem[],
      finalCurrency: string,
      total: number
   ) => {
      const savedData = {} as ISavedData
      savedData.order = cartItems
      savedData.total = total
      savedData.finalCurrency = finalCurrency
      setIsSending(true)
      sendData(
         'https://floatrates.com/daily/uah.json',
         JSON.stringify(savedData)
      )
         .then(() => {
            alert('Data saved successfully')
         })
         .catch((e) => {
            throw new Error(`Data wasn't send`)
         })
   }
   //----------------------------------------------------------

   useEffect(() => {
      calculateTotal(cartItems, currencies, finalCurrency)
   }, [calculateTotal, cartItems, currencies, finalCurrency])

   return (
      <LegacyStack spacing="loose" vertical>
         <CartItems
            cartItems={cartItems}
            finalCurrency={finalCurrency}
            total={total}
         />
         <Divider borderStyle="dark" />
         <LegacyStack distribution="trailing">
            <Actions
               cartItems={cartItems}
               total={total}
               isSending={isSending}
               handleAddItem={handleAddItem}
               handleSaveButton={handleSaveButton}
            />
         </LegacyStack>
      </LegacyStack>
   )
}

export default Cart
