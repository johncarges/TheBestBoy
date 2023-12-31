import { useEffect, useState } from "react";
import ProductionTile from "./components/ProductionTile";
import AddProduction from "./components/AddProduction";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


export default function ProductionsPage() {

    const [productions, setProductions] = useState([])
    const history = useHistory({forceRefresh:true})

    useEffect(()=> {
        fetch('/productions')
        .then(r=> {
            if (r.ok) {
                r.json().then(setProductions)
            } else {
                r.json().then(error=>{
                    if (error.error==='401 No User') {
                        history.push('/welcome')
                    } else {console.log(error)}
                })
            }
        })
    },[])

    const sortStartDates = (a,b) => {
        if (a.start_date && b.start_date) {
            return a.start_date.localeCompare(b.start_date)
        } else if (a.start_date) {
            return -1
        } else {
            return 1
        }
    }

    const sortedProductions = productions.sort(sortStartDates)

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
        <div className='prductions-page-container'>
            <div className='productions-list-header'>
                <h1 className='productions-header'>Productions</h1>
                <AddProduction
                    handleAddProduction={handleAddProduction}/>
            </div>
            <div className='productions-list-container'>
                <ul className='productions-list'>
                    {renderedProductions}
                </ul>
            </div>
        </div>
    )

}