import React from "react";
import Table from 'react-bootstrap/Table'
import CrewTableRow from "./CrewTableRow";
import sortDepartment from "../../../utils/SortDepartment";



export default function CrewTable({workdayList, handleUpdateWorkday}) {


    

    const workdaysSorted = sortDepartment(workdayList)

    const crewList = workdaysSorted.map((workday)=>{
        return (
            <CrewTableRow 
            key={workday.id}
            workday={workday} 
            handleUpdateWorkday={handleUpdateWorkday}/>
        )
    })

    return (
        <div className='shootday-crewlist-table-container'>
            <Table>
                <thead>
                    <tr>
                        <th>Role</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {crewList}
                </tbody>
            </Table>
        </div>
    )
}