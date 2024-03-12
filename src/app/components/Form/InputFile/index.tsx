import React, { ChangeEvent, forwardRef, Ref, useState } from "react"

interface IImageProps {
    onChange: (file: File) => void;
}

export const InputFile = forwardRef((props: IImageProps, ref: Ref<HTMLInputElement>) => {
    const [preview, setPreview] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const image = e.target.files?.[0];
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setPreview(base64String);
            };
            reader.readAsDataURL(image);
            props.onChange(image);
        }
    };

    return (
        <>
            {preview ? (
                <div className="w-full h-full cursor-pointer bg-cover bg-center rounded-3xl" 
                    style={{backgroundImage: `url(${preview})`}}
                ></div>
            ) : (
                <input 
                    type="file" 
                    className="block w-full h-full opacity-0 cursor-pointer rounded-3xl"
                    onChange={handleChange}
                    ref={ref}
                />
            )}
        </>
    );
});
