
export default function ProductionTile({production}) {
    
    const dates = production.start_date
        ?( <p>Start Date: {production.start_date}  End Date: {production.end_date}</p>)
        : (<p>No shootdays scheduled yet</p>)
    

    return (
        <li>
            <p>{production.name}</p>
            
            {dates}
        </li>
    )

}