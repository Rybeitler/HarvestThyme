import React, {useEffect, useState} from "react"

export function useLocalStorage(key, initalValue){
    const [value, setValue] = useState(()=>{
        const jsonValue = localStorage.getItem(key)
        if(jsonValue != null) return JSON.parse(jsonValue)

        if(typeof initalValue === 'function'){
            return initalValue()
        }else{
            return initalValue
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value]);

    return [value, setValue]
}