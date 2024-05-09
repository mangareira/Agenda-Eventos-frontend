import { CardSubs } from "@/app/components/CardSubs";
import { Suspense } from "react";
import { AiOutlineLoading } from "react-icons/ai";

export default function detailsSubs({params}: {params: {id: string}}) {
    
    return (
        <div className="container mx-auto">
            <div className="text-blue py-2">
                <div className="text-2xl font-medium">Minha inscrição</div>
                <div className=" text-base font-light ">Aqui vai saber qual a situação da inscrição</div>
            </div>
            <div className="py-2">
                <CardSubs eventId={params.id} />
            </div>
        </div>
    )
}