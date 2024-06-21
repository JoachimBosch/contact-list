import { useState } from 'react'
import './App.css'
import MyContext from './context/context'
import Card from './assets/card'
import Form from './assets/form'

function App() {

  return (
    <>
      <div>
        <Card />
        <Form />
      </div>
    </>
  )
}

export default App
