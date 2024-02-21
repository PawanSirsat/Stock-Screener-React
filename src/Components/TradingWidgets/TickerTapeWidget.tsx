import { useEffect } from 'react'

const TickerTapeWidget = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js'
    script.async = true
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: 'NSE:NIFTY', title: 'Nifty 50' },
        { proName: 'NSE:INFY', title: 'INFOSYS' },
        { proName: 'FOREXCOM:NSXUSD', title: 'US 100' },
        { proName: 'FX_IDC:EURUSD', title: 'EUR to USD' },
        { proName: 'BITSTAMP:BTCUSD', title: 'Bitcoin' },
        { proName: 'BITSTAMP:ETHUSD', title: 'Ethereum' },
      ],
      showSymbolLogo: true,
      isTransparent: false,
      displayMode: 'adaptive',
      colorTheme: 'dark',
      locale: 'en',
    })

    const tickerTapeContainer = document.getElementById('ticker-tape-container')

    // Clear the previous widget before appending the new one
    if (tickerTapeContainer) {
      tickerTapeContainer.innerHTML = ''
      tickerTapeContainer.appendChild(script)
    }

    // Return a cleanup function
    return () => {
      // Remove the script element when component unmounts
      if (tickerTapeContainer && script.parentNode === tickerTapeContainer) {
        tickerTapeContainer.removeChild(script)
      }
    }
  }, [])

  return (
    <div className='tradingview-widget-container'>
      <div
        id='ticker-tape-container'
        className='tradingview-widget-container__widget'
      ></div>
      <div className='tradingview-widget-copyright'>
        <a
          href='https://www.tradingview.com/'
          rel='noopener nofollow'
          target='_blank'
        ></a>
      </div>
    </div>
  )
}

export default TickerTapeWidget
