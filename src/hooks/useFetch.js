import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'
import { useAuthContext } from '../context/AuthContext';
import { API_ENDPOINT } from '../config/config';


let useFetch = () => {
    let config = {}

    let {authTokens, setAuthTokens, setUser} = useAuthContext()


    let originalRequest = async (url, config)=> {
        url = `${API_ENDPOINT}${url}`
        let response = await fetch(url, config)
        let data = await response.json()
        console.log('REQUESTING:', data)
        return {response, data}
    }
    
    let refreshToken = async (authTokens) => {

        let response = await fetch(`${API_ENDPOINT}api/token/refresh/`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens.refresh})
        })
        let data = await response.json()
        localStorage.setItem('authTokens', JSON.stringify(data))
        setAuthTokens(data)
        setUser(jwt_decode(data.access))
        return data
    }

    let callFetch = async (url) => {
        const user = jwt_decode(authTokens.access)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if(isExpired){
            authTokens = await refreshToken(authTokens)
        }

        
        config['headers'] = {
            Authorization:`Bearer ${authTokens?.access}`
        }

        let {response, data} = await originalRequest(url, config)
        return {response, data}
    }

    return callFetch
}

export default useFetch;