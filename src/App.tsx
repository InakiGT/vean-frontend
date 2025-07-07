import { Route, Routes } from 'react-router-dom'
import Home from '@/Home'
import Course from '@/Course'
import Theme from '@/Theme'
import Login from '@/Login'
import Register from '@/Register'
import PasswordRecovery from '@/PasswordRecovery'

function App() {
  return (
		<Routes>
			<Route path='/' element={ <Home /> } />
			<Route path='/course' element={ <Course /> } />
			<Route path='/theme' element={ <Theme /> } />
			<Route path='/login' element={ <Login /> } />
			<Route path='/register' element={ <Register /> } />
			<Route path='/password-recovery' element={ <PasswordRecovery /> } />
		</Routes>
  )
}

export default App
