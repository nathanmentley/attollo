import redis from 'redis';

import ConfigUtils from '../Utils/ConfigUtils';

var client = null;

export default class Redis {
    Connect() {
        return new Promise((resolve, reject) => {
            client = redis.createClient({
                host: ConfigUtils.Config.RedisHost,
                port: ConfigUtils.Config.RedisPort
            });

            resolve(client);
        });
    }

    Close() {
        client.quit();
    }

    Set(key, value){
        return client.set(key, value);
    }
        
    Get(key) {
        return new Promise((resolve, reject) => {
            client.get(key, (err, reply) => {
                resolve(reply);
            });
        });
    }
}