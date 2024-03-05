import axios, { Method } from "axios";

export const FetchWrapper = async (url: string, method: Method) => {
    const data = await axios.request({
        url: `http://localhost:3333${url}`,
        method,
    })
    console.log(data);
    
    return data;
}