'use client'
import { Chart } from "@/app/components/DashBoard/Chart";
import { Exportion } from "@/app/components/DashBoard/Exportion";
import { Transactions } from "@/app/components/DashBoard/transactions";

export default function dashboard({searchParams}: {searchParams: { modal: string }}) {
    const modal = searchParams.modal
    const showModal = () => {
        if(modal == 'true') {
            return <Exportion/>
        }
        return
    }
    return (
        <div className="flex gap-5 mt-5">
            <div className="flex-[3] flex flex-col gap-5">
                {showModal()}
                <Transactions/>
                <Chart />
            </div>
        </div>
    )
}