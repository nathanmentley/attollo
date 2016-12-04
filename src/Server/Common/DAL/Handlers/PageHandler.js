import BaseHandler from '../BaseHandler';
export default class BlockHandler extends BaseHandler {
	static GetPageDefs(authContext){
		return this.Context.DatabaseContext.PageDefs(authContext).fetch();
	};

	static GetPageDef(authContext, code){
		return this.Context.DatabaseContext.PageDefs(authContext)
			.query({
				where: {
					code: code
				}
			}).fetch();
	};
	
	static AddPageDef(authContext, transaction, model){
		var PageDef = this.Context.DatabaseContext.PageDef(authContext);
		var pageDef = new PageDef(model);

		return pageDef.save(null, { transacting: transaction });
	};
	
	static GetPages(authContext, siteVersionId){
		return this.Context.DatabaseContext.Pages(authContext)
			.query({
				where: {
					siteversionid: siteVersionId
				}
			}).fetch();
	};
	
	static AddPage(authContext, transaction, model){
		var Page = this.Context.DatabaseContext.Page(authContext);
		var page = new Page(model);

		return page.save(null, { transacting: transaction });
	};
	
	static UpdatePage(authContext, transaction, model){
		var Page = this.Context.DatabaseContext.Page(authContext);
		var page = new Page(model);

		return page.save(null, { transacting: transaction });
	};
	
	static DeletePage(authContext, transaction, model){
		var Page = this.Context.DatabaseContext.Page(authContext);
		var page = new Page(model);

		return page.destroy({ transacting: transaction });
	};
}