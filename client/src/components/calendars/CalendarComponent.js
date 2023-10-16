import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'



export default function CalendarComponent(props) {

    const [selectedDates, setSelectedDates] = useState([])
    const {shootdays,addingDates,datesToAdd, handleClickDate} = props

    const history = useHistory()


    function renderEventContent(eventInfo) {
        return (
            <div>
                <p>{eventInfo.event.title}</p>
                <p className='to-hire'><i>{eventInfo.event.extendedProps.description}</i></p>
            </div>
        )
    }

    function handleShootdayClick(eventClick) {
        history.push({
            pathname:`/home/shootdays/${eventClick.event.id}`,
            state: shootdays
        })
    }



    const events = shootdays.map((shootday)=> {
        return {'id': shootday.id, 
            'title': shootday.production.name, 
            'description':`To hire: ${shootday.to_hire}`, 
            'date': shootday.date}
    })



    return (
        <FullCalendar
        selectable={addingDates}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        events={events}
        dateClick={handleClickDate}
        eventContent={renderEventContent}
        eventClick={handleShootdayClick}
        eventClassNames={['daygrid-event']}
        />
    )

}
