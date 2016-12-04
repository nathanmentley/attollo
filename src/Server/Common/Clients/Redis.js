import redis from 'redis';

import ConfigUtils from '../Utils/ConfigUtils';
import LogUtils from '../Utils/LogUtils';

var client = null;

export default class Redis {
    static Connect() {
        return new Promise((resolve, reject) => {
            client = redis.createClient({
                host: ConfigUtils.Config.RedisHost,
                port: ConfigUtils.Config.RedisPort
            });

            resolve(client);
        });
    }

    static Close() {
        client.quit();
    }

    static Set(key, value){
        return client.set(key, value);
    }
        
    static Get(key) {
        return new Promise((resolve, reject) => {
            client.get(key, (err, reply) => {
                resolve(reply);
            });
        });
    }
}