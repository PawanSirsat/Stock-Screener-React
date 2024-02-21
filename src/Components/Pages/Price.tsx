import { useParams } from 'react-router-dom'
import MiniChartPage from '../TradingWidgets/MiniChart'
import SymbolInfoWidget from '../TradingWidgets/SymbolInfoWidget'

const Price = () => {
  const { symbol } = useParams()

  return (
    <div className='container mx-auto p-4 max-w-md bg-gray-900 rounded-md shadow-md mt-8'>
      <SymbolInfoWidget symbol={symbol} />

      <MiniChartPage symbol={symbol} />
    </div>
  )
}

export default Price
