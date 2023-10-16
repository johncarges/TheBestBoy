import Table from "react-bootstrap/Table"

import EditCoreCrewModal from "./EditCoreCrewModal"



export default function CoreCrewList({coreRoleList, updateCoreCrew,productionID}) {


    const renderedCoreList = coreRoleList.map(coreRole=> {
        const info = coreRole.crewmember
            ? `${coreRole.crewmember.first_name} ${coreRole.crewmember.last_name}`
            : 'Unassigned'
       
        return (
            <tr key={coreRole.id}>
                <td>
                    {coreRole.role}
                </td>                        
                <td>{info}</td>
            </tr>
        )
            
    })


    return (
        <div className='core-crew-list-container'>
            <h3>Core Crew:</h3>
            <Table className='table-borderless'>
                <tbody>
                    {renderedCoreList}
                </tbody>
            </Table>
            <EditCoreCrewModal 
            coreRoleList={coreRoleList} 
            updateCoreCrew={updateCoreCrew}
            productionID={productionID}/>
        </div>
    )

}