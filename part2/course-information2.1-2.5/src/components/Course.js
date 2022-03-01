const Header = ({name}) => {
    return (
    <h1>
      {name}
    </h1>
    )
  }
  
  const Part = ({part}) => {
    return(
    <p>
      {part.name} {part.exercises}
    </p>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map((part) => <Part key={part.id} part={part} />)}
      </div>
    )
  }
  
  const Total = ({parts}) => {
    let sum = 0
    return(
      <p>
        <b>
          total of {parts.reduce((prev, current) => prev + current.exercises, sum)} exercises
        </b>
      </p>
    )
  }
  
  const Course = ({course}) => {
    return(
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

  export default Course