import { useEffect } from 'react'

const HomePage = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/tv.js'
    script.async = true
    script.onload = () => {
      new window.TradingView.widget({
        autosize: true,
        symbol: 'BINANCE:BTCUSDT',
        interval: '240',
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1',
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
  }, [])
  return (
    <div className='tradingview-widget-container z-0'>
      <style>
        {`
          #chart {
            width: 100%;
            height: 90vh;
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
  )
}

export default HomePage
