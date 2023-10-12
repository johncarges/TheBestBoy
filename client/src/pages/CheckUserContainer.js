import { useContext, useEffect } from "react"
import { UserContext } from "../context/user"
import LoginSignup from "./WelcomePage/LoginSignup"
import Main from "./Main"



export default function CheckUserContainer() {
    const {user, changeUser} = useContext(UserContext)

    useEffect(()=> {
        fetch('/check_session')
        .then(r=>{
        if (r.ok) {
            r.json().then(changeUser)
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