'use client'
import { Button } from "@/app/components/Form/Button";
import { FetchWrapper } from "@/app/utils/FetchWrapper";
import { copyPixToClipboard } from "@/app/utils/copyPix";
import React, { useState, useEffect } from "react";

export default function PaymentPage({ params }: { params: { participantid: string } }) {
  const [qrCode, setQrCode] = useState('');
  const [paymentValue, setPaymentValue] = useState<number | string>(0);
  const [pixCopiaECola, setPixCopiaECola] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await FetchWrapper('/events/findparticipants/' + params.participantid, 'GET');
        let qrCodeData = response.data.payment.qrCode;
        if (!qrCodeData.startsWith('data:image/')) {
          qrCodeData = `data:image/png;base64,${qrCodeData}`;
        }
        setQrCode(qrCodeData);
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
  const handleCopy = () => {
    copyPixToClipboard(pixCopiaECola)
  }
  const pix = pixCopiaECola.slice(0,40).toString() + '...'
  return (
    <div className="container mx-auto">
        <div className="py-2">
            <div className="text-blue">
                <div className="font-medium text-2xl">Detalhe do pagamento</div>
                <div className="font-light text-sm">Aqui podera ver os detalhes do pix</div>
                <div className="font-light text-sm">Quando confirmar seu pagamento espere alguns minutos para validar</div>
                <div className="container mx-auto">
                    <div className="h-[77vh]">
                        <div className="flex flex-col items-center w-full">
                            <div className="w-[350px] h-72 bg-white shadow-md rounded-xl flex items-center">
                                <img src={qrCode} alt="qrcode" className="max-w-xs mx-auto" />
                            </div>
                            <div className="text-blue">
                                <div className="text-center font-medium text-2xl mt-5">
                                    Valor: {new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(Number(paymentValue))}
                                </div>
                                <div className="font-light my-5">
                                    {pix}
                                </div>
                                <Button title="Copia Pix" onClick={handleCopy}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
