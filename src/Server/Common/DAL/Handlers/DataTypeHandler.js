import BaseHandler from '../BaseHandler';
export default class BlockHandler extends BaseHandler {
	//DataTypes

	static GetDataTypes(authContext, dataTypeDefId, filters){
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

	static GetDataTypeDefs(authContext){
		return this.Context.DatabaseContext.DataTypeDefs(authContext)
		.fetch({
			withRelated: ['PluginDef']
		});
	};

	static AddDataTypeDef(authContext, transaction, model){
		var DataTypeDef = this.Context.DatabaseContext.DataTypeDef(authContext);
		var dataTypeDef = new DataTypeDef(model);

		return dataTypeDef.save(null, { transacting: transaction });
	};

	static UpdateDataTypeDef(authContext, transaction, model){
		var DataTypeDef = this.Context.DatabaseContext.DataTypeDef(authContext);
		var dataTypeDef = new DataTypeDef(model);

		return dataTypeDef.save(null, { transacting: transaction });
	};

	static DeleteDataTypeDef(authContext, transaction, model){
		var DataTypeDef = this.Context.DatabaseContext.DataTypeDef(authContext);
		var dataTypeDef = new DataTypeDef(model);

		return dataTypeDef.destroy({ transacting: transaction });
	};

	//DataTypeFieldDefs

	static GetDataTypeFieldDefs(authContext, dataTypeDefId){
		return this.Context.DatabaseContext.DataTypeFieldDefs(authContext)
				.query({
					where: {
						datatypedefid: dataTypeDefId
					}
				})
				.fetch();
	};

	static AddDataTypeFieldDef(authContext, transaction, model){
		var DataTypeFieldDef = this.Context.DatabaseContext.DataTypeFieldDef(authContext);
		var dataTypeFieldDef = new DataTypeFieldDef(model);

		return dataTypeFieldDef.save(null, { transacting: transaction });
	};

	static UpdateDataTypeFieldDef(authContext, transaction, model){
		var DataTypeFieldDef = this.Context.DatabaseContext.DataTypeFieldDef(authContext);
		var dataTypeFieldDef = new DataTypeFieldDef(model);

		return dataTypeFieldDef.save(null, { transacting: transaction });
	};

	static DeleteDataTypeFieldDef(authContext, transaction, model){
		var DataTypeFieldDef = this.Context.DatabaseContext.DataTypeFieldDef(authContext);
		var dataTypeFieldDef = new DataTypeFieldDef(model);

		return dataTypeFieldDef.destroy({ transacting: transaction });
	};

	//DataTypeFieldTypes

	static GetDataTypeFieldTypes(authContext){
		return this.Context.DatabaseContext.DataTypeFieldTypes(authContext).fetch();
	};

	static GetDataTypeFieldType(authContext, code){
		return this.Context.DatabaseContext.DataTypeFieldType(authContext)
				.query({
					where: {
						code: code
					}
				})
				.fetch();
	};

	static AddDataTypeFieldType(authContext, transaction, model){
		var DataTypeFieldType = this.Context.DatabaseContext.DataTypeFieldType(authContext);
		var dataTypeFieldType = new DataTypeFieldType(model);

		return dataTypeFieldType.save(null, { transacting: transaction });
	};

	static UpdateDataTypeFieldType(authContext, transaction, model){
		var DataTypeFieldType = this.Context.DatabaseContext.DataTypeFieldType(authContext);
		var dataTypeFieldType = new DataTypeFieldType(model);

		return dataTypeFieldType.save(null, { transacting: transaction });
	};

	static DeleteDataTypeFieldType(authContext, transaction, model){
		var DataTypeFieldType = this.Context.DatabaseContext.DataTypeFieldType(authContext);
		var dataTypeFieldType = new DataTypeFieldType(model);

		return dataTypeFieldType.destroy({ transacting: transaction });
	};
}