import React from "react"
import Modal from 'react-bootstrap/Modal'

export default function CrewInfoModal (props) {

    const {showInfo, handleClose, crewmember} = props

    return (
        <Modal show={showInfo} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{crewmember.first_name} {crewmember.last_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><b>Email:</b> {crewmember.email}</p>
                <p><b>Phone:</b> {crewmember.phone}</p>
            </Modal.Body>
        </Modal>
    )
}