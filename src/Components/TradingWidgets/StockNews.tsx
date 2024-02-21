import React, { useEffect } from 'react'

const StockNews: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js'
    script.async = true
    script.innerHTML = JSON.stringify({
      feedMode: 'BSE_symbols',
      isTransparent: false,
      displayMode: 'regular',
      width: '100%',
      height: 625,
      colorTheme: 'dark',
      locale: 'en',
    })

    const timelineContainer = document.getElementById('timeline-container')

    // Clear the previous widget before appending the new one
    if (timelineContainer) {
      timelineContainer.innerHTML = ''
      timelineContainer.appendChild(script)
    }

    // Return a cleanup function
    return () => {
      // Remove the script element when component unmounts
      if (timelineContainer && script.parentNode === timelineContainer) {
        timelineContainer.removeChild(script)
      }
    }
  }, [])

  return (
    <div className='tradingview-widget-container'>
      <div
        id='timeline-container'
        className='tradingview-widget-container__widget end-0'
        style={{
          width: '50%',
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

export default StockNews
