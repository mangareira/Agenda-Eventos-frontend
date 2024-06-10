'use client'
import { TableTransPage } from "@/app/components/Table/TableTrans";
import { Search } from "@/app/components/search";
import Link from "next/link";

export default function TransactionsPage({searchParams}: {searchParams: { page: string, q: string }}) {
    return(
        <div className="rounded-xl-0.5 bg-green_admin p-5 mt-5 text-white ">
            <div className="flex items-center justify-between">
                <Search placeholder="Search for a transcastion..."/>
            </div>
            <TableTransPage page={Number(searchParams.page)} q={searchParams.q} />
        </div>
    )
}