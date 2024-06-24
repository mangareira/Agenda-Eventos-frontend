import { IExport } from '@/app/utils/interface';
import { onSubmitExport } from '@/app/utils/onSubmit';
import Link from 'next/link';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';

export const Exportion = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IExport>();

    const onSubmit = async (data: IExport) => {
        onSubmitExport(data)
    };
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);


    return (
        <>
            <div className="bg-black absolute top-0 left-0 w-screen h-screen z-10 opacity-50"></div>
            <div className=" p-5 w-[70%] bg-white shadow-lg rounded-lg absolute top-40 left-50 z-10">
                <div className="flex items-center  mb-4 justify-between">
                    <h2 className="text-2xl font-bold">Export Data</h2>
                    <Link href={'?modal=false'}>
                        <IoClose size={20}/>
                    </Link>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="form-group">
                        <label htmlFor="tableType" className="block text-sm font-medium text-gray-700">Select Table Type:</label>
                        <select
                            id="tableType"
                            {...register("tableType", { required: "Table type is required" })}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="users">Users</option>
                            <option value="events">Events</option>
                            <option value="transactions">Transactions</option>
                        </select>
                        {errors.tableType && <span className="text-red-500 text-sm">{errors.tableType.message}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date:</label>
                        <input
                            type="date"
                            id="startDate"
                            {...register("startDate", { required: "Start date is required" })}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.startDate && <span className="text-red-500 text-sm">{errors.startDate.message}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date:</label>
                        <input
                            type="date"
                            id="endDate"
                            {...register("endDate", { required: "End date is required" })}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.endDate && <span className="text-red-500 text-sm">{errors.endDate.message}</span>}
                    </div>
                    <button
                        type="submit"
                        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Export
                    </button>
                </form>
            </div>
        </>
    );
};

