import { useState } from "react"



export default function CrewSearchDropdown(props) {
    const {crewList, handleClick,placeholder} = props

    const [searchTerm, setSearchTerm] = useState('')

    function onChange(e) {
        setSearchTerm(e.target.value)
    }

    const filteredList = crewList.filter(crewmember=>{
        return `${crewmember.first_name.toLowerCase()} ${crewmember.last_name.toLowerCase()}`.includes(searchTerm.toLowerCase())
    })  

    const renderedList = filteredList.map(crewmember=>{
        return (
            <li key={crewmember.id} className='clickable' onClick={()=>handleClick(crewmember)}>{crewmember.first_name} {crewmember.last_name}</li>
        )
    })

    return (
        <div className='crew-list-search-dropdown'>
            <input
            value={searchTerm}
            placeholder={placeholder}
            onChange={onChange}/>
            <div>
                <ul className='crew-list-search-list'>
                    {renderedList}
                </ul>
            </div>
        </div>
    )
}