import { Dependencies } from 'constitute';

import DBContext from "./DAL/Core/DBContext";

@Dependencies(DBContext)
export default class HandlerContext {
    constructor (dbContext) {
        this._dbContext = dbContext;
    }

    get DatabaseContext() {
        return this._dbContext;
    }
}