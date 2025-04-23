Ext.ns("Ext.HY.CrmconView");
var crmconView = Ext.HY.CrmconView;

Ext.apply(crmconView, {
	ctx: ctx + '/crmsvc/contact', pkName: 'clientid', codeName: 'clicode', title: '客户跟进'
});

Ext.onReady(function() {
	Ext.QuickTips.init();
	
	var viewport = new Ext.Viewport({
		layout: 'border',
		items: [
			crmconView.queryPanel,
			crmconView.mainPanel,
		]
	});
	viewport.doLayout();
	crmconView.doRefresh();
	
});

crmconView.mainStore = HY.Cmp.createJsonStore({
	fields: ['clientid','clicode','cliabbr','cliname_c','clianme_e','cliaddr_c','cliaddr_e','salescode','clitel1','clitel2','clifax','clitelex','clipostal','cliconta1','cliconta2','emailadd1','emailadd2','areaname','counname','province','bankname','bankaddr','bankacctno','bankacctname','website','comcountrydesc','comcounname_e','pol','polname_e','pod','podname_e','pld','pldname_e','cyid','isshipping','isair','isclifordecl','iscliforstk','ishau','istrain','isfactory','istradeco','isexpress','isforwarder','isothtype','tradetype','prodinfo','abstract','cliscale','tradeamt','estcryamt','estcapacity','agencyshare','citycode','inused','remarks','orgcode','createusername','createuser','createtime','lastupduser','lastupdusername','lastupdtime','isagency','checked','regsalescode','regsalesname','maxdatefm','maxdateto','remainingdays','regtimes','lastorddate','salesname'],
	url: crmconView.ctx + '/contlist.do',
	sortInfo: {field: 'clientid', direction: 'DESC'},
	pageSize:30
});

crmconView.mainCols = [
	  new Ext.grid.RowNumberer({width:36}),
	    {header: '客户代码', dataIndex:'clicode', width:110, align:'left',sortable: true},
		{header: '名称(中文)', dataIndex:'cliname_c', width:160, align:'left',sortable: true},
		{header: '认领人', dataIndex:'salesname', width:140, align:'left',sortable: true},
		{header: '联系人1', dataIndex:'cliconta1', width:100, align:'center',sortable: true},
		{header: '电话1', dataIndex:'clitel1', width:120, align:'left',sortable: true},
		{header: '地址(中文)', dataIndex:'cliaddr_c', width:200, align:'left',sortable: true},
		{header: '状态', dataIndex:'inused', width:80, align:'center',sortable: true},
		{header: '开始日期', dataIndex:'maxdatefm', width:100, align:'center',sortable: true,renderer: HY.renderAsDate},
		{header: '结束日期', dataIndex:'maxdateto', width:100, align:'center',sortable: true,renderer: HY.renderAsDate},
		{header: '许可剩余天数', dataIndex:'remainingdays', width:100, align:'center',sortable: true},	
		{header: '装货港名称', dataIndex:'polname_e', width:160, align:'left',sortable: true},
		{header: '卸货港名称', dataIndex:'podname_e', width:160, align:'left',sortable: true},
		{header: '认领次数', dataIndex:'regtimes', width:80, align:'center',sortable: true},
		{header: '最后工作单日期',dataIndex:'lastorddate',width:120,align:'center',sortable: true,renderer: HY.renderAsDate},
		{header: '联系人2', dataIndex:'cliconta2', width:100, align:'center',sortable: true},
		{header: '电话2', dataIndex:'clitel2', width:120, align:'left',sortable: true},
		{header: '地址(英文)', dataIndex:'cliaddr_e', width:180, align:'left',sortable: true},
];
crmconView.mainCM = new Ext.grid.ColumnModel({
	columns: crmconView.mainCols,
	defaults: HY.Cmp.cmDefaults
});

