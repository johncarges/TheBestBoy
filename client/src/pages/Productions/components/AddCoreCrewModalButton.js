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
                <td onClick={handleCloseAdding} className='clickable add-core-crew-position'>Choose Role:</td>
                <td onClick={handleCloseAdding} className='role-list-search-dropdown add-core-crew-name'>
                    <div className='role-list-container'>
                        <ul className='role-list'>
                            {roleList}
                        </ul>
                    </div>
                </td>
                <td onClick={handleCloseAdding} className='clickable'>x</td>
            </tr>   
            )
    } else {
        return (
            <tr>
                <td onClick={handleShowAdding} className='clickable' colSpan='4'>+ Add Roles</td>
            </tr>
        )
    }


}