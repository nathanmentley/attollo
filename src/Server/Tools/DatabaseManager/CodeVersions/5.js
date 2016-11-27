//Seed BlockTemplateDefs

(function () {
    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            Attollo.Services.Block.AddBlockTemplateDef(dbContext, 'Html', 'HtmlHtml1', 'Html 1', '<div dangerouslySetInnerHTML={{ __html: this.state.Settings["htmlContent"] }} />'),
            
            Attollo.Services.Block.AddBlockTemplateDef(dbContext, 'Image', 'ImageHtml1', 'Html 2', '<p><img src={this.state.Settings["imageUrl"]} alt={this.state.Settings["imageCaption"]} /></p>'),
            
            Attollo.Services.Block.AddBlockDefDataRequest(dbContext, 'Html', { resultname: 'BlogPosts', filtername: 'blogFilter', datatypedefid: '2IG3GG-6446' })
        ])
        .then(() => {
            callback();
        })
        .catch((err) => { errorCallback(err); });
    };

    module.exports = new classDef();
})();