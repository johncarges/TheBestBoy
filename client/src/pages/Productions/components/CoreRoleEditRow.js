import { useState } from "react"
import CrewSearchDropdown from "../../../components/crew/CrewSearchDropdown"


export default function CoreRoleEditRow(props) {
    const {contacts, role, onClick,index} = props

    const [editing, setEditing] = useState(false)
    
    const handleEdit = ()=>setEditing(true)
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
        <tr>
            <td>{role.role}</td>
            <td>{info}</td>
            <td><i className="fas fa-pen clickable" onClick={handleEdit}></i></td>
        </tr>
    )
}