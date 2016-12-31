//Seed BlockTemplateDefs
import constitute from 'constitute';

import Attollo from '../../../Common/Attollo';

import BlockDefCodes from '../../../../Platform/Constants/BlockDefCodes';

var attollo = constitute(Attollo);

(function () {
    var classDef = function () {};

	classDef.prototype.Logic = function(dbContext, callback, errorCallback) {
        Promise.all([
            attollo.Services.Block.AddBlockTemplateDef(dbContext, BlockDefCodes.Html, 'HtmlHtml1', 'Html 1', '<div dangerouslySetInnerHTML={{ __html: this.state.Settings["htmlContent"] }} />'),
            attollo.Services.Block.AddBlockTemplateDef(dbContext, BlockDefCodes.Image, 'ImageHtml1', 'Html 2', '<p><img src={this.state.Settings["imageUrl"]} alt={this.state.Settings["imageCaption"]} /></p>'),

            attollo.Services.Block.AddBlockTemplateDef(dbContext, BlockDefCodes.BlogWall, 'BlogWall', 'Standard Wall', '<p>{this.state.BlogPosts != null ? this.state.BlogPosts.length : "unloaded"}</p>'),
            attollo.Services.Block.AddBlockTemplateDef(dbContext, BlockDefCodes.BlogPost, 'BlogPost', 'Full Post', '<p>{this.state.BlogPosts != null ? this.state.BlogPosts.length : "unloaded"}</p>'),

            attollo.Services.Block.AddBlockDefDataRequest(dbContext, BlockDefCodes.BlogWall, { resultname: 'BlogPosts', filtername: 'blogFilter', datatypedefid: '2IG3GG-6446' }),
            attollo.Services.Block.AddBlockDefDataRequest(dbContext, BlockDefCodes.BlogPost, { resultname: 'BlogPosts', filtername: 'blogFilter', datatypedefid: '2IG3GG-6446' })
        ])
        .then(() => {
            callback();
        })
        .catch((err) => { errorCallback(err); });
    };

    module.exports = new classDef();
})();