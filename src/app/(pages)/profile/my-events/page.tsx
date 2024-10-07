'use client'
import { CardEvent } from "@/app/components/Form/CardEvent"
import { Modal } from "@/app/components/modalCert"
import { Pagination } from "@/app/components/Pagination"
import { FetchWrapper } from "@/app/utils/FetchWrapper"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { AiOutlineLoading } from "react-icons/ai"
type PageProps = {
    searchParams?: {page?: string; limit?: string; modal?:string; eventId?: string; eventDate: string}
    params:{id: string} 
}
export default function myEvents ({searchParams, params}: PageProps) {
    const page = Number(searchParams?.page) || 1
    const limit = Number(searchParams?.limit) ||6
    const modal = searchParams?.modal
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
    const handleRefresh = () => {
        window.location.reload()
    };
    const showModal = () => {
        
        if(searchParams?.modal == 'true') {
            return <Modal 
                        isOpen={Boolean(modal)}
                        onRefresh={handleRefresh}
                        id={searchParams.eventId}
                        eventDate={searchParams.eventDate}
                    />
        }
        return
    }
    
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
                <div className="lg:h-[83%] h-[90%]">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-4">
                        {events.map((e: any, index: any) => (
                            <CardEvent events={e} key={index} params={modal} />
                        ))}
                    </div>
                </div>
                {p()}
                {showModal()}
            </div>
        </div>
    )
}
