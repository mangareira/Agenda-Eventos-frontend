'use client'
import { CardEvent } from "@/app/components/Form/CardEvent"
import { Pagination } from "@/app/components/Pagination"
import { FetchWrapper } from "@/app/utils/FetchWrapper"
import { ReactNode, useEffect, useState } from "react"
import { AiOutlineLoading } from "react-icons/ai"
type PageProps = {
    searchParams?: {page?: string; limit?: string}
}
export default function myEvents ({searchParams}: PageProps) {
    const page = Number(searchParams?.page) || 1
    const limit = Number(searchParams?.limit) ||10
    const [events, setEvents] = useState([])
    const [quantity, setQuantity] = useState<Number | any>()

    useEffect(() => {
        const result = async () => {
            const userId = localStorage.getItem('user')
            const {data} = await FetchWrapper(`/events/get-participant-events/${userId}`, 'GET', '', {page, limit})                                    
            setEvents(data.events)
            setQuantity(data.quantity)
        }
        result()
    }, [])    
    const p = () => {
        if(!quantity) {
            return <div className="absolute top-[50%] left-[45%]"><AiOutlineLoading className="animate-spin text-blue" size={30}/></div>
        }
        return <Pagination limit={limit} page={page} total={quantity} classNameDiv="flex justify-center" />
    }
    return (
        <div className="container mx-auto h-[85vh]">
            <div className="h-full">
                <div className="text-blue py-2">
                    <div className="text-2xl font-medium">Meus Eventos</div>
                    <div className=" text-base font-light ">Aqui podera ver todos seus eventos</div>
                </div>
                <div className="h-[83%]">
                    <div className="grid grid-cols-2 gap-4">
                        {events.map((e: any, index: any) => (
                            <CardEvent events={e} key={index}/>
                        ))}
                    </div>
                </div>
                {p()}
            </div>
        </div>
    )
}
