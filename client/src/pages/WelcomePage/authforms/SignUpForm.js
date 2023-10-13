import { useContext, useState } from "react"
import { UserContext } from "../../../context/user"




export default function SignUpForm(){
    
    const initialForm = {
        first_name: '',
        last_name: '',
        email:  '',
        username: '',
        password: ''
    }

    const [formData, setFormData]=useState(initialForm)
    const {changeUser} = useContext(UserContext)

    function onChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function onSubmit(e) {
        e.preventDefault()

        fetch('/signup', {
            method: 'POST',
            headers:{'accepts':'application/json','content-type':'application/json'},
            body: JSON.stringify(formData)
        }).then(r=> {
            if (r.ok) {
                r.json().then(changeUser)
            }
        })

    }

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={onSubmit}
            autocomplete='off'>
                <label>First Name</label>
                <input 
                    name='first_name'
                    value={formData.first_name}
                    onChange={onChange}    
                />
                <label>Last Name</label>
                <input 
                    name='last_name'
                    value={formData.last_name}
                    onChange={onChange}    
                />
                <label>Email</label>
                <input 
                    name='email'
                    value={formData.email}
                    onChange={onChange}    
                />
                <label>Username</label>
                <input 
                    name='username'
                    value={formData.username}
                    onChange={onChange}
                    autocomplete='off'    
                />
                <label>Password</label>
                <input 
                    name='password'
                    type='password'
                    value={formData.password}
                    onChange={onChange}
                    autocomplete='off'    
                />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}