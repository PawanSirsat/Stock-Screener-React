import React, { useEffect } from 'react'

interface SymbolInfoWidgetProps {
  symbol: any
}

const SymbolInfoWidget: React.FC<SymbolInfoWidgetProps> = ({ symbol }) => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js'
    script.async = true
    script.innerHTML = JSON.stringify({
      symbol,
      width: '100%',
      locale: 'en',
      colorTheme: 'dark',
      isTransparent: false,
    })

    const symbolInfoContainer = document.getElementById('symbol-info-container')

    // Clear the previous widget before appending the new one
    if (symbolInfoContainer) {
      symbolInfoContainer.innerHTML = ''
      symbolInfoContainer.appendChild(script)
    }

    // Return a cleanup function
    return () => {
      // Remove the script element when component unmounts
      if (symbolInfoContainer && script.parentNode === symbolInfoContainer) {
        symbolInfoContainer.removeChild(script)
      }
    }
  }, [symbol])

  return (
    <div
      className='tradingview-widget-container'
      style={{ width: '100%', height: '100px' }}
    >
      <div
        id='symbol-info-container'
        style={{ width: '100%', height: '100px' }}
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

export default SymbolInfoWidget
