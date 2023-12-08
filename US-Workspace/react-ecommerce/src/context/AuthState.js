import React, { useState } from 'react'
import AuthContext from './AuthContext'

const AuthState = (props) => {
    const [token, setToken] = useState("")

    const setAccessToken = (user) => {
        setToken(user?.accessToken)
        localStorage.setItem("accessToken", user?.accessToken)
        localStorage.setItem("userEmail", user?.reloadUserInfo?.email)
    }

  return <AuthContext.Provider value={{setAccessToken}}>{props.children}</AuthContext.Provider>
}

export default AuthState