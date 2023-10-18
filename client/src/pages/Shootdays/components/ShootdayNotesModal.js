import { useState, useEffect } from "react"
import Button from "react-bootstrap/Button"
import Modal from 'react-bootstrap/Modal'


export default function ShootdayNotesModal(props) {

    const {notes, handleUpdate, toggle} = props

    const [show, setShow] = useState(false)
    const [editing, setEditing] = useState(false)
    const [formData, setFormData] = useState(`${notes}`)
    

    const handleClose = () => {
        setEditing(false)
        setShow(false)
    }
    const handleShow = () => setShow(true)
    const handleEdit =() =>setEditing(true)

    const handleSubmit = () => {
        handleUpdate(formData)
        handleClose()
        toggle()
    }

    useEffect(()=>{
        setFormData(`${notes}`==='null' ? '' : `${notes}`)
    },[show])

    const onChange = (e) => setFormData(e.target.value)


    const footer = editing
        ? <i className="fas fa-check clickable location-edit-icon" onClick={handleSubmit}></i>
        : <i className="fas fa-pen clickable location-edit-icon" onClick={handleEdit}></i>

    return (
        <div className='shootday-notes-container'>
            <div className='shootday-notes-header'>
                <h5>Notes:</h5>
                <i className="fa-solid fa-maximize clickable location-edit-icon" onClick={handleShow}></i>
            </div>
            <p className='shootday-notes'>{notes}</p>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Notes:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editing 
                    ? <textarea className='shootday-notes-textarea' rows='10'value={formData} onChange={onChange}/> 
                    : <p className='shootday-notes-preview'>{notes}</p>}
                </Modal.Body>
                <Modal.Footer>
                    {footer}
                </Modal.Footer>

            </Modal>
        </div>
        
    )

}