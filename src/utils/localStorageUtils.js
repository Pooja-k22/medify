/**
 * Get data from localStorage
 * @param {string} key 
 * @returns {any} 
 */

export const getItem = (key)=>{
    try {

        const item = localStorage.getItem(key)
        return item? JSON.parse(item) : null;
        
    } catch (error) {
        console.error(`error in getting key ${key} value`)
        return null
    }
}


/**
 * set item
 * @param {string} key
 * @param {any} value 
 */

export const setItem =(key,value)=>{
    try {
        const stringValue = JSON.stringify(value)
        localStorage.setItem(key,stringValue)
        
    } catch (error) {
        console.error(`error in setting ${key}`)
    }
}