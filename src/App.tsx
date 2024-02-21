// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Price from './Components/Pages/Price'
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Pages/Home'
import TechnicalChart from './Components/TradingWidgets/TechnicalChart'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/price/:symbol' element={<Price />} />
        <Route path='/techchart' element={<TechnicalChart />} />
      </Routes>
    </Router>
  )
}

export default App
