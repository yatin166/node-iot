import express from 'express';
import { Request } from './Request'
import jwt from 'jsonwebtoken'
import { TokenConfig } from '../../../config/Token.config';

export interface AccessTokenPayload {
    userId: string;
    userEmail: string;
}

export const authenticationMiddleware = (
    req: Request,
    res: express.Response, 
    next: express.NextFunction
) => {
    const token = req.headers['authorization'];

    if (typeof token === 'string') {
        try {
            const accessTokenPayload = jwt.verify(token, TokenConfig.accessTokenSecret()) as AccessTokenPayload
    
            if (accessTokenPayload) {
                req.userId = accessTokenPayload.userId;
                next()
            }

        } catch (error) {
            res.status(403).json({ message: 'TOKEN EXPIRED' })
        }
    } else {
        res.status(403).json({ message: 'TOKEN EXPIRED' })
    }
}