import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

interface SearchResult {
  ticker: string
  company_name: string
  symbol: string
  name: string
}

const Search: React.FC = () => {
  const [stockName, setStockName] = useState<string>('amzn') // Set default value to 'amzn'
  const navigate = useNavigate()

  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [error, setError] = useState<string>('')
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false)

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(
          `https://api.tickertick.com/tickers?p=${stockName}&n=10`
        )

        const suggestions: SearchResult[] = response.data.tickers
        setSearchResults(suggestions)
        setError('')
      } catch (error) {
        setSearchResults([])
        setError('Error fetching stock symbols. Please check your input.')
      }
    }

    if (stockName && stockName != 'amzn') {
      fetchSuggestions()
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }, [stockName])

  const handleSelectSuggestion = (selectedTicker: string) => {
    setShowSuggestions(false)
    navigate(`/price/${selectedTicker}`)
  }

  return (
    <div className='relative'>
      <div className='flex md:order-2'>
        <button
          type='button'
          data-collapse-toggle='navbar-search'
          aria-controls='navbar-search'
          aria-expanded='false'
          className='md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1'
        >
          <svg
            className='w-5 h-5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 20 20'
          >
            <path
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
            />
          </svg>
          <span className='sr-only'>Search</span>
        </button>
        <div className='relative hidden md:block'>
          <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
            <svg
              className='w-4 h-4 text-gray-500 dark:text-gray-400'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 20 20'
            >
              <path
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
              />
            </svg>
            <span className='sr-only'>Search icon</span>
          </div>
          <input
            type='text'
            placeholder='Enter stock name or keyword'
            onChange={(e) => setStockName(e.target.value)}
            id='search-navbar'
            className='block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
        </div>
        <button
          type='button'
          className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
          aria-controls='navbar-search'
          aria-expanded='false'
        >
          <span className='sr-only'>Open main menu</span>
          <svg
            className='w-5 h-5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 17 14'
          >
            <path
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M1 1h15M1 7h15M1 13h15'
            />
          </svg>
        </button>
      </div>
      {/* <input
        type='text'
        placeholder='Enter stock name or keyword'
        value={stockName}
        onChange={(e) => setStockName(e.target.value)}
        className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
      /> */}

      {showSuggestions && searchResults.length > 0 && (
        <div className='fixed top-15 left-50 right-40 bg-white border border-gray-300 rounded shadow-lg'>
          <ul>
            {searchResults.map((result) => (
              <li
                key={result.ticker}
                onClick={() => handleSelectSuggestion(result.ticker)}
                className='px-4 py-2 cursor-pointer hover:bg-gray-100'
              >
                {result.ticker} - {result.company_name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {error && <p className='text-red-500 mt-2'>{error}</p>}
    </div>
  )
}

export default Search
