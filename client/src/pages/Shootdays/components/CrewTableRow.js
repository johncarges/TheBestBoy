import Button  from "react-bootstrap/Button"
import React, {useState} from "react"
import AssignCrewButton from "./AssignCrewButton"
import CrewInfoModal from "../../Crewmembers/components/CrewInfoModal"

export default function CrewTableRow({workday, handleUpdateWorkday}) {

    // MODAL LOGIC for crewmember info
    const [showInfo, setShowInfo] = useState(false)
    const handleClose = () => setShowInfo(false)
    const handleShowInfo = () => setShowInfo(true)
    
    
    function workdayInfo (workday) {
        if (workday.crewmember) {
            return (
                <div>
                    <p className='clickable' onClick={handleShowInfo}>{`${workday.crewmember.first_name} ${workday.crewmember.last_name}`}</p>
                    <CrewInfoModal
                        showInfo={showInfo}
                        handleClose={handleClose}
                        crewmember={workday.crewmember}
                    />
                </div>
            )
        } else {
            return (<AssignCrewButton workday={workday} handleUpdateWorkday={handleUpdateWorkday}/>)
        }
    }

    function handleEdit (e) {
        console.log(workday)
    }

    function handleAdd(e) {
        console.log(workday)
    }

    const rowButton = workday.crewmember 
        ? (<Button onClick={handleEdit}> Edit </Button>)
        : (<AssignCrewButton workday={workday} handleUpdateWorkday={handleUpdateWorkday}/>)



    return (
        <tr>
            <td>{workday.role}</td>
            <td>
                <div className={'shootday-crewlist-name'}>
                    {workdayInfo(workday)}
                    {/* {rowButton} */}
                </div>
            </td>
        </tr>
    )

}