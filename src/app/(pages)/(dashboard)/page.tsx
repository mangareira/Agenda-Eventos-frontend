"use client"
import { BannerPrimary } from "@/app/components/BannerPrimary";
import { BannerSecondary } from "@/app/components/BannerSecondary";
import { FetchWrapper } from "@/app/utils/FetchWrapper";
import { categories } from "@/app/utils/categories";
import Link from "next/link";
import { useEffect, useState } from "react";


export default  function DashBoard(){

    const [main, setMain] = useState<any>([])

    const response = async () => {
        const response = await FetchWrapper("/events/main", 'GET')
        setMain(response.data)
    } 
    useEffect(() =>{
        response()
    }, [])
    
    
    const secondary = main.slice(1)         
    const error = () => {
        if (!main.length) {
            return (
              <div className="w-full h-[280px] relative rounded-3xl shadow  flex justify-center items-center ">
                <p className="text-blue font-medium" >Não existe evento para esta data</p>
              </div>
            );
        }
    }
    const errorSecondary = () => {
        if (!secondary.length) {
            return (
              <div className="w-full h-[280px] relative rounded-3xl shadow  flex justify-center items-center ">
                <p className="text-blue font-medium" >Não existe evento para esta data</p>
              </div>
            );
        }
    }
    
    return (
        <div className="container mx-auto ">
            {main && main[0] && <BannerPrimary events={main[0]} />}
            <div className="">{error()}</div>
            <div className="p-2 text-blue">
                <p className="text-2xl font-medium">Eventos em Destaque</p>
                <p className=" text-base font-light ">Se divirta com os principais eventos da Faculdade Unicentoma</p>
            </div>
            <div className=" grid lg:grid-cols-3 gap-4 mb-4 grid-cols-1">
                {secondary.map((events: any, index: any) => (
                    <div className="" key={index}>
                        <BannerSecondary events={events}/>
                    </div>
                ))}
            </div>
            <div className="">{errorSecondary()}</div>
            <div className="p-2 text-blue">
                <p className="text-2xl font-medium">Navegue por tipo de evento</p>
                <p className=" text-base font-light ">vá ao evento que é sua cara :D</p>
            </div>
            <div className="grid md:grid-cols-7 grid-cols-2 lg:gap-2 sm:gap-1 overflow-auto [&::-webkit-scrollbar]:hidden">
                {categories.map((category, index) => {
                    return (
                        <Link href={`/categories/${category.route}?q=${category.name}` } key={index}>
                            <div  className="flex flex-col items-center justify-center cursor-pointer " >
                                <img src={category.icon} alt="category" className="rounded-full" />
                                <p > {category.name} </p>    
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}