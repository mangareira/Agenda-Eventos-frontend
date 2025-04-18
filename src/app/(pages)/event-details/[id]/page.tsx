'use client'
import { FormWrapper } from "@/app/components/Form/FormWrapper";
import { LoginError } from "@/app/components/LoginError";
import { FetchWrapper } from "@/app/utils/FetchWrapper";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

    
export default function EventDetailsPage({params}: {params: {id: string}}) { 
    const [data, setData] = useState<any>(null);
    const [state, setState] = useState('')

    useEffect(() => {
        async function fetchData() {
            const {data} = await FetchWrapper(`/events/get-events/${params.id}`, 'GET')
            setData(data)
        }
        fetchData();
    }, [params.id]);
    if(!data) {
        return (
            <div className="absolute top-[50%] left-[45%]"><AiOutlineLoading className="animate-spin text-blue" size={30}/></div>
        )
    }
    const image = `${process.env.NEXT_PUBLIC_API_URL}/uploads/${data.banner}`
    const date = new Date(data.date)
    const handleCloseError = () => {
        setState(""); 
    }
    return (
        <div className="">
            <div className=""><LoginError state={state} onClose={handleCloseError}/></div>
            <div className="w-full h-[280px] relative lg:bg-cover bg-center max-lg:bg-contain max-lg:bg-no-repeat shadow -z-10 lg:-left-4  max-lg:flex max-lg:items-end" 
            style={{backgroundImage: `url(${image})`}} 
            >
                <div className="p-5 text-blue lg:absolute lg:bottom-0">
                    <h3 className="lg:text-5xl pb-4 font-bold text-xl">{data.title}</h3>
                    <div className="lg:flex">
                        <div className="lg:mr-4  flex lg:mb-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                            </svg>
                            <p>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</p>
                        </div>
                        <div className="mr-4  flex max-sm:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                            <p>{data.formattedAddress}</p>
                        </div>
                        <div className="mr-4  flex max-sm:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <p>{date.getHours()}h</p>
                        </div>
                        <div className="max-sm:flex lg:hidden">
                            <div className="mr-4  flex ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                                <p>{data.formattedAddress}</p>
                            </div>
                            <div className="mr-4  flex ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <p>{date.getHours()}h</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:grid lg:grid-cols-2 lg:gap-2 text-blue p-4 lg:mr-14">
                <div className="max-sm:mb-6">
                    <p className="mb-4">{data.description}</p>
                    <p>Setor: {data.price[0].sector}</p>
                    {
                        data.flyers.map((flyer:string, idx: any) => (
                            <div key={idx} className="w-[200px] h-[200px] relative bg-cover bg-center shadow -z-10" style={{backgroundImage: `url(${`${process.env.NEXT_PUBLIC_API_URL}/uploads/${flyer}`})`}}/>
                        ))
                    }
                </div>
                <div className="">
                    <FormWrapper price={data.price[0]?.amount} eventId={params.id} cupom={data.coupons[0]} setState={setState} date={data.date}/>
                </div>
            </div>
        </div>
    )
}