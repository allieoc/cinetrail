import React, { createContext, useState, useEffect } from 'react'

export const UserContext = createContext();

export default function UserContextProvider({children}) {
    const [token, setToken] = useState("");
    const [user, setUser] = useState("");

    useEffect(()=>{
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("userInfo");
        if(storedUser){
            setUser(JSON.parse(storedUser))
        }
        if(storedToken){
            setToken(storedToken);
        }
    }, [])

  return (
    <UserContext.Provider value={{token, setToken, user, setUser}}>
        {children}
    </UserContext.Provider> 
  )
}

