import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

interface TimeSeriesData {
  '4. close': string
}
declare global {
  interface Window {
    TradingView: any
  }
}
const Price = () => {
  const { symbol } = useParams()
  const [stockPrice, setStockPrice] = useState<string | null>(null)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/tv.js'
    script.async = true
    script.onload = () => {
      new window.TradingView.widget({
        autosize: true,
        symbol: `${symbol}`,
        interval: '240',
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '3',
        locale: 'en',
        toolbar_bg: '#f1f3f6',
        enable_publishing: true,
        withdateranges: false,
        hide_side_toolbar: true,
        allow_symbol_change: true,
        watchlist: ['BINANCE:BTCUSDT', 'BINANCE:ETHUSDT'],
        details: true,
        hotlist: true,
        calendar: true,
        studies: ['STD;SMA'],
        container_id: 'chart',
        show_popup_button: true,
        popup_width: '1000',
        popup_height: '650',
      })
    }
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [symbol])
  const apiKey = 'YOUR_ALPHA_VANTAGE_API_KEY'

  useEffect(() => {
    const fetchStockPrice = async () => {
      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`
        )

        console.log(response)

        // Extracting the latest data point from the time series
        const timeSeries = response.data['Time Series (5min)']

        // Using type assertion to inform TypeScript about the expected structure
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
      <h2 className='text-3xl font-bold mb-4'>Stock Symbol: {symbol}</h2>
      <p className='text-xl mb-4'>
        Stock Price: {stockPrice ? `$${stockPrice}` : 'Loading...'}
      </p>
      {error && <p className='text-red-500 mb-4'>{error}</p>}
      <div className='tradingview-widget-container'>
        <style>
          {`
          #chart {
            width: 100%;
            height: 50vh;
          }
        `}
        </style>
        <div id='chart'></div>
        <div className='tradingview-widget-copyright'>
          <a
            href='https://www.tradingview.com/'
            rel='noopener nofollow'
            target='_blank'
          ></a>
        </div>
      </div>
    </div>
  )
}

export default Price