crmconView.recordStore = HY.Cmp.createJsonStore({
	fields:['pkid','alocid','clientid','salesid','salescode','salesname','isdefault','isdeleted','orgid','createuser','createusercode','createtime','createtime','lastupdusercode','lastupdtime','datefm','dateto','reqno','reqdate','checked','checkby','checkbycode','checkdate','reqdesc','remarks','suspended', 'submited' ,'submitdate'],
	url: crmconView.ctx + '/contrecord.do',
	sortInfo: {}
});
crmconView.recordCM = new Ext.grid.ColumnModel({
	columns: [
		new Ext.grid.RowNumberer({width:36}),
	    {header: '业务员', dataIndex:'salescode', width:100, align:'center',sortable: true},
		{header: '业务员名称', dataIndex:'salesname', width:140, align:'center',sortable: true},
		{header: '开始日期', dataIndex:'datefm', width:120, align:'center',sortable: true,renderer: HY.renderAsDate},
		{header: '结束日期', dataIndex:'dateto', width:120, align:'center',sortable: true,renderer: HY.renderAsDate},
		{header: '登记号', dataIndex:'reqno', width:120, align:'center',sortable: true},
		{header: '登记日期', dataIndex:'reqdate', width:120, align:'center',sortable: true,renderer: HY.renderAsDate},
		{header: '提交', dataIndex:'submited', width:50, align:'center',sortable: true,renderer: HY.renderAsCheckbox},
		{header: '提交日期', dataIndex:'submitdate', width:120, align:'center',sortable: true,renderer: HY.renderAsDate},
		{header: '审核', dataIndex:'checked', width:50, align:'center',sortable: true,renderer: HY.renderAsCheckbox},
		{header: '审核人', dataIndex:'checkbycode', width:100, align:'center',sortable: true},
		{header: '审核日期', dataIndex:'checkdate', width:120, align:'center',sortable: true,renderer: HY.renderAsDate},
		{header: '登记说明', dataIndex:'reqdesc', width:120, align:'center',sortable: true},
		{header: '备注', dataIndex:'remarks', width:120, align:'center',sortable: true},
		{header: '录入人', dataIndex:'createusercode', width:120, align:'center',sortable: true},
		{header: '录入日期', dataIndex:'createtime', width:120, align:'center',sortable: true,renderer: HY.renderAsDate},
		{header: '修改人', dataIndex:'lastupdusercode', width:120, align:'center',sortable: true},
		{header: '修改日期', dataIndex:'lastupdtime', width:100, align:'center',sortable: true,renderer: HY.renderAsDate},
		{header: '关闭', dataIndex:'suspended', width:100, align:'center',sortable: true,renderer: HY.renderAsCheckbox},
	],
	defaults: HY.Cmp.cmDefaults
});

