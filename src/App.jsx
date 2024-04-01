import { useState } from 'react'
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <NavBar />
        <ItemListContainer greeting={"Bienvenido a Macrum S.R.L"}/>
    </>     
  )
}

export default App
