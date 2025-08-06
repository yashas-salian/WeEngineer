import { useCallback, useEffect, useState } from "react"
import {BACKEND_URL} from "../config"
import axios from "axios"
import { useUser } from "@clerk/clerk-react"
interface data{
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
export interface eventData{
    id : number,
    userID : string,
    title : string,
    description : string,
    dueDate : string,
    type : string
}
export const useCustomHook = () =>{
    const { user } = useUser()
    const [pdf , setpdf] = useState<data[]>([])
    const [event , setEvent] = useState<eventData[]>([])
    const [countOfPyq, setCountOfPyq] = useState(0)
    const [countOfNotes, setCountOfNotes] = useState(0)
    // const [error, setError] = useState("")
    // console.log("backend url = ",BACKEND_URL)
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

    const getEvents = useCallback(async ()=>{
        const res = await axios.get(`${BACKEND_URL}/get-events?id=${user?.id}`)
        try {
            if (res.data.redisResponse){
                setEvent(res.data.redisResponse)
            }
            if (res.data.response){
                setEvent(res.data.response)
            }
            } catch (error) {
                // setError(error as string)
    }},[user?.id])

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
        getEvents()
    },[getEvents, user?.id])
    useEffect(() => {
        getPdfStats()
    },[getPdfStats])

    return { pdf, event, countOfPyq, countOfNotes }
}