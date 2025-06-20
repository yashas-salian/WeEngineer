import bcrypt from "bcryptjs"


export const generateHashPassword = async (originalPassword : string) =>{
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(originalPassword , saltRounds)
    return hashedPassword
}

export const comparePassword = async (password : string , hashPassword : string) =>{
    const result : boolean =  await bcrypt.compare(password , hashPassword)
    return result
}