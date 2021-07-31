import React from 'react';
import { Authentication } from "../services/Authentication.api";
import { SocketService } from '../services/Socket.service';

export interface ApiServices {
    authentication: Authentication
    socketService: SocketService
}

const apiServices: ApiServices = {
    authentication: new Authentication(),
    socketService: new SocketService()
}

export const ApiServicesContext = React.createContext<ApiServices>(apiServices);