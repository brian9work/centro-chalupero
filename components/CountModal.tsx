"use client";
import { MyContext } from '@/context/Context';
import React, { useEffect, useState } from 'react';
import ModalHeader from './ModalHeader';
import ModalComponents from './ModalComponents';
import ExtrasData from '@/mock/extras.json'
import { ExtrasType } from '@/types/ResponseTypes';

export default function CountModal() {
  const { countModal, setCountModal, selectedItem, setCartList, cartList } = MyContext();
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(selectedItem?.price || 0);
  const [extras, setExtras] = useState<ExtrasType[]>([]);

  useEffect(() => {
    setPrice(selectedItem?.price || 0);
    setExtras([]);
  }, [selectedItem]);

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
        description: extras.length > 0 ? "%0A *extras*: " + extras.map(extra => extra.name).join(",") : "",
        price: price,
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
          <span className='font-bold text-lg text-orange-500'>${price.toFixed(2)}</span>
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
            className="w-10 h-10 flex items-center justify-center bg-orange-500 rounded-xl shadow-md shadow-orange-200 text-white hover:bg-orange-600 active:scale-95 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {selectedItem?.extra && (
          <div className='mt-2'>
            <p className="text-gray-800 font-bold text-lg mb-3">Extras</p>
            <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
              {selectedItem?.name.includes("Quesadilla") ?
                <label
                  htmlFor={`extra-quesa`}
                  className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-white shadow-sm hover:border-orange-200 hover:bg-orange-50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <input
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPrice(price + 5);
                          setExtras([...extras, {name: " ",price: 5}]);
                        } else {
                          setPrice(price - 5);
                          setExtras(extras.filter((item) => item.name !== "quesillo"));
                        }
                      }}
                      type="checkbox"
                      id={`extra-quesa`}
                      className="w-5 h-5 rounded-md border-gray-300 text-orange-500 focus:ring-orange-200 cursor-pointer accent-orange-500"
                    />
                    <span className="text-gray-700 font-medium group-hover:text-gray-900">Quesillo</span>
                  </div>
                  <span className="text-orange-500 font-bold bg-orange-50 px-2.5 py-1 rounded-lg text-sm group-hover:bg-white border border-transparent group-hover:border-orange-100 transition-colors">
                    +${5.00}
                  </span>
                </label>
                : <></>

              }
              {ExtrasData.map((extra: ExtrasType, index: number) => (
                <label
                  key={`${extra.name}-${index}`}
                  htmlFor={`extra-${index}`}
                  className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-white shadow-sm hover:border-orange-200 hover:bg-orange-50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <input
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPrice(price + extra.price);
                          setExtras([...extras, extra]);
                        } else {
                          setPrice(price - extra.price);
                          setExtras(extras.filter((item) => item.name !== extra.name));
                        }
                      }}
                      type="checkbox"
                      id={`extra-${index}`}
                      className="w-5 h-5 rounded-md border-gray-300 text-orange-500 focus:ring-orange-200 cursor-pointer accent-orange-500"
                    />
                    <span className="text-gray-700 font-medium group-hover:text-gray-900">{extra.name}</span>
                  </div>
                  <span className="text-orange-500 font-bold bg-orange-50 px-2.5 py-1 rounded-lg text-sm group-hover:bg-white border border-transparent group-hover:border-orange-100 transition-colors">
                    +${Number(extra.price).toFixed(2)}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}



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
