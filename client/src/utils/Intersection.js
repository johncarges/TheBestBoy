

export default function intersection(array1, array2) {
    return array1.filter(value => {
        return array2.includes(value)
    })
}