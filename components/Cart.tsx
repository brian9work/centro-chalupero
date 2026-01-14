import { MyContext } from '@/context/Context';
import React, { useMemo } from 'react';
import ModalHeader from './ModalHeader';
import ModalComponents from './ModalComponents';

export default function Cart() {
   const { cartModal, setCartModal, cartList, setCartList, setOptionModal } = MyContext();

   const total = useMemo(() => {
      return cartList.reduce((acc, item) => acc + (item.price * item.quantity), 0);
   }, [cartList]);

   if (!cartModal) return null;

   const handleClose = () => setCartModal(false);

   const handleRemoveItem = (id: string) => {
      setCartList(prev => prev.filter(item => item.id !== id));
   };

   const handleIncrement = (id: string) => {
      setCartList(prev => prev.map(item =>
         item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ));
   };

   const handleDecrement = (id: string) => {
      setCartList(prev => prev.map(item =>
         item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      ));
   };

   const sendOrder = () => {
      if (cartList.length === 0) return;
      setOptionModal("");
      setCartModal(false);
   };

   return (
      <ModalComponents handleClose={handleClose}>
         <ModalHeader text="Tu Carrito" handleClose={handleClose} />

         {/* Content */}
         <div className="flex-1 overflow-y-auto max-h-[60vh] p-5 space-y-4">
            {cartList.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-10 text-center text-gray-400 opacity-60">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p>Tu carrito está vacío</p>
               </div>
            ) : (
               cartList.map((item, index) => (
                  <div key={item.id || index} className="flex gap-4 p-3 bg-gray-50 rounded-2xl items-center shadow-sm">
                     {/* Placeholder Image or Icon */}
                     <div className="h-16 w-16 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm border border-gray-100 shrink-0">
                         🌯️
                     </div>

                     <div className="flex-1">
                        <h4 className="font-bold text-gray-800 line-clamp-1">{item.name}</h4>
                        <p className="text-gray-500 text-xs mb-2">${item.price}</p>

                        <div className="flex items-center gap-2">
                           <button
                              onClick={() => item.id && handleDecrement(item.id)}
                              className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-600"
                           >
                              -
                           </button>
                           <span className="font-semibold w-6 text-center text-sm text-black">{item.quantity}</span>
                           <button
                              onClick={() => item.id && handleIncrement(item.id)}
                              className="w-6 h-6 flex items-center justify-center bg-black rounded-lg hover:bg-gray-800 text-white"
                           >
                              +
                           </button>
                        </div>
                     </div>

                     <div className='flex flex-col items-end gap-2'>
                        <span className="font-bold text-rose-500">${(item.price * item.quantity).toFixed(2)}</span>
                        <button
                           onClick={() => item.id && handleRemoveItem(item.id)}
                           className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                           title="Eliminar"
                        >
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                           </svg>
                        </button>
                     </div>
                  </div>
               ))
            )}
         </div>

         {/* Footer */}
         {cartList.length > 0 && (
            <div className="p-5 border-t border-gray-100 bg-white shrink-0">
               <div className="flex justify-between items-end mb-4">
                  <span className="text-gray-500">Total</span>
                  <span className="text-3xl font-bold text-gray-900">${total.toFixed(2)}</span>
               </div>

               <button
                  onClick={sendOrder}
                  className="w-full py-3 bg-black text-white rounded-xl font-bold shadow-lg shadow-gray-200 hover:bg-gray-800 transition-all active:scale-95 flex justify-center items-center gap-2"
               >
                  <span>Ordenar Ahora</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                     <path width="24" height="24" fill="none" />
                     <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" />
                  </svg>
               </button>
            </div>
         )}
      </ModalComponents>
   )
}
