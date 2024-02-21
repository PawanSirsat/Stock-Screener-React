import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

interface SearchResult {
  ticker: string
  company_name: string
  symbol: string
  name: string
}

const Search: React.FC = () => {
  const [stockName, setStockName] = useState<string>('') // Set default value to 'amzn'

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

    if (stockName) {
      fetchSuggestions()
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }, [stockName])

  const handleSelectSuggestion = () => {
    setShowSuggestions(false)
  }

  return (
    <div className='relative mr-2 z-10'>
      <div className='flex md:order-2'>
        <div className='relative md:block ml-2'>
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
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
              />
            </svg>
            <span className='sr-only'>Search icon</span>
          </div>
          <input
            type='text'
            placeholder='Enter stock name'
            onChange={(e) => setStockName(e.target.value)}
            id='search-navbar'
            className='block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-blue-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
        </div>
      </div>
      {showSuggestions && searchResults.length > 0 && (
        <div className='fixed top-15 left-6 right-50 text-white bg-slate-900 border border-gray-300 rounded shadow-lg'>
          <ul>
            {searchResults.map((result) => (
              <li
                key={result.ticker}
                className='px-4 py-2 cursor-pointer hover:bg-gray-500'
                onClick={() => handleSelectSuggestion()}
              >
                <Link
                  to={`/price/${result.ticker}`}
                  className='block w-full h-full'
                >
                  {result.ticker} - {result.company_name}{' '}
                </Link>
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