crmconView.baseFields = [
	{xtype:"hidden",name:"clientid"},
	{layout: 'absolute', height: 510, border: true, items:[
		{xtype: 'label', html: '客户代码', width: 60, x: 5, y: 9},
		{xtype: 'textfield', name: 'clicode', width: 150, x: 70, y: 7, tabIndex: 201,readOnly: true},
		{xtype: 'label', html: '客户简称', width: 60, x: 255, y: 9},
		{xtype: 'textfield', name:'cliabbr', width: 130, x: 320, y: 7, tabIndex: 202,readOnly: true},
		{xtype: 'label', html: '联系人(1)', width: 80, x: 540, y: 9},
		{xtype: 'textfield', name: 'cliconta1', width: 180, x: 625, y: 7, tabIndex: 203, readOnly: true},
		{xtype: 'label', html: '名称(中文)', width: 60, x: 5, y: 39},
		{xtype: 'textfield', name: 'cliname_c', width: 380, x: 70, y: 37, tabIndex: 204,readOnly: true},
		{xtype: 'label', html: '电话', width: 80, x: 540, y: 39},
		{xtype: 'textfield', name: 'clitel1', width: 180, x: 625, y: 37, tabIndex: 206,allowBlank: true,readOnly: true},
		{xtype: 'label', html: '名称(英文)', width: 60, x: 5, y: 69},
		{xtype: 'textfield', name: 'cliname_e', width: 380, x: 70, y:67, tabIndex: 207,readOnly: true},
		{xtype: 'label', html: '邮箱', width: 80, x: 540, y: 69},
		{xtype: 'textfield', name: 'emailadd1', width: 180, x: 625, y: 67, tabIndex: 209,readOnly: true},
		{xtype: 'label', html: '业务员', width: 60, x: 5, y: 99},
		{xtype: 'textfield', name: 'salescode', width: 150, x: 70, y: 97, tabIndex: 210,readOnly: true},
		{xtype: 'label', html: '城市代码', width: 60, x: 255, y: 99},
		{xtype: 'textfield', name: 'citycode', width: 130, x: 320, y: 97, tabIndex: 211,readOnly: true},
		{xtype: 'label', html: '联系人(2)', width: 60, x: 540, y: 99},
		{xtype: 'textfield', name: 'cliconta2', width: 180, x: 625, y: 97, tabIndex: 212,readOnly: true},
		{xtype: 'label', html: '区域', width: 60, x: 5, y: 129},
		{xtype: 'textfield', name: 'areacode', width: 150, x: 70, y: 127, tabIndex: 213,readOnly: true},
		{xtype: 'label', html: '国家', width: 60, x: 255, y: 129},
		{xtype: 'textfield', name: 'councode', width: 130, x: 320, y: 127, tabIndex: 214,readOnly: true},
		{xtype: 'label', html: '电话', width: 60, x: 540, y: 129},
		{xtype: 'textfield', name: 'clitel2', width: 180, x: 625, y: 127, tabIndex: 215,readOnly: true},
		{xtype: 'label', html: '省', width: 60, x: 5, y: 159},
		{xtype: 'textfield', name: 'province', width: 150, x: 70, y: 157, tabIndex: 216,readOnly: true},
		{xtype: 'label', html: '邮编', width: 60, x: 255, y: 159},
		{xtype: 'textfield', name: 'clipostal', width: 130, x: 320, y: 157, tabIndex: 217,readOnly: true},
		{xtype: 'label', html: '邮箱', width: 60, x: 540, y: 159},
		{xtype: 'textfield', name: 'emailadd2', width: 180, x: 625, y: 157, tabIndex: 218,readOnly: true},
		{xtype: 'label', html: '地址(中文)', width: 60, x: 5, y: 189},
		{xtype: 'textarea', name: 'cliaddr_c', width: 380, height:45, x: 70, y: 187, tabIndex: 218,readOnly: true},
		{xtype: 'label', html: '传真', width: 60, x: 540, y: 189},
		{xtype: 'textfield', name: 'clifax', width: 180, x: 625, y: 187, tabIndex: 219,readOnly: true},
		{xtype: 'label', html: '电传', width: 60, x: 540, y: 219},
		{xtype: 'textfield', name: 'citelex', width: 180, x: 625, y: 217, tabIndex: 220,readOnly: true},
		{xtype: 'label', html: '地址(英文)', width: 60, x: 5, y: 249},
		{xtype: 'textarea', name: 'cliaddr_e', width: 380, height:45, x: 70, y: 247, tabIndex: 221,readOnly: true},
		{xtype: 'label', html: '主页', width: 60, x: 540, y: 249},
		{xtype: 'textfield', name: 'website', width: 180, x: 625, y: 247, tabIndex: 222,readOnly: true},
		{xtype: 'label', html: '币制', width: 60, x: 540, y: 279},
		{xtype: 'textfield', name: 'cyid', width: 180, x: 625, y: 277, tabIndex: 223,readOnly: true},
		{xtype: 'label', html: '开户行', width: 60, x: 5, y: 309},
		{xtype: 'textfield', name: 'bankname', width: 150, x: 70, y: 307, tabIndex: 224,readOnly: true},
		{xtype: 'label', html: '开户名称', width: 60, x: 255, y: 309},
		{xtype: 'textfield', name: 'bankacctname', width: 130, x: 320, y: 307, tabIndex: 225,readOnly: true},
		{xtype: 'label', html: '发票税额', width: 60, x: 540, y: 309},
		{xtype: 'textfield', name: 'taxrate', width: 180, x: 625, y: 307, tabIndex: 226,readOnly: true},
		{xtype: 'label', html: '账号', width: 60, x: 5, y: 339},
		{xtype: 'textfield', name: 'bankacctno', width: 150, x: 70, y: 337, tabIndex: 227,readOnly: true},
		{xtype: 'label', html: '开户行地址', width: 60, x: 255, y: 339},
		{xtype: 'textfield', name: 'bankaddr', width: 130, x: 320, y: 337, tabIndex: 228,readOnly: true},
		{xtype: 'label', html: '工商登记号', width: 60, x: 5, y: 369},
		{xtype: 'textfield', name: 'abicregno', width: 380, x: 70, y: 367, tabIndex: 229,readOnly: true},
		{xtype: 'label', html: '纳税人类型', width: 60, x: 540, y: 339},
		{xtype: 'radio', name:'taxtype',inputValue:1, boxLabel:'一般纳税人', width: 180, x:625, y: 337,tabIndex: 230},
		{xtype: 'radio', name:'taxtype',inputValue:2, boxLabel:'小规模税人', width: 180, x: 625, y: 367,tabIndex: 253},
		{xtype: 'radio', name:'taxtype',inputValue:0, boxLabel:'', width: 50, x: 625, y: 810,tabIndex: 254,hidden:true,allowBlank:true},
		{xtype: 'label', html: '备注', width: 60, x: 5, y: 399},
		{xtype: 'textarea', name: 'remarks', width: 380, height:65, x: 70, y: 397, tabIndex: 231,readOnly: true},
		{xtype:'checkbox',name:'isbizlicence', width:100,boxLabel:'营业执照',x:540, y:397,tabIndex: 232,},
		{xtype:'checkbox',name:'istaxregcert', width:100,boxLabel:'税务登记证',x:660, y:397,tabIndex: 233,},
		{xtype: 'label', html: '关键字', width: 60, x: 540, y: 429},
		{xtype: 'textfield', name: 'abstract', width: 180, x: 625, y: 427, tabIndex: 234,readOnly: true},
		{xtype: 'label', html: '获客渠道', width: 60, x: 540, y: 459},
		{xtype: 'textfield', name: 'chrval02', width: 180, x: 625, y: 457, tabIndex: 235,readOnly: true},
		{xtype: 'label', html: '状态', width: 60, x: 5, y: 469},
		{xtype: 'radio', name:'inused',inputValue:1, boxLabel:'成交', width: 60, x:70, y: 467, tabIndex: 236},
		{xtype: 'radio', name:'inused',inputValue:-1, boxLabel:'潜在', width:60, x: 140, y: 467, tabIndex: 237},
		{xtype: 'radio', name:'inused',inputValue:0, boxLabel:'流失', width: 60, x:210, y: 467, tabIndex: 238},
		{xtype: 'radio', name:'inused',inputValue:2, boxLabel:'目标', width: 60, x:280, y: 467, tabIndex: 239},
		{xtype: 'radio', name:'inused',inputValue:3, boxLabel:'放弃', width: 60, x:350, y: 467, tabIndex: 240},
		{xtype:'label',html:'客户类型',width:60,x:845,y:9},
		{xtype:'label',html:'海运客户',width:60,x:865,y:29},
		{xtype:'checkbox',name:'isshipping', width:60,x:945, y:27, tabIndex: 241},
		{xtype:'label',html:'空运客户',width:60,x:865,y:49},
		{xtype:'checkbox',name:'isair', width:60,x:945, y:47, tabIndex: 242},
		{xtype:'label',html:'陆运客户',width:60,x:865,y:69},
		{xtype:'checkbox',name:'ishau', width:60,x:945, y:67, tabIndex: 243},
		{xtype:'label',html:'铁运客户',width:60,x:865,y:89},
		{xtype:'checkbox',name:'istrain', width:60,x:945, y:87, tabIndex: 244},
		{xtype:'label',html:'报关客户',width:60,x:865,y:109},
		{xtype:'checkbox',name:'iscliforded', width:60,x:945, y:107, tabIndex: 245},
		{xtype:'label',html:'仓储客户',width:60,x:865,y:129},
		{xtype:'checkbox',name:'iscliforstk', width:60,x:945, y:127, tabIndex: 246},
		{xtype:'label',html:'快递客户',width:60,x:865,y:149},
		{xtype:'checkbox',name:'isexpress', width:60,x:945, y:147, tabIndex: 247},
		{xtype:'label',html:'贸易公司',width:60,x:865,y:169},
		{xtype:'checkbox',name:'istradeco', width:60,x:945, y:167, tabIndex: 248},
		{xtype:'label',html:'生产厂家',width:60,x:865,y:189},
		{xtype:'checkbox',name:'isfactory', width:60,x:945, y:187, tabIndex: 249},
		{xtype:'label',html:'货代公司',width:60,x:865,y:209},
		{xtype:'checkbox',name:'isforwarder', width:60,x:945, y:207, tabIndex: 250},
		{xtype:'label',html:'公海客户',width:60,x:865,y:229},
		{xtype:'checkbox',name:'chrval01',inputValue:'Y', width:60,x:945, y:227, tabIndex: 251},
		{xtype:'label',html:'公海流转',width:60,x:865,y:249},
		{xtype:'checkbox',name:'chrval03',inputValue:'Y', width:60,x:945, y:247, tabIndex: 252},
		new Ext.Button({x:865,y:277,tabIndex:255,text:'认领',iconCls: 'tbar-accept', width:80,handler:function(){
			var frm = crmconView.formBase.getForm();
			var pkval = HY.fv(frm, crmconView.pkName);
			var url = crmconView.ctx + '/alloc.do';
			HY.AjaxRequest({
				params:{"clientid":pkval},
				url: url,
				showMsg: true,
				callback: function(datobj){
					crmconView.doRefreshDb(pkval);
			}});
		}})
		]},
];
crmconView.othFields = [
	{xtype:"hidden",name:"clientid"},
	{
		layout:'absolute', height: 360, border: true,items:[
			{xtype: 'label', html: '公司规模', width: 60, x: 5, y: 9},
			{xtype: 'textfield', name: 'cliscale', width: 180, x: 70, y: 7, tabIndex: 301,readOnly: true},
			{xtype: 'label', html: '贸易类型', width: 60, x: 295, y: 9},
			{xtype: 'textfield', name: 'tradetype', width: 180, x: 360, y: 7, tabIndex: 302,readOnly: true},
			{xtype: 'label', html: '信用等级', width: 60, x: 5, y: 39},
			{xtype: 'textfield', name: 'cliclass', width: 180, x: 70, y: 37, tabIndex: 303,readOnly: true},
			{xtype: 'label', html: '贸易金额', width: 60, x: 295, y: 39},
			{xtype: 'textfield', name: 'tradeamt', width: 180, x: 360, y: 37, tabIndex: 304,readOnly: true},
			{xtype: 'label', html: '预计产值', width: 60, x: 5, y: 69},
			{xtype: 'textfield', name: 'estcryamt', width: 180, x: 70, y: 67, tabIndex: 305,readOnly: true},
			{xtype: 'label', html: '内贸', width: 60, x: 295, y: 69},
			{xtype: 'textfield', name: 'importdesc', width: 180, x: 360, y: 67, tabIndex: 306,readOnly: true},
			{xtype: 'label', html: '预计柜量', width: 60, x: 5, y: 99},
			{xtype: 'textfield', name: 'estcapacity', width: 180, x: 70, y: 97, tabIndex: 307,readOnly: true},
			{xtype: 'label', html: '进口', width: 60, x: 295, y: 99},
			{xtype: 'textfield', name: 'innertrade', width: 180, x: 360, y: 97, tabIndex: 308,readOnly: true},
			{xtype: 'label', html: '地点', width: 60, x: 5, y: 129},
			{xtype: 'textfield', name: 'placecode', width: 180, x: 70, y: 127, tabIndex: 309,readOnly: true},
			{xtype: 'label', html: '出口', width: 60, x: 295, y: 129},
			{xtype: 'textfield', name: 'exportdesc', width: 180, x: 360, y: 127, tabIndex: 310,readOnly: true},
			{xtype: 'label', html: '企业简介', width: 60, x: 5, y: 159},
			{xtype: 'textarea', name: 'clidesc', width: 470, height:65, x: 70, y: 157, tabIndex: 311,readOnly: true}
	]}
];

