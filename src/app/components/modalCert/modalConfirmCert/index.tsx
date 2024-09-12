import { ModalCert } from "@/app/utils/interface";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

export const ModalConfirmCert = ({ isOpen, id }: ModalCert) => {
  const download = async () => {
    let userId;
    let tokenLoc;

    if (typeof window !== 'undefined') {
      userId = localStorage.getItem('user');
      tokenLoc = localStorage.getItem('token');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/my-certificate?userId=${userId}&eventId=${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenLoc}`
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      toast.error(errorResponse.message || "Failed to download the file");
      return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `${crypto.randomUUID()}.pdf`; // Especifique o nome do arquivo de download
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded-md shadow-lg z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Certificado Disponível</h2>
          <Link href={"?modal=false"}>
            <button className="text-xl">
              <IoClose />
            </button>
          </Link>
        </div>
        <p className="mb-4">O seu certificado está pronto para download.</p>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            onClick={download}
          >
            Baixar Certificado
          </button>
          <Link href={"?modal=false"}>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Fechar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
