import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import CoreRoleEditRow from './CoreRoleEditRow'
import AddCoreCrewModalButton from './AddCoreCrewModalButton'
import sortDepartment from '../../../utils/SortDepartment'

export default function EditCoreCrewModal(props) {

    const {coreRoleList, updateCoreCrew,productionID} = props
    const [displayedRoleList, setDisplayedRoleList] = useState(sortDepartment([...coreRoleList]))

    
    const [contacts, setContacts] = useState([])
    
    const [showInfo, setShowInfo] = useState(false)
    const handleClose = () => setShowInfo(false)
    const handleShowInfo = () => setShowInfo(true)

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
    },[coreRoleList,showInfo])




    function handleSubmit(e) {
        e.preventDefault()
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
        setDisplayedRoleList(sortDepartment([
            ...displayedRoleList,
            {crewmember: null, production:productionID, role:role}
        ]))
    }

    function handleDeleteRole(id) {
        console.log(id)
        console.log('hi!')
        setDisplayedRoleList(displayedRoleList.filter(role=>{
            return role.id !== id
        }))
    }

    function updateDisplayedCrewmember(newCrewmember, index) {
        setDisplayedRoleList(displayedRoleList.map((role,i)=>{
            if (i===index){
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
            index={index}
            handleDelete={handleDeleteRole}/>

    })


    return (
        <div>
            <Button onClick={handleShowInfo}>Edit Core Crew</Button>
            <Modal className='core-crew-modal' show={showInfo} onHide={handleClose}>
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