import { deleteUser } from '@/app/utils/delete/user'
import { IUsers } from '@/app/utils/interface'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const TableUsers = ({users, deleteUserFromState}: IUsers) => {
    const date = new Date(users.createdAt)
    const minName = users.name.slice(0,25).toString() + '.'
    const handleDelete = (id: string) => async () => {
        await deleteUser(id);
        deleteUserFromState(id)
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
            <td className="p-2.5">active</td>
            <td className="p-2.5">
                <div className="flex gap-2.5">
                    <Link href={`/dashboard/users/${users._id}`}>
                        <button className={`${"py-1 px-2.5 rounded cursor-pointer"} ${"bg-teal-500"}`} >View</button>
                    </Link>
                    <button className={`${"py-1 px-2.5 rounded cursor-pointer"} ${"bg-red-700"}`} onClick={handleDelete(users._id)}>Delete</button>
                </div>
            </td>
        </tr>
  )
}
