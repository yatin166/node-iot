import React from 'react';
import { Authentication } from "../services/api/Authentication.api";
import { SocketService } from '../services/Socket.service';

export interface Services {
    authentication: Authentication
    socketService: SocketService
}

const services: Services = {
    authentication: new Authentication(),
    socketService: new SocketService()
}

export const ServicesContext = React.createContext<Services>(services);