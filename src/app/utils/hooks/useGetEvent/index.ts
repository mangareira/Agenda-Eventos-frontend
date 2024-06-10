import { useCallback, useEffect, useState } from "react"
import { FetchWrapper } from "../../FetchWrapper"
import { IEventsPayload } from "../../interface"
import { toast } from "react-toastify"

export const useGetEvent = (id: string) => {
    const [event, setEvent] = useState<IEventsPayload>()
    const [update, setUpdate] = useState(0)

    const fetchEvent = useCallback(async () => {
        const {data} = await FetchWrapper(`/events/get-events/${id}`, 'GET')
        setEvent(data)
    },[])
    const updateEvent = async(data: IEventsPayload, userId: string) => {
        const response =  await FetchWrapper(`/events/update-event/${userId}`, 'PUT',data)          
        if(response.code === 'ERR_BAD_REQUEST'){
            return toast.error(response.response.data.message)
        }
        if(response.status === 200) {
            setUpdate(update + 1)
            return toast.success("Conta autalizada com sucesso")
        } 
    }
    useEffect(() => {
        fetchEvent()
    }, [fetchEvent,update])
    return {
        event,
        updateEvent
    }
}