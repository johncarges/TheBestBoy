import Button from "react-bootstrap/Button"

export default function AddDatesButtons(props) {

    const {submitDates, handleStartAdding, handleCancel, addingDates} = props

    if (addingDates) {
        return (
            <div>
                <div className='adding-dates-button-container'>
                    <Button className='adding-dates-submit-button' onClick={submitDates}>Submit</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </div>
                <p>Click on dates and submit to add</p>

            </div>

        )
    } else {
        return (
            <Button onClick={handleStartAdding}>Add Dates</Button>
        )
    }
        

}