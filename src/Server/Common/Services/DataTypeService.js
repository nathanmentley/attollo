import { Dependencies } from 'constitute';

import BaseService from '../BaseService';

import ServiceContext from "../ServiceContext";

import PluginService from './PluginService';

@Dependencies(
    ServiceContext,
    PluginService
)
export default class DataTypeService extends BaseService {
    constructor(
        serviceContext,
        pluginService
    ) {
        super(serviceContext);

        this._PluginService = pluginService;
    }

    //DataType
	GetDataTypes(authContext, dataTypeDefId, filters){
		return this.Context.Handlers.DataType.GetDataTypes(authContext, dataTypeDefId, filters);
	};

	//DataTypeDef

	GetDataTypeDefs(authContext){
		return this.Context.Handlers.DataType.GetDataTypeDefs(authContext);
	};

	AddDataTypeDef(authContext, pluginDefCode, model){
		var self = this;

		return new Promise((resolve, reject) => {
			this._PluginService.GetPluginDef(authContext, pluginDefCode)
			.then((pluginDef) => {
				self.Context.DBTransaction((transaction) => {
					model.plugindefid = pluginDef.first().get('id');

					self.Context.Handlers.DataType.AddDataTypeDef(authContext, transaction, model)
					.then((result) => {
						transaction.commit(result);
					}).catch((err) => {
						transaction.rollback(err);
					});
				})
				.then((result) => {
					resolve(result);
				})
				.catch((err) => {
					reject(err);
				});
			})
			.catch((err) => { 
				reject(err);
			});
		});
	};

	UpdateDataTypeDef(authContext, model){
		var self = this;
		
		return this.Context.DBTransaction((transaction) => {
			self.Context.Handlers.DataType.UpdateDataTypeDef(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	DeleteDataTypeDef(authContext, model){
		var self = this;
		
		return this.Context.DBTransaction((transaction) => {
			self.Context.Handlers.DataType.DeleteDataTypeDef(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	//DataTypeFieldDef

	GetDataTypeFieldDefs(authContext, dataTypeDefId){
		return this.Context.Handlers.DataType.GetDataTypeFieldDefs(authContext, dataTypeDefId);
	};

	AddDataTypeFieldDef(authContext, dataTypeFieldTypeCodes, model){
		var self = this;

		return new Promise((resolve, reject) => {
            self.Context.Handlers.DataType.GetDataTypeFieldType(authContext, dataTypeFieldTypeCodes)
				.then((dataTypeFieldType) => {
            		model.datatypefieldtypeid = dataTypeFieldType.get('id');
                    self.Context.DBTransaction((transaction) => {
                        self.Context.Handlers.DataType.AddDataTypeFieldDef(authContext, transaction, model)
                            .then((result) => {
                                transaction.commit(result);
                            }).catch((err) => {
                            transaction.rollback(err);
                        });
                    })
                        .then((result) => {
                            resolve(result);
                        })
                        .catch((err) => {
                            reject(err);
                        });
				})
                .catch((err) => {
                    reject(err);
                });
		});
	};

	UpdateDataTypeFieldDef(authContext, model){
		var self = this;

		return this.Context.DBTransaction((transaction) => {
			self.Context.Handlers.DataType.UpdateDataTypeFieldDef(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	DeleteDataTypeFieldDef(authContext, model){
		var self = this;
		
		return this.Context.DBTransaction((transaction) => {
			self.Context.Handlers.DataType.DeleteDataTypeFieldDef(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	//DataTypeFieldTypes

	GetDataTypeFieldTypes(authContext){
		return this.Context.Handlers.DataType.GetDataTypeFieldTypes(authContext);
	};

	GetDataTypeFieldType(authContext, code){
		return this.Context.Handlers.DataType.GetDataTypeFieldType(authContext, code);
	};

	AddDataTypeFieldType(authContext, model){
		var self = this;
		
		return this.Context.DBTransaction((transaction) => {
			self.Context.Handlers.DataType.AddDataTypeFieldType(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	UpdateDataTypeFieldType(authContext, model){
		var self = this;
		
		return this.Context.DBTransaction((transaction) => {
			self.Context.Handlers.DataType.UpdateDataTypeFieldType(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	DeleteDataTypeFieldType(authContext, model){
		var self = this;
		
		return this.Context.DBTransaction((transaction) => {
			self.Context.Handlers.DataType.DeleteDataTypeFieldType(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};
}