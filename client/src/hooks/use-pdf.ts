import { useCallback, useEffect, useState } from "react"
import {BACKEND_URL} from "../config"
import axios from "axios"
import { useUser } from "@clerk/clerk-react"
export interface data{
    ID : string,
    college_name : string,
    pdf_name : string,
    year : string,
    Examtype : string,
    Url : string,
    secure_Url : string,
    size : number,
    subject_name : string,
    type : string
}

export const usePdfHook = () =>{
    const { user } = useUser()
    const [pdf , setpdf] = useState<data[]>([])
    const [countOfPyq, setCountOfPyq] = useState(0)
    const [countOfNotes, setCountOfNotes] = useState(0)

    const getAllPdfs = useCallback (async () => {
        try {
            // const res = await axios.get("http://127.0.0.1:8787/get-all-pdf")
            const res = await axios.get(`${BACKEND_URL}/get-all-pdf`)
            if (res.data.redisResponse){
                setpdf(res.data.redisResponse)
            }
            if (res.data.response){
                setpdf(res.data.response)
            }
            } catch (error) {
                // setError(error as string)
        }},[])

    const getPdfStats = useCallback(async ()=>{
        const res = await axios.get(`${BACKEND_URL}/get-pdf-stats`)
        try {
            if (res.data.countOfPyq){
                setCountOfPyq(res.data.countOfPyq)
            }
            if (res.data.countOfNotes){
                setCountOfNotes(res.data.countOfNotes)
            }
            } catch (error) {
                // setError(error as string)
    }},[user?.id])

    useEffect(() => {
        getAllPdfs()
    },[getAllPdfs])

    useEffect(() => {
        getPdfStats()
    },[getPdfStats])

    return { pdf, countOfPyq, countOfNotes }
}