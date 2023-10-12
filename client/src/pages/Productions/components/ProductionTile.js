import React from "react"
import {useHistory} from 'react-router-dom'


export default function ProductionTile({production}) {
    
    const dates = production.start_date
        ?( <p>Start Date: {production.start_date}  End Date: {production.end_date}</p>)
        : (<p>No shootdays scheduled yet</p>)
    

    const history = useHistory()
    
    function clickIn () {
        history.push(`/productions/${production.id}`)
    }


    return (
        <li onClick={clickIn}>
            <p>{production.name}</p>
            
            {dates}
        </li>

    )

}