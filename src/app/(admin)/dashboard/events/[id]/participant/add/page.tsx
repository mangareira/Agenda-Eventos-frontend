'use client'
import { InputAdmin } from "@/app/components/inputAdmin";
import { onSubimtAddParticipantWithEmail } from "@/app/utils/onSubmit";
import { useForm } from "react-hook-form";

export type IEmail = {
    email: string
    tickets: string
    discount: string
}
export default function AddParticipant({params}: {params :{ id: string}}) {
  console.log(params.id);
  
  const {register,handleSubmit} = useForm<IEmail>()
  const submit = async(data: IEmail) => {
    await onSubimtAddParticipantWithEmail(data, params.id)
  }
  return (
    <div className="bg-green_admin p-5 rounded-xl-0.5 mt-5 text-white">
      <form onSubmit={handleSubmit(submit)}>
        <div className="grid grid-cols-1 grid-rows-3 gap-x-4">
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
              title='Tickets' 
              type='text' 
              className="p-8 bg-hover_admin border border-green-400 w-full rounded-md-0.5 mb-8 "
             {...register('tickets')} 
            />
          </div>
          <div className="flex flex-col">
            <select 
              id="isAdmin"  
              className="p-8 bg-hover_admin border border-green-400 border-solid rounded-md-0.5 mb-8 placeholder:text-white"
              {...register('discount')} 
            >
            <option value="" defaultValue={""}>
             Tem desconto ?
            </option>
            <option value="Discount">Sim</option>
            <option value="not discount">Não</option>
          </select>
          </div>
        </div>
        <button type="submit" className="w-full p-8 bg-green_button rounded-md-0.5 cursor-pointer hover:bg-hover_admin">Submit</button>
      </form>
    </div>
  );
};

