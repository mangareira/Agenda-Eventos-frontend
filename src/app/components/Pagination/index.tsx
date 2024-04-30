import { IPagination } from "@/app/utils/interface";
import { L, R, usePagination } from "@/app/utils/usePagination";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export const Pagination = ({page, limit, total, classNameDiv}: IPagination) => {
    const pathName = usePathname()
    const seachParams = useSearchParams()
    const {pages, isCurrentPage} =  usePagination({page,limit,total})   
    const reloadPage = async () => {
        await new Promise(resolve => setTimeout(resolve, 200))
        window.location.reload()
    }
    const generateUrl = (page: number) => {
        const params = new URLSearchParams(seachParams)
        params.set("page", page.toString())
        const url = `${pathName}?${params.toString()}`
        return url
    }
    return(
        <div className={classNameDiv}>
            <ul className="inline-flex -space-x-px text-base h-10" >
                {pages.map((page: any, index) => {
                    const isEllipsis = page === L || page === R
                    const isFirst = index === 0
                    const isLast = index + 1 === pages.length
                    const isCurrent = isCurrentPage(page)
                    const className = ['flex items-center justify-center px-4 h-10 leading-tight border-gray-300', 
                    isFirst ? 'ms-0 border-e-0 rounded-s-lg' : '',
                    isLast ? 'rounded-e-lg': '',
                    isCurrent ? "text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-gray-700 dark:border-gray-600 darl:bg-gray-50" :
                    "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-500" ].join(' ')
                    if(isEllipsis) {
                        return (
                            <li key={index} >
                                <span className={className}>
                                    ...
                                </span>
                            </li>)
                    }
                    return <li key={index} >
                        <Link href={generateUrl(page)} onClick={reloadPage} 
                        className={className}>
                            {page}
                        </Link>
                    </li>
                })}
            </ul>
        </div>
    )
}