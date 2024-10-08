import {  MouseEventHandler } from "react"

interface IButton {
    title: string
    className?: string
    onClick? : MouseEventHandler<HTMLButtonElement>
    disable?: boolean
}

export const Button = ({title, className, onClick,disable}: IButton) => {
    return (
        <div className="flex items-center justify-center w-full text-white ">
            <button className={`bg-blue rounded-lg px-4 py-2  w-full ${className}`} onClick={onClick} disabled={disable}>{title}</button>
        </div>
    )
}