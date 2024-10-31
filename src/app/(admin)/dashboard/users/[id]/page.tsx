'use client'
import { InputAdmin } from '@/app/components/inputAdmin'
import { useGetUser } from '@/app/utils/hooks/useGetUser'
import { IAccountPayload } from '@/app/utils/interface'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineLoading } from 'react-icons/ai'
import { toast } from 'react-toastify'

function User({ params }: { params: { id: string } }) {
    const {user,updateUser} = useGetUser(params.id )
    const {register, handleSubmit, formState: {errors}, setValue} = useForm<IAccountPayload>()
    useEffect(() => {
        if (user) {
            setValue('name', user.name);
            setValue('email', user.email);
            setValue('cpf', user.cpf);
            setValue('role', user.role);
            setValue("password", user.password)
        }
    }, [user, setValue]);
    if(!user) return <div className="absolute top-[50%] left-[45%]"><AiOutlineLoading className="animate-spin text-blue" size={30}/></div>
    const submit = async (data: IAccountPayload) => {
        if(!user?._id) return toast.error("id is required")
        await updateUser(data,user?._id)
    }
    return (
        <div className='flex gap-12 mt-5 text-white' >
            <div className="flex-[1] bg-green_admin p-5 rounded-xl-0.5 font-bold h-max ">
                <div className="w-full h-72 relative rounded-xl-0.5 overflow-hidden mb-5">
                    <Image src="/noavatar.png" alt='' fill sizes='auto' priority/>
                </div>
                {user?.name}
            </div>
            <div className="flex-[3] bg-green_admin p-5 rounded-xl-0.5 ">
                <form onSubmit={handleSubmit(submit)} className='flex flex-col text-xs'>
                    <InputAdmin title='Nome' type='text' {...register('name')}/>
                    <InputAdmin title='Email' type='email'{...register('email')}/>
                    <InputAdmin title='CPF' type='text'{...register('cpf')}/>
                    <InputAdmin title='Senha' type='text'{...register('password')}/>
                    <label htmlFor="">Is Admin</label>
                    <select id="isAdmin" {...register('role')} className='p-5 border border-solid border-green_button rounded-md-0.5 bg-hover_admin my-[10px] mx-0 placeholder:text-white '>
                        <option value="admin" selected={user?.role == "admin"}>Yes</option>
                        <option value="participant"selected={user?.role == "participant"}>No</option>
                    </select>
                    <button className='w-full p-5 bg-green_button rounded-md-0.5 cursor-pointer hover:bg-hover_admin text-base mt-5'>Update</button>
                </form>
                <Link href={`/dashboard/users/${user._id}/user-events`} >
                    <button className='w-full p-5 bg-green_button rounded-md-0.5 cursor-pointer hover:bg-hover_admin text-base mt-5'>Events User</button>
                </Link>
            </div>
        </div>
    )
}

export default User