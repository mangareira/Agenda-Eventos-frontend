'use client'
import { IItem } from "@/app/utils/interface"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const Menulink = ({item}: IItem) => {
    const pathName  = usePathname()
    return(
        <Link href={item.path} className={`${"flex p-5 items-center gap-[10px] hover:bg-hover_admin mx-1 rounded-[10px]"} ${pathName === item.path && "bg-hover_admin"}`}>
            {item.icon}
            {item.title}
        </Link>
    )
} 