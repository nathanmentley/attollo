import { Dependencies } from 'constitute';
import mime from 'mime-types';

import Attollo from '../../../Common/Attollo';
import BaseController from '../BaseController';

@Dependencies(
    Attollo
)
export default class AssetController extends BaseController {
    constructor(attollo) {
        super(attollo);
    }

    get UrlEndpoint() { return '/Assets'; }

    GetLogic(request, response) {
        if(request.query.filename) {
            var filestream = this._attollo.Services.CloudStorage.Get(request.AuthContext, request.query.filename);

            return new Promise((resolve, reject) => {
                var content = ''
                filestream.on('readable',function(buffer){
                    var part = buffer.read().toString();
                    content += part;
                });

                filestream.on('end',function(){
                    resolve({
                        data: content,
                        datatype: mime.lookup(request.query.filename)
                    });
                });
            });
        } else {
            return this._attollo.Services.CloudStorage.Dir(request.AuthContext);
        }
    }
    PostLogic(request, response) {
        var content = new Buffer(request.body.content, 'base64');
        return this._attollo.Services.CloudStorage.Save(request.AuthContext, request.body.filename, content);
    }
    DeleteLogic(request, response) {
        return this._attollo.Services.CloudStorage.Delete(request.AuthContext, request.query.filename);
    }
};