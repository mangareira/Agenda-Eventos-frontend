"use client"
import { TableEventsPage } from '@/app/components/Table/Events'
import { Search } from '@/app/components/search'
import Link from 'next/link'
import React, { Suspense } from 'react'

export default function Events({searchParams}: {searchParams: { page: string, q: string }}) {
     
    return (
        <div className="rounded-xl-0.5 bg-green_admin p-5 mt-5 text-white ">
            <div className="flex items-center justify-between">
                <Search placeholder="Search for a event..."/>
                <Link href={"/create-event"} >
                    <button className="p-2.5 bg-green_button rounded-md-0.5 cursor-pointer hover:bg-hover_admin">Add new</button>
                </Link>
            </div>
            <Suspense>
                <TableEventsPage page={Number(searchParams.page)} q={searchParams.q} />
            </Suspense>
        </div>
    )
}
