import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import CoreRoleEditRow from './CoreRoleEditRow'
import AddCoreCrewModalButton from './AddCoreCrewModalButton'

export default function EditCoreCrewModal(props) {

    const {coreRoleList, updateCoreCrew,productionID} = props
    const [displayedRoleList, setDisplayedRoleList] = useState([...coreRoleList])

    
    const [contacts, setContacts] = useState([])

    useEffect(()=>{
        fetch('/crewmembers')
        .then(r=>{
            if (r.ok) {
                r.json().then(setContacts)
            }
        })
    },[])


    useEffect(()=>{
        setDisplayedRoleList([...coreRoleList])
    },[coreRoleList])


    const [showInfo, setShowInfo] = useState(false)
    const handleClose = () => setShowInfo(false)
    const handleShowInfo = () => setShowInfo(true)

    // const [adding, setAdding] = useState(false)
    // const handleCloseAdding = () => setAdding(false)
    // const handleShowAdding = () => setAdding(true)


    function handleSubmit(e) {
        e.preventDefault()
        console.log(displayedRoleList)
        fetch(`/production_core_roles/${productionID}`,{
            method: "PATCH",
            headers: {'accepts':'application/json','content-type':'application/json'},
            body: JSON.stringify(displayedRoleList)
        }).then(r => {
            if (r.ok) {
                r.json().then(updateCoreCrew)
            } else {
                r.json().then(console.log)
            }
        })
        handleClose()
    }

    function handleAddRole(role){
        setDisplayedRoleList([
            ...displayedRoleList,
            {crewmember: null, production:productionID, role:role}
        ])
    }

    function updateDisplayedCrewmember(newCrewmember, index) {
        setDisplayedRoleList(displayedRoleList.map((role,i)=>{
            if (i===index){
                console.log(role)
                return {
                    ...role,
                    crewmember: newCrewmember
                }
            } else {
                return role
            }
        }))
    }

    const renderedCoreList = displayedRoleList.map((role,index)=>{
        return <CoreRoleEditRow 
            key={index}
            contacts={contacts} 
            role={role}
            onClick={updateDisplayedCrewmember}
            index={index}/>

    })


    return (
        <div>
            <Button onClick={handleShowInfo}>Edit Core Crew</Button>
            <Modal show={showInfo} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Core Crew</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <tbody>
                            {renderedCoreList}
                            <AddCoreCrewModalButton handleAddRole={handleAddRole}/>
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleSubmit}>
                        Update
                    </button>
                    <button onClick={handleClose}>
                        Close
                    </button>
                </Modal.Footer>

            </Modal>
        </div>

    )

}