(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};

	//DataType

	classDef.prototype.GetDataTypes = function (authContext, dataTypeDefId, filters){
		return Context.Handlers.DataType.GetDataTypes(authContext, dataTypeDefId, filters);
	};

	//DataTypeDef

	classDef.prototype.GetDataTypeDefs = function (authContext){
		return Context.Handlers.DataType.GetDataTypeDefs(authContext);
	};

	classDef.prototype.AddDataTypeDef = function (authContext, pluginDefCode, model){
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

	classDef.prototype.UpdateDataTypeDef = function (authContext, model){
		return Context.DBTransaction((transaction) => {
			Context.Handlers.DataType.UpdateDataTypeDef(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	classDef.prototype.DeleteDataTypeDef = function (authContext, model){
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

	classDef.prototype.GetDataTypeFieldDefs = function (authContext, dataTypeDefId){
		return Context.Handlers.DataType.GetDataTypeFieldDefs(authContext, dataTypeDefId);
	};

	classDef.prototype.AddDataTypeFieldDef = function (authContext, dataTypeFieldTypeCode, model){
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

	classDef.prototype.UpdateDataTypeFieldDef = function (authContext, model){
		return Context.DBTransaction((transaction) => {
			Context.Handlers.DataType.UpdateDataTypeFieldDef(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	classDef.prototype.DeleteDataTypeFieldDef = function (authContext, model){
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

	classDef.prototype.GetDataTypeFieldTypes = function (authContext){
		return Context.Handlers.DataType.GetDataTypeFieldTypes(authContext);
	};

	classDef.prototype.GetDataTypeFieldType = function (authContext, code){
		return Context.Handlers.DataType.GetDataTypeFieldType(authContext, code);
	};

	classDef.prototype.AddDataTypeFieldType = function (authContext, model){
		return Context.DBTransaction((transaction) => {
			Context.Handlers.DataType.AddDataTypeFieldType(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	classDef.prototype.UpdateDataTypeFieldType = function (authContext, model){
		return Context.DBTransaction((transaction) => {
			Context.Handlers.DataType.UpdateDataTypeFieldType(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};

	classDef.prototype.DeleteDataTypeFieldType = function (authContext, model){
		return Context.DBTransaction((transaction) => {
			Context.Handlers.DataType.DeleteDataTypeFieldType(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
			});
		});
	};
	
	module.exports = classDef;
})();
