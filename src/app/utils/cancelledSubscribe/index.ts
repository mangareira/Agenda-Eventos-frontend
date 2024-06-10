import { toast } from "react-toastify"
import { FetchWrapper } from "../FetchWrapper"

export const cancelledSub = async (eventId: string, userId: string | undefined) => {
    const result =  await FetchWrapper("/events/cancelled-sub","PUT","",{eventId,userId})
    if(result?.status == 400) return toast.error(result.response.data.message)
    return toast.success("Inscrição cancelada com sucesso")
}