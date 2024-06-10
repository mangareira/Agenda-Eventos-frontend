import { useCallback, useEffect, useState } from "react"
import { FetchWrapper } from "../../FetchWrapper"
import { IEventsPayload } from "../../interface"

export const useEventsList = (query: string, pageUrl: number) => {
    const [events, setEvents] = useState<IEventsPayload[]>([])
    const [count, setCount] = useState<number>()
    const q = query || ""
    const page = pageUrl || 1  
    const fetchEvents = useCallback(async () => {
        const {data} = await FetchWrapper(`/events/get-events/`, 'GET',"",{q:q, page})
        setEvents(data.users)
        setCount(data.count)
    },[q, page])
    const deleteEventFromState = (id: string) => {
        setEvents(events.filter((event) => event._id !== id));
    }
    useEffect(() => {
        fetchEvents()
    }, [fetchEvents])
    return {
        events, count, deleteEventFromState
    }
}
