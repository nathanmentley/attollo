import { Dependencies } from 'constitute';

import BaseHandler from '../Core/BaseHandler';
import HandlerContext from "../../HandlerContext";

@Dependencies(
    HandlerContext
)
export default class BlockHandler extends BaseHandler {
    constructor(handlerContext) {
        super(handlerContext);
    }

    GetPageDefs(authContext){
		return this.Context.DatabaseContext.PageDefs(authContext).fetch();
	};

	GetPageDef(authContext, code){
		return this.Context.DatabaseContext.PageDefs(authContext)
			.query({
				where: {
					code: code
				}
			}).fetch();
	};
	
	AddPageDef(authContext, transaction, model){
		var PageDef = this.Context.DatabaseContext.PageDef(authContext);
		var pageDef = new PageDef(model);

		return pageDef.save(null, { transacting: transaction });
	};
	
	GetPages(authContext, siteVersionId){
		return this.Context.DatabaseContext.Pages(authContext)
			.query({
				where: {
					siteversionid: siteVersionId
				}
			}).fetch();
	};
	
	AddPage(authContext, transaction, model){
		var Page = this.Context.DatabaseContext.Page(authContext);
		var page = new Page(model);

		return page.save(null, { transacting: transaction });
	};
	
	UpdatePage(authContext, transaction, model){
		var Page = this.Context.DatabaseContext.Page(authContext);
		var page = new Page(model);

		return page.save(null, { transacting: transaction });
	};
	
	DeletePage(authContext, transaction, model){
		var Page = this.Context.DatabaseContext.Page(authContext);
		var page = new Page(model);

		return page.destroy({ transacting: transaction });
	};
}