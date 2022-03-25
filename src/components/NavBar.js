import React from 'react'
import Logo from "../logo.png"
import {Link} from 'react-router-dom'

export default function () {
  return (
    <div className='border pl-12 font-bold text-3xl flex space-x-8 
        px-8S items-center py-4 text-slate-900'>
        <img src={Logo} alt="" className='w-[80px] md:w-[100px]' />
        <Link to='/' className='md:text-3xl text-xl'>Movies</Link>
        <Link to='/favorites' className='md:text-3xl text-xl'>Favorites</Link>
    </div>
  )
}
