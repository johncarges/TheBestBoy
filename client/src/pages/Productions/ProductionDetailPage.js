import React, { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom'
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import CalendarComponent from "../../components/calendars/CalendarComponent";


export default function ProductionDetailPage() {

    const {id} = useParams()
    const history = useHistory()

    const [productionInfo, setProductionInfo] = useState({
        id: '',
        name: '',
        start_date: '',
        end_date: '',
        shootdays: []
    })

    useEffect(()=> {
        fetch(`/productions/${id}`)
        .then(r=> r.json())
        .then(setProductionInfo)
    },[])

    let schedule;

    if (productionInfo.shootdays.length) {
        schedule = productionInfo.shootdays.map((shootday)=> (
            <li>
                <p>{shootday.date}</p>
            </li>
        ))
    } else {
        schedule = (
            <li> No days scheduled yet! </li>
        )
    }

    return (
        <div>
            <button onClick={history.goBack}>Back</button>
            <h1>{productionInfo.name}</h1>
            <ul>
                {schedule}
            </ul>
            <CalendarComponent 
            shootdays={productionInfo.shootdays}/>
        </div>
    )

}