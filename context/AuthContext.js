import { createContext, useState } from "react";

export const AuthCheck = createContext();

const AuthContext = ({children}) =>{

    const [authValues, setAuthValues]=useState([])

    return (
        <AuthCheck.Provider
            value={{
                authValues, 
                setAuthValues
            }}
        >
            {children}
        </AuthCheck.Provider>
    )
}

export default AuthContext


// how to use context values in other files

// import {AuthCheck} from ".../.../"
// const {auhtValues} = useContext(AuthCheck)

