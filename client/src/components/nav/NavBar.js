import { useContext } from 'react'
import {NavLink} from 'react-router-dom'
import { UserContext } from '../../context/user'

import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
export default function NavBar() {
    
    const {changeUser} = useContext(UserContext)
    const history = useHistory()

    function handleLogout(e) {
        fetch('/logout', {
            method: 'DELETE'
        }).then(r=>{
            changeUser(null)
            history.push('/welcome')
        })
    }

    return (
        <div className='navbar-container'>
            <div className='navbar-main'>
                <NavLink
                    to='/home' 
                    exact
                    className='nav-link'
                >
                    Home
                </NavLink>
                <NavLink
                    to='/home/productions' 
                    exact
                    className='nav-link'
                >
                    Productions
                </NavLink>  
                <NavLink
                    to='/home/crewmembers' 
                    exact
                    className='nav-link'
                >
                    Crewmembers
                </NavLink>  
            </div>
            <div className='logout-button-container'>
                <Button variant="secondary" onClick={handleLogout}
                className='logout-button'>Log Out</Button>
            </div>
        </div>
    )
}