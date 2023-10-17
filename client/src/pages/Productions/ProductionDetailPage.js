import React, { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom'
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Button from "react-bootstrap/Button";
import CalendarComponent from "../../components/calendars/CalendarComponent";
import formatDate from '../../utils/FormatDate'
import formatDateForPost from "../../utils/FormatDateForPost";
import CoreCrewList from "./components/CoreCrewList";
import EditableNotes from "../../components/misc/EditableNotes";

export default function ProductionDetailPage() {

    const {id} = useParams()
    const history = useHistory()

    const [productionInfo, setProductionInfo] = useState({
        id: '',
        name: '',
        start_date: '',
        end_date: '',
        notes: '',
        shootdays: [],
        core_roles: []
    })

    const [addingDates, setAddingDates] = useState(false)
    const [datesToAdd, setDatesToAdd] = useState([])


    useEffect(()=> {
        fetch(`/productions/${id}`)
        .then(r=> {
            if (r.ok) {
                r.json().then(setProductionInfo)
            } else {
                history.push()
            }
        })
    },[])

    let schedule;

    if (productionInfo.shootdays.length) {
        schedule = productionInfo.shootdays.map((shootday)=> (
            <li>
                <p>{shootday.date}</p>
            </li>
        ))
    } else {
        schedule = (
            <li> No days scheduled yet! </li>
        )
    }

    function handleStartAdding() {
        setAddingDates(true)
    }

    function handleClickDate(date) {
        if (addingDates) {
            if (datesToAdd.includes(date)) {
                console.log(date)
                setDatesToAdd(datesToAdd.filter(d=>d!==date))
            } else {
                setDatesToAdd([
                    ...datesToAdd,
                    date
                ])
            }
        }
    }

    function submitDates() {
        
        const postBody = {
            'production_id': productionInfo.id,
            'dates':datesToAdd.map(dateInfo=>formatDateForPost(String(dateInfo.date)))
        }
        const postConfig = {
            method: "POST",
            headers: {"content-type":'application/json','accepts':'application/json'},
            body: JSON.stringify(postBody)
        }

        fetch('/shootdays_bulk',postConfig)
        .then(r=>r.json())
        .then(data => {
            const newShootdayList = productionInfo.shootdays.concat(data)
            newShootdayList.sort((day1,day2)=>day1.date.localeCompare(day2.date))
            setProductionInfo({
                ...productionInfo,
                shootdays: newShootdayList
            })
            setAddingDates(false)
            setDatesToAdd([])
        })
    }

    const changeProductionInfo = (newInfo) => setProductionInfo(newInfo)

    function updateCoreCrew (newCore) {
        changeProductionInfo({
            ...productionInfo,
            core_roles: newCore
        })
    }

    function updateProductionNotes(newNotes) {
        fetch(`/productions/${productionInfo.id}`,{
            method: "PATCH",
            headers: {'accepts':'application/json', 'content-type':'application/json'},
            body: JSON.stringify({notes:newNotes})
        }).then(r=>{
            if (r.ok) {
                r.json().then(data=> {
                    changeProductionInfo({
                        ...productionInfo,
                        notes: data['notes']
                    })
                })
            }
        })
    }

    return (
        <div className='production-detail-page-container'>
            <div className='production-detail-page-left'>
                <Button onClick={history.goBack}>Back</Button>
                <div className='production-detail-page-info'>
                    <h1 className='production-detail-page-title'>{productionInfo.name}</h1>
                    {/* <p className='production-detail-page-notes'>{productionInfo.notes}</p> */}
                    <EditableNotes notes={productionInfo['notes']} onSubmit={updateProductionNotes}/>
                </div>
                <div className='production-detail-adding-dates-container'>
                    {addingDates
                        ? <button onClick={submitDates}>Submit</button>
                        : <button onClick={handleStartAdding}>Add Dates</button>
                        }
                </div>
                <CoreCrewList 
                coreRoleList={productionInfo.core_roles} 
                updateCoreCrew={updateCoreCrew}
                productionID={productionInfo.id}/>
            </div>
            <div className='production-detail-page-calendar'>
                <CalendarComponent 
                shootdays={productionInfo.shootdays}
                addingDates={addingDates}
                datesToAdd={datesToAdd}
                handleClickDate={handleClickDate}/>
            </div>
        </div>
    )

}