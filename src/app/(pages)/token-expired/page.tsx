'use client'

import { Button } from "@/app/components/Form/Button";
import Link from "next/link";

export default function tokenExpired() {
    return (
        <div className="container mx-auto">
            <div className="flex items-center justify-center h-[85vh] flex-col">
                <h2>Sua seção esta expirada. Faça o login novamente </h2>
                <Link href={'/login'}>
                    <Button title="Faça o login novamente" />
                </Link>
            </div>
        </div>
    )
}