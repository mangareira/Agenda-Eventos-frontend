'use client'
import { FetchWrapper } from "@/app/utils/FetchWrapper"
import { IPayProps } from "@/app/utils/interface"
import { Button } from "../Form/Button"
import { copyPixToClipboard } from "@/app/utils/copyPix"
import { useEffect, useState } from "react"

export const CardPix = async ({txid}: any) => {  
    const [data, setData] = useState<any>(null)  
    useEffect(() => {
        const fetchData = async () => {
            const response = await FetchWrapper(`/events/get-pay/${txid}`, 'GET')
            setData(response.data)
        }
        fetchData()
    }, [])
    const response: IPayProps = data
    const qrcode = response?.payment.qrCode 
    const pix = response?.payment.pixCopiaECola.slice(0,40).toString() + '...'
    const handleCopy = () => {
        copyPixToClipboard(response?.payment.pixCopiaECola)
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
                            Valor: {new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(Number(response?.payment.valor))}
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