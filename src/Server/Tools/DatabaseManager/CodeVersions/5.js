//Seed BlockTemplateDefs
import Attollo from '../../../Common/Attollo';

import BlockDefCodes from '../../../../Platform/Constants/BlockDefCodes';

(function () {
    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            Attollo.Services.Block.AddBlockTemplateDef(dbContext, BlockDefCodes.Html, 'HtmlHtml1', 'Html 1', '<div dangerouslySetInnerHTML={{ __html: this.state.Settings["htmlContent"] }} />'),
            Attollo.Services.Block.AddBlockTemplateDef(dbContext, BlockDefCodes.Image, 'ImageHtml1', 'Html 2', '<p><img src={this.state.Settings["imageUrl"]} alt={this.state.Settings["imageCaption"]} /></p>'),

            Attollo.Services.Block.AddBlockTemplateDef(dbContext, BlockDefCodes.BlogWall, 'BlogWall', 'Standard Wall', '<p>{this.state.BlogPosts != null ? this.state.BlogPosts.length : "unloaded"}</p>'),
            Attollo.Services.Block.AddBlockTemplateDef(dbContext, BlockDefCodes.BlogPost, 'BlogPost', 'Full Post', '<p>{this.state.BlogPosts != null ? this.state.BlogPosts.length : "unloaded"}</p>'),

            Attollo.Services.Block.AddBlockDefDataRequest(dbContext, BlockDefCodes.BlogWall, { resultname: 'BlogPosts', filtername: 'blogFilter', datatypedefid: '2IG3GG-6446' }),
            Attollo.Services.Block.AddBlockDefDataRequest(dbContext, BlockDefCodes.BlogPost, { resultname: 'BlogPosts', filtername: 'blogFilter', datatypedefid: '2IG3GG-6446' })
        ])
        .then(() => {
            callback();
        })
        .catch((err) => { errorCallback(err); });
    };

    module.exports = new classDef();
})();