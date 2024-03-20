import Link from "next/link"

export const BannerSecondary = ({events}: any) => {
    
    const date = new Date(events.date)
    
    const image = `http://localhost:3333/uploads/${events.banner}`

    const address = events.formattedAddress.split('-')    
    return (
        <Link href={`/event-details/${events._id}`}>
            <div className="rounded ">
                <div className="w-full p-3 h-[150px] relative rounded-3xl shadow bg-cover bg-center" style={{backgroundImage: `url(${image})`}}>
                    <div className=" text-white absolute top-3">
                        <p className="text-normal pb-1 font-bold">{events.title}</p>
                        <div className="flex">
                            <div className="mr-4  flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                </svg>
                                <p>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</p>
                            </div>
                            <div className="mr-4  flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <p>{date.getHours()}h</p>
                            </div>
                        </div>
                    </div>
                    <div className=" text-white absolute bottom-3">
                        <div className="flex">
                            <div className="mr-4  flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                                <p>{address[0]}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}