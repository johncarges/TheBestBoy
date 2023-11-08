import React, { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom'
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import CalendarComponent from "../../components/calendars/CalendarComponent";
import formatDateForPost from "../../utils/FormatDateForPost";
import CoreCrewList from "./components/CoreCrewList";
import EditableNotes from "../../components/misc/EditableNotes";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Button from 'react-bootstrap/Button'
import AddDatesButtons from "./components/AddDatesButtons";

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
    const [deletingProduction,setDeletingProduction]=useState(false)

    useEffect(()=> {
        fetch(`/productions/${id}`)
        .then(r=> {
            if (r.ok) {
                r.json().then(setProductionInfo)
            } else {
                r.json().then(console.log)
            }
        })
    },[])


    function handleStartAdding() {
        setAddingDates(true)
    }

    function handleCancel() {
        setDatesToAdd([])
        setAddingDates(false)
    }

    function handleClickDate(date) {
        if (addingDates) {
            if (datesToAdd.map(date=>date.dateStr).includes(date.dateStr)) {
                setDatesToAdd(datesToAdd.filter(d=>d.dateStr!==date.dateStr))
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
            } else {
                r.json().then(console.log)
            }
        })
    }

    function handleDeleteProduction() {
        fetch(`/productions/${productionInfo.id}`,{
            method:"DELETE"
        }).then(r=> {
            if (r.ok){
                history.push('/home/productions')
            }
        })
        
    }

    return (
        <div className='production-detail-page-container'>
            <div className='production-detail-page-left'>
                <Link className='back-link' to={`/home/productions/`}>Back</Link>
                <div className='production-detail-page-info'>
                    <h3 className='production-detail-page-title'>{productionInfo.name}</h3>
                    <EditableNotes notes={productionInfo['notes']} onSubmit={updateProductionNotes}/>
                </div>
                <div className='production-detail-adding-dates-container'>
                    <AddDatesButtons 
                        submitDates={submitDates}
                        handleStartAdding={handleStartAdding}
                        handleCancel={handleCancel}
                        addingDates={addingDates}
                    />
                </div>
                {deletingProduction 
                    ? <div className='delete-production-button-area'>
                        <Button className='confirm-delete-button' variant='danger' onClick={handleDeleteProduction}>Confirm</Button> 
                        <Button onClick={()=>setDeletingProduction(false)}>Cancel</Button>
                        <p>Confirm Delete?</p>
                        </div>
                    : <div className='delete-production-button-area'><Button variant='danger' onClick={()=>setDeletingProduction(true)}>Delete Production</Button></div>}
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
                    handleClickDate={handleClickDate}
                    startDate={productionInfo.start_date}/>
            </div>
        </div>
    )

}