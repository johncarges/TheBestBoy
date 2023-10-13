import { useContext, useState } from "react"
import { UserContext } from "../../../context/user"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

export default function LoginForm(){
    
    const {changeUser} = useContext(UserContext)
    const history = useHistory()
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
                r.json().then(changeUser)
                history.push('/home')
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