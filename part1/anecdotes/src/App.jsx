import { useState } from 'react'

const randomIndex = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

const DisplayAnecdote = ({ header, anecdote, votes }) => {
  return (
    <div>
      <h2>{header}</h2>
      <div>
        {anecdote}
      </div>
      <div>
        Has {votes} votes
      </div>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [best, setBest] = useState(0)

  const handleVote = () => {
    const newVotes = { ...votes }
    newVotes[selected] += 1
    setVotes(newVotes)
    if (newVotes[selected] > newVotes[best]) {
      setBest(selected)
    }
  }
  

  const handleNext = () => {
    setSelected(randomIndex(0, anecdotes.length - 1))
  }

  return (
    <>
      <DisplayAnecdote header="Anecdote of the day" anecdote={anecdotes[selected]} votes={votes[selected]} />
      <div>
        <button onClick={handleNext}>Next anecdote</button>
        <button onClick={handleVote}>Vote</button>
      </div>
      <DisplayAnecdote header="Anecdote with most votes" anecdote={anecdotes[best]} votes={votes[best]} />
    </>
  )
}

export default App