import { useContext, useState } from "react"
import { UserContext } from "../../../context/user"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function LoginForm(){
    
    const {changeUser} = useContext(UserContext)
    const history = useHistory()
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const [errorMessage, setErrorMessage] = useState('')
    
    function onChange(e) {
        if (errorMessage.length > 0) {
            setErrorMessage('')
        }
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
        <div className='login-container'>
            <h2 className='login-header'>Login</h2>
            <p className='error-message'>{errorMessage}</p>
            <Form onSubmit={onSubmit}>
                <label className='login-username-label' htmlFor='username'>Username</label>
                <input 
                    className='form-control login-username-input'
                    name='username'
                    value={formData.username}
                    onChange={onChange}    
                />
                <label className='login-password-label' htmlFor='password'>Password</label>
                <input 
                    className='form-control login-password-input'
                    name='password'
                    type='password'
                    value={formData.password}
                    onChange={onChange}    
                />
                <Button className='login-submit-button' type='submit'>Submit</Button>
            </Form>
        </div>
    )
}