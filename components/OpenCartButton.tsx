import { MyContext } from '@/context/Context';

export default function OpenCartButton() {
   const { setCartModal } = MyContext();

   return (
      <div className='flex items-center justify-center'>
         <button
            className="w-11/12 m-auto max-w-[400] cursor-pointer rounded-md bg-orange-400 px-3 py-3 text-sm font-medium text-white hover:bg-orange-600 shadow-lg uppercase"
            onClick={() => setCartModal(true)}
         >
            <span>
               Ordenar
            </span>
         </button>
      </div>
   )
}
