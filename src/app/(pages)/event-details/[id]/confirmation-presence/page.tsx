'use client'

import { useState } from "react"
import { useParams } from "next/navigation"
import { FetchWrapper } from "@/app/utils/FetchWrapper"
import { Input } from "@/app/components/Form/Input"
import { Button } from "@/app/components/Form/Button"

export default function ConfirmationPresencePage() {
  const { id } = useParams()
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const response = await FetchWrapper(`/events/confirm-precense/${id}`, "POST", { email })

    if (response.ok) {
      setMessage("Presença confirmada com sucesso! ✅")
    } else {
      setMessage("Erro ao confirmar presença. Tente novamente.")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-blue p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Confirme sua presença</h1>
      <p className="text-blue mb-6 text-center">
        Informe seu e-mail para confirmar sua presença no evento.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-sm">
        <Input 
          title="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Button 
          title="Confirmar presença"
        />
      </form>

      {message && <p className="mt-4 text-center text-green-400">{message}</p>}
    </div>
  )
}
