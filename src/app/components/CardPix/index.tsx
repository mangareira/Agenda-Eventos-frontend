'use client'
import { Button } from "../Form/Button"
import { copyPixToClipboard } from "@/app/utils/copyPix"
import { usePaymentHook } from "@/app/utils/hooks/paymentHook"
import { AiOutlineLoading } from "react-icons/ai"

export const CardPix = ({txid}: any) => {  
    const {data} = usePaymentHook(txid)
    if(!data) return <div className="absolute top-[50%] left-[45%]"><AiOutlineLoading className="animate-spin text-blue" size={30}/></div>
    const qrcode = data?.payment.qrCode 
    const pix = data?.payment.pixCopiaECola.slice(0,40).toString() + '...'
    const pixCola: any = data?.payment.pixCopiaECola
    const handleCopy = () => {
        copyPixToClipboard(pixCola)
    }
    return (
        <div className="container mx-auto">
            <div className="h-[77vh]">
                <div className="flex flex-col items-center w-full">
                    <div className="w-[350px] h-72 bg-white shadow-md rounded-xl flex items-center">
                        <img src={qrcode} alt="qrcode" className="max-w-xs mx-auto" />
                    </div>
                    <div className="text-blue">
                        <div className="text-center font-medium text-2xl mt-5">
                            Valor: {new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(Number(data?.payment.valor))}
                        </div>
                        <div className="font-light my-5">
                            {pix}
                        </div>
                        <Button title="Copia Pix" onClick={handleCopy}/>
                    </div>
                </div>
            </div>
        </div>
    )
}