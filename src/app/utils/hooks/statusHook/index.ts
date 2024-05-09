import { useCallback, useEffect, useState } from "react"
import { FetchWrapper } from "../../FetchWrapper"
import { IPayProps } from "../../interface"

export const useStatusHook = (eventId: string) => {
    const [status, setStatus] = useState<boolean>(false)
    const [data, setData] = useState<IPayProps>()
    let userId:any
    if (typeof window !== 'undefined'){
        const user = localStorage.getItem('user');            
        userId = user
    } 
    const fetchData =  useCallback(async () => {
        const response = await FetchWrapper(`/events/get-events-payment/${eventId}`, 'GET', '',{userId})
        setData(response.data)
        if(response?.data?.payment.status !== 'Pago' && response?.data?.payment.status !== 'gratis') {
            setStatus(true);
        }
    },[])
    useEffect(() => {
        fetchData()
    }, [fetchData])
    return {
        data,
        status
    }
}