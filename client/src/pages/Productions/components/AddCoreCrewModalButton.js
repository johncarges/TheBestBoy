import { useState } from "react"

export default function AddCoreCrewModalButton(props){

    const roles = ['Gaffer','Best Boy','Generator Operator','Lamp Operator','Dimmer Board Operator']


    const {handleAddRole} = props

    const [adding, setAdding] = useState(false)
    const handleCloseAdding = () => setAdding(false)
    const handleShowAdding = () => setAdding(true)


    const roleList = roles.map((role,index)=>{
        return (<li key={index} className='clickable' onClick={()=>handleAddRole(role)}>{role}</li>)
    })

    if (adding){
        return (
            <tr>
                <td onClick={handleShowAdding} className='clickable'>Choose Role:</td>
                <td onClick={handleCloseAdding} colSpan='2' className='role-list-search-dropdown'>
                    <div className='role-list-container'>
                        <ul className='role-list'>
                            {roleList}
                        </ul>
                    </div>
                </td>
            </tr>   
            )
    } else {
        return (
            <tr>
                <td onClick={handleShowAdding} className='clickable' colSpan='3'>+ Add Roles</td>
            </tr>
        )
    }


}