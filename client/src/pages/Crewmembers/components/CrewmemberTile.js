import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import CrewInfoModal from './CrewInfoModal'


export default function CrewmemberTile({crewmember}) {


    // MODAL LOGIC
    const [showInfo, setShowInfo] = useState(false)
    // const [productionInfo, setProductionInfo] = useState({})

    const handleClose = () => setShowInfo(false)
    const handleShowInfo = () => setShowInfo(true)

    return (
        <li className='crew-list-item'>
            <p onClick={handleShowInfo} className='clickable crewmember-name'>{crewmember.first_name} <b>{crewmember.last_name}</b></p>
            <CrewInfoModal
                showInfo={showInfo}
                handleClose={handleClose}
                crewmember={crewmember}
            />
        </li>
        
    )

}