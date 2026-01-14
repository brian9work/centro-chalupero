import React from 'react'

export default function ModalHeader({text, handleClose}: {text?: string, handleClose: () => void}) {
    return (
        <div className="border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10 shrink-0">
            <div>
                <h2 className='font-bold text-lg md:text-xl xl:text-2xl text-gray-800'>{text || 'Modal'}</h2>
            </div>
            <button
                onClick={handleClose}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    )
}
