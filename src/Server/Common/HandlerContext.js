import DBContext from "./DAL/Core/DBContext";

export default class HandlerContext {
    static get DatabaseContext() {
        return DBContext;
    }
}