import { Dependencies } from 'constitute';

import BaseService from '../BaseService';

import ServiceContext from "../ServiceContext";

@Dependencies(
    ServiceContext
)
export default class CloudStorageService extends BaseService {
    constructor(
        serviceContext
    ) {
        super(serviceContext);
    }

    CreateBucket(clientId) {
        return this.Context.Clients.CloudStorage.CreateBucket(clientId);
    }

    Get(authContext, filename) {
        return this.Context.Clients.CloudStorage.Get(authContext, filename);
    }

    Save(authContext, filename, content) {
        return this.Context.Clients.CloudStorage.Save(authContext, filename, content);
    }

    Dir(authContext) {
        return this.Context.Clients.CloudStorage.Dir(authContext);
    }

    Delete(authContext, filename) {
        return this.Context.Clients.CloudStorage.Delete(authContext, filename);
    }
}
