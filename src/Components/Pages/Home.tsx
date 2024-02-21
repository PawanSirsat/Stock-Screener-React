import HotlistsWidget from '../TradingWidgets/HotlistsWidget'
import StockNews from '../TradingWidgets/StockNews'
import TickerTapeWidget from '../TradingWidgets/TickerTapeWidget'

declare global {
  interface Window {
    TradingView: any
  }
}
const HomePage = () => {
  return (
    <>
      <TickerTapeWidget />
      <div className='side-by-side-container'>
        <HotlistsWidget />
        <StockNews />
      </div>
    </>
  )
}

export default HomePage
