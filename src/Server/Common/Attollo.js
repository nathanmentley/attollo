import { Dependencies } from 'constitute';

import LogUtils from './Utils/LogUtils';

import BlockService from "./Services/BlockService";
import ClientService from "./Services/ClientService";
import CloudStorageService from "./Services/CloudStorageService";
import CssService from "./Services/CssService";
import DatabaseVersionService from "./Services/DatabaseVersionService";
import DataTypeService from "./Services/DataTypeService";
import EmailService from "./Services/EmailService";
import MessageQueueService from "./Services/MessageQueueService";
import PageService from "./Services/PageService";
import PluginService from "./Services/PluginService";
import SettingService from "./Services/SettingService";
import SiteService from "./Services/SiteService";
import ThemeService from "./Services/ThemeService";
import UserService from "./Services/UserService";

import Amqplib from './Clients/Amqplib';
import Redis from './Clients/Redis';
import CloudStorage from './Clients/CloudStorage';
import Database from "./DAL/Core/Database";

@Dependencies(
    BlockService,
    ClientService,
    CloudStorageService,
    CssService,
    DatabaseVersionService,
    DataTypeService,
    EmailService,
    MessageQueueService,
    PageService,
    PluginService,
    SettingService,
    SiteService,
    ThemeService,
    UserService,

    Amqplib,
    Redis,
    CloudStorage,
    Database
)
export default class Attollo {
    constructor(
        blockService,
        clientService,
        cloudStorageService,
        cssService,
        databaseVersionService,
        dataTypeService,
        emailService,
        messageQueueService,
        pageService,
        pluginService,
        settingService,
        siteService,
        themeService,
        userService,

        amqplib,
        redis,
        cloudStorage,
        database
    ) {
        this._appName = '';

        this._services = {
            Block: blockService,
            Client: clientService,
            CloudStorage: cloudStorageService,
            Css: cssService,
            DatabaseVersion: databaseVersionService,
            DataType: dataTypeService,
            Email: emailService,
            MessageQueue: messageQueueService,
            Page: pageService,
            Plugin: pluginService,
            Setting: settingService,
            Site: siteService,
            Theme: themeService,
            User: userService
        };

        this._amqplib = amqplib;
        this._redis = redis;
        this._cloudStorage = cloudStorage;
        this._database = database;
    }

    get AppName() {
        return this._appName;
    }

    get Services() {
        return this._services;
    }

    Start(appName) {
        this._appName = appName;

        LogUtils.Init(appName);
        LogUtils.Info("App Start");

        return Promise.all([
            this._database.Connect(),
            this._amqplib.Connect(),
            this._redis.Connect(),
            this._cloudStorage.Connect()
        ]);
    }

    Stop() {
        this._database.Close();
        this._amqplib.Close();
        this._redis.Close();
        this._cloudStorage.Close();
        
        LogUtils.Info("App Stop");
    }
}