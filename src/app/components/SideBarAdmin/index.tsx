'use client'
import { menuItems } from "@/app/utils/menuItens"
import { Menulink } from "./MenuLink"
import Image from "next/image"
import { MdLogout } from "react-icons/md"
import { useEvents } from "@/app/utils/hooks/useEvents"
import { useUserUnique } from "@/app/utils/hooks/useUserUnique"
import { AiOutlineLoading } from "react-icons/ai"
import { BsBack } from "react-icons/bs"
import { FaBackward } from "react-icons/fa6"
import Link from "next/link"

export const SideBarAdmin = () => {
    const token = useEvents()
    const {user} = useUserUnique()
    return (
        <div className="sticky top-10 text-white">
            <div className="flex items-center gap-5 mb-5">
                <Image 
                    className="rounded-[50%] object-cover"
                    src="/noavatar.png" 
                    alt="" 
                    width="50" 
                    height="50" 
                />
                {user ? <div className="flex flex-col">
                    <span className="font-medium">{user.name.slice(0,20) + '.'}</span>
                    <span className="text-[12px] text-gray-300">Administrator</span>
                </div> : <AiOutlineLoading className="animate-spin text-white" size={30}/>}
            </div>
            <ul className="">
                {menuItems.map(cat => (
                    <li key={cat.title}>
                        <span className="text-gray-300 font-bold text-[13px] mx-[10px] my-0">{cat.title}</span>
                        {cat.list.map(item => (
                            <Menulink item={item} key={item.title}/>
                        ))}
                    </li>
                ))}
            </ul>
            <button className="p-5 mx-[5px] my-0 flex items-center gap-[10px] cursor-pointer rounded-[10px] w-full hover:bg-hover_admin ">
                <MdLogout/>
                Logout
            </button>
            <Link href={"/"}>
                <button className="p-5 mx-[5px] my-0 flex items-center gap-[10px] cursor-pointer rounded-[10px] w-full hover:bg-hover_admin ">
                    <FaBackward/>
                    Pagina principal
                </button>
            </Link>
        </div>
    )
}