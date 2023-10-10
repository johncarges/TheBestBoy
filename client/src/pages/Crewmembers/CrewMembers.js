import React, { useEffect, useState } from "react";
import FilterCrew from "./components/FilterCrew";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";


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
        <li key={crewmember.id}>
            <p>{crewmember.first_name} <b>{crewmember.last_name}</b></p>
        </li>
    ))

    return (
        <div>
            <h1>Contacts</h1>
            <div className='crewListBody'>
                <FilterCrew/>
                <div>
                    <NavLink to='/crewmembers/new' exact>
                        Add New Contact
                    </NavLink>
                    <ul>{renderedCrewmembers}</ul>
                </div>
            </div>
        </div>
    )

}