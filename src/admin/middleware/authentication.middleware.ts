import express from 'express';
import jwt from 'jsonwebtoken'
import { AccessTokenPayload } from '../services/auth/Token.service';

export const authenticationMiddleware = (
    req: express.Request,
    res: express.Response, 
    next: express.NextFunction
) => {
    const token = req.headers['autharization'];

    if (typeof token === 'string') {
        const tokenSecret = 'HeD7y2RjKXcXUVKMrnfcNKwlyenM0bIk';
        try {
            const accessTokenPayload = jwt.verify(token, tokenSecret) as AccessTokenPayload
    
            if (accessTokenPayload)
                next()
        } catch (error) {
            res.status(403).json({ message: 'TOKEN EXPIRED' })
        }
    }
}