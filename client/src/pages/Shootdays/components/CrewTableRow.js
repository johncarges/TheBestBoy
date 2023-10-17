
import React from "react"
import AssignCrewButton from "./AssignCrewButton"
import CrewNameWithModal from "../../../components/crew/CrewNameWithModal"

export default function CrewTableRow({workday, handleUpdateWorkday}) {

    function workdayInfo (workday) {
        if (workday.crewmember) {
            return (
                <CrewNameWithModal crewmember={workday.crewmember}/>
            )
        } else {
            return (<AssignCrewButton workday={workday} handleUpdateWorkday={handleUpdateWorkday}/>)
        }
    }


    return (
        <tr>
            <td>{workday.role}</td>
            <td>
                <div className={'shootday-crewlist-name'}>
                    {workdayInfo(workday)}
                </div>
            </td>
        </tr>
    )

}