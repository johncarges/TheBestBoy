import { useContext, useState } from "react"
import { UserContext } from "../../../context/user"

export default function LoginForm(){
    
    const {user, setUser} = useContext(UserContext)

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const [errorMessage, setErrorMessage] = useState('')
    
    function onChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function onSubmit(e) {
        e.preventDefault()

        fetch('/login', {
            method: "POST",
            headers: {'accepts':'application/json', 'content-type':'application/json'},
            body:JSON.stringify(formData)
        }).then(r=> {
            if (r.ok) {
                r.json().then(setUser)
            } else {
                r.json().then(data=>{setErrorMessage(data['error'])})
            }
        })
    }

    return (
        <div>
            <h1>Login</h1>
            <p>{errorMessage}</p>
            <form onSubmit={onSubmit}>
                <label htmlFor='username'>Username</label>
                <input 
                    name='username'
                    value={formData.username}
                    onChange={onChange}    
                />
                <label htmlFor='password'>Password</label>
                <input 
                    name='password'
                    type='password'
                    value={formData.password}
                    onChange={onChange}    
                />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}