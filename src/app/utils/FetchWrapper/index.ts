import axios, { Method } from "axios";

export const FetchWrapper = async (url: string, method: Method, body?: any, params?: any ) => { 
    const getAccessToken = () => {
        if (typeof window !== 'undefined'){
            const token = localStorage.getItem('token');            
            return token
        } 
    }    
    try {
        const data:any = await axios.request({
            url: `http://localhost:3333${url}`,
            method,
            data: body,
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            },
            params,
        })                
        return data;
    } catch (error:any) {  
        return error
    }       
}