import { Route, Routes } from 'react-router-dom'
import Home from '@/Home'
import Theme from '@/Theme'
import Login from '@/Login'
import Games from '@/Games'
import Course from '@/Course'
import Register from '@/Register'
import PasswordRecovery from '@/PasswordRecovery'
import Question from '@/Question'
import MCQuestion from '@/MCQuestion'

function App() {
  return (
		<Routes>
			<Route path='/' element={ <Home /> } />
			<Route path='/course/:id' element={ <Course /> } />
			<Route path='/theme/:id' element={ <Theme /> } />
			<Route path='/games' element={ <Games /> } />
			<Route path='/login' element={ <Login /> } />
			<Route path='/register' element={ <Register /> } />
			<Route path='/password-recovery' element={ <PasswordRecovery /> } />
			<Route path='/question/open/:id' element={ <Question /> } />
			<Route path='/question/mc/:id' element={ <MCQuestion /> } />
		</Routes>
  )
}

export default App
