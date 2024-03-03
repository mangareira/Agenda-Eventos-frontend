interface IButton {
    title: string
    className?: string
}

export const Button = ({title, className}: IButton) => {
    return (
        <div className="flex items-center justify-center w-full text-white ">
            <button className={`bg-blue rounded-lg px-4 py-2  w-full ${className}`} >{title}</button>
        </div>
    )
}