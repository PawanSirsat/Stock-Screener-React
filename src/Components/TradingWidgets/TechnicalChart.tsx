import React, { useEffect } from 'react'

const TechnicalChart: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/tv.js'
    script.type = 'text/javascript'

    script.onload = () => {
      new (window as any).TradingView.widget({
        container_id: 'technical-analysis-chart-demo',

        autosize: true,
        symbol: 'AAPL',
        interval: 'D',
        timezone: 'exchange',
        theme: 'dark',
        style: '1',
        withdateranges: true,
        hide_side_toolbar: false,
        allow_symbol_change: true,
        save_image: false,
        studies: ['StochasticRSI@tv-basicstudies', 'MASimple@tv-basicstudies'],

        support_host: 'https://www.tradingview.com',
        locale: 'en',
      })
    }

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div
      className='tradingview-widget-container'
      style={{ height: '100%', width: '100%' }}
    >
      <div
        id='technical-analysis-chart-demo'
        style={{ height: '90%', width: '100%', position: 'absolute' }}
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

export default TechnicalChart
