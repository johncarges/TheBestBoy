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

    function renderEventContent(eventInfo) {
        // console.log(eventInfo.event)
        return (
            <div>
                <p>{eventInfo.event.title}</p>
                <p className='to-hire'><i>{eventInfo.event.extendedProps.description}</i></p>
            </div>
        )
    }
    console.log(events[0])
    const eventsToRender = events.map((event) =>{
        return {
            'id':event.id,
            'title': event.production.name,
            'date': event.date,
            'description': `To hire: ${event.to_hire}`
        }
    })

    return (
        <div>
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView='dayGridMonth'
                events={eventsToRender}
                eventContent={renderEventContent}
            eventClassNames={['daygrid-event']}
            />
        </div>
    )
}