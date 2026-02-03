"use client";
import { MyContext } from '@/context/Context';
import React, { useEffect, useState } from 'react';
import ModalHeader from './ModalHeader';
import ModalComponents from './ModalComponents';
import ExtrasData from '@/mock/extras.json'
import { ExtrasType, SaucerType } from '@/types/ResponseTypes';
import tacoType from '@/mock/tacosType.json'
import quesadillaType from '@/mock/QuesadillasType.json'

export default function CountModal() {
  const { countModal, setCountModal, selectedItem } = MyContext();

  if (!countModal || !selectedItem) return null;

  const handleClose = () => setCountModal(false);

  // Determine if it's a "Charola" that requires the 5-selection form.
  // "Charola de sopes" is explicitly excluded and treated as a standard item.
  const isSpecialCharola = selectedItem.category === "Charolas" && selectedItem.name !== "Charola de sopes";

  return (
    <ModalComponents handleClose={handleClose}>
      <ModalHeader text="Agregar Platillo" handleClose={handleClose} />

      {isSpecialCharola ? (
        <CharolaForm
          selectedItem={selectedItem}
          handleClose={handleClose}
        />
      ) : (
        <StandardForm
          selectedItem={selectedItem}
          handleClose={handleClose}
        />
      )}
    </ModalComponents>
  );
}

// --- Sub-Components ---

const ItemSummary = ({ name, priceChange = "", price }: { name: string, priceChange?: string, price: number }) => (
  <div className="mb-6">
    <p className="text-gray-600 text-sm mb-1">Seleccionaste:</p>
    <div className='flex items-center justify-between'>
      <p className='font-semibold text-lg text-gray-900'>{name} {priceChange}</p>
      <span className='font-bold text-lg text-orange-500'>${price.toFixed(2)}</span>
    </div>
  </div>
);

const QuantityControl = ({ quantity, setQuantity }: { quantity: number, setQuantity: (q: number) => void }) => {
  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
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
        style={{ MozAppearance: 'textfield' }}
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
  );
};

const AddToCartButton = ({ price, quantity }: { price: number, quantity: number }) => (
  <button
    type="submit"
    className="w-full bg-orange-500 text-white py-3.5 rounded-2xl font-semibold shadow-lg shadow-gray-200 hover:bg-orange-600 active:scale-95 transition-all flex items-center justify-center gap-2"
  >
    <span>Agregar al Carrito</span>
    <span className="bg-white/20 px-2 py-0.5 rounded text-sm">
      ${(price * quantity).toFixed(2)}
    </span>
  </button>
);

// --- Forms ---

const StandardForm = ({ selectedItem, handleClose }: { selectedItem: SaucerType, handleClose: () => void }) => {
  const { setCartList, cartList } = MyContext();
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(selectedItem.price);
  const [extras, setExtras] = useState<ExtrasType[]>([]);
  const [changeName, setChangeName] = useState<string>("");

  useEffect(() => {
    setPrice(selectedItem.price);
    setExtras([]);
    setChangeName("");
    setQuantity(1);
  }, [selectedItem]);

  const isGuajolota = selectedItem.category === "Guajolotas";
  const isChalupa = selectedItem.category === "Chalupas";
  const isQuesadilla = selectedItem.category === "Quesadillas";

  const title = isGuajolota ? "Seleccione el sabor" : "Extras";

  const guajolotaType = selectedItem.name.includes("quesadilla") ? quesadillaType : tacoType;

  const extrasList = (() => {
    if (isChalupa) return ExtrasData.chalupa;
    if (isQuesadilla) return ExtrasData.quesadilla;
    return ExtrasData.general;
  })();

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
        id: Date.now().toString(),
        name: selectedItem.name + " " + changeName,
        description: extras.length > 0 ? "%0A *extras*: " + extras.map(extra => extra.name).join(",") : "",
        price: price,
        quantity: quantity,
        selectedOptions: extras.map(extra => extra.name),
      },
    ]);
    handleClose();
  };

  return (
    <>
      <ItemSummary name={selectedItem.name} priceChange={changeName} price={price} />
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <QuantityControl quantity={quantity} setQuantity={setQuantity} />

        {selectedItem.extra && (
          <div className='mt-2'>
            <p className="text-gray-800 font-bold text-lg mb-3">{title}</p>
            <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
              {isGuajolota ? (
                guajolotaType.map((extra, index) => (
                  <SelectedSabor
                    key={`${extra}-${index}`}
                    extra={extra}
                    price={price}
                    setPrice={setPrice}
                    extras={extras}
                    setChangeName={setChangeName}
                    setExtras={setExtras}
                  />
                ))
              ) : (
                extrasList.map((extra: ExtrasType, index: number) => (
                  <ExtraItem
                    key={`${extra.name}-${index}`}
                    extra={extra}
                    price={price}
                    setPrice={setPrice}
                    extras={extras}
                    setExtras={setExtras}
                  />
                ))
              )}
            </div>
          </div>
        )}

        <AddToCartButton price={selectedItem.price} quantity={quantity} />
      </form>
    </>
  );
};

