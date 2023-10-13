import React, { useEffect, useState } from "react";
import FilterCrew from "./components/FilterCrew";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import CrewmemberTile from "./components/CrewmemberTile";
import intersection from "../../utils/Intersection";

export default function CrewmembersPage() {

    const [crewmembers, setCrewmembers] = useState([])
    const [productionNames, setProductionNames] = useState([])
    const [filter, setFilter] = useState({
        roles: [],
        productions: []
    })

    const changeFilter = (f) => setFilter(f)

    useEffect(()=> {
        fetch('/productions')
        .then(r=> {
            if (r.ok) {
                r.json().then(data=> {
                    const names = data.map(production=>production.name)
                    setProductionNames(names)
                })
            }
        })
    },[])

    useEffect(()=>{
        fetch('/crewmembers')
        .then(r=>{
            if (r.ok) {
                r.json().then(setCrewmembers)
            }
        })
    },[])

    const productionFilteredCrewmembers = crewmembers.filter(crewmember => {
        if (filter.productions.length > 0) {
            return intersection(filter.productions, crewmember.productions).length > 0
        } else {
            return true
        }
    })


    const roleFilteredCrewmembers = productionFilteredCrewmembers.filter(crewmember => {
        if (filter.roles.length >0) {
            return intersection(filter.roles, crewmember.roles).length > 0 
        } else {
            return true
        }
    })

    const renderedCrewmembers = roleFilteredCrewmembers.map((crewmember) => (
        <CrewmemberTile 
        key={crewmember.id} 
        crewmember={crewmember}/>
    ))

    return (
        <div className='crew-list-page-container'>
            <h1>Contacts</h1>
            <div className='crew-list-body'>
                <FilterCrew
                filter={filter}
                changeFilter={changeFilter}
                productionNames={productionNames}
                />
                <div className='crew-list-side'>
                    <NavLink to='/home/crewmembers/new' exact>
                        Add New Contact
                    </NavLink>
                    <div className='crew-list-container'>
                        <ul className='crew-list'>{renderedCrewmembers}</ul>
                    </div>
                </div>
            </div>
        </div>
    )

}