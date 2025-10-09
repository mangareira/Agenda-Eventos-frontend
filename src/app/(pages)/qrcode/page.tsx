'use client'

import { useState } from 'react'
import { QrReader } from 'react-qr-reader'
import { useRouter } from 'next/navigation'

export default function Page() {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  function handleResult(result: any, err: any) {
    if (!!result) {
      const text = result.getText()

      try {
        const url = new URL(text)
        window.location.href = url.toString()
      } catch {
        setError('O QR Code não contém uma URL válida.')
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-2xl font-semibold mb-6 text-center text-blue">
        Leitor de QR Code
      </h1>

      <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-lg border border-gray-700">
        <QrReader
          constraints={{ facingMode: 'environment' }}
          onResult={handleResult}
          containerStyle={{ width: '100%' }}
          videoStyle={{ width: '100%' }}
        />
      </div>

      <div className="mt-6 text-center">
        <p className="text-blue mt-2">Aponte a câmera para um QR Code</p>
        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
      </div>
    </div>
  )
}
