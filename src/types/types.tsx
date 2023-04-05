export interface ICartItem {
   id: number
   title: string
   price: number
   currency: string
   qty: number
}

export interface ICurrency {
   code: string
   rate: number
}

export interface ISavedData {
   order: ICartItem[]
   total: number
   finalCurrency: string
}
