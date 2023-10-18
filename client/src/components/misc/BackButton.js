import Button from 'react-bootstrap/Button'


export default function BackButton(props) {

    const {history, destination} = props

    const onClick = () => {
        if (destination) {
            history.push()
        } else {
            history.goBack()
        }
    }
    return (
        <Button className='back-button' onClick={onClick}>Back</Button>
    )

}