import React from 'react';
import { AuthenticationApi } from "../services/api/Authentication.api";
import { SocketService } from '../services/Socket.service';

export interface Services {
    authenticationApi: AuthenticationApi
    socketService: SocketService
}

const services: Services = {
    authenticationApi: new AuthenticationApi(),
    socketService: new SocketService()
}

export const ServicesContext = React.createContext<Services>(services);