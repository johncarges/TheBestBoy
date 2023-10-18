

export default function sortDepartment(crewList) {

    const crewOrder = {
        'Gaffer': 1,
        'Best Boy':2,
        'Dimmer Board Operator':3,
        'Generator Operator': 4,
        'Lamp Operator': 5
    }

    function checkForAssignment ( position ) {
        // IF Position is filled, move to top of that role's section of crewlist
        if (position.crewmember) {
            return 1
        } else {
            return 0
        }
    }

    if (!crewList) {
        console.log(crewList)
        return null 
    }

    crewList.sort((a,b)=>{
        const diff = crewOrder[a.role] - crewOrder[b.role]
        if (diff){
            return diff
        } else {
            return checkForAssignment(b) - checkForAssignment(a)
        }
    })

    return crewList
}