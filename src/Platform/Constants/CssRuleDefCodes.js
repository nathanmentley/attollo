(function () {
	var classDef = function () {};
    
	classDef.prototype.BackgroundColor = 'BackgroundColor';
	classDef.prototype.BackgroundImage = 'BackgroundImage';
	classDef.prototype.Color = 'Color';
	classDef.prototype.Height = 'Height';
	classDef.prototype.Width = 'Width';
	classDef.prototype.TextAlign = 'TextAlign';

	module.exports = new classDef();
})();