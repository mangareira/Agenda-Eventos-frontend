'use client'

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const NavBar = () => {

    const [search, setSearch] = useState('')
    const router = useRouter()
    const handleSubmit = () => {
        const queryString = encodeURIComponent(search)
        router.push(`/filter-events?q=${queryString}`)
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
                placeholder="Insira o nome ou endereço do seu evento por aqui! :)"
                onKeyDown={(e) => {
                    if(e.key === 'Enter') {
                        handleSubmit()
                    }
                }}
                onChange={(e)=> setSearch(e.target.value)}
                />
            </div>
        </nav>
    )
}