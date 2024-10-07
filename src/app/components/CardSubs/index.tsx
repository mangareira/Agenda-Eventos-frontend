'use client'
import Image from "next/image"
import { Button } from "@/app/components/Form/Button"
import { FetchWrapper } from "@/app/utils/FetchWrapper"
import { usePathname, useRouter } from "next/navigation"
import { useStatusHook } from "@/app/utils/hooks/statusHook"
import { AiOutlineLoading } from "react-icons/ai"
import { toast } from "react-toastify"

export const CardSubs = ({eventId}: any) => {
    const router = useRouter()
    const pathName = usePathname()
    const {data,status} = useStatusHook(eventId)
    let userId:any
    if (typeof window !== 'undefined'){
        const user = localStorage.getItem('user');            
        userId = user
    }  
    if(!data && !status) return <div className="absolute top-[50%] left-[45%]"><AiOutlineLoading className="animate-spin text-blue" size={30}/></div>
    const handlePush = async() => {
        const response = await FetchWrapper(`/events/new-pix/${data?.payment.txid}`,'POST')
        console.log(response, data);
        
        router.push(`${pathName}/new-pix?txid=${response.data.payment.txid}`)
    }
    const handleCancelled = async() => {
        await FetchWrapper("/events/cancelled-sub", "PUT", "", {eventId, userId, })
        toast.success("Inscrição cancelada")
        router.push("/profile/my-events")
    }
    
    return(
        <>
            <div className="lg:w-[460px] w-full h-64 shadow-lg rounded-2xl flex">
                {status ? <div className="w-4 h-full bg-yellow-500 rounded-s-2xl"></div> : <div className="w-4 h-full bg-green-500 rounded-s-2xl"></div> }
                <div className="flex flex-col items-center w-full">
                    <div className="flex">
                        {status ?<Image src='/pending.gif' alt="gif" className="w-24 h-24 my-5" width={100} height={100} /> :
                        <Image src='/confirm.gif' alt="gif" width={180} height={180} priority />}
                    </div>
                    <div className="text-blue mx-8 text-center">
                        {status ?
                            <div className="font-light text-2xl">Falta o pagamento para confirmar sua inscrição no evento</div> :
                            <div className="font-light text-2xl">Sua inscrição no evento está confirmada</div>
                        }
                    </div>
                </div>
            </div>
            <div className="lg:w-[460px] w-full mt-5">
                <div className="flex mx-3">
                    <Button title="Cancelar inscrição" className="mr-3 text-blue bg-white border border-blue max-sm:px-0" onClick={handleCancelled}/>
                    {status ?
                        <Button title="gerar novo pix" className="ml-3" onClick={handlePush}/>
                    :
                        <Button title="imprimir comprovante" className="ml-3"/>
                    }
                </div>
            </div>
        </>
    )
}
