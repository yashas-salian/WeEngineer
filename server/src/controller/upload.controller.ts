import { Context } from "hono";
import { UploadApiResponse} from "cloudinary"
import { getPrismaClient } from "../db/prisma";
export class uploadController{
    static async upload(c : Context){
        try{
            // const {year , Examtype , college_name} = await c.req.json()
            const formData = await c.req.formData()
            const year = formData.get("year")?.toString() || ""
            const Examtype = formData.get("Examtype")?.toString() || ""
            const college_name = formData.get("college_name")?.toString() || ""
            const subject_name = formData.get("subject_name")?.toString() || ""
            const userID = formData.get("userID")?.toString() || ""
            const file = formData.get('file') as File
            if (!file) throw new Error ("No file found")
            
            const cloudName = c.env.CLOUDINARY_CLOUD_NAME
            const uploadPreset = c.env.CLOUDINARY_UPLOAD_PRESET 

            const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`
            const body = new FormData()
            body.append('file', file)
            body.append('upload_preset', uploadPreset)


            const response = await fetch(cloudinaryUrl, {
            method: 'POST',
            body,
            })

            if(!response.ok) throw new Error ("Response error")
            const data = await response.json() as UploadApiResponse
            const prisma = getPrismaClient(c.env.DATABASE_URL)
            const responseFromDB = await prisma.pdf.create({
                data : {
                    pdfID : data.public_id,
                    userID,
                    college_name,
                    pdf_name : data.original_filename,
                    year,
                    Examtype, 
                    Url : data.url,
                    secure_Url : data.secure_url,
                    size : data.bytes,
                    subject_name
                }
            })

            if (!responseFromDB) throw new Error ("Database entry of pdf failed")
            return c.json({
                Message : "file uploaded successfully",
                responseFromDB
            },200)
        }
        catch(e){
            console.error(e)
            return c.json({
                error : true,
                message : e instanceof Error ? e.message : "Unknown error",
                success : false
        },500)
    }
}
}