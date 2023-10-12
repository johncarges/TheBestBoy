import { useContext } from 'react'
import {NavLink} from 'react-router-dom'
import { UserContext } from '../../context/user'

import Button from 'react-bootstrap/Button'
export default function NavBar() {
    
    const {changeUser} = useContext(UserContext)

    function handleLogout(e) {
        fetch('/logout', {
            method: 'DELETE'
        }).then(r=>{changeUser(null)})
    }

    return (
        <div className='navbar-container'>
            <div className='navbar-main'>
                <NavLink
                    to='/' 
                    exact
                    className='nav-link'
                >
                    Home
                </NavLink>
                <NavLink
                    to='/productions' 
                    exact
                    className='nav-link'
                >
                    Productions
                </NavLink>  
                <NavLink
                    to='/crewmembers' 
                    exact
                    className='nav-link'
                >
                    Crewmembers
                </NavLink>  
            </div>
            <Button onClick={handleLogout}
            className='logout-button'>Log Out</Button>
        </div>
    )
}