'use client'

import { useState } from "react"

export const PriceWrapper = () => {

    const [value, setValue] = useState(0)
    const handleIncrement = () => {
        setValue(value + 1)
    }
    const handleDecrement = () => {
        if(value === 0) return
        setValue(value - 1)

    }

    return (
        <div className="flex justify-between items-center">
            <div className="">
                <p className="font-bold text-lg" >Pista</p>
                <p>Entrada e acesso à pista do evento.</p>
            </div>
            <div className="flex" >
                <div onClick={handleDecrement} className="bg-blue rounded text-white font-medium w-8 h-8 flex justify-center items-center">
                    <p>-</p>
                </div>
                <div className="bg-white rounded border border-neutral-500 mx-2 text-blue font-medium w-8 h-8 flex justify-center items-center">
                    <p>{value}</p>
                </div>
                <div onClick={handleIncrement} className="bg-blue rounded text-white font-medium w-8 h-8 flex justify-center items-center">
                    <p>+</p>
                </div>
            </div>
        </div>
    )
}