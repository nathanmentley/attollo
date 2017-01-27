import googleCloudStorage from '@google-cloud/storage';

import Auid from '../DAL/Core/Auid';

import LogUtils from '../Utils/LogUtils';

var client = null;

export default class CloudStorage {
    Connect() {
        return new Promise((resolve, reject) => {
            client = googleCloudStorage({
                projectId: 'attollo-155905',
                keyFilename: '/home/web/keys/googlecloudkey.json'
            });

            resolve(client);
        });
    }

    Close() {

    }

    CreateBucket(clientId) {
        return new Promise((resolve, reject) => {
            client.createBucket('attollo-' + clientId)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    resolve(client.bucket('attollo-' + clientId));
                });
        });
    }

    Get(authContext, filename) {
        var bucket = client.bucket('attollo-' + Auid.Decode(authContext.ClientID));

        return bucket.file(filename).createReadStream();
    }

    Save(authContext, filename, content) {
        return new Promise((resolve, reject) => {
            try {
                var bucket = client.bucket('attollo-' + Auid.Decode(authContext.ClientID));

                var blobStream = bucket.file(filename).createWriteStream();
                blobStream.on('finish', () => {
                    resolve();
                });

                blobStream.on('error', (err) => {
                    reject(err);
                    return;
                });
                blobStream.end(content);
            } catch(err) {
                reject(err);
            }
        });
    }

    Dir(authContext) {
        return new Promise((resolve, reject) => {
            var bucket = client.bucket('attollo-' + Auid.Decode(authContext.ClientID));

            bucket.getFiles()
                .then((data) => {
                    var ret = [];

                    data[0].forEach((x) => {
                        ret.push(x.name);
                    });

                    resolve(ret);
                })
                .catch((err) => { reject(err); })

        });
    }

    Delete(authContext, filename) {
        var bucket = client.bucket('attollo-' + Auid.Decode(authContext.ClientID));

        return bucket.file(filename).delete();
    }
}