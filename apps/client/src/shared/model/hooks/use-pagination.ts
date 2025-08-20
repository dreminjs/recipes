import { useState } from "react"




export const usePagination = () => {

    const [page,setPage] = useState(1)

    const handleChangePage = (newPage: number) => setPage(newPage)  

    return { page, onChangePage: handleChangePage }
}