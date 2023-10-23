

import './App.css'
import { CounterProvider, useCounter } from '../context/CounterProvider'
import { Pagination, Search, Stories } from '../components'

function App() {

  const counter = useCounter()

  return ( 
    <>
      <div>Welcome to Newsletter !</div>
      <Search />
      <Pagination />
      <Stories />
    </>
  )
}

export default App
