// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Price from './Components/Pages/Price'
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Pages/Home'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/price/:symbol' element={<Price />} />
      </Routes>
    </Router>
  )
}

export default App
