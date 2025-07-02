import { useState } from 'react'

const Button = ({ onclick, text }) => {
  return (
    <button onClick={onclick} > {text} </button>
  )
}

const Feedback = ({ feedback, setFeedback }) => {
  return (
    <div>
      <h2>Give Feedback</h2>
      <Button onclick={() => setFeedback.setGood(feedback.good + 1)} text='Good' />
      <Button onclick={() => setFeedback.setNeutral(feedback.neutral + 1)} text='Neutral' />
      <Button onclick={() => setFeedback.setBad(feedback.bad + 1)} text='Bad' />
    </div>
  )
}

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td> {props.value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  if (all == 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>
          No feedback given
        </p>
      </div>
    )
  }

  const average = (good * 1 + bad * (-1)) / all || 0
  const positive = (good / all || 0) * 100
  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
        <StatisticsLine text="Good" value={good} />
        <StatisticsLine text="Neutral" value={neutral} />
        <StatisticsLine text="Bad" value={bad} />
        <StatisticsLine text="Average" value={average} />
        <StatisticsLine text="Positive" value={positive} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const feedback = { good, neutral, bad }
  const setFeedback = { setGood, setNeutral, setBad }

  return (
    <>
      <Feedback feedback={feedback} setFeedback={setFeedback} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App