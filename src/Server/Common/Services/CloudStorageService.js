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

    Get(filename) {
        return this.Context.Clients.CloudStorage.Get(filename);
    }
}
