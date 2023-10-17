import { useState } from "react"
import CrewSearchDropdown from "../../../components/crew/CrewSearchDropdown"


export default function CoreRoleEditRow(props) {
    const {contacts, role, onClick,index, handleDelete} = props

    const [editing, setEditing] = useState(false)
    
    const handleEdit = ()=>setEditing(e=>!e)
    const handleClick = (crewmember) => {
        onClick(crewmember,index)
        setEditing(false)
    }
    
    const assigned = role.crewmember 
        ? (`${role.crewmember.first_name} ${role.crewmember.last_name}`)
        : ("Not yet assigned")

    const info = editing
        ? (<CrewSearchDropdown crewList={contacts} handleClick={handleClick} placeholder='Select crewmember'/>)
        : assigned
    

    return (
        <tr className='add-core-crew-row'>
            <td className='add-core-crew-position'>{role.role}</td>
            <td className='add-core-crew-name'>{info}</td>
            <td><i className="fas fa-pen clickable" onClick={handleEdit}></i></td>
            <td><i className="fa-regular fa-trash-can clickable" onClick={()=>handleDelete(index)}></i></td>
        </tr>
    )
}