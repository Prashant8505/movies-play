import React, {useState} from 'react'


function Pagination({page, goNext, goPrevious}) {
   
  return (
    <div className='w-full flex justify-center mb-4'>
            <button className='p-2 border-2 
               border-indigo-500 text-indigo-500 
               rounded-l-xl'
              onClick={goPrevious} >Previous</button>

            <button className='p-2 border-2 
               border-indigo-500 text-indigo-500 
               border-r-0 border-l-0 bg-gray-100'>{page}</button>

            <button className='p-2 border-2 
               border-indigo-500 text-indigo-500 
               rounded-r-xl'
               onClick={goNext}>Next</button>
    </div>
  )
}

export default Pagination