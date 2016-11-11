(function () {
	var baseHandler = require('../../BaseHandler')
	var util = require('util');

	var classDef = function (context) {
		baseHandler.apply(this);
		this.Context = context;
	};
	util.inherits(classDef, baseHandler);
	
	classDef.prototype.GetThemes = function (authContext){
		return this.Context.DatabaseContext.Themes(authContext).fetch();
	};
	
	classDef.prototype.GetTheme = function (authContext, code){
		return this.Context.DatabaseContext.Themes(authContext)
				.query({
					code: code
				})
				.fetch();
	};
	
	classDef.prototype.AddTheme = function (authContext, code, name){
		var Theme = this.Context.DatabaseContext.Theme(authContext);
		var theme = new Theme({
			code: code,
			name: name
		});

		return theme.save();
	};

	module.exports = classDef;
})();