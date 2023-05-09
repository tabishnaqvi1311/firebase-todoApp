import React from 'react'
import { navLinks } from '../constants/constant'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='bg-gray-900 flex flex-row items-center justify-between p-2'>
      <h2 className='text-blue-400 text-2xl font-bold'>ToDoApp</h2>
      <nav className='flex flex-row items-center'>
        {navLinks.map((item, index) => (
            <Link to={item.linkTo} className='m-3'><li key={index} className='list-none text-white text-lg p-2 hover:text-gray-400'>{item.name}</li></Link>
        ))}
      </nav>
    </div>
  )
}

export default Navbar
