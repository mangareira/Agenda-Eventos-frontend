import { ISearch } from "@/app/utils/interface"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent } from "react"
import { MdSearch } from "react-icons/md"
import { useDebouncedCallback } from "use-debounce"

export const Search = ({placeholder}: ISearch) => {
    const searchParams = useSearchParams()
    const pathName = usePathname()
    const {replace} = useRouter()
    const handleSearch = useDebouncedCallback((e:ChangeEvent<HTMLInputElement> ) => {
        const params = new URLSearchParams(searchParams)
        params.set("page", "1")
        if(e.target.value){
            e.target.value.length > 2 && params.set("q", e.target.value)
        }else {
            params.delete("q")
        }
        replace(`${pathName}?${params}`)
    }, 300)
    return (
        <div className="flex items-center gap-[10px] bg-hover_admin p-[10px] w-max rounded-xl-0.5">
            <MdSearch/>
            <input type="text"  placeholder={placeholder} className="text-white bg-transparent outline-none placeholder:text-white" onChange={handleSearch}/>
        </div>
    )
}