Ext.ns("Ext.HY.CrmaccView");
var crmaccView = Ext.HY.CrmaccView;

Ext.apply(crmaccView, {
	ctx: ctx + '/crmsvc/access', pkName: 'pkid', codeName: 'clientid', title: '客户拜访'
});

Ext.onReady(function() {
	Ext.QuickTips.init();
	
	var viewport = new Ext.Viewport({
		layout: 'border',
		items: [
			crmaccView.queryPanel,
			crmaccView.mainPanel,
		]
	});
	viewport.doLayout();
	crmaccView.doRefresh();
	
});

crmaccView.mainStore = HY.Cmp.createJsonStore({
	fields: ['pkid','clientid','cliname','clientcode','clientabbr', 'clientshort', 'clicont','clitelno','cliemail','imno','wechat','accno','estdate','accdate','acctype','accstate','attendee','outline','requests','trkstate','checked','checkstatus','checkby','checkdate','checkcode','checkdesc','remarks','txtval01','txtval02','txtval03','txtval04','txtval05','txtval06','txtval07','txtval08','txtval09','txtval10','rowacttype','colchanged','orgid','createuser','createusername','createtime','lastupduser','lastupdusername','lastupdtime','trkstatedesc','acctypedesc','statusdesc','salesname'],
	url: crmaccView.ctx + '/acclist.do',
	sortInfo: {field: 'pkid', direction: 'DESC'},
	pageSize:30
});

crmaccView.mainCols = [
	  new Ext.grid.RowNumberer({width:36}),
	    {header: '客户代码', dataIndex:'clientcode', width:80, align:'center',sortable: true},
		{header: '客户名称', dataIndex:'cliname', width:160, align:'center',sortable: true},
		{header: '联系人', dataIndex:'clicont', width:120, align:'center',sortable: true},
		{header: '电话', dataIndex:'clitelno', width:140, align:'center',sortable: true},
		{header: '拜访号', dataIndex:'accno', width:120, align:'center',sortable: true},
		{header: '拜访方式', dataIndex:'acctypedesc', width:100, align:'center',sortable: true},
		{header: '跟进状态', dataIndex:'trkstatedesc', width:100, align:'center',sortable: true},
		{header: '预计拜访时间', dataIndex:'estdate', width:140, align:'center',sortable: true,renderer: HY.renderAsDate},
		{header: '实际拜访时间', dataIndex:'accdate', width:140, align:'center',sortable: true,renderer: HY.renderAsDate},
		{header: '参加人', dataIndex:'attendee', width:140, align:'center',sortable: true},
		{header: '拜访内容', dataIndex:'outline', width:180, align:'center',sortable: true},
		{header: '业务员', dataIndex:'salesname', width:120, align:'center',sortable: true},
		{header: '备注', dataIndex:'remarks', width:160, align:'center',sortable: true},
		{header: '完成', dataIndex:'accstate', width:50, align:'center',sortable: true,renderer: HY.renderAsCheckbox},
		{header: '审核', dataIndex:'checked', width:50, align:'center',sortable: true,renderer: HY.renderAsCheckbox},
		{header: '审核状态', dataIndex:'statusdesc', width:100, align:'center',sortable: true},
		{header: '审核日期', dataIndex:'checkdate', width:140, align:'center',sortable: true,renderer: HY.renderAsDate},
		{header: '审核人', dataIndex:'checkcode', width:100, align:'center',sortable: true},
		{header: '审核备注', dataIndex:'checkdesc', width:140, align:'center',sortable: true},
		{header: '录入人', dataIndex:'createusername', width:100, align:'center',sortable: true},
];

crmaccView.mainCM = new Ext.grid.ColumnModel({
	columns: crmaccView.mainCols,
	defaults: HY.Cmp.cmDefaults
});

