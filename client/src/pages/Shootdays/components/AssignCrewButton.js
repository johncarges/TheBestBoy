import Button  from "react-bootstrap/Button"
import React, { useState } from "react"
import Modal from 'react-bootstrap/Modal'


export default function AssignCrewButton({workday, handleUpdateWorkday}) {

    const [showInfo, setShowInfo] = useState(false)
    const [crewmembers, setCrewmembers] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const handleClose = () => setShowInfo(false)
    const handleShowInfo = () => {
        fetch('/crewmembers')
        .then(r => {
            if (r.ok) {
                r.json().then(setCrewmembers)
            } else {
                r.json().then(console.log)
            }
        })
        setShowInfo(true)
    }

    function onSearchChange(e) {
        setSearchTerm(e.target.value)
    }

    function onSelect(crewmember) {
        fetch(`/workdays/${workday.id}`, {
            method: "PATCH",
            headers: {'accepts':'application/json','content-type':'application/json'},
            body: JSON.stringify({'crewmember_id':crewmember.id})
        }).then(r => {
            if (r.ok) {
                r.json().then(updatedInfo => {
                    handleUpdateWorkday(updatedInfo)
                    handleClose()
                })
            }
        })
    }

    const filteredCrew = crewmembers.filter(cm=>{
        if (cm.first_name) {
            return cm.first_name.toLowerCase().includes(searchTerm.toLowerCase()) || cm.last_name.toLowerCase().includes(searchTerm.toLowerCase())
        }
    })

    const renderedResults = filteredCrew.map(cm => {
        return (<li key={cm.id} className='clickable' onClick={(e)=>onSelect(cm)}>{cm.first_name} {cm.last_name}</li>)
    })

    return (
        <div>
            <Button onClick={handleShowInfo}>Assign</Button>
            <Modal show={showInfo} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Assign {workday.role}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <input 
                        className='assign-crew-search'
                        type='search' 
                        placeholder='Search crewmembers' 
                        value={searchTerm}
                        onChange={onSearchChange}/>
                    </form>
                    <div className={'assign-crew-results-container'}>
                        <ul className={'assign-crew-results'}>
                            {renderedResults}
                        </ul>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    
    )
}