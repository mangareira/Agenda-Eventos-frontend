import { useCallback, useEffect, useState } from "react"
import { FetchWrapper } from "../../FetchWrapper"
import { IUsersPayload } from "../../interface"

export const useUserUnique = () => {
    const [user, setUser] = useState<IUsersPayload>()
    const fetchRole = useCallback(async () => {
        const id = localStorage.getItem('user')
        const data = await FetchWrapper(`/events/get-participant/${id}`, 'GET')
        setUser(data.data)
    },[])
    useEffect(() => {
        fetchRole()
    }, [fetchRole])
    return {
        user
    }
}