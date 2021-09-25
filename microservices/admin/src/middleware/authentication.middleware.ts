import express from 'express';
import jwt from 'jsonwebtoken'
import { TokenConfig } from '../../../config/Token.config';
import { AccessTokenPayload } from '../services/auth/Token.service';

export const authenticationMiddleware = (
    req: express.Request,
    res: express.Response, 
    next: express.NextFunction
) => {
    const token = req.headers['authorization'];

    if (typeof token === 'string') {
        try {
            const accessTokenPayload = jwt.verify(token, TokenConfig.accessTokenSecret()) as AccessTokenPayload
    
            if (accessTokenPayload)
                next()
        } catch (error) {
            res.status(403).json({ message: 'TOKEN EXPIRED' })
        }
    } else {
        res.status(403).json({ message: 'TOKEN EXPIRED' })
    }
}