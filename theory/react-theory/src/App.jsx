import { useState } from 'react'

const Display = ({counter}) => <div>{counter}</div>

const Button = ({onClick, text}) => {
  return (
    <div>
      <button onClick={onClick}> {text} </button>
    </div>
  )
}

const App = () => {
  const [ counter, setCounter ] = useState(0)
  console.log('rendering with counter value', counter)
  const Increment = () => {
    console.log('increasing, value before', counter)
    setCounter(counter +1 )
  }
  const Decrement = () => {
    console.log('decreasing, value before', counter)
    setCounter(counter -1 )
  } 
  const Reset = () => {
    console.log('resetting to zero, value before', counter)
    setCounter(0)
  }
  return (
    <div>
      <Display counter={counter} />
      <Button onClick={Increment} text='Increment'/>
      <Button onClick={Decrement} text='Decrement'/>
      <Button onClick={Reset} text='Reset' />
    </div>
  )
}
  
  export default App