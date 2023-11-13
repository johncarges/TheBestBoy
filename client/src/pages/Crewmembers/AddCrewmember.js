import { useState } from "react"
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


export default function AddCrewmember() {

    const history = useHistory()

    const [formData, setFormData] = useState({
        first_name:'',
        last_name:'',
        email:'',
        phone:''
    })

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch('/crewmembers', {
            method: "POST",
            headers: {'accepts':'application/json','content-type':'application/json'},
            body: JSON.stringify(formData)
        }).then(r=>{
            if (r.ok) {
                history.push('/home/crewmembers')
            } else {
                console.log(r.json())
            }
        })
    }

    return (
        <div className='add-crewmember-page'>
            <div className='add-crewmember-container'>
                <h1 className='add-crewmember-header'>Add Crewmember</h1>
                <Form onSubmit={handleSubmit}>
                    <label htmlFor="first_name">First Name</label>
                    <input 
                        className='form-control new-crewmember-first-name-input'
                        name='first_name' 
                        value={formData.first_name}
                        onChange={handleChange}/>
                    <label htmlFor="last_name">Last Name</label>
                    <input 
                        className='form-control new-crewmember-last-name-input'
                        name='last_name'
                        value={formData.last_name}
                        onChange={handleChange}/>
                    <label htmlFor="email">Email</label>
                    <input 
                        className='form-control new-crewmember-email-input'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}/>
                    <label htmlFor="phone">Phone Number</label>
                    <input 
                        className='form-control new-crewmember-phone-input'
                        name='phone'   
                        value={formData.phone}
                        onChange={handleChange}/>
                    <Button className='new-crewmember-submit-button' type='submit'>Submit</Button>
                    <Link to='/home/crewmembers'>
                        <Button className='new-crewmember-submit-button'>Back</Button>
                    </Link>
                </Form>
            </div>
        </div>
    )

}