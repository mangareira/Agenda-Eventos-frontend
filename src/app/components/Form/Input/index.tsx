import { ChangeEvent, ForwardRefRenderFunction, forwardRef } from "react"


interface IInput {
    placeholder?: string
    type: string
    title: string
    className? : string
    onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    value?: string
}

export const InputBase : ForwardRefRenderFunction<HTMLInputElement & HTMLTextAreaElement, IInput> = ({title, placeholder, type,className, onChange,value, ...rest}, ref) => {
    if(type === 'textarea') {
        return (
            <div className={`mb-4 text-blue font-medium ${className}`}>
            <label >
                {title}
            </label>
            <textarea className={`w-full px-6 py-[5px] bg-white rounded-lg border border-teal-400 `} 
                placeholder={placeholder} 
                rows={5}
                ref={ref}
                onChange={onChange}
                value={value}
                {...rest}
            />
        </div>
        )
    }
    return (
        <div className={`mb-4 text-blue font-medium ${className}`}>
            <label >
                {title}
            </label>
            <input className={`w-full px-6 py-[5px] bg-white rounded-lg border border-teal-400 `} 
                type={type} 
                placeholder={placeholder} 
                ref={ref}
                onChange={onChange} 
                value={value}
                {...rest} 
            />
        </div>
    )
}

export const Input = forwardRef(InputBase)