import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'



export default function CalendarComponent(props) {

    const [selectedDates, setSelectedDates] = useState([])
    const {shootdays} = props

    const history = useHistory()

    function handleDateClick(dateInfo) {
        console.log(dateInfo)
    }

    function renderEventContent(eventInfo) {
        return (
            <div>
                <p>{eventInfo.event.title}</p>
                <p className='to-hire'><i>{eventInfo.event.extendedProps.description}</i></p>
            </div>
        )
    }

    function handleShootdayClick(eventClick) {
        history.push(`/shootdays/${eventClick.event.id}`)
    }

    const events = shootdays.map((shootday)=> {
        return {'id': shootday.id, 
            'title': shootday.production.name, 
            'description':`To hire: ${shootday.to_hire}`, 
            'date': shootday.date}
    })



    return (
        <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        events={events}
        // dateClick={()=>{console.log(shootdays)}}
        eventContent={renderEventContent}
        eventClick={handleShootdayClick}
        eventClassNames={['daygrid-event']}
        />
    )

}

