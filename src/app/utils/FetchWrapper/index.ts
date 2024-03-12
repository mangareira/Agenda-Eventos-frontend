import axios, { Method } from "axios";

export const FetchWrapper = async (url: string, method: Method, body?: any) => {    
    const data = await axios.request({
        url: `http://localhost:3333${url}`,
        method,
        data: body
    })
        
    return data;
}