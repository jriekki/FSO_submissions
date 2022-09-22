import { useState } from 'react'

const ButtonAdd = ({ name, val, setter }) => {
  return (
    <button onClick={() => setter(val + 1)}>
      {name}
    </button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
    )
}

const Statistics = ({ good, neutral, bad}) => {
  const total = good+neutral+bad
  if (total === 0) {
    return (
      <div>
        <p>
          No feedback given yet
        </p>
      </div>
    )
  }
  return (
    <div>
      <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="total" value={total} />
            <StatisticLine text="average" value={(good - bad) / (total)} />
            <StatisticLine text="positive proportion" value={100*good / (total) + " %"} />
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

  return (
    <div>
      <h1>Give feedback</h1>
      <ButtonAdd name={'good'} val = {good} setter = {setGood} />
      <ButtonAdd name={'neutral'} val = {neutral} setter = {setNeutral} />
      <ButtonAdd name={'bad'} val = {bad} setter = {setBad} />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App