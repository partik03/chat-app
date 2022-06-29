import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({})

export function AuthProvider ({children}){
    const navigate = useNavigate()
    const [userPosts, setUserPosts] = useState(null)
    const [user, setUser] = useState(null)
    const [cookies,setCookies,removeCookies] = useCookies()
    const [uid, setUid] = useState(cookies.uid)
    const [posts, setPosts] = useState(null)
    const setUidCookie =(uid)=>{
        setCookies('uid',uid,{path:"/"})
    }
    const logout =()=>{
        setUser(null)
        removeCookies('uid')
        navigate('/login')
    }
    console.log(userPosts); 
    console.log(posts); 
return(
    <AuthContext.Provider 
    value={{
        user,
        logout,
        setUser,
        navigate,
        setUidCookie,
        uid,
        setUid,
        setUserPosts,
        userPosts,
        posts,
        setPosts
    }}
    >
        {children}
    </AuthContext.Provider>
)
}
export const useData = () => useContext(AuthContext)