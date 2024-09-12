import axios, { Method } from "axios";

export const FetchRefresh = async (url: string, method: Method, refreshToken?: any ) => { 
    try {
        const data:any = await axios.request({
            url: `${process.env.NEXT_PUBLIC_API_URL}${url}`,
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