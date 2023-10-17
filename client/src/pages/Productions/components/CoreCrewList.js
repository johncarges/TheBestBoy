import EditCoreCrewModal from "./EditCoreCrewModal"
import CrewNameWithModal from "../../../components/crew/CrewNameWithModal"


export default function CoreCrewList({coreRoleList, updateCoreCrew,productionID}) {


    const roles = ['Gaffer','Best Boy','Generator Operator','Lamp Operator','Dimmer Board Operator']


    function renderedRoleList(role) {
        return coreRoleList.filter(position =>(position.role===role)).map(position=>{
            return position.crewmember
            ? <li><CrewNameWithModal crewmember={position.crewmember}/></li>
            : <li>Unassigned</li>
        })
    }


    const renderedCoreList2 = roles.map(role => {
        if (coreRoleList.filter(position =>(position.role===role)).length >0) {
            return (
                <li className='core-list-role'>
                    <p className='specific-role-name'>{role}</p>
                    <ul className='specific-role-list'>
                        {renderedRoleList(role)}
                    </ul>
                </li>
            )
        }
    })

    return (
        <div className='core-crew-list-container'>
            <h3>Core Crew:</h3>
            <ul className='core-crew-outer-list'>
                {renderedCoreList2}
            </ul>
            <EditCoreCrewModal 
            coreRoleList={coreRoleList} 
            updateCoreCrew={updateCoreCrew}
            productionID={productionID}/>
        </div>
    )

}