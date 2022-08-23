import * as jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import { authenticationData } from "../model/AuthenticationData";

dotenv.config()
const expiresIn = "36h"

export default class Authenticator {
    generateToken = (payload: authenticationData) => {
        return jwt.sign(
            payload,
            process.env.JWT_KEY as string,
            {
                expiresIn 
            }
        )
    }

    getData = (token: string) => {
        const tokenData = jwt.verify(
            token, process.env.JWT_KEY as string,
        )

        return tokenData as authenticationData
    }
} 