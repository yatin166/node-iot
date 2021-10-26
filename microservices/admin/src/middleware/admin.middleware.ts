import express from 'express';
import { Request } from '../../../common/middlewares/Request';
import { UserRepository } from '../database/repository/User.repository';

export const adminMiddleware = (
    req: Request,
    res: express.Response, 
    next: express.NextFunction
) => {

    if (!req.userId)
        res.status(403).json({ message: 'No userId found' });

    UserRepository.getById(req.userId)
        .then(user => {
            if (user.role !== 'admin')
                return res.status(403).json({ message: 'Access denied, not admin user!' })
            next();
        })
        .catch(error => res.status(403).json({ message: 'Error occured' }))
}