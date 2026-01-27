import React, { useEffect } from 'react'
import { CategoryType, MenuType, SaucerType } from '../types/ResponseTypes';
import menu from '../mock/menu.json';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Josefin_Sans } from 'next/font/google';
import { MyContext } from '@/context/Context';

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});


export default function Menu() {
  return (
    <div className=' w-full'>
      <div className='w-11/12 max-w-[900] mx-auto py-5 '>
        {menu.data.map((category, index) => (
          <Category key={category.id} category={category} />
        ))}
      </div>
    </div>
  )
}
const Category = ({ category }: { category: CategoryType }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className='bg-white mb-2 rounded-3xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl'>
      <div
        className='flex flex-row justify-between items-center p-3 cursor-pointer bg-white hover:bg-gray-50 transition-colors duration-300 select-none'
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <span className={`w-1.5 h-6 rounded-full transition-colors duration-300 ${isOpen ? 'bg-orange-500' : 'bg-gray-300'}`}></span>
          <img
            src={category.source}
            alt={category.name}
            width={40}
            height={40}
            className='w-12 h-12 object-contain'
          />
          <h2 className={`${josefinSans.variable} font-sans uppercase font-extrabold text-lg md:text-2xl text-gray-800  tracking-tight`}>
            {category.name}
          </h2>
        </div>

        <div className={`p-2 rounded-full bg-gray-50  text-gray-500 transition-transform duration-500 ${isOpen ? 'rotate-180 bg-orange-50 text-orange-500' : ''}`}>
          <ChevronDown size={22} />
        </div>
      </div>

      <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[2000] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-2 space-y-2 pb-4">
          {category.saucerList.map((saucer) => (
            <Saucer key={saucer.id} saucer={saucer} category={category.name} />
          ))}
        </div>
      </div>
    </div>
  )
}

const Saucer = ({ saucer, category }: { saucer: SaucerType, category: string }) => {
  const { setCountModal, setSelectedItem } = MyContext();

  return (
    <div
      className='group cursor-pointer p-4 rounded-2xl flex items-center justify-between gap-4 hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-100 0'
      onClick={() => {
        setSelectedItem({ ...saucer, category: category });
        setCountModal(true);
      }}
    >
      <div className='flex-1'>
        <h3 className='font-bold text-gray-900 text-lg mb-1 group-hover:text-orange-600 transition-colors'>{saucer.name}</h3>
        <p className='text-gray-500 text-sm line-clamp-2 leading-relaxed font-medium'>
          {saucer.description || "Delicioso platillo preparado con los mejores ingredientes de la casa."}
        </p>
      </div>

      <div className='flex flex-col items-end gap-2 shrink-0'>
        <span className='font-bold text-lg text-orange-500'>${saucer.price.toFixed(2)}</span>
        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </div>
    </div>
  )
}