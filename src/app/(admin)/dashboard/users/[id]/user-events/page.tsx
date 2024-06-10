"use client"
import {  TableEventsUserPage } from "@/app/components/Table/Users/UserEvents";
import { Search } from "@/app/components/search";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Events({searchParams, params}: {searchParams: { page: string, q: string}, params: {id: string}}) {
  const pathName =  usePathname()
  return (
    <div className="rounded-xl-0.5 bg-green_admin p-5 mt-5 text-white">
      <div className="flex items-center justify-between">
        <Search placeholder="Search for a event..."/>
        <Link href={`${pathName}/add`} >
          <button className="p-2.5 bg-green_button rounded-md-0.5 cursor-pointer">Add new Event to participant</button>
        </Link>
      </div>
      <div className="">
        <TableEventsUserPage q={searchParams.q} page={Number(searchParams.page)} id={params.id} />
      </div>
    </div>
  )
}
