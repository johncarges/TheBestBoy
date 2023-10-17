import { useEffect, useState } from "react"
import Button from "react-bootstrap/Button"


export default function EditableNotes(props) {

    const {notes,onSubmit} = props

    const [editing, setEditing] = useState(false)
    const [formData, setFormData] = useState('')
    const handleEditing = () => setEditing(true)
    const handleCancel = () => {
        setEditing(false)
        setFormData(`${notes}`)
    }

    useEffect(()=>{
        setFormData(`${notes}`)
    },[notes])

    const changeFormData = (e)=>setFormData(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
        setEditing(false)
    } 

    const formArea = <textarea disabled={!editing} className='note-box' rows='4' onChange={changeFormData} value={formData}></textarea>

    const buttons = !editing
        ? (<div className='notes-editing-button-row'>
                <i className="fas fa-pen clickable" onClick={handleEditing}></i>
            </div>)
        : (<div className='notes-editing-button-row'>
            <i className="fa-solid fa-check clickable" onClick={handleSubmit}></i>
            <i className="fa-solid fa-xmark clickable" onClick={handleCancel}></i>
            {/* <Button onClick={handleSubmit}>Submit</Button>
            <Button onClick={handleCancel}>Cancelt</Button> */}
        </div>)
    return (
        <div className='notes-container'>
            <h4>Notes</h4>
            <form>
                {formArea}
            </form>
            {buttons}
        </div>
    )

}