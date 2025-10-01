import bcrypt from "bcrypt"
const saltRounds = 10

export const hashPassword = async ( password ) => {
    let hashedPassword = await bcrypt.hash( password, 10 )
    return hashedPassword
}

export const comparePassword = async ( userPassword, hashedPassword ) => {
    return await bcrypt.compare( userPassword, hashedPassword )
}