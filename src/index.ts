import express from 'express';
import { MainController } from './controllers/Main.controller';
import { Server } from './server';

const expressServer = new Server(
    express(),
    8000,
    new MainController()
);

expressServer.configure().then(() => expressServer.listen());
