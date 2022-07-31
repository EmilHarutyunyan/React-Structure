import React from 'react'
import {Navigate, Route,Routes, useLocation} from "react-router-dom"
import { useAuthContext } from '../context/AuthContext'
import Layout from '../layout/Layout'
import Home from '../pages/Home/Home'
import Profil from '../pages/Profile/Profile'
import PrivateRouter from './PrivateRouter'
const Router = () => {
  const { user } = useAuthContext()
  console.log(user)
  const location = useLocation()

  const pathName = location.state?.from || '/'

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home />}/>
        <Route path='/profile' element={<PrivateRouter><Profil /></PrivateRouter>} />
        { user ? <Route path='/login' element={<Navigate to={pathName} />} /> : <Route path='/login' element={<>login</>} /> }
    
        { user ? <Route path='/signup' element={<Navigate to="/" />} /> : <Route path='/signup' element={<>sihn up</>} /> }
      </Route> 
    </Routes>
  )
}

export default Router