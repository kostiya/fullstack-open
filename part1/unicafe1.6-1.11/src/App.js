import { useState } from 'react'

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
    <>
      good {good} <br />
      neutral {neutral} <br />
      bad {bad} <br />
      all {getTotal()} <br />
      average {getAverage()} <br />
      positive {getPositivePercentage()} % <br />
    </>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increace = (feedbackType) => {
    switch(feedbackType){
      case 'good' : 
      return(
        () => setGood(good + 1)
      )
      case 'neutral' : 
      return(
        () => setNeutral(neutral + 1)
      )
      case 'bad' : 
      return(
        () => setBad(bad + 1)
      )
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={increace('good')}>good</button>
      <button onClick={increace('neutral')}>neutral</button>
      <button onClick={increace('bad')}>bad</button>

      <h2>statistics</h2>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App