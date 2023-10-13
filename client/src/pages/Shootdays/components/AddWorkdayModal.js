import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'


export default function AddWorkdayModal({handleAddWorkdays}) {
    const roles = ['Gaffer', 'Best Boy', 'Generator Operator', 'Dimmer Board Operator', 'Lamp Operator']
    
    const [showInfo, setShowInfo] = useState(false)
    
    const initialRoleCount = {}
    roles.forEach( role => {
        initialRoleCount[role] = 0
    });
    const [roleCounts, setRoleCounts] = useState(initialRoleCount)


    const handleClose = () => setShowInfo(false)
    const handleShowInfo = () => setShowInfo(true)

    function handleUpdateCounter(e) {
        setRoleCounts({
            ...roleCounts,
            [e.target.name]: e.target.value
        })
    }

    const roleCounter = Object.keys(roleCounts).map((role,index) => {
        return (<tr key={index}>
                <th>{role}:</th> 
                <th><input
                    className='add-position-input' 
                    type='number' 
                    min='0'
                    name={role} 
                    id={index}
                    value={roleCounts[role]}
                    onChange={handleUpdateCounter}/>
                </th>
            </tr>)
    })
    
    function handleSubmit(e) {
        handleAddWorkdays(roleCounts)
        handleClose()
        setRoleCounts(initialRoleCount)
    }


    return (
        <div>
            <Button onClick={handleShowInfo}>Add Position</Button>
            <Modal show={showInfo} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Crew Positions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <tbody>
                            {roleCounter}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleSubmit}>
                        Add
                    </button>
                    <button onClick={handleClose}>
                        Close
                    </button>
                </Modal.Footer>

            </Modal>
        </div>
        
    )
}