"use client"
import { TableParticipantPage } from "@/app/components/Table/Events/Participants";
import { Search } from "@/app/components/search";
import { FetchWrapper } from "@/app/utils/FetchWrapper";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {saveAs} from "file-saver"

export default function Events({searchParams, params}: {searchParams: { page: string, q: string}, params: {id: string}}) {
  const pathName =  usePathname()
  const handleList = async () => {
    try {
      // Fetch para pegar o arquivo do backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/list?id=${params.id}`, {
        method: "GET",
      });
  
      // Verificar se a resposta foi bem-sucedida
      if (!response.ok) {
        throw new Error("Erro ao baixar o arquivo");
      }
  
      // Pegar os dados do arquivo como um blob
      const blob = await response.blob();
  
      // Criar o download do arquivo
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "lista-de-presença.docx";
      document.body.appendChild(a);
      a.click();
      a.remove();
  
      // Revogar a URL para liberar a memória
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao baixar a lista de presença:", error);
    }
  }
  return (
    <div className="rounded-xl-0.5 bg-green_admin p-5 mt-5 text-white">
      <div className="flex items-center justify-between">
        <Search placeholder="Search for a event..."/>
        <div className="">
          <Link href={`${pathName}/add`} >
            <button className="p-2.5 bg-green_button rounded-md-0.5 cursor-pointer mr-4">Add new participant</button>
          </Link>
          <button className="p-2.5 bg-green_button rounded-md-0.5 cursor-pointer" onClick={handleList}>Lista de participantes</button>
        </div>
      </div>
      <div className="">
        <TableParticipantPage page={Number(searchParams.page)} q={searchParams.q} id={params.id}  />
      </div>
    </div>
  )
}
