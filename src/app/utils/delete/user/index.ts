import { toast } from "react-toastify"
import { FetchWrapper } from "../../FetchWrapper"

export const deleteUser = async(id: string) => {
    const response = await FetchWrapper("/events/delete-user","DELETE","",{id})
    if(response?.status == 400) return toast.error(response.response.data.message)
    return toast.success("Deletado com sucesso")
}