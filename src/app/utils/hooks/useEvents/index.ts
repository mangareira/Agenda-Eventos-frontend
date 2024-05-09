import { useCallback, useEffect, useState } from "react";
import { FetchWrapper } from "../../FetchWrapper";
import { FetchRefresh } from "../../FetchRefresh";
import { useRouter } from "next/navigation";
export const useEvents = () => {
    const [relatedEvents, setRelatedEvents] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [search, setSearch] = useState('')

    const router = useRouter()
    const fetchRelatedEvents = async () => {
        try {
            const response = await FetchWrapper(`/events/name?name=${encodeURIComponent(search)}`, 'GET')
            setRelatedEvents(response.data);
        } catch (error) {
            console.error("Error fetching related events:", error)
        }
    };
    const checkLoginStatus = () => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token)
    }
    const refreshToken = async () => {
        const token = localStorage.getItem('refresh_token')            
        if(token !== null) {
            const refresh = await FetchRefresh('/events/refresh-token', 'POST', token)            
            if(refresh.status === 200)  {
                localStorage.setItem('token', refresh.data.access_token)          
                localStorage.setItem('refresh_token', refresh.data.access_refresh_token)          
            }else{
                if(refresh.response.data.message !== 'token is missing'){
                    router.push('/token-expired')
                }
            }
        }
    }
    useEffect(() => {
        if (search) {
            fetchRelatedEvents()
        } else {
            setRelatedEvents([])
        }
        refreshToken()
        checkLoginStatus();
    }, [search]);
    return {
        relatedEvents,
        isLoggedIn,
        search,
        setSearch
    }
}