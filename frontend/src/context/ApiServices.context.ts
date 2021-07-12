import React from 'react';
import { Authentication } from "../services/Authentication.api";

export interface ApiServices {
    authentication: Authentication
}

const apiServices: ApiServices = {
    authentication: new Authentication()
}

export const ApiServicesContext = React.createContext<ApiServices>(apiServices);