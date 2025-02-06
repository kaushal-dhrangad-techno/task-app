import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <h1 className='bg-red-400'>Kaushal Dhrangad</h1>
     <Button>Kaushal DHrnagad Button</Button>
    </>
  )
}

export default App
