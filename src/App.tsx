import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Main } from './pages/Main'
import { About } from './pages/About'
import { useTelegramBackButton } from './hook/useTelegramBackButton'
import { useTelegram } from './hook/useTelegram'

function App() {
  useTelegramBackButton();

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}

export default App
