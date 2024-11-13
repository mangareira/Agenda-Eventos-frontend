"use client"
import { TableParticipantPage } from "@/app/components/Table/Events/Participants";
import { Search } from "@/app/components/search";
import { FetchWrapper } from "@/app/utils/FetchWrapper";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {saveAs} from "file-saver"
import { toast } from "react-toastify";

export default function Events({searchParams, params}: {searchParams: { page: string, q: string}, params: {id: string}}) {
  const pathName =  usePathname()
  const handleList = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/list?id=${params.id}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Erro ao baixar o arquivo");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "lista-de-presença.docx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao baixar a lista de presença:", error);
    }
  }
  const onConfirmAll = async () => {
    const response = await FetchWrapper(`/events/confirm-all/${params.id}`, "POST")
    if(response?.response?.data?.status == 400) {
      toast.error(response?.response?.data?.message)
    }
    toast.success(response.data.message)
  }
  return (
    <div className="rounded-xl-0.5 bg-green_admin p-5 mt-5 text-white">
      <div className="flex items-center justify-between">
        <Search placeholder="Search for a event..."/>
        <div className="">
          <Link href={`${pathName}/add`} >
            <button className="p-2.5 bg-green_button rounded-md-0.5 cursor-pointer mr-4">Add new participant</button>
          </Link>
          <button className="p-2.5 bg-green_button rounded-md-0.5 cursor-pointer mr-4" onClick={handleList}>Lista de participantes</button>
          <button className="p-2.5 bg-green_button rounded-md-0.5 cursor-pointer" onClick={onConfirmAll}>Confirma todos</button>
        </div>
      </div>
      <div className="">
        <TableParticipantPage page={Number(searchParams.page)} q={searchParams.q} id={params.id}  />
      </div>
    </div>
  )
}
