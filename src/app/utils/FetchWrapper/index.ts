import axios, { Method } from "axios";

export const FetchWrapper = async (url: string, method: Method, body?: any, params?: any ) => { 
    let tokenLoc
        if (typeof window !== 'undefined'){
            const token = localStorage.getItem('token');            
            tokenLoc = token
        }     
    try {
        const data:any = await axios.request({
            url: `http://localhost:3333${url}`,
            method,
            data: body,
            headers: {
                Authorization: `Bearer ${tokenLoc}`
            },
            params,
        })                
        return data;
    } catch (error:any) {  
        return error
    }       
}