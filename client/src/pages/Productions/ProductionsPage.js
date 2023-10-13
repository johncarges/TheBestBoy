import { useEffect, useState } from "react";
import ProductionTile from "./components/ProductionTile";
import AddProduction from "./components/AddProduction";


export default function ProductionsPage() {

    const [productions, setProductions] = useState([])

    useEffect(()=> {
        fetch('/productions')
        .then(r=> {
            if (r.ok) {
                r.json().then(setProductions)
            }
        })
    },[])

    const renderedProductions = productions.map((production)=> (
        <ProductionTile
            production={production}
            key={production['id']}
        />
    ))

    function handleAddProduction(newProduction) {
        setProductions([
            ...productions,
            newProduction
        ])
    }

    return (
        <div>
            <div className='productions-list-header'>
                <h1>Productions</h1>
                <AddProduction
                    handleAddProduction={handleAddProduction}/>
            </div>
            <ul className='productions-list'>
                {renderedProductions}
            </ul>
        </div>
    )

}