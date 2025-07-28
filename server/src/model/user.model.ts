import { z } from 'zod'

export const loginSchema = z.object({
    email : z.string().email('Invalid email address'),
    password : z.string().min(6, 'Password must be atleast of 6 characters')
}) 

export const registerSchema = z.object({
    username : z.string().nonempty('Provide username'),
    email : z.string().email('Invalid email address'),
    password : z.string().min(6, 'Password must be atleast of 6 characters'),
    DOB : z.string().nonempty('Provide DOB'),
    college : z.string().nonempty('Provide college name'),
    degree : z.string().nonempty('Provide degree name'),
    field : z.string().nonempty('Provide field name'),
})