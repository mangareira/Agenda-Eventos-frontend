'use client'
import { Button } from "@/app/components/Form/Button";
import { FetchWrapper } from "@/app/utils/FetchWrapper";
import React, { useState, useEffect } from "react";

export default function PaymentPage({ params }: { params: { participantid: string } }) {
  const [qrCode, setQrCode] = useState('');
  const [paymentValue, setPaymentValue] = useState<number | string>(0);
  const [pixCopiaECola, setPixCopiaECola] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await FetchWrapper('/events/findparticipants/' + params.participantid, 'GET');
        setQrCode(response.data.payment.qrCode);
        setPaymentValue(response.data.payment.valor);
        setPixCopiaECola(response.data.payment.pixCopiaECola);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.participantid]);

  const copyPixToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(pixCopiaECola);
      alert('Código PIX copiado para a área de transferência!');
    } catch (error) {
      alert('Erro ao copiar o código PIX. Por favor, tente novamente.');
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-gray-900">Detalhes do Pagamento</h1>

      {isLoading ? (
        <p className="text-base leading-6 text-gray-500">Carregando...</p>
      ) : error ? (
        <p className="text-base leading-6 text-red-500">Erro ao carregar os dados. Por favor, tente novamente mais tarde.</p>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-base leading-6 text-gray-500">Valor: R${paymentValue}</p>

          <img src={qrCode} alt="qrcode" className="max-w-xs mx-auto" />

          <p className="text-base leading-6 text-gray-500">Copie e cole o PIX: {pixCopiaECola}</p>
          <Button title="Copie cole"  onClick={copyPixToClipboard} className="hover:bg-blue-600 hover:text-blue"/>
        </div>
      )}
    </div>
  );
}
