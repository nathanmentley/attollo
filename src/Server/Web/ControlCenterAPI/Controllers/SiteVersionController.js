(function () {
	var classDef = function () {};

	var urlendpoint = '/SiteVersions';

	classDef.prototype.Setup = (controllerContext) => {
		controllerContext.App.get(
			urlendpoint,
			controllerContext.Auth(null),
			(request, response) => {
				controllerContext.ResponseProcessor(
					request,
					response,
					Attollo.Services.Site.GetSiteVersions(request.AuthContext, request.query.siteId)
				)
			}
		);
	};
	
	module.exports = new classDef();
})();