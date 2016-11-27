(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	//DataTypes

	classDef.prototype.GetDataTypes = function (authContext, dataTypeDefId, filters){
		return this.Context.DatabaseContext.DataTypes(authContext)
				.query({
					where: {
						datatypedefid: dataTypeDefId
					}
				})
				.fetch(
					{
						withRelated: [
							'DataTypeFields'
						] 
					}
				);
	};

	//DataTypeDefs

	classDef.prototype.GetDataTypeDefs = function (authContext){
		return this.Context.DatabaseContext.DataTypeDefs(authContext).fetch();
	};

	classDef.prototype.AddDataTypeDef = function (authContext, transaction, model){
		model.clientid = authContext.ClientID;
		
		var DataTypeDef = this.Context.DatabaseContext.DataTypeDef(authContext);
		var dataTypeDef = new DataTypeDef(model);

		return dataTypeDef.save(null, { transacting: transaction });
	};

	classDef.prototype.UpdateDataTypeDef = function (authContext, transaction, model){
		var DataTypeDef = this.Context.DatabaseContext.DataTypeDef(authContext);
		var dataTypeDef = new DataTypeDef(model);

		return dataTypeDef.save(null, { transacting: transaction });
	};

	classDef.prototype.DeleteDataTypeDef = function (authContext, transaction, model){
		var DataTypeDef = this.Context.DatabaseContext.DataTypeDef(authContext);
		var dataTypeDef = new DataTypeDef(model);

		return dataTypeDef.destroy({ transacting: transaction });
	};

	//DataTypeFieldDefs

	classDef.prototype.GetDataTypeFieldDefs = function (authContext, dataTypeDefId){
		return this.Context.DatabaseContext.DataTypeFieldDefs(authContext)
				.query({
					where: {
						datatypedefid: dataTypeDefId
					}
				})
				.fetch();
	};

	classDef.prototype.AddDataTypeFieldDef = function (authContext, transaction, model){
		var DataTypeFieldDef = this.Context.DatabaseContext.DataTypeFieldDef(authContext);
		var dataTypeFieldDef = new DataTypeFieldDef(model);

		return dataTypeFieldDef.save(null, { transacting: transaction });
	};

	classDef.prototype.UpdateDataTypeFieldDef = function (authContext, transaction, model){
		var DataTypeFieldDef = this.Context.DatabaseContext.DataTypeFieldDef(authContext);
		var dataTypeFieldDef = new DataTypeFieldDef(model);

		return dataTypeFieldDef.save(null, { transacting: transaction });
	};

	classDef.prototype.DeleteDataTypeFieldDef = function (authContext, transaction, model){
		var DataTypeFieldDef = this.Context.DatabaseContext.DataTypeFieldDef(authContext);
		var dataTypeFieldDef = new DataTypeFieldDef(model);

		return dataTypeFieldDef.destroy({ transacting: transaction });
	};

	//DataTypeFieldTypes

	classDef.prototype.GetDataTypeFieldTypes = function (authContext){
		return this.Context.DatabaseContext.DataTypeFieldTypes(authContext).fetch();
	};

	classDef.prototype.GetDataTypeFieldType = function (authContext, code){
		return this.Context.DatabaseContext.DataTypeFieldType(authContext)
				.query({
					where: {
						code: code
					}
				})
				.fetch();
	};

	classDef.prototype.AddDataTypeFieldType = function (authContext, transaction, model){
		var DataTypeFieldType = this.Context.DatabaseContext.DataTypeFieldType(authContext);
		var dataTypeFieldType = new DataTypeFieldType(model);

		return dataTypeFieldType.save(null, { transacting: transaction });
	};

	classDef.prototype.UpdateDataTypeFieldType = function (authContext, transaction, model){
		var DataTypeFieldType = this.Context.DatabaseContext.DataTypeFieldType(authContext);
		var dataTypeFieldType = new DataTypeFieldType(model);

		return dataTypeFieldType.save(null, { transacting: transaction });
	};

	classDef.prototype.DeleteDataTypeFieldType = function (authContext, transaction, model){
		var DataTypeFieldType = this.Context.DatabaseContext.DataTypeFieldType(authContext);
		var dataTypeFieldType = new DataTypeFieldType(model);

		return dataTypeFieldType.destroy({ transacting: transaction });
	};
	
	module.exports = classDef;
})();