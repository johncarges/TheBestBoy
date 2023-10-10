import { useContext, useEffect } from "react"
import { UserContext } from "../context/user"
import LoginSignup from "./WelcomePage/LoginSignup"
import Main from "./Main"



export default function CheckUserContainer() {
    const {user, setUser} = useContext(UserContext)

    useEffect(()=> {
        fetch('/check_session')
        .then(r=>{
        if (r.ok) {
            r.json().then(user=>setUser(user))
        }
        })
        console.log(user)
    }, [])

    // return (
    //     {user} ? <Main/> : <LoginSignup/>
    // )

    if (user) {
        return <Main/>
    } else {
        return <LoginSignup/>
    }

}