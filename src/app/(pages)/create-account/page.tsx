'use client'

import { Input } from "@/app/components/Form/Input";
import { IAccount } from "@/app/utils/interface";
import { onSubimtCreateAccount } from "@/app/utils/onSubmit";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function login() {
    const {register, handleSubmit, formState: {errors}} = useForm<IAccount>()
    const router = useRouter()
    const submit = async (data: IAccount) => {        
        const result = await onSubimtCreateAccount(data)
        if(result.status === 201) {
            router.replace('/login')
        }
    }
    return (
        <div className="container mx-auto">
            <div className="text-center pt-10 text-2xl font-bold text-blue">Cadastra-se</div>
            <div className="flex justify-center mt-8">
                <div className="w-96 rounded overflow-hidden shadow-lg p-10">
                <div className="mb-8">
                    <form onSubmit={handleSubmit(submit)}>
                        <div className="mb-6">
                            <Input title="Nome" placeholder="Insira o seu nome completo" type="text" 
                            {...register('name')}
                            />
                        </div>
                        <div className="mb-6">
                            <Input title="Email" placeholder="Insira o seu email" type="text" 
                            {...register('email')}
                            />
                        </div>
                        <div className="mb-2">
                            <Input title="Cpf" placeholder="Insira o seu cpf" type="text" 
                            {...register('cpf')}
                            />
                            <h1 className="font-light text-gray-300 text-sm">Ex: 12345678901</h1>
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
                            Inscreva-se
                            </button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
          </div>
      );
      
}