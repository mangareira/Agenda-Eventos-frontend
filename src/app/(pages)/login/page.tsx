'use client'

import { Input } from "@/app/components/Form/Input";
import { ILogin } from "@/app/utils/interface";
import { onSubimtLogin } from "@/app/utils/onSubmit";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function login() {
    const {register, handleSubmit, formState: {errors}} = useForm<ILogin>()
    const router = useRouter()
    const submit = async (data: ILogin) => {        
        const result = await onSubimtLogin(data)
        if(result.status === 200) {
            router.push('/')
            await new Promise(resolve => setTimeout(resolve, 700))
            document.location.reload()
        }
        
    }
    return (
        <div className="container mx-auto">
            <div className="text-center pt-10 text-2xl font-bold text-blue">Login</div>
            <div className="flex justify-center mt-8">
                <div className="w-96 rounded overflow-hidden shadow-lg p-10">
                <div className="mb-8">
                    <form onSubmit={handleSubmit(submit)}>
                    <div className="mb-6">
                        <Input title="Email" placeholder="Insira o seu email" type="text" 
                        {...register('email')}
                        />
                    </div>
                    <div className="mb-6">
                        <Input title="Senha" placeholder="Insira sua senha" type="password" 
                        {...register('password')}
                        />
                    </div>
                    <div className="mb-6">
                        <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue text-white font-semibold rounded hover:bg-blue-600"
                        >
                        Login
                        </button>
                    </div>
                    <div className="text-center ">
                        <span className="text-gray-600">Não está inscrito?</span>
                        <Link href="/create-account">
                            <div className="ml-1 text-blue hover:text-blue-600 font-semibold ">
                                Se inscreva
                            </div>
                        </Link>
                    </div>
                    </form>
                </div>
                </div>
            </div>
          </div>
      );
      
}