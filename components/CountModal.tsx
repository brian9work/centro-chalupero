import { MyContext } from '@/context/Context';
import React, { useState } from 'react';
import ModalHeader from './ModalHeader';
import ModalComponents from './ModalComponents';

export default function CountModal() {
  const { countModal, setCountModal, selectedItem, setCartList, cartList } = MyContext();
  const [quantity, setQuantity] = useState(1);

  if (!countModal) return null;
  if (!selectedItem) return null;

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleClose = () => {
    setCountModal(false);
    setQuantity(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if item already exists in cart
    const isAlreadyInCart = cartList.some((item) => item.id === selectedItem.id);

    if (isAlreadyInCart) {
      alert("Este platillo ya está en tu carrito. Puedes modificar la cantidad desde allí.");
      handleClose();
      return;
    }

    setCartList([
      ...cartList,
      {
        id: selectedItem.id,
        name: selectedItem.name,
        price: selectedItem.price,
        quantity: quantity,
      },
    ]);
    handleClose();
  };

  return (
    <ModalComponents handleClose={handleClose}>
      <ModalHeader text="Agregar Platillo" handleClose={handleClose} />

      <div className="mb-6">
        <p className="text-gray-600 text-sm mb-1">Seleccionaste:</p>
        <div className='flex items-center justify-between'>
          <p className='font-semibold text-lg text-gray-900'>{selectedItem.name}</p>
          <span className='font-bold text-lg text-orange-500'>${selectedItem.price.toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-2 border border-gray-100">
          <button
            type="button"
            onClick={handleDecrement}
            className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm border border-gray-200 text-gray-600 hover:bg-gray-50 active:scale-95 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 text-center bg-transparent font-bold text-xl text-gray-800 focus:outline-none appearance-none m-0"
            style={{ MozAppearance: 'textfield' }} // Removes spinner on Firefox
          />

          <button
            type="button"
            onClick={handleIncrement}
            className="w-10 h-10 flex items-center justify-center bg-rose-500 rounded-xl shadow-md shadow-rose-200 text-white hover:bg-rose-600 active:scale-95 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-3.5 rounded-2xl font-semibold shadow-lg shadow-gray-200 hover:bg-gray-800 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span>Agregar al Carrito</span>
          <span className="bg-white/20 px-2 py-0.5 rounded text-sm">
            ${(selectedItem.price * quantity).toFixed(2)}
          </span>
        </button>
      </form>
    </ModalComponents>
  )
}
