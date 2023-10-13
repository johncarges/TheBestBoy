import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { useContext, useEffect } from "react"
import { UserContext } from "../context/user"
import LoginSignup from "./WelcomePage/LoginSignup"
import Main from "./Main"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"



export default function CheckUserContainer() {
    const {user, changeUser} = useContext(UserContext)

    const history = useHistory()

    useEffect(()=> {
        fetch('/check_session')
        .then(r=>{
        if (r.ok) {
            r.json().then(user => {
                changeUser(user)
                history.push('/home')
            })
        } else {
            history.push('/welcome')
        }
        })
    }, [])



    // if (user) {
    //     return <Main/>
    // } else {
    //     return <LoginSignup/>
    // }

    // return (
    //     <Switch>
    //         <Route exact path='/welcome'>
    //             <LoginSignup/>
    //         </Route>
    //         <Route exact path='/'>
    //             <Main/>
    //         </Route>
    //     </Switch>
    // )



    return (
        <Switch>
            {user
            ? (
                <Main/>
            )
            : (<Route exact path='/welcome'>
                    <LoginSignup/>
                </Route>)
            }
            
        </Switch>
    )


}