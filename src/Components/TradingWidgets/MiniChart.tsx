import React, { useEffect } from 'react'

interface MiniChartProps {
  symbol: any
}

const MiniChartPage: React.FC<MiniChartProps> = ({ symbol }) => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js'
    script.async = true
    script.innerHTML = JSON.stringify({
      symbol: symbol,
      width: '100%',
      height: '100%',
      locale: 'en',
      dateRange: '12M',
      colorTheme: 'dark',
      isTransparent: false,
      autosize: true,
      largeChartUrl: '',
    })

    const miniChartContainer = document.getElementById('mini-chart-container')

    // Clear the previous chart before appending the new one
    if (miniChartContainer) {
      miniChartContainer.innerHTML = ''
      miniChartContainer.appendChild(script)
    }

    // Return a cleanup function
    return () => {
      // Remove the script element when component unmounts
      if (miniChartContainer && script.parentNode === miniChartContainer) {
        miniChartContainer.removeChild(script)
      }
    }
  }, [symbol])

  return (
    <div
      className='tradingview-widget-container'
      style={{ width: '100%', height: '300px', position: 'relative' }}
    >
      <div
        id='mini-chart-container'
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
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

export default MiniChartPage
