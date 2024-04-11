import axios, { Method } from "axios";

export const FetchRefresh = async (url: string, method: Method, refreshToken?: any ) => { 
    try {
        const data:any = await axios.request({
            url: `http://localhost:3333${url}`,
            method,
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        })        
        return data;
    } catch (error:any) {  
        return error
    }       
}