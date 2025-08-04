import z from "zod"

export const addEventSchema = z.object({
    title : z.string().nonempty("Event name should be given"),
    description : z.string().optional(),
    dueDate : z.coerce.date(),
    type : z.enum(["Exam","Deadline","Assignment","Other"])
})  