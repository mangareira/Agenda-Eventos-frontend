import { Input } from "@/app/components/Form/Input";
import { InputFile } from "@/app/components/Form/InputFile";
import { categories } from "@/app/utils/categories";

export default function CreateEvent() {
    return (
        <div className="container mx-auto">
            <div className="grid sm:grid-cols-2 gap-1 grid-cols-1 p-8">
                <div className="mb-4 pr-6 border-r-2 border-[#61D9DE] ">
                    <div className="mb-4">
                        <p className="text-blue text-2xl font-medium" >Adicionar Eventos</p>
                        <p className="text-blue text-base font-light" >Crie sue próprio evento da maneira que você preferir :)</p>
                    </div>
                    <Input title="Título" placeholder="Insira o nome do seu evento" type="text" />
                    <Input title="Endereço" placeholder="Insira o endereço do seu evento" type="text" />
                    <Input title="Cupom" placeholder="Insira o cupom do seu evento" type="text" />
                    <div className="grid grid-cols-2 gap-3">
                        <Input title="Data" placeholder="dd/mm/aaaa" type="Date" />
                        <Input title="Horário" placeholder="hh:mm" type="number" />
                    </div>
                    <p className="text-blue text-base font-medium mb-4" >Categoria do Evento</p>
                    <div className="grid grid-cols-4 gap-2 ">
                        {categories.map((category, index) => (
                            <div key={index} className="text-blue">
                                <input type="checkbox" className="mr-2 " />
                                <label htmlFor="">{category.name}</label>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4">
                        <p className="text-base font-medium text-blue" >Valor</p>
                        <p className="text-neutral-500 text-sm font-light ">Caso seu evento seja gratuito, o campo deverá ficar em vazio. Caso haja mais de um setor, basta adicionar a seção. Se houver um cupom promocional, basta colocar o código no campo "cupom"</p>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                        <Input 
                            title="Preço" 
                            placeholder="R$00,00" 
                            type="text" 
                            className="col-span-2"
                        />
                        <Input 
                            title="setor" 
                            placeholder="Insira o nome do setor" 
                            type="text" 
                            className="col-span-3"
                        />
                    </div>
                    <Input 
                        title="Descrição" 
                        placeholder="Descrição" 
                        type="textarea" 
                        className="col-span-3"
                    />
                </div>
                <div className="mb-4 ml-4 ">
                    <p className="text-blue text-2xl font-medium" >Adicionar Eventos</p>
                    <p className="text-blue text-base font-light" >Crie sue próprio evento da maneira que você preferir :)</p>
                    <div className="my-4">
                        <p className="text-blue text-base font-medium">Banner</p>
                        <p className="text-neutral-500 text-sm font-light ">Insira um banner no formato 336x280</p>
                        <div className="w-full h-28 bg-zinc-300 rounded-3xl shadow">
                            <InputFile/>
                        </div>
                    </div>
                    <div className="my-4">
                        <p className="text-blue text-base font-medium">Flyers</p>
                        <p className="text-neutral-500 text-sm font-light ">Insira ate três flyers</p>
                        <div className="grid  grid-cols-3 gap-2">
                            <div className="w-full h-28 bg-zinc-300 rounded-3xl shadow">
                                <InputFile/>
                            </div>
                            <div className="w-full h-28 bg-zinc-300 rounded-3xl shadow">
                                <InputFile/>
                            </div>
                            <div className="w-full h-28 bg-zinc-300 rounded-3xl shadow">
                                <InputFile/>
                            </div>
                        </div>
                    </div>
                    <div className="my-4">
                        <p className="text-blue text-base font-medium">Mapa do evento</p>
                        <p className="text-neutral-500 text-sm font-light ">
                            Insira o Mapa do Evento indicado os setores
                        </p>
                        <div className="w-full h-60 bg-zinc-300 rounded-3xl shadow">
                            <InputFile/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}