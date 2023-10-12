import React, { useEffect, useState } from "react";
import FilterCrew from "./components/FilterCrew";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import CrewmemberTile from "./components/CrewmemberTile";


export default function CrewmembersPage() {

    const [crewmembers, setCrewmembers] = useState([])

    useEffect(()=>{
        fetch('/crewmembers')
        .then(r=>{
            if (r.ok) {
                r.json().then(setCrewmembers)
            }
        })
    },[])


    const renderedCrewmembers = crewmembers.map((crewmember) => (
        <CrewmemberTile 
        key={crewmember.id} 
        crewmember={crewmember}/>
    ))

    return (
        <div className='crew-list-page-container'>
            <h1>Contacts</h1>
            <div className='crew-list-body'>
                <FilterCrew/>
                <div className='crew-list-side'>
                    <NavLink to='/crewmembers/new' exact>
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