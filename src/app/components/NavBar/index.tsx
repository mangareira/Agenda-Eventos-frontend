'use client'

import { FetchWrapper } from "@/app/utils/FetchWrapper"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { BannerSecondary } from "../BannerSecondary"

export const NavBar = () => {

    const [search, setSearch] = useState('')
    const [relatedEvents, setRelatedEvents] = useState([])
    const handleEventClick = () => {
        setSearch('')
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
                            <Link href={`/event-details/${event._id}`} key={index}>
                                <li  className="px-4 py-2 hover:bg-gray-200 hover:rounded-xl cursor-pointer w-full " onClick={handleEventClick}>
                                    <BannerSecondary events={event}/>
                                </li>
                            </Link>
                        ))}
                    </ul>
                )}
            </div>
        </nav>
    )
}