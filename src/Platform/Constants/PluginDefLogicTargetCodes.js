(function () {
	var classDef = function () {};
    
	classDef.prototype.Pre = 'Pre';
	classDef.prototype.Post = 'Post';
	classDef.prototype.Override = 'Override';

	module.exports = new classDef();
})();