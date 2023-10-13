import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import Button from "react-bootstrap/Button"
import CrewTable from "./components/CrewTable"
import AddWorkdayModal from "./components/AddWorkdayModal"
import formatDate from "../../utils/FormatDate"
import sortDepartment from "../../utils/SortDepartment"

export default function ShootdayInfo(props) {

    const {id} = useParams()
    const history = useHistory()
    
    const shootdays = history.location.state
    const shootdayIDs = shootdays.map(sd=>parseInt(sd.id))

    const [shootdayInfo, setShootdayInfo] = useState({
        id: '',
        production: '',
        date: '',
        location: '',
        to_hire: '',
        notes: '',
        workdays: []
    })

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
        ? <p onClick={()=>{history.push({
            pathname:`/home/shootdays/${nextShootdayID(id)}`,
            state: shootdays
            })
            toggle()
            }}>&gt;</p>
        : null

    function previousShootdayID(currentID) {
        const index = shootdayIDs.indexOf(parseInt(currentID))
        if (index === 0) {
            return null
        } else {
            return shootdayIDs[index-1]
        }
    }

    const previousShootdayButton = previousShootdayID(id) 
        ? <p onClick={()=>{
            console.log(previousShootdayID(id))
            history.push({
                pathname:`/home/shootdays/${previousShootdayID(id)}`,
                state: shootdays
            })
            toggle()
            }}>&lt;</p>
        : null

    function handleAddWorkdays (workdaysObject) {
        // from workdaysObject = {Gaffer: 1, Best Boy: 2... etc}
        // to [Gaffer, Best Boy, Best Boy, ...]
        const workdaysToAdd = []
        for (const key in workdaysObject) {
            for (let i=0; i<workdaysObject[key]; i++) {
                workdaysToAdd.push(key)
            }
        }
        console.log(workdaysToAdd)
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
                    console.log(data)
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
                ...shootdayInfo.workdays.filter(wd=>wd.id != workday.id),
                workday
            ]
        })
    }





    return (
        <div className='shootday-page'>
            <div className='shootday-page-info'>
                <div className='shootday-page-info-left-side'>
                    <h2>{shootdayInfo.production.name}</h2>
                    <div className='shootday-date-and-buttons'>
                        {previousShootdayButton}
                        <h2>{formatDate(shootdayInfo.date)}</h2>
                        {nextShootdayButton}
                    </div>
                    <h3>Location: {shootdayInfo.location}</h3>
                </div>
                <div className='shooday-page-info-right-side'>

                </div>
            </div>
            <CrewTable workdayList={shootdayInfo.workdays} handleUpdateWorkday={handleUpdateWorkday}/>
            <AddWorkdayModal handleAddWorkdays={handleAddWorkdays}/>
        </div>
    )

}