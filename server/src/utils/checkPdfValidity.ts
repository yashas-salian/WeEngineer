import { GoogleGenAI } from "@google/genai";
import { Context } from "hono";
import { fromByteArray } from "base64-js"

export const PdfVality = async(c : Context,subject : string, type : string, college_name: string, file : File) => {

    const arraybuffer = await file.arrayBuffer()
    const byteArray = new Uint8Array(arraybuffer)

    const base64data = fromByteArray(byteArray)

    const model = new GoogleGenAI({apiKey : c.env.GOOGLE_GEMINI_API_KEY})
    const prompt = `check if the pdf is of the type ${type} and is of subject ${subject} and should contain college name as ${college_name} if correct send yes as an response and no if not`
    const response = await model.models.generateContent({
        model : 'gemini-2.0-flash',
        contents : [
            {
                role : 'user',
                parts : [
                    {
                        text : prompt
                    },
                    {
                        inlineData : {
                            mimeType : file.type,
                            data : base64data
                        }
                    }
                ]
            }   
        ]
    })
    const text = response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
    return text
} 