import React, { useState } from 'react'
import ModalComponents from './ModalComponents'
import ModalHeader from './ModalHeader'
import { MyContext } from '@/context/Context';
import { HandPlatter, House, Banknote, Smartphone, Copy, Check } from 'lucide-react';
import sendMessage from '@/functions/sendMessage';
import { Order } from '@/types/types';
import sucursales, { deliveryCost } from '@/utils/sucursales';

export default function SelectedOption() {
   const { optionModal, setOptionModal } = MyContext();

   const handleClose = () => {

      setOptionModal(
         (optionModal === "delivery" || optionModal === "pickup") ? "" : null
      );
   };

   if (optionModal === null) return null;

   return (
      <ModalComponents handleClose={handleClose}>
         <div className='max-h-[80vh] overflow-auto'>
            {optionModal === "" && <Selected />}
            {optionModal === "delivery" && <Delivery />}
            {optionModal === "pickup" && <Pickup />}
         </div>
      </ModalComponents>
   )
}

const Selected = () => {
   const { optionModal, setOptionModal } = MyContext();
   const handleClose = () => setOptionModal(null);

   return (
      <>
         <ModalHeader text="¿Como recogera su pedido?" handleClose={handleClose} />
         <div className='flex flex-row text-black'>
            <div
               className='
                     flex-1 flex items-center justify-center flex-col 
                     p-3 shadow-md rounded-xl 
                     bg-white cursor-pointer m-2 
                     hover:bg-gray-100 transition-colors
                  '
               onClick={() => setOptionModal("pickup")}
            >
               <HandPlatter size={48} />
               <span className='text-center'>Recoger en restaurante</span>
            </div>
            <div
               className='
                     flex-1 flex items-center justify-center flex-col 
                     p-3 shadow-md rounded-xl 
                     bg-white cursor-pointer m-2 
                     hover:bg-gray-100 transition-colors
                  '
               onClick={() => setOptionModal("delivery")}
            >
               <House size={48} />
               <span className='text-center'>Entrega a domicilio</span>
            </div>
         </div>
      </>
   )
}

