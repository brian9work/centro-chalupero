import React from 'react'

export default function ModalComponents({ handleClose, children }: { handleClose: () => void, children: React.ReactNode }) {
   return (
      <div className='
         bg-black/60
         backdrop-blur-sm
         fixed z-50 left-0 top-0
         w-full min-h-svh
         flex justify-center items-center
         transition-opacity duration-300
      '>
         <div className="absolute inset-0" onClick={handleClose}></div>
         <div className='
               bg-white rounded-3xl 
               w-11/12 max-w-md 
               shadow-2xl z-10 
               flex flex-col 
               overflow-hidden animate-slide-in max-h-[90vh] 
               p-3
            '>
            {children}
         </div>
      </div>
   )
}
