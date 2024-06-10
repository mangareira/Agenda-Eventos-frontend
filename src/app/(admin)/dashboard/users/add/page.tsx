'use client'
import { InputAdmin } from "@/app/components/inputAdmin";
import { IAccount } from "@/app/utils/interface";
import { onSubimtCreateAccount } from "@/app/utils/onSubmit";
import { useForm } from "react-hook-form";

export default function AddUserPage() {
  const {register,handleSubmit} = useForm<IAccount>()
  const submit = async(data: IAccount) => {
    await onSubimtCreateAccount(data)
  }
  return (
    <div className="bg-green_admin p-5 rounded-xl-0.5 mt-5 text-white">
      <form onSubmit={handleSubmit(submit)}>
        <div className="grid grid-cols-2 grid-rows-2 gap-x-4">
          <div className="flex flex-col">
            <InputAdmin 
              title='Nome' 
              type='text' 
              className="p-8 bg-hover_admin border border-green-400 w-full rounded-md-0.5 mb-8 " 
              {...register("name")}  
            />
          </div>
          <div className="flex flex-col">
            <InputAdmin 
              title='Email' 
              type='email' 
              className="p-8 bg-hover_admin border border-green-400 w-full rounded-md-0.5 mb-8 "
             {...register('email')} 
            />
          </div>
          <div className="flex flex-col">
            <InputAdmin 
              title='CPF' 
              type='text' 
              className="p-8 bg-hover_admin border border-green-400 w-full rounded-md-0.5 mb-8 "
              {...register('cpf')}   
            />
          </div>
          <div className="flex flex-col">
            <InputAdmin 
              title='password' 
              type='password' 
              className="p-8 bg-hover_admin border border-green-400 w-full rounded-md-0.5 mb-8 "
              {...register('password')} 
            />
          </div>
        </div>
        <select 
          id="isAdmin"  
          className="p-8 bg-hover_admin border border-green-400 border-solid  w-[48.7%] rounded-md-0.5 mb-8 placeholder:text-white"
          {...register('role')} 
          >
          <option >
            Is Admin?
          </option>
          <option value="admin">Yes</option>
          <option value="participant">No</option>
        </select>
        <button type="submit" className="w-full p-8 bg-green_button rounded-md-0.5 cursor-pointer hover:bg-hover_admin">Submit</button>
      </form>
    </div>
  );
};