crmaccView.mainFields = [
	{xtype:"hidden",name:"clientid"},
	{xtype:"hidden",name:"pkid"},
	{xtype:"hidden",name:"salesid"},
	{layout: 'absolute', height: 450, border: true, items:[
		{xtype: 'label', html: '客户代码', width: 60, x: 5, y: 9},
		{xtype: 'textfield', name: 'clientcode', width: 130, x: 70, y: 7, tabIndex: 201},
		HY.Cmp.createQryClrButton({btn1:{x: 200, y: 7, fn: function(){ crmaccView.popClient({callback:crmaccView.setClient}); }}, btn2:{x: 230, y: 7, fn: function(){ crmaccView.clearPop('client'); }}}),
		{xtype: 'label', html: '业务员', width: 60, x: 285, y: 9},
		{xtype: 'textfield', name: 'salesname', width: 130, x: 350, y: 7, tabIndex: 202},
		HY.Cmp.createQryClrButton({btn1:{x: 480, y: 7, fn: function(){ crmaccView.popSales({callback: crmaccView.setSales}); }}, btn2:{x: 510, y: 7, fn: function(){ crmaccView.clearPop('sales'); }}}),
		{xtype: 'label', html: '拜访号', width: 80, x: 540, y: 9},
		{xtype: 'textfield', name: 'accno', width: 180, x: 625, y: 7, tabIndex: 203, readOnly: true},
		{xtype: 'label', html: '客户名称', width: 60, x: 5, y: 39},
		{xtype: 'textfield', name: 'cliname', width: 180, x: 70, y: 37, tabIndex: 204},
		{xtype: 'label', html: '跟进状态', width: 60, x: 285, y: 39},
		HY.Const.createCombo('datitem_49', {id: 'elm_trkstatetype', name: 'trkstatedesc', hiddenName: 'trkstate', width: 180, x: 350, y: 37, tabIndex: 205, allowBlank: true, pageSize: 0}),
		{xtype: 'label', html: '预计拜访时间', width: 80, x: 540, y: 39},
		{xtype: 'datetimefield', name: 'estdate', width: 180, x: 625, y: 37, tabIndex: 206,allowBlank: true,format:'datetime'},
		{xtype: 'label', html: '联系人', width: 60, x: 5, y: 69},
		{xtype: 'textfield', name: 'clicont', width: 180, x: 70, y:67, tabIndex: 207},
		{xtype: 'label', html: '电话', width: 60, x: 285, y: 69},
		{xtype: 'textfield', name: 'clitelno', width: 180, x: 350, y: 67, tabIndex: 208},
		{xtype: 'label', html: '实际拜访时间', width: 80, x: 540, y: 69},
		{xtype: 'datetimefield', name: 'accdate', width: 180, x: 625, y: 67, tabIndex: 209,allowBlank: true,format:'datetime'},
		{xtype: 'label', html: '拜访方式', width: 60, x: 5, y: 99},
		HY.Const.createCombo('datitem_62', {id: 'elm_acctypetype', name: 'acctypedesc', hiddenName: 'acctype', width: 180, x: 70, y: 97, tabIndex: 210, allowBlank: true, pageSize: 0}),
		{xtype: 'label', html: '参加人', width: 60, x: 285, y: 99},
		{xtype: 'textfield', name: 'clitelno', width: 455, x: 350, y: 97, tabIndex: 211},
		{xtype: 'label', html: '拜访内容', width: 60, x: 5, y: 129},
		{xtype: 'textarea', name: 'outline', width: 735, height:65, x: 70, y: 127, tabIndex: 212},
		{xtype: 'label', html: '备注', width: 60, x: 5, y: 209},
		{xtype: 'textarea', name: 'remarks', width: 735, height:65, x: 70, y: 207, tabIndex: 213},
		{xtype: 'label', html: '审核', width: 60, x: 5, y: 289},
		{xtype: 'checkbox', name: 'checked', inputValue:'Y', width: 180, x: 70, y: 287, tabIndex: 214},
		{xtype: 'label', html: '审核状态', width: 60, x: 285, y: 289},
		HY.Const.createCombo('datitem_63', {id: 'elm_chkstatetype', name: 'statusdesc', hiddenName: 'checkstatus', width: 180, x: 350, y: 287, tabIndex: 215, allowBlank: true, pageSize: 0}),
		{xtype: 'label', html: '录入人', width: 80, x: 540, y: 289},
		{xtype: 'textfield', name: 'createusername', width: 180, x: 625, y: 287, tabIndex: 216, readOnly: true},
		{xtype: 'label', html: '审核人', width: 60, x: 5, y: 319},
		{xtype: 'textfield', name: 'checkcode', width: 180, x: 70, y: 317, tabIndex: 217, readOnly: true},
		{xtype: 'label', html: '审核日期', width: 60, x: 285, y: 319},
		{xtype: 'datefield', name: 'checkdate', width: 180, x: 350, y: 317, tabIndex: 218, readOnly: true,format: 'Y/m/d'},
		{xtype: 'label', html: '录入时间', width: 80, x: 540, y: 319},
		{xtype: 'datefield', name: 'createtime', width: 180, x: 625, y: 317, tabIndex: 219, readOnly: true,format: 'Y/m/d'},
		{xtype: 'label', html: '审核备注', width: 60, x: 5, y: 349},
		{xtype: 'textarea', name: 'checkdesc', width: 460, height:65, x: 70, y: 347, tabIndex: 220},
		{xtype: 'label', html: '完成', width: 80, x: 540, y: 349},
		{xtype: 'checkbox', name: 'accstate',inputValue:'Y', width: 180, x: 625, y: 347, tabIndex: 221},
	]}
];

