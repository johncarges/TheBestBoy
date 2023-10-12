
import React, { useState } from "react";

const UserContext = React.createContext()

function UserProvider({children}) {
    const [user, setUser] = useState(null)
    const changeUser = (newUser) => setUser(newUser)
    
    return <UserContext.Provider value={{user, changeUser}}>{children}</UserContext.Provider>
}

export {UserContext, UserProvider}