import { useCallback, useEffect, useState } from "react"
import { FetchWrapper } from "../../FetchWrapper"
import { IAccountPayload, IUsersPayload } from "../../interface"
import { toast } from "react-toastify"

export const useGetUser = (id: string) => {
    const [user, setUser] = useState<IUsersPayload>()
    const [update, setUpdate] = useState(0)
    const fetchuser = useCallback(async () => {
        const {data} = await FetchWrapper(`/events/get-participant/${id}`, 'GET')
        setUser(data)
    },[])
    const updateUser = async(data: IAccountPayload, userId: string) => {
        const response =  await FetchWrapper(`/events/update-user/${userId}`, 'PUT',data)          
        if(response.code === 'ERR_BAD_REQUEST'){
            return toast.error(response.response.data.message)
        }
        if(response.status === 200) {
            setUpdate(update + 1)
            return toast.success("Conta autalizada com sucesso")
        } 
    }
    useEffect(() => {
        fetchuser()
    }, [fetchuser,update])
    return {
        user,
        updateUser
    }
}