crmaccView.recordStore = HY.Cmp.createJsonStore({
	fields: ['pkid','clientid','cliname','clicode','clientabbr', 'clientshort', 'clicont','clitelno','cliemail','imno','wechat','accno','estdate','accdate','acctype','accstate','attendee','outline','requests','trkstate','checked','checkstatus','checkby','checkdate','checkcode','checkdesc','remarks','txtval01','txtval02','txtval03','txtval04','txtval05','txtval06','txtval07','txtval08','txtval09','txtval10','rowacttype','colchanged','orgid','createuser','createusername','createtime','lastupduser','lastupdusername','lastupdtime','trkstatedesc','acctypedesc','statusdesc','salesname'],
	url: crmaccView.ctx + '/accrecord.do',
	sortInfo: {}
});
crmaccView.recordCM = new Ext.grid.ColumnModel({
	columns: [
		new Ext.grid.RowNumberer({width:36}),
		 {header: '客户代码', dataIndex:'clicode', width:80, align:'center',sortable: true},
			{header: '客户名称', dataIndex:'cliname', width:160, align:'center',sortable: true},
			{header: '联系人', dataIndex:'clicont', width:120, align:'center',sortable: true},
			{header: '电话', dataIndex:'clitelno', width:140, align:'center',sortable: true},
			{header: '拜访号', dataIndex:'accno', width:120, align:'center',sortable: true},
			{header: '拜访方式', dataIndex:'acctypedesc', width:100, align:'center',sortable: true},
			{header: '跟进状态', dataIndex:'trkstatedesc', width:100, align:'center',sortable: true},
			{header: '预计拜访时间', dataIndex:'estdate', width:140, align:'center',sortable: true,renderer: HY.renderAsDate},
			{header: '实际拜访时间', dataIndex:'accdate', width:140, align:'center',sortable: true,renderer: HY.renderAsDate},
			{header: '参加人', dataIndex:'attendee', width:140, align:'center',sortable: true},
			{header: '拜访内容', dataIndex:'outline', width:180, align:'center',sortable: true},
			{header: '业务员', dataIndex:'salesname', width:120, align:'center',sortable: true},
			{header: '备注', dataIndex:'remarks', width:160, align:'center',sortable: true},
			{header: '完成', dataIndex:'accstate', width:50, align:'center',sortable: true,renderer: HY.renderAsCheckbox},
			{header: '审核', dataIndex:'checked', width:50, align:'center',sortable: true,renderer: HY.renderAsCheckbox},
			{header: '审核状态', dataIndex:'statusdesc', width:100, align:'center',sortable: true},
			{header: '审核日期', dataIndex:'checkdate', width:140, align:'center',sortable: true,renderer: HY.renderAsDate},
			{header: '审核人', dataIndex:'checkcode', width:100, align:'center',sortable: true},
			{header: '审核备注', dataIndex:'checkdesc', width:140, align:'center',sortable: true},
			{header: '录入人', dataIndex:'createusername', width:100, align:'center',sortable: true},
	],
	defaults: HY.Cmp.cmDefaults
});


