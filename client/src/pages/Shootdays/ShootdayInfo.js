import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import Button from "react-bootstrap/Button"
import CrewTable from "./components/CrewTable"
import AddWorkdayModal from "./components/AddWorkdayModal"
import formatDate from "../../utils/FormatDate"
import sortDepartment from "../../utils/SortDepartment"
import BackButton from "../../components/misc/BackButton"
import { Link } from "react-router-dom/cjs/react-router-dom"
import EditableLocation from "./components/EditableLocation"
import ShootdayNotesModal from "./components/ShootdayNotesModal"

export default function ShootdayInfo(props) {

    const {id} = useParams()
    const history = useHistory()
    
    const shootdays = history.location.state
    const shootdayIDs = shootdays.map(sd=>parseInt(sd.id))

    const production_id = shootdays[0]?.production.id

    const [shootdayInfo, setShootdayInfo] = useState({
        id: '',
        production: '',
        date: '',
        location: '',
        to_hire: '',
        notes: '',
        workdays: []
    })

    const [deletingShootday, setDeletingShootday] = useState(false)
    

    const [renderToggle, setRenderToggle] = useState(false)
    // use to re-render after hitting next or previous
    function toggle () {
        setRenderToggle(t=>!t)
    }

    useEffect(()=>{
        fetch(`/shootdays/${id}`)
        .then(r=>{
            if (r.ok) {
                r.json().then(setShootdayInfo)
            } else {
                r.json().then(console.log)
            }
        })
    },[renderToggle])

    function nextShootdayID(currentID) {
        const index = shootdayIDs.indexOf(parseInt(currentID))
        if (index === shootdayIDs.length) {
            return null
        } else {
            return shootdayIDs[index+1]
        }
    }

    const nextShootdayButton = nextShootdayID(id) 
        ? <i 
            className="fa-solid fa-arrow-right clickable"
            onClick={()=>{history.push({
            pathname:`/home/shootdays/${nextShootdayID(id)}`,
            state: shootdays
            })
            toggle()
            }}></i>
        : <i className="fa-solid fa-arrow-right" style={{opacity:0.5}}></i>

        // <i class="fa-solid fa-arrow-right"></i>
    function previousShootdayID(currentID) {
        const index = shootdayIDs.indexOf(parseInt(currentID))
        if (index === 0) {
            return null
        } else {
            return shootdayIDs[index-1]
        }
    }

    const previousShootdayButton = previousShootdayID(id) 
        ? <i className='fa-solid fa-arrow-left clickable' 
            onClick={()=>{
            history.push({
                pathname:`/home/shootdays/${previousShootdayID(id)}`,
                state: shootdays
            })
            toggle()
            }}></i>
        : <i className="fa-solid fa-arrow-left" style={{opacity:0.5}}></i>

    function handleAddWorkdays (workdaysObject) {
        // from workdaysObject = {Gaffer: 1, Best Boy: 2... etc}
        // to [Gaffer, Best Boy, Best Boy, ...]
        const workdaysToAdd = []
        for (const key in workdaysObject) {
            for (let i=0; i<workdaysObject[key]; i++) {
                workdaysToAdd.push(key)
            }
        }
        fetch('/workdays',{
            method: "POST",
            headers: {'accepts':'application/json','content-type':'application/json'},
            body: JSON.stringify({
                'shootday_id':id,
                'workdays': workdaysToAdd
            })
        }).then(r=> {
            if (r.ok) {
                r.json().then(data => {
                    setShootdayInfo({
                        ...shootdayInfo,
                        workdays: [
                            ...shootdayInfo.workdays,
                            ...data
                        ]
                    })
                }
                )
            }
        })
        
    }

    function handleUpdateWorkday( workday ) {
        setShootdayInfo({
            ...shootdayInfo,
            workdays: [
                ...shootdayInfo.workdays.filter(wd=>wd.id !== workday.id),
                workday
            ]
        })
    }

    function handleUpdateShootdayInfo (key, value) {
        fetch(`/shootdays/${shootdayInfo.id}`,{
            method: 'PATCH',
            headers:{'content-type':'application/json','accepts':'application/json'},
            body: JSON.stringify({[key]:value})
        }).then(r=> {
            if (r.ok){
                r.json().then(data=>{
                    setShootdayInfo({
                        ...shootdayInfo,
                        [key]: data[key]
                    })})
            } else {
                r.json().then(console.log)
            }
        })
    }

    function handleUpdateLocation(newLocation) {
        handleUpdateShootdayInfo('location',newLocation)
    }

    function handleUpdateNotes(newNotes) {
        handleUpdateShootdayInfo('notes',newNotes)
    }

    function handleDeleteShootday() {
        const prod_id = shootdayInfo.production.id
        fetch(`/shootdays/${shootdayInfo.id}`, {
            method: "DELETE"
        }).then(r=>{
            if (r.ok) {
                history.push(`/home/productions/${prod_id}`)
            }
        })
    }

    return (
        <div className='shootday-page'>
            <div className='shootday-page-info'>
                <div className='shootday-page-info-left-side'>
                    <div className='shootday-name-and-back'>
                        <Link className='back-link' to={`/home/productions/${production_id}`}>Back</Link>
                        <h2 className='shootday-production-name'>{shootdayInfo.production.name}</h2>
                    </div>
                    <div className='shootday-date-and-buttons'>
                        {previousShootdayButton}
                        <h2 className='shootday-date'>{formatDate(shootdayInfo.date)}</h2>
                        {nextShootdayButton}
                    </div>
                    <EditableLocation 
                        location={shootdayInfo.location}
                        onUpdate={handleUpdateLocation}
                        toggle={toggle}/>
                    {deletingShootday 
                    ? <div className='delete-production-button-area'>
                        <Button className='confirm-delete-button' variant='danger' onClick={handleDeleteShootday}>Confirm</Button> 
                        <Button onClick={()=>setDeletingShootday(false)}>Cancel</Button>
                        <p>Confirm Delete?</p>
                        </div>
                    : <div className='delete-production-button-area'><Button variant='danger' onClick={()=>setDeletingShootday(true)}>Delete Shootday</Button></div>}
                
                </div>
                <div className='shootday-page-info-right-side'>
                    <ShootdayNotesModal 
                    className='shootday-notes-modal' 
                    notes={shootdayInfo.notes} 
                    handleUpdate={handleUpdateNotes} 
                    toggle={toggle}/>
                </div>
            </div>
            <CrewTable workdayList={shootdayInfo.workdays} handleUpdateWorkday={handleUpdateWorkday}/>
            <AddWorkdayModal handleAddWorkdays={handleAddWorkdays}/>
        </div>
    )

}