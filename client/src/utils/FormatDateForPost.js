
export default function formatDateForPost(fullCalDate) {
    // Full cal date example: Tue Oct 17 2023
    // console.log(fullCalDate)
    const [monthShort, day, year] = fullCalDate.split(' ').slice(1,4)
    const months = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const month = months.indexOf(monthShort)

    return `${year}-${month}-${day}`
    
}