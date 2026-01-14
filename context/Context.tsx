import { SaucerType } from '@/types/ResponseTypes';
import { CartList } from '@/types/types';
import { createContext, useContext, useState } from 'react';

type ContextType = {
  cartList: CartList;
  setCartList: React.Dispatch<React.SetStateAction<CartList>>;
  countModal: boolean;
  setCountModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItem: SaucerType | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<SaucerType | null>>;
  cartModal: boolean;
  setCartModal: React.Dispatch<React.SetStateAction<boolean>>;
  optionModal: ModalOption;
  setOptionModal: React.Dispatch<React.SetStateAction<ModalOption>>;
  deliveryModal: boolean;
  setDeliveryModal: React.Dispatch<React.SetStateAction<boolean>>;
}

type ModalOption = "delivery" | "pickup" | "" | null

const Context = createContext<ContextType | undefined>(undefined);

export const MyContext = () => {
  const context = useContext(Context);
  if (!context) throw new Error('MyContext debe usarse dentro de un Provider');
  return context;
};

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [cartList, setCartList] = useState<CartList>([]);
  const [countModal, setCountModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<SaucerType | null>(null);
  const [cartModal, setCartModal] = useState<boolean>(false);

  const [optionModal, setOptionModal] = useState<ModalOption>(null);
  const [deliveryModal, setDeliveryModal] = useState<boolean>(false);
  


  return (
    <Context.Provider value={{
      cartList,
      setCartList,
      countModal,
      setCountModal,
      selectedItem,
      setSelectedItem,
      cartModal,
      setCartModal,
      optionModal,
      setOptionModal,
      deliveryModal,
      setDeliveryModal
    }}>
      {children}
    </Context.Provider>
  );
};
