import { useEffect } from 'react'

const HotlistsWidget = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js'
    script.async = true
    script.innerHTML = JSON.stringify({
      colorTheme: 'dark',
      dateRange: '12M',
      exchange: 'BSE',
      showChart: true,
      locale: 'en',
      largeChartUrl: '',
      isTransparent: false,
      showSymbolLogo: false,
      showFloatingTooltip: false,
      width: '100%',
      height: 625,
      plotLineColorGrowing: 'rgba(41, 98, 255, 1)',
      plotLineColorFalling: 'rgba(41, 98, 255, 1)',
      gridLineColor: 'rgba(42, 46, 57, 0)',
      scaleFontColor: 'rgba(134, 137, 147, 1)',
      belowLineFillColorGrowing: 'rgba(41, 98, 255, 0.12)',
      belowLineFillColorFalling: 'rgba(41, 98, 255, 0.12)',
      belowLineFillColorGrowingBottom: 'rgba(41, 98, 255, 0)',
      belowLineFillColorFallingBottom: 'rgba(41, 98, 255, 0)',
      symbolActiveColor: 'rgba(41, 98, 255, 0.12)',
    })

    const hotlistsContainer = document.getElementById('hotlists-container')

    // Clear the previous widget before appending the new one
    if (hotlistsContainer) {
      hotlistsContainer.innerHTML = ''
      hotlistsContainer.appendChild(script)
    }

    // Return a cleanup function
    return () => {
      // Remove the script element when component unmounts
      if (hotlistsContainer && script.parentNode === hotlistsContainer) {
        hotlistsContainer.removeChild(script)
      }
    }
  }, [])

  return (
    <div className='tradingview-widget-container'>
      <div
        id='hotlists-container'
        className='tradingview-widget-container__widget'
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

export default HotlistsWidget
