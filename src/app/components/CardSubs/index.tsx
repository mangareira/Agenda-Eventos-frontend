'use client'
import Image from "next/image"
import { Button } from "@/app/components/Form/Button"
import { FetchWrapper } from "@/app/utils/FetchWrapper"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export const CardSubs = ({eventId}: any) => {
    const router = useRouter()
    const pathName = usePathname()
    const [status, setStatus] = useState<boolean>(false)
    const [data, setData] = useState<any>(null)

    useEffect(() => {
        let userId:any
        if (typeof window !== 'undefined'){
            const user = localStorage.getItem('user');            
            userId = user
        } 
        const fetchData = async () => {
            const response = await FetchWrapper(`/events/get-events-payment/${eventId}`, 'GET', '',{userId})
            setData(response.data)
            if(response?.data?.payment.status !== 'Pago' && response?.data?.payment.status !== 'gratis') {
                setStatus(true);
            }
        }
        fetchData()
    }, []) // Dependências vazias significam que o useEffect será executado apenas uma vez quando o componente for montado.
        
    const handlePush = async() => {
        const response = await FetchWrapper(`/events/new-pix/${data.payment.txid}`,'POST')
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
