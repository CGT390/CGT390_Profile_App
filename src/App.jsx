import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'
import NavBar from './components/NavBar';

function App() {
  const [count, setCount] = useState(0)
  const name = "Gillian Hanley"
  const bio = <div className="main-bio"> My name is Gillian Hanley, and I am currently a junior here at Purdue. I am studying Web Programming and Design,
    and I am working towards a minor in Computer Science. I love creating websites, and
    love learning as much as I can about them. I am originally from St. Louis, MO, but my family lives in Gainsville, GA. I have three
    siblings, one older sister, and a younger brother and sister. We also have two teenage cats, Scooter and Habibi
    (Habibi is a little plump, and Scooter is the enegetic one). I love playing frisbee at Purdue, crocheting, and getting a good sweet treat
    whenever I can. </div>

  const email = "hanleyg@purdue.edu";

  return (
    <>
      <NavBar/>
      <h1 className="main-title" >About Me</h1>
      <h3 className="main-name">{name}</h3>
      <div className="main-email">{email}</div>
      {bio}
      <div className="main-card">
        <Card />
        <Card />
        <Card />

      </div>
    </>
  )
}

export default App
