import React from 'react'

const Course = ({course}) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

const Header = props =>
  <h1>{props.course}</h1>

const Total = props => {
  
  const total = props.parts.reduce((a, b) => {
    if(a.exercises) return a.exercises + b.exercises
    return a + b.exercises
  })
  return <p><strong>There are {total} exercises</strong></p>
}
  

const Part = props =>
  <p>{props.part.name} {props.part.exercises}</p>

const Content = props => (
  <div>
    {props.parts.map(part => <Part part={part} key={part.id} />)}
  </div>
)

export default Course