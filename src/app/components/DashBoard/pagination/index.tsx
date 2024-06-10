"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

type ICount = {
  count: number | undefined | any
}
type ITypePage =
    | 'prev' | 'PREV'
    | 'next' | 'NEXT'

const Pagination = ({count}: ICount) => {
  const searchParams = useSearchParams()
  const {replace} = useRouter()
  const pathName = usePathname()
  const params  = new URLSearchParams(searchParams)
  const page = searchParams.get("page") || 1
  const itemPage = 6
  const hasPrev = itemPage * (Number(page) - 1) > 0
  const hasNext = itemPage * (Number(page) - 1) + itemPage < count
  const handleChangePage = (type: ITypePage) => {
    type === "prev" ? 
      params.set("page", String(Number(page) - 1)) :
      params.set("page", String(Number(page) + 1))
    replace(`${pathName}?${params}`)
  }
  return (
    <div className='p-2.5 flex justify-between'>
        <button 
          className='py-1 px-2.5 cursor-pointer disabled:cursor-not-allowed bg-green_button rounded-md-0.5 hover:bg-hover_admin' 
          disabled={!hasPrev}
          onClick={() => handleChangePage("prev")}
        >
          Previous
        </button>
        <button 
          className='py-1 px-2.5 cursor-pointer disabled:cursor-not-allowed bg-green_button rounded-md-0.5 hover:bg-hover_admin' 
          disabled={!hasNext}  
          onClick={() => handleChangePage("next")}
        >
          Next
        </button>
    </div>
  )
}

export default Pagination