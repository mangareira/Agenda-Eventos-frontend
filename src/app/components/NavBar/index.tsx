'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { BannerSecondary } from "../BannerSecondary"
import { Button } from "../Form/Button"
import { HiUserCircle } from "react-icons/hi2"
import { FaAngleDown } from "react-icons/fa6"
import { useEvents } from "@/app/utils/hooks/useEvents"

export const NavBar = () => {

    const [showDropdown, setShowDropdown] = useState(false)
    const {isLoggedIn, relatedEvents,search,setSearch} = useEvents()
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
                                <div className="absolute top-14 right-56  text-white shadow-md z-10">
                                    <ul className="">
                                        <Link href={'/profile/my-events'}>
                                            <li className="cursor-pointer text-end w-32 h-8 hover:bg-blue-600 bg-blue pr-2">Meus Eventos</li>
                                        </Link>
                                        <li onClick={out} className="cursor-pointer text-end w-32 h-8 hover:bg-blue-600 bg-blue pr-2 rounded-b-lg">Sair</li>
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