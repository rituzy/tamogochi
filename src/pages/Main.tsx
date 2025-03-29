import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './Main.css'
import { useNavigate } from 'react-router-dom'
import { useTelegram } from '../hook/useTelegram'

export function Main() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate();
  const {user} = useTelegram();
  //{user.first_name !== undefined ? user.first_name : "кто ты?"}
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Привет, {user?.first_name} </h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => navigate('/about')}>
          Go to About
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
