import { ChangeEvent, ForwardRefRenderFunction, HTMLInputTypeAttribute, forwardRef } from "react"
import { InputType } from "zlib"


interface IInput {
    placeholder?: string
    type: HTMLInputTypeAttribute | "textarea"
    title: string
    className? : string
    onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    value?: string
}

export const InputBase : ForwardRefRenderFunction<HTMLInputElement & HTMLTextAreaElement, IInput> = ({title, placeholder, type,className, onChange,value, ...rest}, ref) => {
    if(type === 'textarea') {
        return (
            <>
                <label >
                    {title}
                </label>
                <textarea className={`p-5 border border-solid border-green_button rounded-md-0.5 bg-hover_admin my-[10px] mx-0 placeholder:text-white  `} 
                    placeholder={placeholder} 
                    rows={5}
                    ref={ref}
                    onChange={onChange}
                    value={value}
                    {...rest}
                />
            </>
        )
    }
    return (
        <>
            <label >
                {title}
            </label>
            <input className={`p-5 border border-solid border-green_button rounded-md-0.5 bg-hover_admin my-[10px] mx-0 placeholder:text-white ${className}'`} 
                type={type} 
                placeholder={placeholder} 
                ref={ref}
                onChange={onChange} 
                value={value}
                {...rest} 
            />
        </>
    )
}

export const InputAdmin = forwardRef(InputBase)