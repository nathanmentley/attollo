(function () {
	var Context;
	var classDef = function (serviceContext) {
		Context = serviceContext;
	};

	//DataType

	classDef.prototype.GetDataTypes = function (authContext){
		return Context.Handlers.DataType.GetDataTypes(authContext);
	};

	//DataTypeDef

	classDef.prototype.GetDataTypeDefs = function (authContext){
		return Context.Handlers.DataType.GetDataTypeDefs(authContext);
	};

	classDef.prototype.AddDataTypeDef = function (authContext, model){
		return Context.DBTransaction((transaction) => {
			Context.Handlers.DataType.AddDataTypeDef(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
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

	classDef.prototype.AddDataTypeFieldDef = function (authContext, model){
		return Context.DBTransaction((transaction) => {
			Context.Handlers.DataType.AddDataTypeFieldDef(authContext, transaction, model)
			.then((result) => {
				transaction.commit(result);
			}).catch((err) => {
				transaction.rollback(err);
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
	
	module.exports = classDef;
})();
