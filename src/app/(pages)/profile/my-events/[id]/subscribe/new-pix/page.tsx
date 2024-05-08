import { CardPix } from "@/app/components/CardPix"
import { Suspense } from "react"
import { AiOutlineLoading } from "react-icons/ai"

interface PageProps {
    searchParams?: {txid?: string}
}
export default function newPix({searchParams}: PageProps) {
    return (
        <div className="container mx-auto">
            <div className="py-2">
                <div className="text-blue">
                    <div className="font-medium text-2xl">Novo Pix</div>
                    <div className="font-light text-sm">Aqui podera ver os detalhes do pix</div>
                </div>
                <Suspense fallback={<div className="absolute top-[50%] left-[45%]"><AiOutlineLoading className="animate-spin text-blue" size={30}/></div>}>
                    <CardPix txid={searchParams?.txid} />
                </Suspense>
            </div>
        </div>
    )
}