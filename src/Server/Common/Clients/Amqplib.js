import amqplib from 'amqplib';

import ConfigUtils from '../Utils/ConfigUtils';
import LogUtils from '../Utils/LogUtils';

var amqpConn = null;

export default class Amqplib {
    Connect() {
        return new Promise((resolve, reject) => {
            if(amqpConn == null && ConfigUtils.Config.RabbitMQUrl != null) {
                amqplib.connect(ConfigUtils.Config.RabbitMQUrl + "?heartbeat=60")
                .then((conn) => {
                    conn.on("error", (err) => {
                        if (err.message !== "Connection closing") {
                            LogUtils.Error("[AMQP] conn error - " + err.message);
                        }
                    });
                    LogUtils.Info("[AMQP] connected");
                    amqpConn = conn;
                    
                    resolve(conn);
                })
                .catch((err) => {
                    LogUtils.Error("[AMQP] " + err.message);
                        
                    reject(err);
                });
            } else {
                LogUtils.Error("[AMQP] already connected.");
            }
        });
    }

    Close() {
        if(amqpConn != null) {
            amqpConn.close();
            amqpConn = null;
        } else {
            LogUtils.Error("[AMQP] not connected.");
        }
    }
}