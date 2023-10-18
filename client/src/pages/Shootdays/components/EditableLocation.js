import { useEffect, useState } from "react";


export default function EditableLocation (props) {

    const {location,onUpdate,toggle} = props

    const [editing, setEditing] = useState(false)
    const [editText, setEditText] = useState('')

    const handleEditing = () => setEditing(true)
    const handleCancel = () => {
        setEditing(false)
        setEditText('')
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        onUpdate(editText)
        handleCancel()
    }

    useEffect(()=>{
        handleCancel()
    },[toggle])

    const handleChange = (e) => setEditText(e.target.value)

    const locationField = editing
        ?   <span>
                <input 
                className='location-edit-input' 
                onChange={handleChange}
                value={editText}
                />
                <i className="fas fa-check clickable location-edit-icon" onClick={handleSubmit}></i>
                <i className="fas fa-xmark clickable location-edit-icon" onClick={handleCancel}></i>
            </span>
        : <span>{location}<i className="fas fa-pen clickable location-edit-icon" onClick={handleEditing}></i></span>

    return (
        <div>
            <h3 className='shootday-page-info-location'>
                Location: {locationField}
            </h3>
        </div>
    )

}