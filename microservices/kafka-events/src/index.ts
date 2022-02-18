import express from 'express';
import { ServerConfig } from '../../common/config/Server.config';
import { KafkaServer } from "./KafkaServer";
import { MainKafkaController } from './controllers/base/Main.kafka.controller';

const kafkaServer = new KafkaServer(
    express(),
    ServerConfig.kafkaServerPort(),
    new MainKafkaController()
);

kafkaServer
    .configure()
    .then(() => kafkaServer.up())
    .catch(error => console.error(`Error occurred in starting server ${error}`))
