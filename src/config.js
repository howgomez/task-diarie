import dotenv from 'dotenv'
dotenv.config()

export const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
export const SECRET_KEY = process.env.SECRET_KEY;
