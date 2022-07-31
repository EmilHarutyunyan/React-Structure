import { useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

export const useAuth = () => {
    
    const [user, setUser] = useLocalStorage("user", null);
    let navigate = useNavigate();
    let  location = useLocation()
    const signIn = async (data) => {
        try {
            let authresult = await fetch('/api/auth/login', data);
            let userObj = { ...authresult.data?.foundUser };
            userObj.token = authresult.data?.encodedToken;
            setUser(userObj);
            // toastsuccess("Login Successfull")
            navigate(location.state.from || '/')
        } catch (err) {
            console.error(err);
            // toasterror("Login Failed")
        }
    };

    const signUp = async (data) => {
        try {
            let authresult = await fetch('/api/auth/signup', data);
            let userObj = { ...authresult.data?.createdUser };
            userObj.token = authresult.data?.encodedToken;
            setUser(userObj);
            // toastsuccess("Sign Up Successfull")
        } catch (err) {
            console.error(err);
            // toasterror("An Error Occuered")
        }
    };

    const signOut = () => {
        setUser(null);
    };

    return { user, signIn, signUp, signOut };
};