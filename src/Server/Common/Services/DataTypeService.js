import Attollo from "../Attollo";
import BaseService from '../BaseService';

export default class BlockService extends BaseService {
	//DataType
	static GetDataTypes(authContext, dataTypeDefId, filters){
		return Context.Handlers.DataType.GetDataTypes(authContext, dataTypeDefId, filters);
	};

	//DataTypeDef

	static GetDataTypeDefs(authContext){
		return Context.Handlers.DataType.GetDataTypeDefs(authContext);
	};

	static AddDataTypeDef(authContext, pluginDefCode, model){
		var self = this;

		return new Promise((resolve, reject) => {
			Attollo.Services.Plugin.GetPluginDef(authContext, pluginDefCode)
			.then((pluginDef) => {
				Context.DBTransaction((transaction) => {
					model.plugindefid = pluginDef.first().get('id');

					Context.Handlers.DataType.AddDataTypeDef(authContext, transaction, model)
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

	static UpdateDataTypeDef(authContext, model){
		return Context.DBTransaction((transaction) => {
			Context.Handlers.DataType.UpdateDataTypeDef(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	static DeleteDataTypeDef(authContext, model){
		return Context.DBTransaction((transaction) => {
			Context.Handlers.DataType.DeleteDataTypeDef(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	//DataTypeFieldDef

	static GetDataTypeFieldDefs(authContext, dataTypeDefId){
		return Context.Handlers.DataType.GetDataTypeFieldDefs(authContext, dataTypeDefId);
	};

	static AddDataTypeFieldDef(authContext, dataTypeFieldTypeCode, model){
		var self = this;

		return new Promise((resolve, reject) => {
			self.GetDataTypeFieldType(authContext, dataTypeFieldTypeCode)
			.then((fieldType) => {
				Context.DBTransaction((transaction) => {
					model.datatypefieldtypeid = fieldType.get('id');

					Context.Handlers.DataType.AddDataTypeFieldDef(authContext, transaction, model)
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

	static UpdateDataTypeFieldDef(authContext, model){
		return Context.DBTransaction((transaction) => {
			Context.Handlers.DataType.UpdateDataTypeFieldDef(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	static DeleteDataTypeFieldDef(authContext, model){
		return Context.DBTransaction((transaction) => {
			Context.Handlers.DataType.DeleteDataTypeFieldDef(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	//DataTypeFieldTypes

	static GetDataTypeFieldTypes(authContext){
		return Context.Handlers.DataType.GetDataTypeFieldTypes(authContext);
	};

	static GetDataTypeFieldType(authContext, code){
		return Context.Handlers.DataType.GetDataTypeFieldType(authContext, code);
	};

	static AddDataTypeFieldType(authContext, model){
		return Context.DBTransaction((transaction) => {
			Context.Handlers.DataType.AddDataTypeFieldType(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	static UpdateDataTypeFieldType(authContext, model){
		return Context.DBTransaction((transaction) => {
			Context.Handlers.DataType.UpdateDataTypeFieldType(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	static DeleteDataTypeFieldType(authContext, model){
		return Context.DBTransaction((transaction) => {
			Context.Handlers.DataType.DeleteDataTypeFieldType(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};
}