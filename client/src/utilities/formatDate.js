export function formatDate(date){
    var cleaned = date.split('-')
    var mmDD = cleaned.slice(1)
    mmDD.push(cleaned[0])
    return mmDD.join('/')
}

