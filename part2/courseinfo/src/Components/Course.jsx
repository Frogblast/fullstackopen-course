import { Content } from "./Content"
import { Header } from "./Header"
import { Total } from "./Total"

const Course = ({course}) => {
    return (
    <div>
      <Header text = {course.name} />
      <Content parts = {course.parts} />
      <Total exercises={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}/>
    </div>
  )
}

export default Course