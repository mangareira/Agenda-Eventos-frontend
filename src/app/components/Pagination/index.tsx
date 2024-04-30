import { IPagination } from "@/app/utils/interface";
import { L, R, usePagination } from "@/app/utils/usePagination";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const Pagination = ({page, limit, total, classNameDiv}: IPagination) => {
    const pathName = usePathname()
    const seachParams = useSearchParams()
    const router = useRouter()
    const {pages, isCurrentPage} =  usePagination({page,limit,total})   
    const generateUrl = (page: number) => {
        const params = new URLSearchParams(seachParams)
        params.set("page", page.toString())
        const url = `${pathName}?${params.toString()}`
        return url
    }
    const query = async () => {
        await new Promise(resolve => setTimeout(resolve, 700))
        location.reload()
    }
    return(
        <div className={classNameDiv}>
            <ul className="inline-flex -space-x-px text-base h-10 " >
                {pages.map((page: any, index) => {
                    const isEllipsis = page === L || page === R
                    const isFirst = index === 0
                    const isLast = index + 1 === pages.length
                    const isCurrent = isCurrentPage(page)
                    const className = ['flex items-center justify-center px-4 h-10 leading-tight ', 
                    isFirst ? 'ms-0 rounded-s-lg' : '',
                    isLast ? 'rounded-e-lg': '',
                    isCurrent ? "text-blue bg-gray-300 hover:bg-blue-600 border-blue border hover:text-white" :
                    "text-blue bg-white hover:bg-gray-100 border-blue border" ].join(' ')
                    if(isEllipsis) {
                        return (
                            <li key={index} >
                                <span className={className}>
                                    ...
                                </span>
                            </li>)
                    }
                    return <li key={index} >
                        <Link href={generateUrl(page)} className={className} onClick={query}>
                            {page}
                        </Link>
                    </li>
                })}
            </ul>
        </div>
    )
}