crmconView.formBase = new Ext.form.FormPanel({
	region: 'center',
	height: 450,
	border: false,
	bodyStyle: 'padding:5px',
	autoScroll: true,
	bodyCssClass: 'ne-form-panel',
	items:crmconView.baseFields
});
crmconView.formOth = new Ext.form.FormPanel({
	region: 'center',
	height: 360,
	border: false,
	bodyStyle: 'padding:5px',
	autoScroll: true,
	bodyCssClass: 'ne-form-panel',
	items:crmconView.othFields
});


/**
* 查询面板
*/
crmconView.queryPanel = new HY.Cmp.QueryPanel({
	tarObj:crmconView,
	tbarConfig:{editMode: 0, enableNav: false, statusConfig: ['Modify#Delete#New#!00']},
	items:[
		{
			layout: 'absolute', border: false, height: 36,
			items:[
				{xtype: 'label', html: '客户名称', width: 60, x: 5, y: 7, border: true},
				{xtype: 'textfield', name: 'clientname', width: 120, x: 60, y: 6, tabIndex: 101}
			]
		}
	]
});

/**
 * 主列表面板
 */
crmconView.mainPanel = new Ext.grid.GridPanel({
	region: 'center',
	border: false,
	margins: '0 0',
	store: crmconView.mainStore,
	cm: crmconView.mainCM,
	bbar: new HY.Cmp.PagingToolbar({pageSize:30,tarObj: crmconView, store: crmconView.mainStore}),
	listeners:{
		'rowdblclick': function() {
			crmconView.doModify();
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
crmconView.mainWindow = new Ext.Window({
	tbar: new HY.Cmp.Toolbar({
		tarObj: crmconView,
		editMode: 1,
		enableNav: true,
		statusConfig: ['#New#Save#!00'],
	}),
	iconCls: crmconView.iconCls,
	title: crmconView.title,
	maximizable: false,
	maximized: true,
	layout: 'border',
	items: [
		new Ext.TabPanel({
			id:'con-subs',
			region: 'center',
			activeTab: 0,
			deferredRender: false,
			enableTabScroll: true,
			margins: '0 0',
			defaults: {
				layout: 'border',
				autoScroll: true
			},
			items:[
				{
					layout: 'border',
					title: '基本信息',
					items:[
						crmconView.formBase
					]
				},
				{
					layout: 'border',
					title: '企业简介',
					items:[
						crmconView.formOth
					]
				}
			]
		}),
		new Ext.grid.GridPanel({
			region:'south'
			,border: true
			,margins: '2 2 2 2'
			,store:crmconView.recordStore
			,cm:crmconView.recordCM
			,tbar: new HY.Cmp.DtlToolbar({
				title: '跟进记录',
				statusConfig: [{actionNew: '00'} ,{actionModify: '00'} ,{actionDelete: '00'}],
				setAction: function(actid) {
					
				}
			})
			,height: 380
		})
	]
});


//-----------------功能函数
crmconView.doRefresh = function(){
	var me = this;
	if(me.mainWindow.isVisible()){
		var frm = me.formBase.getForm();
		var pkval = HY.fv(frm, me.pkName);
		if (HY.isNumber(pkval) && pkval > 0) {
			crmconView.doLoadDetail(pkval, frm);
			crmconView.doRefreshDb(pkval);
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
crmconView.doModify = function(pktmp){
	var me = this;
	var frm = me.formBase.getForm();
	var rec = me.mainPanel.getSelectionModel().getSelected();
	var pkval = "";
	if( rec ) {
		pkval = rec.get(me.pkName);
	} else {
		pkval = pktmp;
	}
	if( HY.isNumber(pkval) && pkval != '0' ) {
		me.doLoadDetail(pkval, frm);
		me.doRefreshDb(pkval);
		me.mainWindow.show();
	}
	
};
crmconView.doDelete = function(){
	
};
crmconView.doLoadDetail = function(pkval, frm) {
	var me = this;
	var frm1 = me.formOth.getForm();
	if (!HY.isNumber(pkval)) {
		HY.alert("参数有误，请重试。");
		return;
	}
	var url = crmconView.ctx + '/contdetail.do';
	HY.AjaxRequest({
		params:{"clientid":pkval},
		url: url,
		callback: function(datobj){
		HY.Cmp.clearFormData(frm);
		HY.Cmp.clearFormData(frm1);
		frm.setValues(datobj);
		frm1.setValues(datobj);
		frm.findField(crmconView.codeName).focus(true,500);
	}});
};
crmconView.doClose = function() {
	this.mainWindow.hide();
};
// ------------------------------------- DB Info
crmconView.doRefreshDb = function(srvid) {
	var me = this;
	var frm = me.formBase.getForm();
	var pkval = srvid;
	if( HY.isNumber(pkval) && pkval != '0' ) {
		var params = {"clientid": pkval};
		Ext.apply (me.recordStore.baseParams, params);
		me.recordStore.load();
		return;
	} else {
		HY.alert('参数错误');
		return;
	}
};
crmconView.doNewDb = function(){
	//
};
crmconView.doSaveDb = function(){
	//
};
crmconView.doModifyDb = function(){
	//
};
crmconView.doDeleteDb = function(){
	//
};
crmconView.doLoadDetailDb = function(pkval, frm, lnkid) {
	
};
crmconView.doCloseDb = function() {
	//
};
crmconView.doNavDb = function(inc) {
	//
};
// --------