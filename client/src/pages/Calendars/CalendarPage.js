import { useState } from "react"
import MonthView from "./components/MonthView"


export default function CalendarPage() {

    const [weekFormat, setWeekFormat] = useState(false)  // False -> Month Format

    function handleClickFormat() {
        setWeekFormat(format=>!format)
    }

    return (
        <div>
            <h1>October</h1>
            <button
                onClick={handleClickFormat}>
                {weekFormat ? 'Month':'Week'}
            </button>
            {weekFormat 
            ? <h1>WeekView</h1>
            : <MonthView/>}
        </div>
    )

}