import { z } from 'zod'

export const loginSchema = z.object({
    email : z.string().email('Invalid email address'),
    password : z.string().min(6, 'Password must be atleast of 6 characters')
}) 

export const registerSchema = z.object({
    username : z.string().optional(),
    email : z.string().email('Invalid email address'),
    password : z.string().min(6, 'Password must be atleast of 6 characters')
})