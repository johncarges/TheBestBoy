import { useContext, useState } from "react"
import { UserContext } from "../../../context/user"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"



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

    const [errorMessage, setErrorMessage] = useState('')
    
    const history = useHistory()

    function onChange(e) {
        if (errorMessage.length>0) {
            setErrorMessage('')
        }
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function showError(errorResponse) {
        const er = errorResponse.error
        if (er.includes(' must be non-empty')){
            setErrorMessage('All fields are required')
        } else if (er==='Password must be at least 8 characters') {
            setErrorMessage('Password must be at least 8 characters')
        } else if (er==='Account already exists with this email') {
            setErrorMessage('Account already exists with this email, please log in')
        } else {
            console.log(er)
        }
    }

    function onSubmit(e) {
        e.preventDefault()

        fetch('/signup', {
            method: 'POST',
            headers:{'accepts':'application/json','content-type':'application/json'},
            body: JSON.stringify(formData)
        }).then(r=> {
            if (r.ok) {
                r.json().then(d=>{
                    changeUser(d)
                    history.push('/home')
                })
            } else {
                r.json().then(showError)
            }
        })

    }

    return (
        <div className='sign-up-container'>
            <h1>Signup</h1>
            <p className='error-message'>{errorMessage}</p>
            <Form onSubmit={onSubmit} autoComplete='off'>
                <input style={{display:"none"}}/>
                <input type="password" style={{display:"none"}}/>
                
                <label className='sign-up-first-name-label'>First Name</label>
                <input 
                    className='form-control sign-up-first-name-input'
                    name='first_name'
                    value={formData.first_name}
                    onChange={onChange}    
                />
                <label className='sign-up-last-name-label'>Last Name</label>
                <input 
                    className='form-control sign-up-last-name-input'
                    name='last_name'
                    value={formData.last_name}
                    onChange={onChange}    
                />
                <label className='sign-up-email-label'>Email</label>
                <input 
                    className='form-control sign-up-email-input'
                    name='email'
                    value={formData.email}
                    onChange={onChange}    
                />
                <label className='sign-up-username-label'>Username</label>
                <input 
                    className='form-control sign-up-username-input'
                    name='username'
                    value={formData.username}
                    onChange={onChange}
                    autoComplete='off'    
                />
                <label className='sign-up-password-label'>Password</label>
                <input 
                    className='form-control sign-up-password-input'
                    name='password'
                    type='password'
                    value={formData.password}
                    onChange={onChange}
                    autoComplete='nope'
                    autocomplete='new-password'    
                />
                <Button type='submit'>Submit</Button>
            </Form>
        </div>
    )
}