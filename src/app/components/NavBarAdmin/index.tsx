"use client"

import { usePathname } from "next/navigation"
import { MdNotifications, MdOutlineChat, MdPublic, MdSearch } from "react-icons/md"

export const NavBarAdmin = () => {
    const pathName = usePathname()
    return (
        <div className="flex justify-between items-center p-5 rounded-[10px] bg-green_admin text-white">
            <div className="text-gray-300 font-bold capitalize">{pathName.split("/").pop()}</div>
            <div className="flex items-center gap-5">
                <div className="flex items-center gap-[10xp] bg-hover_admin p-[10px] rounded-[10px]">
                    <MdSearch/>
                    <input type="text" placeholder="Search..." className="bg-transparent border-none placeholder:text-white " />
                </div>
                <div className="flex gap-5">
                    <MdOutlineChat size={20}/>
                    <MdNotifications size={20}/>
                    <MdPublic size={20}/> 
                </div>
            </div>
        </div>
    )
}