import { toast } from "react-toastify"
import { FetchWrapper } from "../FetchWrapper"

export const cancelledParticipant = async (eventId: string | undefined, userId: string) => {
    const result =  await FetchWrapper("/events/cancelled-sub","PUT","",{eventId,userId})
    if(result?.status == 400) return toast.error(result.response.data.message)
    return toast.success("Inscrição cancelada com sucesso")
}