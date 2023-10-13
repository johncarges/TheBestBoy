import Form from 'react-bootstrap/Form'

export default function FilterCheckBox(props){
    
    const {filterType, checkList, filter, changeFilter} = props

    function onChange(e) {
        const checkedValue = e.target.name
        if (filter[filterType].includes(checkedValue)){
            changeFilter({
                ...filter,
                [filterType]: filter[filterType].filter(option=>option!==checkedValue)
            }) 
        } else {
            changeFilter({
                ...filter,
                [filterType]:[...filter[filterType], checkedValue]
            })
        }
    }

    const options = checkList.map((option)=> {
        
        return( <Form.Check
            label={option}
            name={option}
            id={option}
            type='checkbox'
            onChange={onChange}
            />)
    })
    
    return (
        <Form>
            <div key={`reverse-checkbox`} className='mb-3'>
                {options}
            </div>
        </Form>
    )
}