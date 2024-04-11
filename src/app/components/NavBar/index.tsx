'use client'

import { FetchWrapper } from "@/app/utils/FetchWrapper"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { BannerSecondary } from "../BannerSecondary"
import { Button } from "../Form/Button"
import { HiUserCircle } from "react-icons/hi2"
import { FetchRefresh } from "@/app/utils/FetchRefresh"
import { FaAngleDown } from "react-icons/fa6"
import { useRouter } from "next/navigation"

export const NavBar = () => {

    const [search, setSearch] = useState('')
    const [relatedEvents, setRelatedEvents] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const router = useRouter()

    const handleEventClick = () => {
        setSearch('')
    }
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown)
    }
    const out = () => {
        localStorage.clear()
        window.location.reload()
    }
    useEffect(() => {
        const fetchRelatedEvents = async () => {
            try {
                const response = await FetchWrapper(`/events/name?name=${encodeURIComponent(search)}`, 'GET')
                setRelatedEvents(response.data);
            } catch (error) {
                console.error("Error fetching related events:", error)
            }
        };
        if (search) {
            fetchRelatedEvents()
        } else {
            setRelatedEvents([])
        }
        const checkLoginStatus = () => {
            const token = localStorage.getItem('token');
            setIsLoggedIn(!!token)
        }
        const refreshToken = async () => {
            const token = localStorage.getItem('refresh_token')
            const refresh = await FetchRefresh('/events/refresh-token', 'POST', token)
            if(refresh.status === 200)  {
                localStorage.setItem('token', refresh.data.access_token)          
                localStorage.setItem('refresh_token', refresh.data.access_refresh_token)          
            }
        }
        refreshToken()
        checkLoginStatus();
    }, [search]);
    
    return (
        <nav className="bg-blue flex mx-auto px-6 fixed top-0 w-full h-16 items-center z-10">
            <Link href={'/'}>
                <Image className="mr-[6rem] bg-white rounded-md w-auto h-auto" src='/logo.png' alt="logo"  width={200} height={200} priority/>
            </Link>
            <div className=" flex items-center w-[50vw] ">
                <input  
                className="w-full rounded-md px-3 py-2 text-sm font-normal " 
                type="text" 
                value={search}
                placeholder="Insira o nome ou endereço do seu evento por aqui! :)"
                onChange={(e)=> setSearch(e.target.value)}
                />
                {relatedEvents.length > 0 && (
                    <ul className="absolute top-full bg-white shadow rounded-xl w-[50vw] py-1 z-20">
                        {relatedEvents.map((event: any, index) => (
                            <li  className="px-4 py-2 hover:bg-gray-200 hover:rounded-xl cursor-pointer w-full " onClick={handleEventClick} key={index}>
                                <BannerSecondary events={event}/>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="ml-[4rem]">
                {!isLoggedIn ? (
                    <div className="flex">
                        <Link href={'/login'}>
                            <Button title="Login" className=" bg-white text-blue hover:bg-blue-600 hover:text-white transition"/>
                        </Link>
                        <Link href={'/create-account'}>
                            <Button title="Cadastra-se" className=" bg-white text-blue hover:bg-blue-600 hover:text-white transition ml-[2rem]"/>
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center">
                            <HiUserCircle size={35} color="white" />
                            <FaAngleDown color="white" className="ml-4" onClick={toggleDropdown}/>
                            {showDropdown && (
                                <div className="absolute top-14 right-48 bg-blue text-white shadow-md p-2 z-10">
                                    <ul className="">
                                        <li onClick={out} className="cursor-pointer text-end w-20 h-6">Sair</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </nav>
    )
}