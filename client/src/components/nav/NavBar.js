import { useContext } from 'react'
import {NavLink} from 'react-router-dom'
import { UserContext } from '../../context/user'


export default function NavBar() {
    
    const {setUser} = useContext(UserContext)

    function handleLogout(e) {
        fetch('/logout', {
            method: 'DELETE'
        }).then(r=>{setUser(null)})
    }

    return (
        <div>
            <NavLink
                to='/' 
                exact
            >
                Home
            </NavLink>
            <NavLink
                to='/productions' 
                exact
            >
                Productions
            </NavLink>  
            <NavLink
                to='/crewmembers' 
                exact
            >
                Crewmembers
            </NavLink>  
            <button onClick={handleLogout}>Log Out</button>
            


        </div>
    )
}