'use client'
import { CardEvent } from "@/app/components/Form/CardEvent"
import { Pagination } from "@/app/components/Pagination"
import { FetchWrapper } from "@/app/utils/FetchWrapper"
import { ReactNode, useEffect, useState } from "react"
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
            return <div className="">Carregando...</div>
        }
        return <Pagination limit={limit} page={page} total={quantity} classNameDiv="my-8" />
    }
    return (
        <div className="container mx-auto">
            <div className="text-blue py-2">
                <div className="text-2xl font-medium">Meus Eventos</div>
                <div className=" text-base font-light ">Aqui podera ver todos seus eventos</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {events.map((e: any, index: any) => (
                    <div className="" key={index}>
                        <CardEvent events={e}/>
                    </div>
                ))}
            </div>
            <div className="">{p()}</div>
        </div>
    )
}
