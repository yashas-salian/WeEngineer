import { useCallback, useEffect, useState } from "react"
import axios from "axios"
interface data{
    ID : string,
    college_name : string,
    pdf_name : string,
    year : string,
    Examtype : string,
    Url : string,
    secure_Url : string,
    size : number,
    subject_name : string
}
export const getPdfs = () =>{
    const [pdf , setpdf] = useState<data[]>([])
    const [error, setError] = useState("")
    const getAllPdfs = useCallback (async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8787/get-all-pdf")
            setpdf(res.data.response)
            } catch (error) {
                setError(error as string)
        }},[])

        useEffect(() => {
            getAllPdfs()
        },[getAllPdfs])

        return { pdf }
}