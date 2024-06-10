import React from 'react'
import Pagination from '../../DashBoard/pagination'
import { TableUsers } from '../../TableUsers'
import { useUserList } from '@/app/utils/hooks/useUserList'
import { IQuery } from '@/app/utils/interface'


export const TableUsersPage = ({q, page}:IQuery ) => {
    const {users, count, deleteUserFromState} = useUserList(q,page)
    return (
    <div>
        <table className="w-full" > 
            <thead>
                <tr>
                    <td className="p-2.5">Name</td>
                    <td className="p-2.5">Email</td>
                    <td className="p-2.5">Created At</td>
                    <td className="p-2.5">Role</td>
                    <td className="p-2.5">Status</td>
                    <td className="p-2.5">Action</td>
                </tr>
            </thead>
            <tbody>
                {users?.map((user, index) => (
                    <TableUsers users={user} key={index} deleteUserFromState={deleteUserFromState}/>
                ))}
            </tbody>
        </table>
        <Pagination count={count}/>
    </div>
    )
}
