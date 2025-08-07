import { GoogleGenAI } from "@google/genai";
import { Context } from "hono";
import { fromByteArray } from "base64-js"

export const PdfVality = async(c : Context,subject : string, type : string, college_name: string, file : File) => {

    const arraybuffer = await file.arrayBuffer()
    const byteArray = new Uint8Array(arraybuffer)

    const base64data = fromByteArray(byteArray)

    const model = new GoogleGenAI({apiKey : c.env.GOOGLE_GEMINI_API_KEY})
    const prompt = `Check if the uploaded PDF matches the following conditions:
                    It should be of type ${type}.
                    It should be related to the subject ${subject}.
                    If the type is "PYQ", the PDF must contain the college name ${college_name}, if it doesn't respond no.
                    If the type is "Notes", ignore the college name check.
                    Respond with yes if all conditions are met, otherwise respond with no.`
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