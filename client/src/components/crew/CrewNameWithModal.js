import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'

export default function CrewNameWithModal(props) {

    const {crewmember} = props

    const [showInfo, setShowInfo] = useState(false)
    const handleClose = () => setShowInfo(false)
    const handleShowInfo = () => setShowInfo(true)

    return (
        <div>
            <p className='clickable crew-name' onClick={handleShowInfo}>{`${crewmember.first_name} ${crewmember.last_name}`}</p>
            <Modal show={showInfo} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{crewmember.first_name} {crewmember.last_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><b>Email:</b> {crewmember.email}</p>
                    <p><b>Phone:</b> {crewmember.phone}</p>
                </Modal.Body>
            </Modal>
        </div>
    )
}