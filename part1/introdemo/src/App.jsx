const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name}! You are {props.age} years old!</p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      greeting app created by <a href='https://github.com/mluukkai'>mluukai</a>
    </div>
  )
}

const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  const person1 = 'Petter'
  const person1Age=35
  const person2 = 'Angelika'
  const person3 = 'Miro'
  const familyMembers = [
    {name: 'Petter', age:35},
    {name: 'Angelika', age:29},
    {name: 'Miro', age:0}
  ]
  const solution1 =
    <>
      <h1>Greetings</h1>
      <Hello name={person1} age={person1Age}/>
      <Hello name={person2} age={person1Age - 5}/>
      <Hello name={person3} age='0'/>
      <Footer />
    </>
  const solution2 =
    <div>
      <Hello name={familyMembers[0].name} age={familyMembers[0].age}/>
      <Hello name={familyMembers[1].name} age={familyMembers[1].age}/>
      <Hello name={familyMembers[2].name} age={familyMembers[2].age}/>
    </div>

  return (
    solution2
  )
}

export default App