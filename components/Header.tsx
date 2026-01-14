import { MyContext } from '@/context/Context';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

export default function Header() {
  const { cartList, setCartModal } = MyContext();

  return (
    <div className='fixed top-0 left-0 w-full z-50 flex items-center justify-between p-4 py-2 bg-white  shadow-md'>
      <div className='flex flex-row items-center justify-center'>
        <Image
          src={"/logo.png"}
          alt="SushiMaki Logo"
          width={512}
          height={512}
          className='w-16 h-16 object-contain'
        />
        <h1 className='font-bold text-2xl text-gray-800'>Centro Chalupero</h1>
      </div>
      <div
        className="flex flex-row items-center gap-2 cursor-pointer rounded-md bg-orange-400 px-3 py-2 text-sm font-medium text-foreground hover:bg-orange-600"
        onClick={() => setCartModal(true)}
      >
        <p className='text-xl text-white'>{cartList.length}</p>
        <ShoppingCart className='inline-block mr-2 text-white' size={16} />
      </div>
    </div>
  )
}

