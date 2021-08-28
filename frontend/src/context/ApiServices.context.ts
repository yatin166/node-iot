import React from 'react';
import { AuthenticationApi } from "../services/api/Authentication.api";
import { DashboardApi } from '../services/api/Dashboard.api';
import { SocketService } from '../services/Socket.service';

export interface Services {
    authenticationApi: AuthenticationApi,
    dashboardApi: DashboardApi,
    socketService: SocketService
}

const services: Services = {
    authenticationApi: new AuthenticationApi(),
    dashboardApi: new DashboardApi(),
    socketService: new SocketService()
}

export const ServicesContext = React.createContext<Services>(services);