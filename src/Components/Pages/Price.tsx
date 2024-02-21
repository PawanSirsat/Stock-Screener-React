import { useParams } from 'react-router-dom'
import MiniChartPage from '../TradingWidgets/MiniChart'

const Price = () => {
  const { symbol } = useParams()

  return (
    <div className='container mx-auto p-4 max-w-md bg-white rounded-md shadow-md mt-8'>
      <MiniChartPage symbol={symbol} />
    </div>
  )
}

export default Price
