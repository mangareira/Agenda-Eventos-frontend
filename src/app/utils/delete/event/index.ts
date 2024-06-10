import { toast } from "react-toastify"
import { FetchWrapper } from "../../FetchWrapper"

export const deleteEvent = async(id: string) => {
    const response = await FetchWrapper("/events/delete-event","DELETE","",{id})
    if(response?.status == 400) return toast.error(response.response.data.message)
    return toast.success("Deletado com sucesso")
}