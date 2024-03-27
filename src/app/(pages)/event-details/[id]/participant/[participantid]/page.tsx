'use client'

import { FetchWrapper } from "@/app/utils/FetchWrapper";
import Image from "next/image";
import React from "react";

export default function PaymentPage({params}: {params: {participantid: string}}) {
    const [qrCode, setQrCode] = React.useState('');
    const [paymentValue, setPaymentValue] = React.useState(0);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FetchWrapper('/events/findparticipants/' + params.participantid, 'GET');
        setQrCode(response.data.payment.qrCode);
        setPaymentValue(response.data.payment.valor);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [params.participantid]);
    
    return (
        <div className="container mx-auto">
            <div className="h-[615px]">
                <div className="grid grid-cols-2 h-full items-center">
                    <div className="flex justify-center h-full flex-wrap flex-col items-center font-medium text-blue">
                        <div className="">
                            <img src={qrCode} alt="qrcode"  width={200} height={200} />
                        </div>
                        <p className="text-2xl ">valor: R${paymentValue}</p>
                        <p>pix copia cola: </p>
                    </div>
                    <div className="">
                        <p></p>
                    </div>
                </div>
            </div>
        </div>
    )
}