/**
* 查询面板
*/
crmaccView.queryPanel = new HY.Cmp.QueryPanel({
	tarObj:crmaccView,
	tbarConfig:{editMode: 0, enableNav: false, statusConfig: ['Modify#!00']},
	items:[
		{
			layout: 'absolute', border: false, height: 36,
			items:[
				{xtype: 'label', html: '拜访号', width: 45, x: 5, y: 7, border: true},
				{xtype: 'textfield', name: 'accno', width: 120, x: 50, y: 6, tabIndex: 101},
				{xtype: 'label', html: '客户名称', width: 60, x: 175, y: 7},
				{xtype: 'textfield', name: 'clientname', width: 120, x: 230, y: 6, tabIndex: 102},
				{xtype: 'label', html: '拜访日期', width: 60, x: 355, y: 7},
				{xtype: 'datefield', name: 'datefm', width: 95, x: 415, y: 6, tabIndex: 103},
				{xtype: 'label', html: '&nbsp;-', width: 10, x: 515, y: 7},
				{xtype: 'datefield', name: 'dateto', width: 95, x: 530, y: 6, tabIndex: 104},
			]
		}
	]
});

/**
 * 主列表面板
 */
crmaccView.mainPanel = new Ext.grid.GridPanel({
	region: 'center',
	border: false,
	margins: '0 0',
	store: crmaccView.mainStore,
	cm: crmaccView.mainCM,
	bbar: new HY.Cmp.PagingToolbar({pageSize:30,tarObj: crmaccView, store: crmaccView.mainStore}),
	listeners:{
		'rowdblclick': function() {
			crmaccView.doModify();
		}
	},
	viewConfig: {
		forceFit: false,
		enableRowBody: true
	},
});

/**
 * 主编辑面板
 */
crmaccView.mainWindow = new HY.Cmp.WindowEditMstDtl({
	tbar: new HY.Cmp.Toolbar({
		tarObj: crmaccView,
		editMode: 1,
		enableNav: true,
		statusConfig: ['#Delete#!00']
	}),
	title: crmaccView.title,
	maximizable: false,
	maximized: true,
	mstRegion: 'center',
	dtlRegion: 'south',
	formFields: crmaccView.mainFields,
	formHeight: 220,
	gridHeight: 380,
	gridStore: crmaccView.recordStore,
	gridColModel: crmaccView.recordCM,
	gridTbar: new HY.Cmp.DtlToolbar({
		title: '拜访历史',
		statusConfig: [{actionNew: '00'} ,{actionModify: '00'} ,{actionDelete: '00'}],
		setAction: function(actid) {
			
		}
	}),
	gridEditWindow: undefined
});


