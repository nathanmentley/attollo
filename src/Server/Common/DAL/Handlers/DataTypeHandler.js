import BaseHandler from '../BaseHandler';
export default class BlockHandler extends BaseHandler {
	//DataTypes

	GetDataTypes(authContext, dataTypeDefId, filters){
		return this.Context.DatabaseContext.DataTypes(authContext)
				.query({
					where: {
						datatypedefid: dataTypeDefId
					}
				})
				.fetch(
					{
						withRelated: [
							'DataTypeDef',
							'DataTypeFields',
							'DataTypeFields.DataTypeFieldDef'
						] 
					}
				);
	};

	//DataTypeDefs

	GetDataTypeDefs(authContext){
		return this.Context.DatabaseContext.DataTypeDefs(authContext)
		.fetch({
			withRelated: ['PluginDef']
		});
	};

	AddDataTypeDef(authContext, transaction, model){
		var DataTypeDef = this.Context.DatabaseContext.DataTypeDef(authContext);
		var dataTypeDef = new DataTypeDef(model);

		return dataTypeDef.save(null, { transacting: transaction });
	};

	UpdateDataTypeDef(authContext, transaction, model){
		var DataTypeDef = this.Context.DatabaseContext.DataTypeDef(authContext);
		var dataTypeDef = new DataTypeDef(model);

		return dataTypeDef.save(null, { transacting: transaction });
	};

	DeleteDataTypeDef(authContext, transaction, model){
		var DataTypeDef = this.Context.DatabaseContext.DataTypeDef(authContext);
		var dataTypeDef = new DataTypeDef(model);

		return dataTypeDef.destroy({ transacting: transaction });
	};

	//DataTypeFieldDefs

	GetDataTypeFieldDefs(authContext, dataTypeDefId){
		return this.Context.DatabaseContext.DataTypeFieldDefs(authContext)
				.query({
					where: {
						datatypedefid: dataTypeDefId
					}
				})
				.fetch();
	};

	AddDataTypeFieldDef(authContext, transaction, model){
		var DataTypeFieldDef = this.Context.DatabaseContext.DataTypeFieldDef(authContext);
		var dataTypeFieldDef = new DataTypeFieldDef(model);

		return dataTypeFieldDef.save(null, { transacting: transaction });
	};

	UpdateDataTypeFieldDef(authContext, transaction, model){
		var DataTypeFieldDef = this.Context.DatabaseContext.DataTypeFieldDef(authContext);
		var dataTypeFieldDef = new DataTypeFieldDef(model);

		return dataTypeFieldDef.save(null, { transacting: transaction });
	};

	DeleteDataTypeFieldDef(authContext, transaction, model){
		var DataTypeFieldDef = this.Context.DatabaseContext.DataTypeFieldDef(authContext);
		var dataTypeFieldDef = new DataTypeFieldDef(model);

		return dataTypeFieldDef.destroy({ transacting: transaction });
	};

	//DataTypeFieldTypes

	GetDataTypeFieldTypes(authContext){
		return this.Context.DatabaseContext.DataTypeFieldTypes(authContext).fetch();
	};

	GetDataTypeFieldType(authContext, code){
		return this.Context.DatabaseContext.DataTypeFieldType(authContext)
				.query({
					where: {
						code: code
					}
				})
				.fetch();
	};

	AddDataTypeFieldType(authContext, transaction, model){
		var DataTypeFieldType = this.Context.DatabaseContext.DataTypeFieldType(authContext);
		var dataTypeFieldType = new DataTypeFieldType(model);

		return dataTypeFieldType.save(null, { transacting: transaction });
	};

	UpdateDataTypeFieldType(authContext, transaction, model){
		var DataTypeFieldType = this.Context.DatabaseContext.DataTypeFieldType(authContext);
		var dataTypeFieldType = new DataTypeFieldType(model);

		return dataTypeFieldType.save(null, { transacting: transaction });
	};

	DeleteDataTypeFieldType(authContext, transaction, model){
		var DataTypeFieldType = this.Context.DatabaseContext.DataTypeFieldType(authContext);
		var dataTypeFieldType = new DataTypeFieldType(model);

		return dataTypeFieldType.destroy({ transacting: transaction });
	};
}