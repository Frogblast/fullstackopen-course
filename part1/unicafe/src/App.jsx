import { useState } from 'react'

const Button = ({ onclick, text }) => {
  return (
    <button onClick={onclick} > {text} </button>
  )
}

const Feedback = (props) => {
  return (
    <div>
    <h2>Give Feedback</h2>
    <Button onclick={() => props.setGood(props.good + 1)} text='Good' />
    <Button onclick={() => props.setNeutral(props.neutral + 1)} text='Neutral' />
    <Button onclick={() => props.setBad(props.bad + 1)} text='Bad' />
    </div>
  )
}

const Statistics = ({good, neutral, bad}) =>{
  return (
    <div>
        <h2>Statistics</h2>
      <p>
        Good {good} <br></br>
        Neutral {neutral} <br></br>
        Bad {bad}
      </p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  console.log({ neutral })
  return (
    <>
      <Feedback 
      setGood={setGood} good={good}
      setNeutral={setNeutral} neutral={neutral}
      setBad={setBad} bad={bad}/>
      <Statistics good = {good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App