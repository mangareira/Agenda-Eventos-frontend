'use client'
import { TableUsersPage } from "@/app/components/Table/Users";
import { Search } from "@/app/components/search";
import Link from "next/link";
import { Suspense } from "react";

export default function Users ({searchParams}: {searchParams: { page: string, q: string }}) {      
    
    return (
        <div className="rounded-xl-0.5 bg-green_admin p-5 mt-5 text-white ">
            <div className="flex items-center justify-between">
                <Search placeholder="Search for a user..."/>
                <Link href={"/dashboard/users/add"} >
                    <button className="p-2.5 bg-green_button rounded-md-0.5 cursor-pointer">Add new</button>
                </Link>
            </div>
            <Suspense>
                <TableUsersPage q={searchParams.q} page={Number(searchParams.page)} />
            </Suspense>
        </div>
    )
}