import { cancelledParticipant } from '@/app/utils/cancelledParticipant'
import { IUsers } from '@/app/utils/interface'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FetchWrapper } from '@/app/utils/FetchWrapper'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'

export const TableParticipants = ({users,deleteUserFromState,eventId, eventDate}: IUsers,) => {
    const date = new Date(users.createdAt)
    const minName = users.name.slice(0,25).toString() + '.'
    const handleDelete = (id: string) => async () => {
        await cancelledParticipant(eventId, id)
        deleteUserFromState(id)
    }
    const handleConfirm = (id: string, isConfirmed: boolean, eventId: string | undefined) => async () =>{
        const res = await FetchWrapper("/events/confirm", "PUT", "", {id, isConfirmed, eventId})
        if(res.status == 200) {
            toast.success("Confirmando com sucesso")
        }
    }
    return (
        <tr>
            <td className="p-2.5">
                <div className="flex items-center gap-2.5">
                    <Image src="/noavatar.png" alt="" width={40} height={40} className="rounded-full object-cover " />
                    {minName}
                </div>
            </td>
            <td className="p-2.5">{users.email}</td>
            <td className="p-2.5">{date.toString().slice(4,16)}</td>
            <td className="p-2.5">{users.role}</td>
            <td className="p-2.5">
                <div className="flex gap-2.5">
                    <Link href={`/dashboard/users/${users._id}`}>
                        <button className={`py-1 px-2.5 rounded cursor-pointer bg-teal-500`} >View</button>
                    </Link>
                    <button className={`py-1 px-2.5 rounded cursor-pointer bg-red-700`} onClick={handleDelete(users._id)}>Delete</button>
                </div>
            </td>
            {dayjs(new Date()).isAfter(eventDate) ? (
                <td className='p-2.5 flex gap-2'>
                    <button  className='bg-teal-500 py-1 px-2.5 rounded cursor-pointer' onClick={handleConfirm(users._id, true, eventId)}>Sim</button>
                    <button  className='bg-teal-500 py-1 px-2.5 rounded cursor-pointer' onClick={handleConfirm(users._id, false, eventId)}>Não</button>
                </td>
            ) : null}
        </tr>
  )
}
