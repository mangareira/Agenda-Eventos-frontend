'use client'
import { useGetCertificate } from '@/app/utils/hooks/useGetCertificate';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Verification({searchParams}: {searchParams: {slug: string}}) {
  const [code, setCode] = useState('');

  const router = useRouter()

  const {data, getCertificate, message, status} = useGetCertificate(searchParams.slug)

  useEffect(() => {
    if (status === 404) {
      toast.error(message)
      router.replace('/verification');
    }
  }, [status]);
  
  const maskCPF = (cpf: string) => {
      return cpf.replace(/(\d{2})?(\d{4})?(\d{1})?(\d{2})?(\d{2})/, "$1#.###.#$4-$5");
  };
  const handleVerify = () => {
    getCertificate(code);
  };
  return (
    <>
      {data ? (
        <div className="flex justify-center items-center min-h-[600px]">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
            <h1 className="text-3xl font-bold text-blue mb-6 text-center">
              Verificação de Certificado
            </h1>
            <div className="space-y-4 text-gray-700">
              <div className="flex justify-between">
                <span className="font-semibold">Nome:</span>
                <span>{data.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">CPF:</span>
                <span>{maskCPF(data.cpf)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Email:</span>
                <span>{data.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Evento:</span>
                <span>{data.eventName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Data do Evento:</span>
                <span>{new Date(data.eventDate).toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[600px]">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
            <h1 className="text-3xl font-bold text-blue mb-6 text-center">
              Verificação de Certificado
            </h1>
            <div className="space-y-4">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Digite o código de verificação"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <button
                onClick={handleVerify}
                className="w-full bg-blue text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Verificar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
