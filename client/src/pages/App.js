import React from "react";

import { UserProvider } from '../context/user'
import CheckUserContainer from "./CheckUserContainer";


export default function App() {

  return (
    <UserProvider>
      <CheckUserContainer/>
    </UserProvider>
  )

  
}
