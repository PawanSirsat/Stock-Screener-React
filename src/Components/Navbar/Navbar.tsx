import React from 'react'
import { Link } from 'react-router-dom'
import Search from '../Pages/Search' // Import the updated Search component

const Navbar: React.FC = () => {
  return (
    <nav className='bg-white border-gray-200 dark:bg-gray-900'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <Link to='/' className='text-white text-xl font-bold mr-6'>
          Investing.com
          <Search /> {/* Use the updated Search component here */}
        </Link>
        <div className='hidden md:flex space-x-4 items-center'>
          <Link to='/' className='text-white hover:text-gray-300'>
            Home
          </Link>
          <Link to='/about' className='text-white hover:text-gray-300'>
            Stock Screener
          </Link>
          <Link to='/contact' className='text-white hover:text-gray-300'>
            Top 10 Stocks
          </Link>
        </div>
        {/* Responsive Menu Button for Small Screens */}
        <div className='md:hidden'>
          {/* Add your responsive menu button implementation */}
          {/* For example, you can use a third-party library like React Burger Menu */}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
