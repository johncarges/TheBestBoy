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
                <h1 className='productions-header'>Productions</h1>
                <AddProduction
                    handleAddProduction={handleAddProduction}/>
            </div>
            <ul className='productions-list'>
                {renderedProductions}
            </ul>
        </div>
    )

}