import { useCallback, useEffect, useState } from "react"
import { IChart } from "../../interface"
import { FetchWrapper } from "../../FetchWrapper"

export const useChart = () => {
    const [chart, setChart] = useState<IChart[]>([])

    const fetchData = useCallback(async () => {
        const {data} = await FetchWrapper('/events/chart', 'GET')
        setChart(data)
    },[])
    useEffect(() => {
        fetchData()
    }, [fetchData])
    return {chart}
}