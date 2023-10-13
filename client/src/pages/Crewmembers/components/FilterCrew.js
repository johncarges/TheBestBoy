import FilterCheckBox from "./FilterCheckBox"

export default function FilterCrew({filter, changeFilter, productionNames}) {

    const roles = ['Gaffer','Best Boy','Generator Operator','Lamp Operator','Dimmer Board Operator']

    function handleProductionChange(e) {
        changeFilter({
            ...filter,
            productions: e.target.value
        })
    }

    return (
        <div className='crew-filter-container'>
            <h1>Filter:</h1>
            <h3>Roles</h3>
            <FilterCheckBox
            filterType='roles' 
            checkList={roles}
            filter={filter}
            changeFilter={changeFilter}
            />
            <h3>Recent Productions:</h3>
            <FilterCheckBox
            filterType='productions' 
            checkList={productionNames}
            filter={filter}
            changeFilter={changeFilter}
            />
        </div>
    )

}