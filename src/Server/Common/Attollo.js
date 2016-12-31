import LogUtils from './Utils/LogUtils';

import Amqplib from './Clients/Amqplib';
import Redis from './Clients/Redis';
import Database from "./DAL/Core/Database";

import PluginContext from "./PluginContext";

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

var _appName = '';

var services = {
    Block: new BlockService(),
    Client: new ClientService(),
    Css: new CssService(),
    DatabaseVersion: new DatabaseVersionService(),
    DataType: new DataTypeService(),
    Email: new EmailService(),
    MessageQueue: new MessageQueueService(),
    Page: new PageService(),
    Plugin: new PluginService(),
    Setting: new SettingService(),
    Site: new SiteService(),
    Theme: new ThemeService(),
    User: new UserService()
};

export default class Attollo {
    static get AppName() {
        return _appName;
    }

    static get Services() {
        return services;
    }

    static Start(appName) {
        _appName = appName;

        LogUtils.Init(appName);
        LogUtils.Info("App Start");

        return Promise.all([
            Database.Connect(),
            Amqplib.Connect(),
            Redis.Connect()
        ]);
    }

    static Stop() {
        Database.Close();
        Amqplib.Close();
        Redis.Close();
        
        LogUtils.Info("App Stop");
    }

    static GetPluginContext(dbContext) {
        return PluginContext.BuildContext(this, dbContext);
    }
}