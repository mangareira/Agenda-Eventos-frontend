import Link from "next/link"


export const CardEvent = ({events}: any) => {
    const formatedAdress = events.formattedAddress.split(',')  
    const date = new Date(events.date)  
    return (
            <div className="w-[600px] h-[150px] rounded-md shadow">
                <div className="p-2 text-blue ">
                    <div className="font-medium">{events.title}</div>
                    <div className="font-light text-sm">{formatedAdress[0] + ',' +formatedAdress[1]}</div>
                    <div className="font-light text-sm">{events.description}</div>
                    <div className="w-full text-end">
                        <div className="font-light text-sm">{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}-{date.getHours()}h</div>
                    </div>
                    <div className="flex justify-between mx-4 mt-5">
                        <Link href={`/profile/my-events/${events._id}/subscribe`}>
                            <div className="">Inscrição</div>
                        </Link>
                        <Link href={`/profile/my-events/${events._id}/cert`}>
                            <div className="">Certificado</div>
                        </Link>
                        <Link href={`/profile/my-events/${events._id}/details`}>
                            <div className="">Detalhes</div>
                        </Link>
                    </div>
                </div>
            </div>
    )
}