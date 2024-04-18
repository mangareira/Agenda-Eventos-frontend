import Link from "next/link";
import { Button } from "../Form/Button";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

export const LoginError = ({ state, onClose }: { state: any; onClose: () => void }) => {
    const [scrollDisabled, setScrollDisabled] = useState(false);
    
    useEffect(() => {
        if (state === "token is missing") {
            setScrollDisabled(true);
        }
        if (scrollDisabled) {
            document.body.style.overflow = "hidden";
            window.scrollTo(0, 0);
        } else {
            document.body.style.overflow = "auto";
        }
    }, [scrollDisabled, state]);

    const handleClose = () => {
        setScrollDisabled(false);
        onClose();
    };
    
    return (
        <>
            {scrollDisabled && (
                <>
                    <div className="bg-black w-full h-full opacity-40 absolute"></div>
                    <div className="flex items-center justify-center absolute w-full h-full z-20">
                        <div className="bg-white w-72 h-36 rounded-md justify-between flex flex-col">
                            <div className="w-full flex justify-end">
                                <IoClose size={25} className="mr-2 cursor-pointer" onClick={handleClose} />
                            </div>
                            <h1 className="text-center">Tem que fazer o login para ter accesso</h1>
                            <Link href={"/login"}>
                                <Button title="faça o login" className="mb-5 mx-3" />
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};
