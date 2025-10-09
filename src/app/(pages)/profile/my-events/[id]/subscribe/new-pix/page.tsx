import { CardPix } from "@/app/components/CardPix"

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
                <CardPix txid={searchParams?.txid} />
            </div>
        </div>
    )
}