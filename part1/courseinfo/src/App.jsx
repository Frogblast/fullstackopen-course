const Header = (props) => {
  return (
    <div>
    <h1>{props.name}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <h2>
        {props.name}
      </h2>
      <p>Number of exercises: {props.exercises}</p>
    </div>
  )
}

const Content = (props) => {
  let parts = props.parts
  console.log(parts)
  return (
    <div>
      <Part name={parts[0].name} exercises={parts[0].exercises} />
      <Part name={parts[1].name} exercises={parts[1].exercises} />
      <Part name={parts[2].name} exercises={parts[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <h2>Total</h2>
      <p>
        Number of exercises: {props.exercises}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header name = {course.name} />
      <Content parts = {course.parts} />
      <Total exercises={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}/>
    </div>
  )
}

export default App