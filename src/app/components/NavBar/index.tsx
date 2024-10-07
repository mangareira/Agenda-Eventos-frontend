'use client'

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { BannerSecondary } from "../BannerSecondary"
import { Button } from "../Form/Button"
import { HiUserCircle } from "react-icons/hi2"
import { FaAngleDown, FaBars, FaXmark } from "react-icons/fa6"
import { useEvents } from "@/app/utils/hooks/useEvents"
import { useRole } from "@/app/utils/hooks/useRole"
import { useMobile } from "@/app/utils/context"

export const NavBar = () => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [largura, setLargura] = useState<number>(1024)
    const {setMobile, mobile} = useMobile()
    const {isLoggedIn, relatedEvents,search,setSearch} = useEvents()
    const {role} = useRole()
    function obterTamanhoDaTela() {
        setLargura(window.innerWidth)
    }
    const urlMobile = () => {
        if(window.innerWidth <= 1024) {
            return "/profile/my-events?limit=2"
        }
        return "/profile/my-events"
    }
    useEffect(() => {
        if(window.innerWidth > 1024) {
            setMobile(true)
        }
        window.addEventListener('resize', obterTamanhoDaTela);

        return () => {
        window.removeEventListener('resize', obterTamanhoDaTela);
        };
    },[])
    const adminAccess = () => {
        if(role === 'admin') return (
            <Link href={'/dashboard'}>
                <li className="cursor-pointer text-end w-32 h-8 hover:bg-blue-600 bg-blue pr-2">Dashboard</li>
            </Link>
        )
    }
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
                <Image className="mr-5  lg:mr-[6rem] bg-white lg:rounded-md rounded-full w-8 h-8 lg:w-auto lg:h-auto" src={`${largura >= 1024 ? "/logo.png" : "/logo-mobile.png"}`} alt="logo"  width={200} height={200} priority/>
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
            <div className="lg:ml-[4rem]">
                {!isLoggedIn ? (
                    <>  
                        <div className="sm:hidden ml-[4rem]">
                            {
                                mobile ? 
                                    <FaXmark
                                        size={25} 
                                        className="text-white"
                                        onClick={() => setMobile(false)}
                                    />
                                :
                                    
                                    <FaBars 
                                        size={25} 
                                        className="text-white"
                                        onClick={() => setMobile(true)} 
                                    />
                            }
                        </div>
                        <div className=" max-sm:hidden flex">
                            <Link href={'/login'}>
                                <Button title="Login" className=" bg-white text-blue hover:bg-blue-600 hover:text-white transition mr-2"/>
                            </Link>
                            <Link href={'/create-account'}>
                                <Button title="Cadastra-se" className=" bg-white text-blue hover:bg-blue-600 hover:text-white transition "/>
                            </Link>
                        </div>
                    </>
                    
                ) : (
                    <>
                        <div className="relative flex items-center ">
                            <HiUserCircle size={35} color="white" />
                            <FaAngleDown color="white" className="ml-4" onClick={toggleDropdown}/>
                            {showDropdown && (
                                <div className="absolute top-full right-0 text-white shadow-md z-10">
                                    <ul className="">
                                        <Link href={urlMobile()}>
                                            <li className="cursor-pointer text-end w-32 h-8 hover:bg-blue-600 bg-blue pr-2">Meus Eventos</li>
                                        </Link>
                                        {adminAccess()}
                                        <li onClick={out} className="cursor-pointer text-end w-32 h-8 hover:bg-blue-600 bg-blue pr-2 rounded-b-lg">Sair</li>
                                    </ul>
                                </div>
                            )}
                            <div className="sm:hidden ml-4">
                            {
                                mobile ? 
                                    <FaXmark
                                        size={25} 
                                        className="text-white"
                                        onClick={() => setMobile(false)}
                                    />
                                :
                                    
                                    <FaBars 
                                        size={25} 
                                        className="text-white"
                                        onClick={() => setMobile(true)} 
                                    />
                            }
                            </div>
                        </div>
                    </>

                )}
            </div>
        </nav>
    )
}