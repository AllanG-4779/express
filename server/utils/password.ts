import {hashSync, genSalt} from 'bcryptjs'

export const hashPassword = async (password: string) => {
    const salt = await genSalt(10)
    return hashSync(password, salt)
}