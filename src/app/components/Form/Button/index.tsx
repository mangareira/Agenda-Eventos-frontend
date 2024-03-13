import {  MouseEventHandler } from "react"

interface IButton {
    title: string
    className?: string
    onClick? : MouseEventHandler<HTMLButtonElement>
}

export const Button = ({title, className, onClick}: IButton) => {
    return (
        <div className="flex items-center justify-center w-full text-white ">
            <button className={`bg-blue rounded-lg px-4 py-2  w-full ${className}`} onClick={onClick} >{title}</button>
        </div>
    )
}