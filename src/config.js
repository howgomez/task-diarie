import dotenv from 'dotenv'
dotenv.config()

export const MONGODB_URI = process.env.MONGODB_URI;
export const PORT = process.env.PORT || 4000;
export const SECRET_KEY = process.env.SECRET_KEY;
console.log(process.env.SECRET_KEY)
console.log(process.env.PORT)