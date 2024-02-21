import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import MiniChartPage from '../TradingWidgets/MiniChart'
import StockNews from '../TradingWidgets/StockNews'

interface TimeSeriesData {
  '4. close': string
}

const Price = () => {
  const { symbol } = useParams()
  const [stockPrice, setStockPrice] = useState<string | null>(null)
  const [error, setError] = useState<string>('')

  const apiKey = 'YOUR_ALPHA_VANTAGE_API_KEY'

  useEffect(() => {
    const fetchStockPrice = async () => {
      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`
        )

        const timeSeries = response.data['Time Series (5min)']
        const latestDataPoint = Object.values(timeSeries)[0] as TimeSeriesData

        setStockPrice(latestDataPoint['4. close'])
        setError('')
      } catch (error) {
        setStockPrice(null)
        setError('Error fetching stock price. Please check the stock symbol.')
      }
    }

    fetchStockPrice()
  }, [symbol])

  return (
    <div className='container mx-auto p-4 max-w-md bg-white rounded-md shadow-md mt-8'>
      <MiniChartPage symbol={symbol} />
    </div>
  )
}

export default Price
