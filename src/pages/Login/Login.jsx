import React, {useState} from 'react'
import { useAuthContext } from '../../context/AuthContext'

const Login = () => {
    let {loginUser} = useAuthContext()
    const [username,setUsername] = useState("")
    const [password,setPassword]= useState("")
    const handleSubmit = (e) => {
      e.preventDefault()
      const data = {
        username,
        password
      }
      loginUser(data)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" value={username} onChange={(e)=> setUsername(e.target.value)} placeholder="Enter Username" />
                <input type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Enter Password" />
                <input type="submit"/>
            </form>
        </div>
    )
}

export default Login
