import express from 'express';
import { MainController } from './controllers/Main.controller';
import { Server } from './server';

const expressServer = new Server(
    express(),
    8000,
    new MainController(),
    'mongodb://localhost:27017/iot'
);

expressServer
    .configure()
    .then(() => expressServer.up())
    .catch(error => console.log(`Error occurred in starting server ${error}`))
