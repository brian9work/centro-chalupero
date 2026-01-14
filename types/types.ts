import { StaticImageData } from "next/image"

export type Cart = {
   id: string
   name: string
   price: number
   quantity: number;
}

export type Order = {
   type: "delivery" | "pickup"
   address?: string | ""
   references?: string | ""
   name: string | ""
   paymentMethod?: "cash" | "transfer"
   cashAmount?: string | ""
   timeArrive?: string | ""
   branch?: string | ""
}

export type CartList = Cart[];