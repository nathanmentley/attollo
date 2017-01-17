import googleCloudStorage from '@google-cloud/storage';

import ConfigUtils from '../Utils/ConfigUtils';

var client = null;
var bucket = null;

export default class CloudStorage {
    Connect() {
        return new Promise((resolve, reject) => {
            client = googleCloudStorage({
                projectId: 'attollo-155905',
                keyFilename: '/home/web/keys/googlecloudkey.json'
            });

            bucket = client.bucket('attollo-local');

            resolve(bucket);
        });
    }

    Close() {

    }

    Get(filename) {
        return bucket.file(filename).createReadStream();
    }
}