const Delivery = () => {
   const { setOptionModal, cartList } = MyContext();
   const [form, setForm] = useState<Order>({
      type: "delivery",
      address: "",
      references: "",
      name: "",
      paymentMethod: "cash",
      cashAmount: ""
   });

   const [copied, setCopied] = useState(false);

   const handleBack = () => setOptionModal("");

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Handle the submit logic here provided by the context or API
      sendMessage(form, cartList);
      console.log("Datos de envio:", form);
   };

   const transferData = {
      bank: "BBVA",
      clabe: "4152 3140 9745 4055",
      beneficiary: "Rosario Martinez Gonzalez"
   };

   const copyToClipboard = () => {
      const text = `Banco: ${transferData.bank}\nCLABE: ${transferData.clabe}\nBeneficiario: ${transferData.beneficiary}`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
   };

   return (
      <div className='w-full'>
         <ModalHeader text="Datos de Envío" handleClose={handleBack} />
         <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2 px-1 text-black">

            <div className="flex flex-col gap-1">
               <label className="text-sm font-semibold text-gray-600">Nombre</label>
               <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10"
                  placeholder="Nombre de quien recibe"
                  required
               />
            </div>

            <div className="flex flex-col gap-1">
               <label className="text-sm font-semibold text-gray-600">Dirección</label>
               <input
                  type="text"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10"
                  placeholder="Calle, número, colonia..."
                  required
               />
            </div>

            <div className="flex flex-col gap-1">
               <label className="text-sm font-semibold text-gray-600">Referencias</label>
               <textarea
                  rows={2}
                  value={form.references}
                  onChange={(e) => setForm({ ...form, references: e.target.value })}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 resize-none"
                  placeholder="Color de casa, entre calles, portón..."
               />
            </div>

            <div className="flex flex-col gap-2">
               <label className="text-sm font-semibold text-gray-600">Método de pago</label>
               <div className="flex gap-2">
                  <button
                     type="button"
                     onClick={() => setForm({ ...form, paymentMethod: "cash" })}
                     className={`flex-1 p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${form.paymentMethod === "cash"
                        ? "bg-black text-white border-black"
                        : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                        }`}
                  >
                     <Banknote size={24} />
                     <span className="text-sm font-medium">Efectivo</span>
                  </button>
                  <button
                     type="button"
                     onClick={() => setForm({ ...form, paymentMethod: "transfer" })}
                     className={`flex-1 p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${form.paymentMethod === "transfer"
                        ? "bg-black text-white border-black"
                        : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                        }`}
                  >
                     <Smartphone size={24} />
                     <span className="text-sm font-medium">Transferencia</span>
                  </button>
               </div>

               {/* Conditional rendering based on payment method */}
               {form.paymentMethod === "cash" && (
                  <div className="mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                     <label className="text-sm font-semibold text-gray-600">¿Con cuánto vas a pagar?</label>
                     <div className="relative mt-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <input
                           type="number"
                           value={form.cashAmount}
                           onChange={(e) => setForm({ ...form, cashAmount: e.target.value })}
                           className="w-full pl-7 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10"
                           placeholder="Ej. 200, 500..."
                           required={form.paymentMethod === "cash"}
                        />
                     </div>
                     <p className="text-xs text-gray-400 mt-1">Llevaremos el cambio exacto.</p>
                  </div>
               )}

               {form.paymentMethod === "transfer" && (
                  <div className="mt-2 bg-gray-50 p-4 rounded-xl border border-gray-200 animate-in fade-in slide-in-from-top-2 duration-300">
                     <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-800">Datos Bancarios</h4>
                        <button
                           type="button"
                           onClick={copyToClipboard}
                           className="flex items-center gap-1 text-xs bg-white border border-gray-300 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors"
                        >
                           {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                           {copied ? "Copiado" : "Copiar"}
                        </button>
                     </div>
                     <div className="space-y-1 text-sm text-gray-600">
                        <p><span className="font-medium">Banco:</span> {transferData.bank}</p>
                        <p><span className="font-medium">CLABE:</span> {transferData.clabe}</p>
                        <p><span className="font-medium">Beneficiario:</span> {transferData.beneficiary}</p>
                     </div>
                     <p className="text-xs text-amber-600 mt-3 bg-amber-50 p-2 rounded-lg border border-amber-100">
                        * Por favor mandarnos captura de pantalla de que la transferencia ya esté realizada.
                     </p>
                  </div>
               )}
            </div>

            <div className='flex flex-col justify-center items-end gap-1 mt-2'>
               <p className='text-sm text-gray-700'>Total sin costo de envio: <span className='font-bold'>${cartList.reduce((total, item) => total + (item.price * item.quantity), 0)}</span></p>
               <p className='text-sm text-gray-700'>El costo de envio es de: <span className='font-bold'>${deliveryCost}</span></p>
               <p className='text-xl text-gray-700'>Total con costo de envio: <span className='font-bold'>${cartList.reduce((total, item) => total + (item.price * item.quantity), 0) + deliveryCost}</span></p>
            </div>

            <button type="submit" className="mt-4 w-full cursor-pointer bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg">
               Confirmar Pedido
            </button>
         </form>
      </div>
   )
}
const Pickup = () => {
   const { setOptionModal, cartList } = MyContext();
   const sucursalList = sucursales;

   const [form, setForm] = useState<Order>({
      type: "pickup",
      branch: sucursales[0].name,
      timeArrive: "",
      name: "",
   });

   const handleBack = () => setOptionModal("");

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      sendMessage(form, cartList);
   };

   return (
      <div className='w-full'>
         <ModalHeader text="Recoger en Restaurante" handleClose={handleBack} />
         <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2 px-1 text-black">

            <div className="flex flex-col gap-1">
               <label className="text-sm font-semibold text-gray-600">Sucursal</label>
               <select
                  value={form.branch}
                  onChange={(e) => setForm({ ...form, branch: e.target.value })}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 bg-white"
               >
                  {sucursalList.map((sucursal) => (
                     <option key={sucursal.id} value={sucursal.name}>
                        {sucursal.name}
                     </option>
                  ))}
               </select>
               <p className="text-xs text-gray-500">
                  {sucursalList.find(s => s.name === form.branch)?.address}
               </p>
               <iframe 
                  src={sucursalList.find(s => s.name === form.branch)?.embedded}
                  width="100%"
                  height="150"
                  loading="lazy"
               />
               
            </div>

            <div className="flex flex-col gap-1">
               <label className="text-sm font-semibold text-gray-600">Nombre</label>
               <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10"
                  placeholder="Nombre de quien recoge"
                  required
               />
            </div>

            <div className="flex flex-col gap-1">
               <label className="text-sm font-semibold text-gray-600">Hora de llegada estimada</label>
               <input
                  type="time"
                  value={form.timeArrive}
                  onChange={(e) => setForm({ ...form, timeArrive: e.target.value })}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10"
                  required
               />
            </div>

            <div className='flex flex-col justify-center items-end gap-1 mt-2'>
               <p className='text-xl text-gray-700'>Total a pagar: <span className='font-bold'>${cartList.reduce((total, item) => total + (item.price * item.quantity), 0)}</span></p>
            </div>

            <button type="submit" className="mt-4 w-full cursor-pointer bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg">
               Confirmar Pedido
            </button>
         </form>
      </div>
   )
}