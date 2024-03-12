'use client'


import { FormWrapper } from "@/app/components/Form/FormWrapper";
import { FetchWrapper } from "@/app/utils/FetchWrapper";

export default async function EventDetailsPage({params}: {params: {id: string}}) { 
    const response = await FetchWrapper(`/events/${params.id}` 
    , 'GET')
    const data = response.data
    const image = `http://localhost:3333/uploads/${data.banner}`
    const flyer = `http://localhost:3333/uploads/${data.flyers[0]}`
    const date = new Date(data.date)
    
    return (
        <div className="">
            <div className="w-full h-[280px] relative bg-cover bg-center  shadow " 
            style={{backgroundImage: `url(${image})`}} 
            >
                <div className="p-5 text-white absolute bottom-0">
                    <h3 className="text-5xl pb-4 font-bold">{data.title}</h3>
                    <div className="flex">
                        <div className="mr-4  flex">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                            </svg>
                            <p>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</p>
                        </div>
                        <div className="mr-4  flex">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                            <p>{data.formattedAddress}</p>
                        </div>
                        <div className="mr-4  flex">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <p>{date.getHours()}h</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-blue p-4 mr-14 ">
                <div className="">
                    <p>{data.description}</p>
                    <div className="w-[200px] h-[200px] relative bg-cover bg-center shadow" style={{backgroundImage: `url(${flyer})`}}>

                    </div>
                </div>
                <div className="">
                    <FormWrapper price={data.price[0]?.amount} eventId={params.id}/>
                </div>
            </div>
        </div>
    )
}