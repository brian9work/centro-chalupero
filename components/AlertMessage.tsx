import React from 'react'

export default function AlertMessage({text}: {text: string}) {
  return (
    <div className='absolute'>
      <p className='
        text-black bg-gray-200 
        dark:text-white dark:bg-gray-800
        px-4 py-2 rounded-md 
        shadow-lg
    '>{text}</p>
    </div>
  )
}
