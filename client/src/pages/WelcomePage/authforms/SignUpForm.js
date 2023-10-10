import { useState } from "react"




export default function SignUpForm(){
    
    const initialForm = {
        first_name: '',
        last_name: '',
        email:  '',
        username: '',
        password: ''
    }

    const [formData, setFormData]=useState(initialForm)
    
    function onChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <h1>Signup</h1>
            <form autocomplete="off">
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
                />
                <label>Password</label>
                <input 
                    name='password'
                    type='password'
                    value={formData.password}
                    onChange={onChange}    
                />
            </form>
        </div>
    )
}