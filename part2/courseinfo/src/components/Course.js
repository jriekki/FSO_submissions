const Part = (props) => {
  return(
    <div>
      <p>{props.part.name} {props.part.exercises}</p>
    </div>
  )
}

const Header = (props) => {
  return(
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  return(
    <div>
      {props.parts.map(part => 
      <Part part = {part} key = {part.id}/>
      )}
    </div>
  )
}

const Total = (props) => {
  const exercises = props.parts.map(part => part.exercises)
  const total = exercises.reduce((a,b) => a+b, 0)
  return (
    <div>
      <p><b>Total number of exercises:</b> {total}</p>
    </div>
  )
}

const Course = (props) => {
  const course = props.course
  return(
  <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default Course