//-----------------功能函数
crmaccView.doRefresh = function(){
	var me = this;
	if (me.mainWindow.isVisible()) {
		var frm = me.mainWindow.formPanel.getForm();
		var pkval = HY.fv(frm, me.pkName);
		if (HY.isNumber(pkval) && pkval > 0) {
			crmaccView.doLoadDetail(pkval, frm);
			crmaccView.doRefreshDb(HY.fv(frm, me.codeName),pkval);
		} else {
			return;
		}
	}else{
		var frm = me.queryPanel.getForm();
		var params = {};
		Ext.apply (params, frm.getValues());
		Ext.apply (me.mainStore.baseParams, params);
		me.mainStore.load();
	}
	
};
crmaccView.doModify = function(pktmp){
	var me = this;
	var frm = me.mainWindow.formPanel.getForm();
	var rec = me.mainPanel.getSelectionModel().getSelected();
	var pkval = "";
	if( rec ) {
		pkval = rec.get(me.pkName);
	} else {
		pkval = pktmp;
	}
	if( HY.isNumber(pkval) && pkval != '0' ) {
		me.doLoadDetail(pkval, frm);
		me.doRefreshDb(rec.data.clientid,pkval);
		me.mainWindow.show();
	}
};
crmaccView.doNew = function(cpfmid){
	var me = this;
	var frm = me.mainWindow.formPanel.getForm();
	const pkval = HY.fv(frm, me.codeName);
	HY.Cmp.clearFormData(frm);
	if(HY.isNumber(pkval) && pkval > 0){
		crmaccView.doLoadDetailInit(pkval,frm);
	}
	me.mainWindow.show();
	me.recordStore.removeAll();
	frm.clearInvalid();
};
crmaccView.doSave = function(){
	var me = this;
	var frm = me.mainWindow.formPanel.getForm();
	var clitelno = frm.findField('clitelno').getValue();
	var obj = {"clitelno":clitelno};
	if (!frm.isValid()) {
		return;
	}
	HY.confirm ({
		callback: function() {
			var params = frm.getValues();
			Ext.apply(params,obj);
			console.log(params);
			HY.AjaxRequest({
				params: params,
				showWat: true,
				url: me.ctx + '/accsave.do',
				callback: function(datobj) {
					HY.fv(frm, me.pkName, (datobj && datobj.pkid) ? datobj.pkid : 0);
					me.doRefresh();
				}
			});
		}
	});
};
crmaccView.doDelete = function(){
	var rec = this.mainPanel.getSelectionModel().getSelected();
	if( rec ) {
		var pkval = rec.get(crmaccView.pkName);
		var params = {"pk": pkval};
		if (!HY.isNumber(pkval)) return;
		HY.confirm ({
			showWat: true,
			callback: function() {
				var url = crmaccView.ctx + '/accdel.do';
				HY.AjaxRequest({url: url,params:params,showMsg: true, callback: function(datobj){
					crmaccView.mainStore.remove(rec);
				}});
			}
		});
	}
};
crmaccView.doLoadDetail = function(pkval, frm) {
	if (!HY.isNumber(pkval)) {
		HY.alert("参数有误，请重试。");
		return;
	}
	var url = crmaccView.ctx + '/accdetail.do';
	HY.AjaxRequest({
		params:{"pk":pkval},
		url: url,
		callback: function(datobj){
		HY.Cmp.clearFormData(frm);
		HY.Cmp.parseDateCols(datobj ,'estdate')
		HY.Cmp.parseDateCols(datobj ,'accdate')
		HY.Cmp.parseDateCols(datobj ,'checkdate')
		HY.Cmp.parseDateCols(datobj ,'createtime');
		frm.setValues(datobj);
		frm.findField(crmaccView.codeName).focus(true,500);
	}});
};
crmaccView.doClose = function() {
	this.mainWindow.hide();
};
crmaccView.doLoadDetailInit = function(pkval,frm){
	if (!HY.isNumber(pkval)) {
		HY.alert("参数有误，请重试。");
		return;
	}
	var url = crmaccView.ctx + '/accinit.do';
	HY.AjaxRequest({
		params:{"clientid":pkval},
		url: url,
		callback: function(datobj){
		HY.Cmp.clearFormData(frm);
		HY.Cmp.parseDateCols(datobj ,'estdate')
		HY.Cmp.parseDateCols(datobj ,'accdate')
		HY.Cmp.parseDateCols(datobj ,'checkdate')
		HY.Cmp.parseDateCols(datobj ,'createtime');
		frm.setValues(datobj);
		frm.findField(crmaccView.codeName).focus(true,500);
	}});
};
// ------------------------------------- DB Info
crmaccView.doRefreshDb = function(srvid,pk) {
	var me = this;
	var frm = me.mainWindow.formPanel.getForm();
	var pkval = srvid;
	if( HY.isNumber(pk) && pk != '0' ) {
		var params = {"clientid": pkval};
		Ext.apply (me.recordStore.baseParams, params);
		me.recordStore.load();
		return;
	} else {
		HY.alert('请先保存数据');
		return;
	}
};
crmaccView.doNewDb = function(){
	//
};
crmaccView.doSaveDb = function(){
	//
};
crmaccView.doModifyDb = function(){
	//
};
crmaccView.doDeleteDb = function(){
	//
};
crmaccView.doLoadDetailDb = function(pkval, frm, lnkid) {
	
};
crmaccView.doCloseDb = function() {
	//
};
crmaccView.doNavDb = function(inc) {
	//
};
// -------------------------

