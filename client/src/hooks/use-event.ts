import { BACKEND_URL } from "@/config"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { useUser } from "@clerk/clerk-react"

export interface eventData{
    id : number,
    userID : string,
    title : string,
    description : string,
    dueDate : string,
    type : string
}

export const useEventHook = () => {
    const {user} = useUser()
    const [event , setEvent] = useState<eventData[]>([])
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

    useEffect(() => {
        getEvents()
    },[getEvents, user?.id])

    return {event}
}