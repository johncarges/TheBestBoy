import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'


export default function MonthView() {

    const [events,setEvents] = useState([])

    useEffect(()=>{
        fetch('/shootdays')
        .then(r=>{
            if (r.ok){
                r.json().then(setEvents)
            }
        })
    },[])

    return (
        <div>
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView='dayGridMonth'
                events={events}
            />
        </div>
    )
}