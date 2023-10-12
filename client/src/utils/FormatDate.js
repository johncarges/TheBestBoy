

export default function formatDate(time, shortMonth=false){
    const months = ['','January','February','March','April','May','June','July','August','September','October','November','December']
    
    const date = time.split('T')[0]
    console.log(date)
    const [year, month, day] = date.split('-')
    const monthName = shortMonth ? months[parseInt(month)].slice(0,3) : months[parseInt(month)]

    return `${monthName} ${day}, ${year}`
}


