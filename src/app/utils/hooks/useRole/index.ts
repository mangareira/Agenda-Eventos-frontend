import { useCallback, useEffect, useState } from "react"
import { FetchWrapper } from "../../FetchWrapper"

export const useRole = () => {
    const [role, setRole] = useState('')
    const fetchRole = useCallback(async () => {
        const id = localStorage.getItem('user')
        const data = await FetchWrapper(`/events/get-participant-role/${id}`, 'GET')
        setRole(data.data)
    },[])
    useEffect(() => {
        fetchRole()
    }, [fetchRole])
    return {
        role
    }
}