const CharolaForm = (
  { selectedItem, handleClose }:
    { selectedItem: SaucerType, handleClose: () => void }
) => {
  const [price, setPrice] = useState(selectedItem.price);
  const { setCartList, cartList } = MyContext();
  const [quantity, setQuantity] = useState(1);
  const [charolaSelections, setCharolaSelections] = useState<string[]>(Array(5).fill(''));

  useEffect(() => {
    setQuantity(1);
    setCharolaSelections(Array(5).fill(''));
  }, [selectedItem]);

  const handleCharolaSubmit = (e: React.FormEvent, close?: boolean) => {
    e.preventDefault();
    if (charolaSelections.some(s => s === "")) {
      alert("Por favor selecciona todos los sabores.");
      return;
    }

    setCartList([
      ...cartList,
      {
        id: Date.now().toString(),
        name: selectedItem.name,
        description: "%0A " + Object.entries(charolaSelections.reduce((acc, curr) => {
          acc[curr] = (acc[curr] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)).map(([key, value]) => `${value} de ${key}`).join(", "),
        price: price,
        quantity: quantity,
        selectedOptions: charolaSelections,
      },
    ]);
    handleClose();
  };

  const optionList = selectedItem.name.toLowerCase().includes("taco") ? tacoType : quesadillaType;
  const labelText = selectedItem.name.toLowerCase().includes("taco") ? "tacos" : "quesadillas";

  return (
    <>
      <ItemSummary name={selectedItem.name} price={price} />
      <form onSubmit={e => handleCharolaSubmit(e)} className="flex flex-col gap-6">
        <QuantityControl quantity={quantity} setQuantity={setQuantity} />

        <p className='text-gray-800'>
          {JSON.stringify(charolaSelections)}
        </p>

        <div className='mt-2'>
          <p className="text-gray-800 font-bold text-lg mb-3">
            Elige tus 5 {labelText}
          </p>
          <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
            {Array.from({ length: 5 }).map((_, index) => (
              <SelectedOption
                key={index}
                index={index}
                labelText={labelText}
                charolaSelections={charolaSelections}
                setCharolaSelections={setCharolaSelections}
                list={optionList}
                setPrice={setPrice}
                price={price}
              />
            ))}
          </div>
        </div>
        <AddToCartButton price={price} quantity={quantity} />
      </form>
    </>
  );
};

const SelectedOption = (
  { index, labelText, charolaSelections, setCharolaSelections, list, setPrice, price }:
    {
      index: number,
      labelText: string,
      charolaSelections: string[],
      setCharolaSelections: React.Dispatch<React.SetStateAction<string[]>>,
      list: string[],
      setPrice: React.Dispatch<React.SetStateAction<number>>,
      price: number
    }
) => {
  const currentSelection = charolaSelections[index] || "";
  const baseFlavor = currentSelection.replace(" con quesillo", "");
  const hasQuesillo = currentSelection.includes(" con quesillo");

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {labelText === "tacos" ? "Taco" : "Quesadilla"} {index + 1}
      </label>
      <select
        value={baseFlavor}
        onChange={(e) => {
          const newFlavor = e.target.value;
          const newSelections = [...charolaSelections];
          newSelections[index] = hasQuesillo ? `${newFlavor} con quesillo` : newFlavor;
          setCharolaSelections(newSelections);
        }}
        className="w-full p-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
        required
      >
        <option value="" disabled>Selecciona un sabor</option>
        {list.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      {labelText === "quesadillas" &&
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id={`quesillo-${index}`}
            checked={hasQuesillo}
            onChange={(e) => {
              const checked = e.target.checked;
              const newSelections = [...charolaSelections];

              if (checked) {
                newSelections[index] = `${baseFlavor} con quesillo`;
                setPrice((prev) => prev + 5);
              } else {
                newSelections[index] = baseFlavor;
                setPrice((prev) => prev - 5);
              }
              setCharolaSelections(newSelections);
            }}
            disabled={!baseFlavor}
          />
          <label
            htmlFor={`quesillo-${index}`}
            className={`text-gray-800 ${!baseFlavor ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            Con quesillo
          </label>
        </div>
      }
    </div>
  )
}

// --- Item Helpers ---

const ExtraItem = ({ extra, price, setPrice, extras, setExtras }: { extra: ExtrasType, price: number, setPrice: React.Dispatch<React.SetStateAction<number>>, extras: ExtrasType[], setExtras: React.Dispatch<React.SetStateAction<ExtrasType[]>> }) => {
  return (
    <label
      htmlFor={`extra-${extra.name}`}
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
          id={`extra-${extra.name}`}
          className="w-5 h-5 rounded-md border-gray-300 text-orange-500 focus:ring-orange-200 cursor-pointer accent-orange-500"
        />
        <span className="text-gray-700 font-medium group-hover:text-gray-900">{extra.name}</span>
      </div>
      <span className="text-orange-500 font-bold bg-orange-50 px-2.5 py-1 rounded-lg text-sm group-hover:bg-white border border-transparent group-hover:border-orange-100 transition-colors">
        +${Number(extra.price).toFixed(2)}
      </span>
    </label>
  )
}

const SelectedSabor = ({ extra, extras, setExtras, setChangeName }: { extra: string, price: number, setPrice: React.Dispatch<React.SetStateAction<number>>, extras: ExtrasType[], setExtras: React.Dispatch<React.SetStateAction<ExtrasType[]>>, setChangeName: React.Dispatch<React.SetStateAction<string>> }) => {
  const isChecked = extras.some((item) => item.name === extra);

  return (
    <label
      htmlFor={`extra-${extra}`}
      className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer group ${isChecked ? 'border-orange-500 bg-orange-50' : 'border-gray-100 bg-white hover:border-orange-200'}`}
    >
      <div className="flex items-center gap-3">
        <input
          onChange={() => {
            setExtras([{
              name: extra,
              price: 0
            }]);
            setChangeName(extra);
          }}
          checked={isChecked}
          name='sabor'
          type="radio"
          id={`extra-${extra}`}
          className="w-5 h-5 rounded-full border-gray-300 text-orange-500 focus:ring-orange-200 cursor-pointer accent-orange-500"
        />
        <span className={`font-medium ${isChecked ? 'text-orange-700' : 'text-gray-700 group-hover:text-gray-900'}`}>{extra}</span>
      </div>
    </label>
  )
}