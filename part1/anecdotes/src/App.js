import { useState } from 'react'

const TopAnecdote = ({ text, maxPoints }) => {
  if (maxPoints === 0) {
    return (
      <div>
        No votes yet!
      </div>
    )
  }
  return (
    <div>
      {text}<br></br>
      Votes: {maxPoints}
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0)) 
  const [selected, setSelected] = useState(0)
  const [topIndex, setTopIndex] = useState(0)

  const getNewAnecdote = () => {
    const randInt = Math.floor(Math.random() * anecdotes.length)
    setSelected(randInt)
  }

  const addPoints = () => {
    const newPoints = [ ...points]
    newPoints[selected] += 1
    setPoints(newPoints)
    // Determine index of most voted anecdote
    const newTopIndex = newPoints.indexOf(Math.max(...newPoints))
    setTopIndex(newTopIndex)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {anecdotes[selected]}<br></br>
        Votes: {points[selected]}
      </p>
      <button onClick={addPoints} >
        Vote
      </button>
      <button onClick={getNewAnecdote} >
        next anecdote
      </button>
      <h1>Anecdote with most votes</h1>
      <TopAnecdote text={anecdotes[topIndex]} maxPoints={Math.max(...points)} />
    </div>
  )
}

export default App