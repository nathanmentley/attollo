(function () {
	var classDef = function () {};

	var urlendpoint = '/SiteVersionStatuses';

	classDef.prototype.Setup = (controllerContext) => {
		controllerContext.App.get(
			urlendpoint,
			controllerContext.Auth(null),
			(request, response) => {
				controllerContext.ResponseProcessor(
					request,
					response,
					Attollo.Services.Site.GetSiteVersionStatuses(request.AuthContext)
				)
			}
		);
	};
	
	module.exports = new classDef();
})();