import { Content } from "./Content"
import { Header } from "./Header"
import { Total } from "./Total"

const DisplayCourse = ({name, parts}) => {
    return (
        <div>
            <Header text={name} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    )
}

const Course = ({ courses }) => {
    
    return (
        <div>
            {courses.map(course => <DisplayCourse key={course.id} name={course.name} parts={course.parts}/>)}
        </div>
    )
}

export default Course