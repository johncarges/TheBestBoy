import { useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"


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
        <div className='addCrewmemberContainer'>
            <h1>Add Crewmember</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="first_name">First Name</label>
                <input 
                    name='first_name' 
                    value={formData.first_name}
                    onChange={handleChange}/>
                <label htmlFor="last_name">Last Name</label>
                <input 
                    name='last_name'
                    value={formData.last_name}
                    onChange={handleChange}/>
                <label htmlFor="email">Email</label>
                <input 
                    name='email'
                    value={formData.email}
                    onChange={handleChange}/>
                <label htmlFor="phone">Phone Number</label>
                <input 
                    name='phone'   
                    value={formData.phone}
                    onChange={handleChange}/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )

}