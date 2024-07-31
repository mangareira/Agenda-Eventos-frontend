import Link from "next/link"
import { Modal } from "../../modalCert"


export const CardEvent = ({events, params}: any) => {
    const formatedAdress = events.formattedAddress.split(',')  
    const date = new Date(events.date)  
    const handleRefresh = () => {
        window.location.reload()
    };
    const showModal = () => {
        if(params == 'true') {
            return <Modal 
                        isOpen={params}
                        onRefresh={handleRefresh}
                        events={events}
                    />
        }
        return
    }
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
                        <Link href={`?modal=true`}>
                            <div className="">Certificado</div>
                        </Link>
                        <Link href={`/event-details/${events._id}`}>
                            <div className="">Detalhes</div>
                        </Link>
                    </div>
                </div>
                {showModal()}
            </div>
    )
}