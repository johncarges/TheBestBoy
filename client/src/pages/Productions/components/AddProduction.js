import { useState } from "react";
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'


export default function AddProduction({handleAddProduction}){
    const [show, setShow] = useState(false)
    const [newProductionName, setNewProductionName] = useState('')

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const onChange = (e) => {
        setNewProductionName(e.target.value)
    }

    function onSubmit(e) {
        e.preventDefault()
        // Don't accept empty name?
        fetch('/productions',{
            method:"POST",
            headers:{'accepts':'application/json','content-type':'application/json'},
            body: JSON.stringify({'name':newProductionName})
        }).then(r=> {
            if (r.ok) {
                handleClose()
                r.json().then(handleAddProduction)
            } else {
                r.json().then(console.log)
            }
        })
    }

    return (
        <div>
            <button onClick={handleShow}>
                Add Production
            </button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Production</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <input 
                            value={newProductionName}
                            onChange={onChange}
                            placeholder='Production Name'/>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={onSubmit}>
                        Submit
                    </button>
                    <button onClick={handleClose}>
                        Cancel
                    </button>
                </Modal.Footer>

            </Modal>
        </div>
    )
}