crmaccView.clearPop = function(type){
	var me = this;
	var frm = me.mainWindow.formPanel.getForm();
	if(type == 'sales'){
		HY.fv(frm, 'salesid', '');
		HY.fv(frm, 'salesname', '');
	}
	if(type == 'client'){
		HY.fv(frm, 'clientid', '');
		HY.fv(frm, 'clientcode', '');
		HY.fv(frm, 'clicont', '');
		HY.fv(frm, 'clitelno', '');
		HY.fv(frm, 'cliname', '');
	}
};
crmaccView.setClient = function(record){
	var frm = crmaccView.mainWindow.formPanel.getForm();
	if(record){
		console.log(record);
		HY.fv(frm ,'clientid' ,record.data['clientid']);
		HY.fv(frm ,'clientcode' ,record.data['clicode']);
		HY.fv(frm ,'cliname' ,record.data['cliname_c']);
		HY.fv(frm ,'clicont' ,record.data['cliconta1']);
		HY.fv(frm ,'clitelno' ,record.data['clitel1']);
	}
};
crmaccView.setSales = function(record){
	var frm = crmaccView.mainWindow.formPanel.getForm();
    if(record){
    	HY.fv(frm ,'salesid' ,record.data['userid']);
		HY.fv(frm ,'salesname' ,record.data['username_c']);
	}
}
crmaccView.popClient = function(configs){
	var comboid = configs.comboid || 'client';
	var win_id = configs.id || 'client';
	HY.Cmp.createPopQuery({
		id: 'ppw_' + win_id
		,width: 618
		,dataUrl: crmaccView.ctx + '/clilist.do'
		,dataParams: {}
		,fields: ['clientid' ,'clicode' ,'cliabbr' ,'cliname_c','cliname_e','cliconta1','clitel1']
		,colModel: new Ext.grid.ColumnModel([
			new Ext.grid.RowNumberer({width: 30})
			,{header: '代码' ,dataIndex: 'clicode' ,width: 100}
			,{header: '简称' ,dataIndex: 'cliabbr' ,width: 120}
			,{header: '名称(中文)' ,dataIndex: 'cliname_c' ,width: 200}
			,{header: '名称(英文)' ,dataIndex: 'cliname_e' ,width: 200}
		])
		,handler: function(grid ,rowIndex ,e) {
			var record = grid.store.getAt(rowIndex);
			if (configs.callback && typeof configs.callback == 'function') {
				configs.callback (record);
			}
		}
	});
};

crmaccView.popSales = function(configs){
	var comboid = configs.comboid || 'sales';
	var win_id = configs.id || 'sales';
	HY.Cmp.createPopQuery({
		id: 'ppw_' + win_id
		,width: 618
		,dataUrl: ctx + '/combo/sales.do'
		,dataParams: {}
		,fields: ['userid','usercode','username_c','username_e']
		,colModel: new Ext.grid.ColumnModel([
			new Ext.grid.RowNumberer({width: 30})
			,{header: '业务员代码' ,dataIndex: 'usercode' ,width: 100}
			,{header: '业务员名称' ,dataIndex: 'username_c' ,width: 140}
			,{header: '业务员名称(英文)' ,dataIndex: 'username_e' ,width: 240}
		])
		,handler: function(grid ,rowIndex ,e) {
			var record = grid.store.getAt(rowIndex);
			if (configs.callback && typeof configs.callback == 'function') {
				configs.callback (record);
			}
		}
	});
};

crmaccView.doCheck = function(){
	
};