(function () {
	var classDef = function () {};

	var urlendpoint = '/DataTypeFieldDefs';

	classDef.prototype.Setup = (controllerContext) => {
		controllerContext.App.get(
			urlendpoint,
			controllerContext.Auth(null),
			(request, response) => {
				controllerContext.ResponseProcessor(
					request,
					response,
					Attollo.Services.DataType.GetDataTypeFieldDefs(request.AuthContext, request.query.dataTypeDefId)
				)
			}
		);
		controllerContext.App.post(
			urlendpoint,
			controllerContext.Auth(null),
			(request, response) => {
				controllerContext.ResponseProcessor(
					request,
					response,
					Attollo.Services.DataType.AddDataTypeFieldDef(request.AuthContext, request.body.dataTypeFieldDef)
				)
			}
		);
		controllerContext.App.put(
			urlendpoint,
			controllerContext.Auth(null),
			(request, response) => {
				controllerContext.ResponseProcessor(
					request,
					response,
					Attollo.Services.DataType.UpdateDataTypeFieldDef(request.AuthContext, request.body.dataTypeFieldDef)
				)
			}
		);
		controllerContext.App.delete(
			urlendpoint,
			controllerContext.Auth(null),
			(request, response) => {
				controllerContext.ResponseProcessor(
					request,
					response,
					Attollo.Services.DataType.DeleteDataTypeFieldDef(request.AuthContext, { id: request.query.dataTypeFieldDefId })
				)
			}
		);
	};
	
	module.exports = new classDef();
})();