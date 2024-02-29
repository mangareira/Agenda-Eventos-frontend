import { BannerPrimary } from "@/app/components/BannerPrimary";
import { BannerSecondary } from "@/app/components/BannerSecondary";
import { categories } from "@/app/utils/categories";

export default function DashBoard(){
    return (
        <div className="container mx-auto ">
            <BannerPrimary/>
            <div className="p-2 text-blue">
                <p className="text-2xl font-medium">Eventos em Destaque</p>
                <p className=" text-base font-light ">Se divirta com os principais eventos da Faculdade Unicentoma</p>
            </div>
            <div className=" grid grid-cols-3 gap-4 mb-4 ">
                <BannerSecondary/>
                <BannerSecondary/>
                <BannerSecondary/>
            </div>
            <div className="p-2 text-blue">
                <p className="text-2xl font-medium">Navegue por tipo de evento</p>
                <p className=" text-base font-light ">vá ao evento que é sua cara :D</p>
            </div>
            <div className="grid md:grid-cols-7 grid-cols-2 lg:gap-2 sm:gap-1">
                {categories.map((category, index) => {
                    return (
                        <div className="flex flex-col items-center justify-center cursor-pointer" key={index}>
                            <img src={category.icon} alt="category" className="rounded-full" />
                            <p > {category.name} </p>    
                        </div>
                    )
                })}
            </div>
        </div>
    )
}