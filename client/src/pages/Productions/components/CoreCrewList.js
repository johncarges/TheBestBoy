


export default function CoreCrewList({coreRoleList}) {

    const renderedCoreList = coreRoleList.map(coreRole=> {
        return (
        <li>
            <p>{coreRole.role}</p>
            <p>{coreRole.crewmember.first_name} {coreRole.crewmember.last_name}</p>
        </li>)
    })

    return (
        <div>
            <ul>
                {renderedCoreList}
            </ul>
        </div>
    )

}