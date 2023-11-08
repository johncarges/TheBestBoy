import EditCoreCrewModal from "./EditCoreCrewModal"
import CrewNameWithModal from "../../../components/crew/CrewNameWithModal"


export default function CoreCrewList({coreRoleList, updateCoreCrew,productionID}) {


    const roles = ['Gaffer','Best Boy','Generator Operator','Dimmer Board Operator','Lamp Operator']


    function renderedRoleList(role) {
        return coreRoleList.filter(position =>(position.role===role)).map((position,index)=>{
            return position.crewmember
            ? <li key={index}><CrewNameWithModal crewmember={position.crewmember}/></li>
            : <li key={index}>Unassigned</li>
        })
    }


    const renderedCoreList = roles.map((role,index) => {
        if (coreRoleList.filter(position =>(position.role===role)).length >0) {
            return (
                <li key={index} className='core-list-role'>
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
            <h5>Core Crew:</h5>
            <ul className='core-crew-outer-list'>
                {renderedCoreList}
            </ul>
            <EditCoreCrewModal 
            coreRoleList={coreRoleList} 
            updateCoreCrew={updateCoreCrew}
            productionID={productionID}/>
        </div>
    )

}