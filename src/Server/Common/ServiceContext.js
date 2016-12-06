import Attollo from "./Attollo";

import Database from './DAL/Core/Database';

import SendGrid from "./Clients/SendGrid";
import Redis from "./Clients/Redis";
import Amqplib from "./Clients/Amqplib";

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

export default class ServiceContext {
	static DBTransaction(logic) {
		return Database.Bookshelf.transaction(logic);
	}

    static get Handlers() {
		var handlers = {};

		handlers.Block = BlockHandler;
		handlers.Client = ClientHandler;
		handlers.Css = CssHandler;
		handlers.DatabaseVersion = DatabaseVersionHandler;
		handlers.DataType = DataTypeHandler;
		handlers.Page = PageHandler;
		handlers.Plugin = PluginHandler;
		handlers.Setting = SettingHandler;
		handlers.Site = SiteHandler;
		handlers.Theme = ThemeHandler;
		handlers.User = UserHandler;
		
        return handlers;
    }

	static get Clients() {
		var clients = {};

		clients.Email = SendGrid;
		clients.Redis = Redis;
		clients.WorkQueue = Amqplib;
		
        return clients;
    }
}