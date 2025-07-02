import { useState } from "react"

const History = ({allClicks}) => {
  if (allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {allClicks.join(' ')}
    </div>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>


const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const setToValue = (newValue) => () => {
    console.log('value now', newValue)  // print the new value to console
    setLeft(newValue)
    setRight(newValue)
  }

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = left + 1 
    setLeft(updatedLeft)
    setTotal(updatedLeft + right)  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const updatedRight = right + 1
    setRight(updatedRight)
    setTotal(left + updatedRight)  }

  return (
    <div>
        {left}
        <Button onClick={handleLeftClick} text='Left'/>
        <Button onClick={handleRightClick} text='Right'/>
        {right}
        <button onClick={setToValue(1000)}>thousand</button>
      <History allClicks={allClicks}/>
      </div>
  )
}

export default App