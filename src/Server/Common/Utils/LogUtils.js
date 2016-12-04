import os from "os";
import fs from 'fs';

import ConfigUtils from './ConfigUtils';

var _appName = "";

export default class LogUtils {
    static get AppName() {
        return _appName;
    }
    static set AppName(value) {
        _appName = value;
    }

	static Init(appName) {
		LogUtils.AppName = appName;
	}

	static Info(message) {
		LogUtils._LogIt(message);
	}

	static Error(message) {
		LogUtils._LogIt("Error: " + message);
	}

	static _LogIt(message) {
		var d = new Date();
		var finalMessage = d.toISOString() + ": " + message;
		console.log(finalMessage);

		if(this.AppName != null){
			var fileName = d.getFullYear() + '_' + (d.getMonth() + 1) + '_' + d.getDate() + '.log';
			var filePath = process.cwd() + ConfigUtils.Config.LogDir + LogUtils.AppName + '/' + fileName;
		
			fs.appendFile(filePath, finalMessage + os.EOL, { flag: 'a+' }, (err) => {});
		}
	}
}