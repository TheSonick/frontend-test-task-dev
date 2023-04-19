import React, { useEffect, useMemo } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { Select, InlineError } from '@shopify/polaris'
import { ICurrency } from '../types/currency'
import { useActions } from '../hooks/useActions'

const CurrencySelection: React.FC = () => {
   const { currencies, loading, error, finalCurrency } = useTypedSelector(
      (state) => state.currencies
   )

   const { fetchCurrencies, setFinalCurrency } = useActions()

   const handleFinalCurrencyChange = (value: string) => {
      setFinalCurrency(value)
   }

   const currenciesForSelect = useMemo(
      () =>
         currencies?.map(({ code }: ICurrency) => ({
            label: code,
            value: code,
         })),
      [currencies]
   )

   useEffect(() => {
      fetchCurrencies()
   }, [])

   if (error) {
      return <InlineError message={error} fieldID="error" />
   }
   return (
      <Select
         labelInline
         label="Final Currency:"
         options={currenciesForSelect}
         onChange={handleFinalCurrencyChange}
         value={finalCurrency}
         disabled={loading}
         error={!!error}
      />
   )
}
export default CurrencySelection
