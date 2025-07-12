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
                    ID : data.public_id,
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
                error : e instanceof Error,
                message : 'Some error occured',
                success : false
        },500)
    }
}
}

// import { Context } from "hono";
// import { UploadApiErrorResponse, UploadApiResponse} from "cloudinary"
// export class uploadController {
//     static async upload(c: Context) {
//         try {
//             const formData = await c.req.formData()
//             const file = formData.get('file') as File
            
//             if (!file) {
//                 return c.json({
//                     error: true,
//                     message: 'No file found',
//                     success: false
//                 }, 400)
//             }

//             const cloudName = c.env.CLOUDINARY_CLOUD_NAME
//             const uploadPreset = c.env.CLOUDINARY_UPLOAD_PRESET

//             let cloudinaryUrl: string
            
//             if (file.type === 'application/pdf') {
//                 // For PDFs, use IMAGE endpoint - this allows viewing in browser
//                 cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`
//             } else if (file.type.startsWith('image/')) {
//                 cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`
//             } else {
//                 // For other document types, use raw
//                 cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`
//             }

//             const body = new FormData()
//             body.append('file', file)
//             body.append('upload_preset', uploadPreset)

//             console.log(`Uploading ${file.type} to ${cloudinaryUrl}`)

//             const response  = await fetch(cloudinaryUrl, {
//                 method: 'POST',
//                 body,
//             })

//             // if (!response.ok) {
//             //     const errorData = await response.json()
//             //     throw new Error(`Cloudinary error: ${errorData.error?.message|| response.statusText}`)
//             // }

//             const responseData  = await response.json();
//             const data = responseData as UploadApiResponse

//             // For PDFs uploaded as images, you can create different URL formats
//             const viewingUrls: any = {
//                 original: data.secure_url,
//             }

//             // If it's a PDF uploaded as image, add additional viewing options
//             if (file.type === 'application/pdf' && data.resource_type === 'image') {
//                 const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`
//                 viewingUrls.thumbnail = `${baseUrl}/w_300,h_400,c_fit/${data.public_id}.jpg`
//                 viewingUrls.preview = `${baseUrl}/w_600,h_800,c_fit/${data.public_id}.jpg`
//                 viewingUrls.fullPage = `${baseUrl}/w_800,h_1200,c_fit/${data.public_id}.jpg`
//             }

//             return c.json({
//                 message: "File uploaded successfully",
//                 success: true,
//                 responseData
//             }, 200)

//         } catch (e) {
//             console.error('Upload error:', e)
//             return c.json({
//                 error: true,
//                 message: e instanceof Error ? e.message : 'Upload failed',
//                 success: false
//             }, 500)
//         }
//     }
// }