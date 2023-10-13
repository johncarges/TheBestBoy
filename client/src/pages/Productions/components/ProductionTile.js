import React from "react"
import {useHistory} from 'react-router-dom'
import formatDate from '../../../utils/FormatDate'

export default function ProductionTile({production}) {
    
    const dates = production.start_date
        ?( <div>
                <p>Start Date: {formatDate(production.start_date)}</p>
                <p>End Date: {formatDate(production.end_date)}</p>
            </div>)
        : (<p>No shootdays scheduled yet</p>)
    

    const history = useHistory()
    
    function clickIn () {
        history.push(`/home/productions/${production.id}`)
    }


    return (
        <li className='production-tile-container clickable'onClick={clickIn}>
            <p className='production-tile-title'>{production.name}</p>
            
            {dates}
        </li>

    )

}