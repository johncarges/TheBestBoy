import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import Button from "react-bootstrap/Button"
import CrewTable from "./components/CrewTable"
import AddWorkdayModal from "./components/AddWorkdayModal"
import formatDate from "../../utils/FormatDate"
import sortDepartment from "../../utils/SortDepartment"

export default function ShootdayInfo() {

    const {id} = useParams()

    const [shootdayInfo, setShootdayInfo] = useState({
        id: '',
        production: '',
        date: '',
        location: '',
        to_hire: '',
        notes: '',
        workdays: []
    })

    useEffect(()=>{
        fetch(`/shootdays/${id}`)
        .then(r=>{
            if (r.ok) {
                r.json().then(setShootdayInfo)
            }
        })
    },[])

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
        <div>
            <h1>{shootdayInfo.production.name}</h1>
            <h2>{formatDate(shootdayInfo.date)}</h2>
            <h3>{shootdayInfo.location}</h3>
            
            <CrewTable workdayList={shootdayInfo.workdays} handleUpdateWorkday={handleUpdateWorkday}/>
            <AddWorkdayModal handleAddWorkdays={handleAddWorkdays}/>
        </div>
    )

}