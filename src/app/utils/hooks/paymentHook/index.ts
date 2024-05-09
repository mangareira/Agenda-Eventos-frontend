import { useCallback, useEffect, useState } from "react"
import { FetchWrapper } from "../../FetchWrapper"
import { IPayProps } from "../../interface"

export const usePaymentHook = (txid: string) => {
    const [data, setData] = useState<IPayProps>()  
    const fetchData = useCallback(async ()=> {
        const response = await FetchWrapper(`/events/get-pay/${txid}`, 'GET')
        setData(response.data)
    }, []) 
    useEffect(() => {
        fetchData()
    }, [fetchData])
    return {
        data
    }
}