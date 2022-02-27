import { useState } from 'react'

const Button = ({feedbackType, feedbackFunc, feedbackCount}) => (
    <button onClick={() => feedbackFunc(feedbackCount + 1)}>{feedbackType}</button>
)

const StatisticLine = ({statisticType, statisticCount}) => (
  <tr>
    <td>{statisticType}</td>
    <td>{statisticCount}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  const getTotal = () => good + neutral + bad
  const getAverage = () => (good - bad)/getTotal()
  const getPositivePercentage = () => good*100/getTotal()

  if(getTotal() === 0){
    return(
    <>
      No feedback given
    </>
    )
  } else {
  return(
    <table>
      <tbody>
        <StatisticLine statisticType={'good'} statisticCount={good} />
        <StatisticLine statisticType={'neutral'} statisticCount={neutral} />
        <StatisticLine statisticType={'bad'} statisticCount={bad} />
        <StatisticLine statisticType={'all'} statisticCount={getTotal()} />
        <StatisticLine statisticType={'average'} statisticCount={getAverage()} />
        <StatisticLine statisticType={'positive'} statisticCount={getPositivePercentage() + '%'} />
      </tbody>
    </table>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button feedbackType='good' feedbackFunc={setGood} feedbackCount={good} />
      <Button feedbackType='neutral' feedbackFunc={setNeutral} feedbackCount={neutral} />
      <Button feedbackType='bad' feedbackFunc={setBad} feedbackCount={bad} />

      <h2>statistics</h2>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App