import { createContext, useState, useEffect,useContext } from 'react'
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';
import { useLocalStorage } from '../hooks/useLocalStorage';
import jwt_decode from "jwt-decode";
import { API_ENDPOINT } from '../config/config';


const AuthContext = createContext();

const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [authTokens, setAuthTokens] = useLocalStorage("authTokens", null);
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate();
  const location = useLocation();



  const loginUser = async (loginData) => {
    try {
      let response = await fetch(`${API_ENDPOINT}api/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      let data = await response.json();
      console.log(data, "data");

      if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
        navigate(location.state.from || "/");
      } else {
        alert("Something went wrong!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const signUpUser = async (signUpData) => {
    try {
      let response = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });
      let data = await response.json();
      console.log(data, "data");

      if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
        navigate(location.state.from || "/");
      } else {
        alert("Something went wrong!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/");
  };

  let contextData = {
    user: user,
    authTokens: authTokens,
    setAuthTokens: setAuthTokens,
    setUser: setUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
    signUpUser: signUpUser,
  };

  useEffect(()=> {

    if(authTokens){
        setUser(jwt_decode(authTokens.access))
    }
    setIsLoading(false)
// eslint-disable-next-line 
}, [authTokens, isLoading])

  return (
    <AuthContext.Provider value={contextData}>{isLoading ? null : children}</AuthContext.Provider>
  );
};

export { useAuthContext, AuthProvider };
