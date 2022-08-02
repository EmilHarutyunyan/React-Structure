import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import {Navigate, Route,Routes, useLocation} from "react-router-dom"
import PrivateRouter from './PrivateRouter'

import Layout from '../layout/Layout'
// Pages
import Home from '../pages/Home/Home'
import Profil from '../pages/Profile/Profile'
import Login from '../pages/Login/Login'


const Router = () => {
  const { user } = useAuthContext()
  const location = useLocation()

  const pathName = location.state?.from || '/'

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home />}/>
        <Route path='/profile' element={<PrivateRouter><Profil /></PrivateRouter>} />
        { user ? <Route path='/login' element={<Navigate to={pathName} />} /> : <Route path='/login' element={<Login/>} /> }
        { user ? <Route path='/signup' element={<Navigate to="/" />} /> : <Route path='/signup' element={<>sihn up</>} /> }
      </Route> 
    </Routes>
  )
}

export default Router