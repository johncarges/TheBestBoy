import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'


export default function MonthView() {

    const colors = ['#3e495c','#5c5c3e','#122121','#553e55','#3e5c46','#1f1a18']

    const [events,setEvents] = useState([])
    const history = useHistory()

    useEffect(()=>{
        fetch('/shootdays')
        .then(r=>{
            if (r.ok){
                r.json().then(setEvents)
            }
        })
    },[])

    function handleShootdayClick(eventClick) {
        const shootdays = events.filter(event=>{
            return event.production.id === eventClick.event.extendedProps.production_id
        })
        history.push({
            pathname:`/home/shootdays/${eventClick.event.id}`,
            state: shootdays
        })
    }


    function renderEventContent(eventInfo) {
        // console.log(eventInfo.event)
        return (
            <div>
                <p>{eventInfo.event.title}</p>
                <p className='to-hire'><i>{eventInfo.event.extendedProps.description}</i></p>
            </div>
        )
    }
    const eventsToRender = events.map((event) =>{
        return {
            'id':event.id,
            'title': event.production.name,
            'date': event.date,
            'display': 'block',
            'backgroundColor':colors[event.production.id%colors.length],
            'description': `To hire: ${event.to_hire}`,
            'production_id': event.production.id,
            'classNames': 'home-page-events'
        }
    })

    return (
        <div className='home-calendar-page'>
            <div className='home-calendar-container'>
                <FullCalendar
                    plugins={[ dayGridPlugin]}
                    initialView='dayGridMonth'
                    events={eventsToRender}
                    eventContent={renderEventContent}
                    eventClick={handleShootdayClick}
                    eventClassNames={['daygrid-event']}
                />
            </div>
        </div>
    )
}