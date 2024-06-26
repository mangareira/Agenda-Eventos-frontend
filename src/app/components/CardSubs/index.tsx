'use client'
import Image from "next/image"
import { Button } from "@/app/components/Form/Button"
import { FetchWrapper } from "@/app/utils/FetchWrapper"
import { usePathname, useRouter } from "next/navigation"
import { useStatusHook } from "@/app/utils/hooks/statusHook"
import { AiOutlineLoading } from "react-icons/ai"

export const CardSubs = ({eventId}: any) => {
    const router = useRouter()
    const pathName = usePathname()
    const {data,status} = useStatusHook(eventId)
    if(!data && !status) return <div className="absolute top-[50%] left-[45%]"><AiOutlineLoading className="animate-spin text-blue" size={30}/></div>
    const handlePush = async() => {
        const response = await FetchWrapper(`/events/new-pix/${data?.payment.txid}`,'POST')
        router.push(`${pathName}/new-pix?txid=${response.data.payment.txid}`)
    }
    
    return(
        <>
            <div className="w-[460px] h-64 shadow-lg rounded-2xl flex">
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
            <div className="w-[460px] mt-5">
                <div className="flex mx-5">
                    <Button title="Cancelar inscrição" className="mr-3 text-blue bg-white border border-blue"/>
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
