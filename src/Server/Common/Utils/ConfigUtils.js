import fs from 'fs';

export default class ConfigUtils {
    static get Config() {
        return JSON.parse(fs.readFileSync(process.cwd() + "/config.json", 'utf8'));
    }
}