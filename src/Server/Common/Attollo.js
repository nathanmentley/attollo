import { Dependencies } from 'constitute';

import LogUtils from './Utils/LogUtils';

import BlockService from "./Services/BlockService";
import ClientService from "./Services/ClientService";
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
import Database from "./DAL/Core/Database";

@Dependencies(
    BlockService,
    ClientService,
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
    Database
)
export default class Attollo {
    constructor(
        blockService,
        clientService,
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
        database
    ) {
        this._appName = '';

        this._services = {
            Block: blockService,
            Client: clientService,
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
            this._redis.Connect()
        ]);
    }

    Stop() {
        this._database.Close();
        this._amqplib.Close();
        this._redis.Close();
        
        LogUtils.Info("App Stop");
    }
}