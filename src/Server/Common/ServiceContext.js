import { Dependencies } from 'constitute';

import Database from './DAL/Core/Database';

import SendGrid from "./Clients/SendGrid";
import Redis from "./Clients/Redis";
import Amqplib from "./Clients/Amqplib";
import CloudStorage from "./Clients/CloudStorage";

import BlockHandler from "./DAL/Handlers/BlockHandler";
import ClientHandler from "./DAL/Handlers/ClientHandler";
import CssHandler from "./DAL/Handlers/CssHandler";
import DatabaseVersionHandler from "./DAL/Handlers/DatabaseVersionHandler";
import DataTypeHandler from "./DAL/Handlers/DataTypeHandler";
import PageHandler from "./DAL/Handlers/PageHandler";
import PluginHandler from "./DAL/Handlers/PluginHandler";
import SettingHandler from "./DAL/Handlers/SettingHandler";
import SiteHandler from "./DAL/Handlers/SiteHandler";
import ThemeHandler from "./DAL/Handlers/ThemeHandler";
import UserHandler from "./DAL/Handlers/UserHandler";

@Dependencies(
    BlockHandler,
    ClientHandler,
    CssHandler,
    DatabaseVersionHandler,
    DataTypeHandler,
    PageHandler,
    PluginHandler,
    SettingHandler,
    SiteHandler,
    ThemeHandler,
    UserHandler,

    SendGrid,
    Redis,
    Amqplib,
    CloudStorage
)
export default class ServiceContext {
    constructor(
        blockHandler,
        clientHandler,
        cssHandler,
        databaseVersionHandler,
        dataTypeHandler,
        pageHandler,
        pluginHandler,
        settingHandler,
        siteHandler,
        themeHandler,
        userHandler,

        sendGrid,
        redis,
        amqplib,
        cloudStorage
    ) {
        this._handlers = {
            Block: blockHandler,
            Client: clientHandler,
            Css: cssHandler,
            DatabaseVersion: databaseVersionHandler,
            DataType: dataTypeHandler,
            Page: pageHandler,
            Plugin: pluginHandler,
            Setting: settingHandler,
            Site: siteHandler,
            Theme: themeHandler,
            User: userHandler
        };
        this._clients = {
            Email: sendGrid,
            Redis: redis,
            WorkQueue: amqplib,
            CloudStorage: cloudStorage
        };
    }

	get Handlers() {
        return this._handlers;
    }

	get Clients() {
        return this._clients;
    }

    DBTransaction(logic) {
        return Database.Bookshelf.transaction(logic);
    }
}