import React from "react"
import {useHistory} from 'react-router-dom'
import formatDate from '../../../utils/FormatDate'

export default function ProductionTile({production}) {
    
    const dates = production.start_date
        ?( <div className='production-tile-dates'>
                <p>Start Date: {formatDate(production.start_date)}</p>
                <p>End Date: {formatDate(production.end_date)}</p>
            </div>)
        : (<div className='production-tile-dates'><p>No shootdays scheduled yet</p></div>)
    

    const history = useHistory()
    
    function clickIn () {
        history.push(`/home/productions/${production.id}`)
    }


    return (
        <li className='production-tile-container clickable'onClick={clickIn}>
            <h4 className='production-tile-title'>{production.name}</h4>
            <p className='production-tile-notes-preview'>{production.notes}</p>
            {dates}
        </li>

    )

}