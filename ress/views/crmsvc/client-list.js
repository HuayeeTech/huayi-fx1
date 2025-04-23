Ext.ns("Ext.HY.CrmcliView");
var crmcliView = Ext.HY.CrmcliView;

Ext.apply(crmcliView, {
	ctx: ctx + '/crmsvc/client', pkName: 'clientid', codeName: 'clicode', title: '我的客户'
});

Ext.onReady(function() {
	Ext.QuickTips.init();
	
	var viewport = new Ext.Viewport({
		layout: 'border',
		items: [
			crmcliView.queryPanel,
			crmcliView.mainPanel,
		]
	});
	viewport.doLayout();
	crmcliView.doRefresh();
	
});

crmcliView.mainStore = HY.Cmp.createJsonStore({
	fields: ['clientid','clicode','cliabbr','cliname_c','clianme_e','cliaddr_c','cliaddr_e','salescode','clitel1','clitel2','clifax','clitelex','clipostal','cliconta1','cliconta2','emailadd1','emailadd2','areaname','counname','province','bankname','bankaddr','bankacctno','bankacctname','website','comcountrydesc','comcounname_e','pol','polname_e','pod','podname_e','pld','pldname_e','cyid','isshipping','isair','isclifordecl','iscliforstk','ishau','istrain','isfactory','istradeco','isexpress','isforwarder','isothtype','tradetype','prodinfo','abstractdesc','cliscale','tradeamt','estcryamt','estcapacity','agencyshare','citycode','inuseddesc','remarks','orgcode','createusername','createuser','createtime','lastupduser','lastupdusername','lastupdtime','isagency','checked','regsalescode','regsalesname','maxdatefm','maxdateto','remainingdays','regtimes'],
	url: crmcliView.ctx + '/clilist.do',
	sortInfo: {field: 'clientid', direction: 'DESC'},
	pageSize:30
});

crmcliView.mainCols = [
	  new Ext.grid.RowNumberer({width:36}),
		{header: '客户代码', dataIndex:'clicode', width:100, align:'left',sortable: true},
		{header: '客户名称(中文)', dataIndex:'cliname_c', width:160, align:'left',sortable: true},
		{header: '业务员', dataIndex:'salescode', width:100, align:'center',sortable: true},
		{header: '联系人1', dataIndex:'cliconta1', width:100, align:'center',sortable: true},
		{header: '电话1', dataIndex:'clitel1', width:120, align:'left',sortable: true},
		{header: '地址(中文)', dataIndex:'cliaddr_c', width:180, align:'left',sortable: true},
		{header: '状态', dataIndex:'inuseddesc', width:80, align:'center',sortable: true},
		{header: '开始日期', dataIndex:'maxdatefm', width:100, align:'center',sortable: true,renderer: HY.renderAsDate},
		{header: '结束日期', dataIndex:'maxdateto', width:100, align:'center',sortable: true,renderer: HY.renderAsDate},
		{header: '许可剩余天数', dataIndex:'remainingdays', width:100, align:'center',sortable: true},
		{header: '装货港名称', dataIndex:'polname_e', width:160, align:'left',sortable: true},
		{header: '卸货港名称', dataIndex:'podname_e', width:160, align:'left',sortable: true},
		{header: '联系人2', dataIndex:'cliconta2', width:100, align:'center',sortable: true},
		{header: '电话2', dataIndex:'clitel2', width:140, align:'left',sortable: true},
		{header: '地址(英文)', dataIndex:'cliaddr_e', width:180, align:'left',sortable: true},
];
crmcliView.mainCM = new Ext.grid.ColumnModel({
	columns: crmcliView.mainCols,
	defaults: HY.Cmp.cmDefaults
});

crmcliView.portCols = [
	new Ext.grid.RowNumberer({width:36}),
	{header: '港口代码', dataIndex:'portcode', width:80, align:'center',sortable: true},
	{header: '港口名称', dataIndex:'portname_e', width:120, align:'center',sortable: true},
	{header: '装货港', dataIndex:'isloading', width:80, align:'center',sortable: true,renderer: HY.renderAsCheckbox},
	{header: '卸货港', dataIndex:'isdischarge', width:80, align:'center',sortable: true,renderer: HY.renderAsCheckbox},
	{header: '目的港', dataIndex:'isdestination', width:80, align:'center',sortable: true,renderer: HY.renderAsCheckbox},
	{header: '备注', dataIndex:'remarks', width:160, align:'center',sortable: true},
	{header: '录入人', dataIndex:'createusercode', width:120, align:'center',sortable: true},
	{header: '录入日期', dataIndex:'createtime', width:120, align:'center',sortable: true,renderer: HY.renderAsDate},
	{header: '修改人', dataIndex:'lastupdusercode', width:120, align:'center',sortable: true},
	{header: '修改日期', dataIndex:'lastupdtime', width:120, align:'center',sortable: true,renderer: HY.renderAsDate},
];
crmcliView.portStore = HY.Cmp.createJsonStore({
	fields: ['pkid','clientid','portid','portcode','portname_e','isloading','isdischarge','isdestination','isdeleted','remarks','orgid','createuser','createusercode','createtime','lastupduser','lastupdusercode','lastupdtime'],
	url: crmcliView.ctx + '/cliport.do',
	sortInfo: {}
});
crmcliView.portCM = new Ext.grid.ColumnModel({
	columns: crmcliView.portCols,
	defaults: HY.Cmp.cmDefaults
});

crmcliView.countryCols = [
	new Ext.grid.RowNumberer({width:36}),
	{header: '国家代码', dataIndex:'councode', width:80, align:'center',sortable: true},
	{header: '国家名称', dataIndex:'counname_e', width:120, align:'center',sortable: true},
	{header: '进出口', dataIndex:'impexpdesc', width:80, align:'center',sortable: true},
	{header: '备注', dataIndex:'remarks', width:160, align:'center',sortable: true},
	{header: '录入人', dataIndex:'createusercode', width:120, align:'center',sortable: true},
	{header: '录入日期', dataIndex:'createtime', width:120, align:'center',sortable: true,renderer: HY.renderAsDate},
	{header: '修改人', dataIndex:'lastupdusercode', width:120, align:'center',sortable: true},
	{header: '修改日期', dataIndex:'lastupdtime', width:120, align:'center',sortable: true,renderer: HY.renderAsDate},
];
crmcliView.countryStore = HY.Cmp.createJsonStore({
	fields: ['pkid','clientid','countryid','councode','counname_e','impexp','remarks','isdeleted','orgid','createuser','createusercode','createtime','lastupduser','lastupdusercode','lastupdtime','impexpdesc'],
	url: crmcliView.ctx + '/clicountry.do',
	sortInfo: {}
});
crmcliView.countryCM = new Ext.grid.ColumnModel({
	columns: crmcliView.countryCols,
	defaults: HY.Cmp.cmDefaults
});

crmcliView.accCols = [
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
	 {header: '录入人', dataIndex:'createusername', width:100, align:'center',sortable: true}
];
crmcliView.accStore = HY.Cmp.createJsonStore({
	fields: ['pkid','accdate','attendee','outline','requests','acctype','acctype','accno','clientid','clicode','cliname','salesname','estdate','clicont','clitelno','trkstate','accstate','trkstatedes','acctypedesc','checked','checkstatus','statusdesc','checkby','checkcode','checkdate','checkdesc','remarks','orgid','rowacttype','colchanged','colchanged','createusercode','createtime','lastupduser','lastupdtime'],
	url: crmcliView.ctx + '/accrecord.do',
	sortInfo: {}
});
crmcliView.accCM = new Ext.grid.ColumnModel({
	columns: crmcliView.accCols,
	defaults: HY.Cmp.cmDefaults
});

crmcliView.baseFields = [
	{xtype:"hidden",name:"clientid"},
	{xtype:"hidden",name:"areaid"},
	{xtype:"hidden",name:"counid"},
	{layout: 'absolute', height: 510, border: true, items:[
		{xtype: 'label', html: '客户代码', width: 60, x: 5, y: 9},
		{xtype: 'textfield', name: 'clicode', width: 150, x: 70, y: 7, tabIndex: 201,readOnly: true},
		{xtype: 'label', html: '客户简称', width: 60, x: 255, y: 9},
		{xtype: 'textfield', name:'cliabbr', width: 130, x: 350, y: 7, tabIndex: 202,readOnly: true},
		{xtype: 'label', html: '联系人(1)', width: 80, x: 540, y: 9},
		{xtype: 'textfield', name: 'cliconta1', width: 180, x: 625, y: 7, tabIndex: 203, readOnly: true},
		{xtype: 'label', html: '名称(中文)', width: 60, x: 5, y: 39},
		{xtype: 'textfield', name: 'cliname_c', width: 410, x: 70, y: 37, tabIndex: 204,readOnly: true},
		{xtype: 'label', html: '电话', width: 80, x: 540, y: 39},
		{xtype: 'textfield', name: 'clitel1', width: 180, x: 625, y: 37, tabIndex: 206,allowBlank: true,readOnly: true},
		{xtype: 'label', html: '名称(英文)', width: 60, x: 5, y: 69},
		{xtype: 'textfield', name: 'cliname_e', width: 410, x: 70, y:67, tabIndex: 207,readOnly: true},
		{xtype: 'label', html: '邮箱', width: 80, x: 540, y: 69},
		{xtype: 'textfield', name: 'emailadd1', width: 180, x: 625, y: 67, tabIndex: 209,readOnly: true},
		{xtype: 'label', html: '业务员', width: 60, x: 5, y: 99},
		{xtype: 'textfield', name: 'salescode', width: 150, x: 70, y: 97, tabIndex: 210,readOnly: true},
		{xtype: 'label', html: '城市代码', width: 60, x: 255, y: 99},
		{xtype: 'textfield', name: 'citycode', width: 160, x: 320, y: 97, tabIndex: 211,readOnly: true},
		{xtype: 'label', html: '联系人(2)', width: 60, x: 540, y: 99},
		{xtype: 'textfield', name: 'cliconta2', width: 180, x: 625, y: 97, tabIndex: 212,readOnly: true},
		{xtype: 'label', html: '区域', width: 60, x: 5, y: 129},
		{xtype: 'textfield', name: 'areacode', width: 110, x: 70, y: 127, tabIndex: 213,readOnly: true},
		HY.Cmp.createQryClrButton({btn1:{x: 180, y: 127, fn: function(){ crmcliView.popArea({callback: crmcliView.setArea}); }}, btn2:{x: 200, y: 127, fn: function(){ crmcliView.clearPop('area'); }}}),
		{xtype: 'label', html: '国家', width: 60, x: 255, y: 129},
		{xtype: 'textfield', name: 'councode', width: 120, x: 320, y: 127, tabIndex: 214,readOnly: true},
		HY.Cmp.createQryClrButton({btn1:{x: 440, y: 127, fn: function(){ crmcliView.popCountry({callback: crmcliView.setCountry}); }}, btn2:{x: 460, y: 127, fn: function(){ crmcliView.clearPop('country'); }}}),
		{xtype: 'label', html: '电话', width: 60, x: 540, y: 129},
		{xtype: 'textfield', name: 'clitel2', width: 180, x: 625, y: 127, tabIndex: 215,readOnly: true},
		{xtype: 'label', html: '省', width: 60, x: 5, y: 159},
		{xtype: 'textfield', name: 'province', width: 150, x: 70, y: 157, tabIndex: 216,readOnly: true},
		{xtype: 'label', html: '邮编', width: 60, x: 255, y: 159},
		{xtype: 'textfield', name: 'clipostal', width: 160, x: 320, y: 157, tabIndex: 217,readOnly: true},
		{xtype: 'label', html: '邮箱', width: 60, x: 540, y: 159},
		{xtype: 'textfield', name: 'emailadd2', width: 180, x: 625, y: 157, tabIndex: 218,readOnly: true},
		{xtype: 'label', html: '地址(中文)', width: 60, x: 5, y: 189},
		{xtype: 'textarea', name: 'cliaddr_c', width: 410, height:45, x: 70, y: 187, tabIndex: 218,readOnly: true},
		{xtype: 'label', html: '传真', width: 60, x: 540, y: 189},
		{xtype: 'textfield', name: 'clifax', width: 180, x: 625, y: 187, tabIndex: 219,readOnly: true},
		{xtype: 'label', html: '电传', width: 60, x: 540, y: 219},
		{xtype: 'textfield', name: 'clitelex', width: 180, x: 625, y: 217, tabIndex: 220,readOnly: true},
		{xtype: 'label', html: '地址(英文)', width: 60, x: 5, y: 249},
		{xtype: 'textarea', name: 'cliaddr_e', width: 410, height:45, x: 70, y: 247, tabIndex: 221,readOnly: true},
		{xtype: 'label', html: '主页', width: 60, x: 540, y: 249},
		{xtype: 'textfield', name: 'website', width: 180, x: 625, y: 247, tabIndex: 222,readOnly: true},
		{xtype: 'label', html: '币制', width: 60, x: 540, y: 279},
		{xtype: 'textfield', name: 'cyid', width: 180, x: 625, y: 277, tabIndex: 223,readOnly: true},
		{xtype: 'label', html: '开户行', width: 60, x: 5, y: 309},
		{xtype: 'textfield', name: 'bankname', width: 150, x: 70, y: 307, tabIndex: 224,readOnly: true},
		{xtype: 'label', html: '开户名称', width: 60, x: 255, y: 309},
		{xtype: 'textfield', name: 'bankacctname', width: 160, x: 320, y: 307, tabIndex: 225,readOnly: true},
		{xtype: 'label', html: '发票税额', width: 60, x: 540, y: 309},
		{xtype: 'textfield', name: 'taxrate', width: 180, x: 625, y: 307, tabIndex: 226,readOnly: true},
		{xtype: 'label', html: '账号', width: 60, x: 5, y: 339},
		{xtype: 'textfield', name: 'bankacctno', width: 150, x: 70, y: 337, tabIndex: 227,readOnly: true},
		{xtype: 'label', html: '开户行地址', width: 60, x: 255, y: 339},
		{xtype: 'textfield', name: 'bankaddr', width: 160, x: 320, y: 337, tabIndex: 228,readOnly: true},
		{xtype: 'label', html: '工商登记号', width: 60, x: 5, y: 369},
		{xtype: 'textfield', name: 'abicregno', width: 410, x: 70, y: 367, tabIndex: 229,readOnly: true},
		{xtype: 'label', html: '纳税人类型', width: 60, x: 540, y: 339},
		{xtype: 'radio', name:'taxtype',inputValue:1, boxLabel:'一般纳税人', width: 180, x:625, y: 337,tabIndex: 230,allowBlank:true},
		{xtype: 'radio', name:'taxtype',inputValue:2, boxLabel:'小规模税人', width: 180, x: 625, y: 367,tabIndex: 253,allowBlank:true},
		{xtype: 'radio', name:'taxtype',inputValue:0, boxLabel:'', width: 50, x: 625, y: 810,tabIndex: 254,hidden:true,allowBlank:true},
		{xtype: 'label', html: '备注', width: 60, x: 5, y: 399},
		{xtype: 'textarea', name: 'remarks', width: 410, height:65, x: 70, y: 397, tabIndex: 231,readOnly: true},
		{xtype:'checkbox',name:'isbizlicence', width:100,boxLabel:'营业执照',x:540, y:397,tabIndex: 232,allowBlank:true},
		{xtype:'checkbox',name:'istaxregcert', width:100,boxLabel:'税务登记证',x:660, y:397,tabIndex: 233,allowBlank:true},
		{xtype: 'label', html: '关键字', width: 60, x: 540, y: 429},
		{xtype: 'textfield', name: 'abstractdesc', width: 180, x: 625, y: 427, tabIndex: 234,readOnly: true},
		{xtype: 'label', html: '获客渠道', width: 60, x: 540, y: 459},
		{xtype: 'textfield', name: 'chrval02', width: 180, x: 625, y: 457, tabIndex: 235,readOnly: true},
		{xtype: 'label', html: '状态', width: 60, x: 5, y: 469},
		{xtype: 'radio', name:'inused',inputValue:1, boxLabel:'成交', width: 60, x:70, y: 467, tabIndex: 236, disabled:true},
		{xtype: 'radio', name:'inused',inputValue:-1, boxLabel:'潜在', width:60, x: 140, y: 467, tabIndex: 237, disabled:true},
		{xtype: 'radio', name:'inused',inputValue:0, boxLabel:'流失', width: 60, x:210, y: 467, tabIndex: 238, disabled:true},
		{xtype: 'radio', name:'inused',inputValue:2, boxLabel:'目标', width: 60, x:280, y: 467, tabIndex: 239, disabled:true},
		{xtype: 'radio', name:'inused',inputValue:3, boxLabel:'放弃', width: 60, x:350, y: 467, tabIndex: 240, disabled:true},
		{xtype:'label',html:'客户类型',width:60,x:845,y:9},
		{xtype:'label',html:'海运客户',width:60,x:865,y:29},
		{xtype:'checkbox',name:'isshipping',inputValue:1, width:60,x:945, y:27, tabIndex: 241,allowBlank:true},
		{xtype:'label',html:'空运客户',width:60,x:865,y:49},
		{xtype:'checkbox',name:'isair',inputValue:1, width:60,x:945, y:47, tabIndex: 242,allowBlank:true},
		{xtype:'label',html:'陆运客户',width:60,x:865,y:69},
		{xtype:'checkbox',name:'ishau',inputValue:1, width:60,x:945, y:67, tabIndex: 243,allowBlank:true},
		{xtype:'label',html:'铁运客户',width:60,x:865,y:89},
		{xtype:'checkbox',name:'istrain',inputValue:1, width:60,x:945, y:87, tabIndex: 244,allowBlank:true},
		{xtype:'label',html:'报关客户',width:60,x:865,y:109},
		{xtype:'checkbox',name:'isclifordecl',inputValue:1, width:60,x:945, y:107, tabIndex: 245,allowBlank:true},
		{xtype:'label',html:'仓储客户',width:60,x:865,y:129},
		{xtype:'checkbox',name:'iscliforstk',inputValue:1, width:60,x:945, y:127, tabIndex: 246,allowBlank:true},
		{xtype:'label',html:'快递客户',width:60,x:865,y:149},
		{xtype:'checkbox',name:'isexpress',inputValue:1, width:60,x:945, y:147, tabIndex: 247,allowBlank:true},
		{xtype:'label',html:'贸易公司',width:60,x:865,y:169},
		{xtype:'checkbox',name:'istradeco',inputValue:1, width:60,x:945, y:167, tabIndex: 248,allowBlank:true},
		{xtype:'label',html:'生产厂家',width:60,x:865,y:189},
		{xtype:'checkbox',name:'isfactory',inputValue:1, width:60,x:945, y:187, tabIndex: 249,allowBlank:true},
		{xtype:'label',html:'货代公司',width:60,x:865,y:209},
		{xtype:'checkbox',name:'isforwarder',inputValue:1, width:60,x:945, y:207, tabIndex: 250,allowBlank:true},
		{xtype:'label',html:'公海客户',width:60,x:865,y:229},
		{xtype:'checkbox',name:'chrval01',inputValue:'Y', width:60,x:945, y:227, tabIndex: 2510, disabled:true},
		{xtype:'label',html:'公海流转',width:60,x:865,y:249},
		{xtype:'checkbox',name:'chrval03',inputValue:'Y', width:60,x:945, y:247, tabIndex: 252, disabled:true},
		]},
];
crmcliView.othFields = [
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

crmcliView.formBase = new Ext.form.FormPanel({
	region: 'center',
	height: 450,
	border: false,
	bodyStyle: 'padding:5px',
	autoScroll: true,
	bodyCssClass: 'ne-form-panel',
	items:crmcliView.baseFields
});
crmcliView.formOth = new Ext.form.FormPanel({
	region: 'center',
	height: 360,
	border: false,
	bodyStyle: 'padding:5px',
	autoScroll: true,
	bodyCssClass: 'ne-form-panel',
	items:crmcliView.othFields
});

crmcliView.portPanel = new Ext.grid.GridPanel({
	region:'center'
	,border: true
	,margins: '2 2 2 2'
	,store:crmcliView.portStore
	,cm:crmcliView.portCM
	,height: 380
	,tbar: new HY.Cmp.DtlToolbar({
		statusConfig: [{actionNew: '11'} ,{actionModify: '11'} ,{actionDelete: '11'}],
		setAction: function(actid) {
			if (actid == HY.Cmp.actions.New) {
				crmcliView.doNewPort();
			} else if (actid == HY.Cmp.actions.Modify) {
				crmcliView.doModifyPort();
			} else if (actid == HY.Cmp.actions.Delete) {
				crmcliView.doDeletePort();
			}
		}
	})
});
crmcliView.countryPanel = new Ext.grid.GridPanel({
	region:'center'
	,border: true
	,margins: '2 2 2 2'
	,store:crmcliView.countryStore
	,cm:crmcliView.countryCM
	,height: 380
	,tbar: new HY.Cmp.DtlToolbar({
		statusConfig: [{actionNew: '11'} ,{actionModify: '11'} ,{actionDelete: '11'}],
		setAction: function(actid) {
            if (actid == HY.Cmp.actions.New) {
            	crmcliView.doNewCountry()
			} else if (actid == HY.Cmp.actions.Modify) {
				crmcliView.doModifyCountry();
			} else if (actid == HY.Cmp.actions.Delete) {
				crmcliView.doDeleteCountry();
			}
		}
	})
});
crmcliView.accPanel = new Ext.grid.GridPanel({
	region:'center'
	,border: true
	,margins: '2 2 2 2'
	,store:crmcliView.accStore
	,cm:crmcliView.accCM
	,height: 380
});


crmcliView.hkupStaStore = HY.Cmp.createJsonStore({
	fields: ['clientid','cliname_c','result'],
	url: crmcliView.ctx + '/chkcliname.do',
	sortInfo: {}
});
crmcliView.hkupStaCM = new Ext.grid.ColumnModel({
	columns: [
		new Ext.grid.RowNumberer({width:36}),
		 {header: '客户名称', dataIndex:'cliname_c', width:120, align:'left', sortable: true},
		 {header: '查重结果', dataIndex:'result', width:420, align:'left', sortable: true}
	],
	defaults: HY.Cmp.cmDefaults
});
crmcliView.chkupStaPanel = new Ext.grid.GridPanel({
	region:'center'
	,border: true
	,margins: '2 2 2 2'
	,store:crmcliView.hkupStaStore
	,cm:crmcliView.hkupStaCM
	,bbar: new HY.Cmp.PagingToolbar({pageSize:30,tarObj: crmcliView, store: crmcliView.hkupStaStore})
	,height: 380
	,width:640
});
crmcliView.chkupStaQueryPanel = new Ext.form.FormPanel({
	region:'north',
	height:36,
	border:false,
	items:[
		{layout: 'absolute' ,border: false ,height: 36 ,items:[
			{xtype: 'label' ,html: '客户名称' ,width: 65 ,x: 5 ,y: 6},
			{xtype: 'textfield' ,name: 'cliname' ,width: 120 ,x: 70 ,y: 6}
		]}
	],
	keys: [{
		key: [10,13]
		,fn: function() {
			crmcliView.popChkupstaEnter();
		}
	}]
});

/**
* 查询面板
*/
crmcliView.queryPanel = new HY.Cmp.QueryPanel({
	tarObj:crmcliView,
	tbarConfig:{editMode: 0, enableNav: false, statusConfig: ['Modify#!00']},
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
crmcliView.mainPanel = new Ext.grid.GridPanel({
	region: 'center',
	border: false,
	margins: '0 0',
	store: crmcliView.mainStore,
	cm: crmcliView.mainCM,
	bbar: new HY.Cmp.PagingToolbar({pageSize:30,tarObj: crmcliView, store: crmcliView.mainStore}),
	listeners:{
		'rowdblclick': function() {
			crmcliView.doModify()
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
crmcliView.mainWindow = new Ext.Window({
	tbar: new HY.Cmp.Toolbar({
		tarObj: crmcliView,
		editMode: 1,
		enableNav: true,
		statusConfig: [],
		actionCustom1:new Ext.Action({text:'查看附件', iconCls: 'tbar-attach',handler:function(){
			var frm = crmcliView.formBase.getForm();
			var pkval = HY.fv(frm,'clientid');
			crmcliView.showAttach(pkval);
		}})
	}),
	iconCls: crmcliView.iconCls,
	title: crmcliView.title,
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
						crmcliView.formBase
					]
				},
				{
					layout: 'border',
					title: '企业简介',
					items:[
						crmcliView.formOth
					]
				},
				
			]
		}),
		new Ext.TabPanel({
			id:'con-lists',
			region: 'south',
			activeTab: 0,
			height:300,
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
					title: '拜访历史',
					items:[
						crmcliView.accPanel
					]
				},
				{
					layout: 'border',
					title: '装卸港口',
					items:[
						crmcliView.portPanel
					]
				},
				{
					layout: 'border',
					title: '贸易国家',
					items:[
						crmcliView.countryPanel
					]
				}
			]
		})
	]
});

/**
 * 新增客户编辑窗口
 */
crmcliView.editNewCliWin = new HY.Cmp.WindowEditMst ({
	tbar: new HY.Cmp.Toolbar({
		editMode: 1,
		enableNav: true,
		setAction: function(actid) {
			if (actid == HY.Cmp.actions.New['code']) {
				
			} else if (actid == HY.Cmp.actions.Modify['code']) {
				
			} else if (actid == HY.Cmp.actions.Save['code']) {
				crmcliView.doNewSave();
			} else if (actid == HY.Cmp.actions.Delete['code']) {
				
			} else if (actid == HY.Cmp.actions.Close['code']) {
				crmcliView.doEditClose();
			} else if (actid == HY.Cmp.actions.Prevrow['code']) {
				
			} else if (actid == HY.Cmp.actions.Nextrow['code']) {
				
			} else if (actid == HY.Cmp.actions.Refresh['code']) {
				
			}
		}
	}),
	title: '新增客户',
	formFields: [
		  {xtype:"hidden",name:"clientid"},
		  {
			layout:'absolute', height: 320, border: true,items:[
				{xtype: 'label', html: '客户名称(中文)', width: 100, x: 5, y: 9,cls: 'x-required'},
				{xtype: 'textfield', name: 'cliname_c', width: 200, x: 105, y: 7, tabIndex: 601,allowBlank: false},
				new Ext.Button({x:325,y:7,tabIndex:608,text:'客户查重', width:80,handler:function(){
					var frm = crmcliView.editNewCliWin.formPanel.getForm();
					var cliname = HY.fv(frm, 'cliname_c');
					var params = {"cliname":cliname};
					crmcliView.popChkupsta(params);
					// HY.AjaxRequest({
					// 	params: params,
					// 	showWat: true,
					// 	url: crmcliView.ctx +'/chkcliname.do',
					// 	callback: function(datobj) {
							
					// 	}
					// });
				}}),
				{xtype: 'label', html: '客户名称(英文)', width: 100, x: 5, y: 39},
				{xtype: 'textfield', name: 'cliname_e', width: 200, x: 105, y: 37, tabIndex: 602},
				{xtype: 'label', html: '客户简称', width: 100, x: 5, y: 69},
				{xtype: 'textfield', name: 'cliabbr', width: 200, x: 105, y: 67, tabIndex: 603},
				{xtype: 'label', html: '联系人', width: 100, x: 5, y: 99},
				{xtype: 'textfield', name: 'cliconta1', width: 200, x: 105, y: 97, tabIndex: 604},
				{xtype: 'label', html: '电话', width: 100, x: 5, y: 129},
				{xtype: 'textfield', name: 'clitel1', width: 200, x: 105, y: 127, tabIndex: 605},
				{xtype: 'label', html: '地址(中文)', width: 100, x: 5, y: 159},
				{xtype: 'textarea', name: 'cliaddr_c', width: 200,height:45, x: 105, y: 157, tabIndex: 606},
				{xtype: 'label', html: '地址(英文)', width: 100, x: 5, y: 219},
				{xtype: 'textarea', name: 'cliaddr_e', width: 200,height:45, x: 105, y: 217, tabIndex: 607},
		    ]
		  }
	],
	height: 400,
	width: 800
});

/**
 * 装卸港口编辑窗口
 */
crmcliView.editPortWin = new HY.Cmp.WindowEditMst ({
	tbar: new HY.Cmp.Toolbar({
		editMode: 1,
		enableNav: true,
		setAction: function(actid) {
			if (actid == HY.Cmp.actions.New['code']) {
			  crmcliView.doNewPort();
			} else if (actid == HY.Cmp.actions.Modify['code']) {
				
			} else if (actid == HY.Cmp.actions.Save['code']) {
			   crmcliView.doSavePort();
			} else if (actid == HY.Cmp.actions.Delete['code']) {
				
			} else if (actid == HY.Cmp.actions.Close['code']) {
				crmcliView.doClosePort();
			} else if (actid == HY.Cmp.actions.Prevrow['code']) {
				
			} else if (actid == HY.Cmp.actions.Nextrow['code']) {
				
			} else if (actid == HY.Cmp.actions.Refresh['code']) {
				
			}
		}
	}),
	title: '装卸港口编辑',
	formFields: [
	  {xtype: 'hidden', name:'pkid',},
	  {xtype: 'hidden', name:'clientid',},
	  {xtype: 'hidden', name:'portid',},
	  {
		layout:'absolute', height: 260, border: true,items:[
			{xtype: 'label', html: '港口代码', width: 60, x: 5, y: 9,cls: 'x-required'},
			{xtype: 'textfield', name: 'portcode', width: 140, x: 70, y: 7, tabIndex: 401,allowBlank: false},
			HY.Cmp.createQryClrButton({btn1:{x: 210, y: 7, fn: function(){ HY.Const.popPort({callback: crmcliView.setEditPort}); }}, btn2:{x: 230, y: 7, fn: function(){ crmcliView.clearPop('port'); }}}),
			{xtype: 'label', html: '港口名称', width: 60, x: 5, y: 39},
			{xtype: 'textfield', name: 'portname_e', width: 180, x: 70, y: 37, tabIndex: 402},
			{xtype: 'label', html: '装货港', width: 60, x: 5, y: 69},
			{xtype: 'checkbox', name: 'isloading', inputValue:1, width: 50, x: 70, y: 67, tabIndex: 403},
			{xtype: 'label', html: '卸货港', width: 60, x: 130, y: 69},
			{xtype: 'checkbox', name: 'isdischarge', inputValue:1, width: 50, x: 195, y: 67, tabIndex: 404},
			{xtype: 'label', html: '目的港', width: 60, x: 255, y: 69},
			{xtype: 'checkbox', name: 'isdestination', inputValue:1, width: 50, x: 320, y: 67, tabIndex: 405},
			{xtype: 'label', html: '备注', width: 60, x: 5, y: 99},
			{xtype: 'textarea', name: 'remarks', width: 265, height:45,x: 70, y: 97, tabIndex: 406},
	    ]
	  }
	],
	height: 320,
	width: 800
});

/**
 * 贸易国家编辑窗口
 */
crmcliView.editCounWin = new HY.Cmp.WindowEditMst ({
	tbar: new HY.Cmp.Toolbar({
		editMode: 1,
		enableNav: true,
		setAction: function(actid) {
			if (actid == HY.Cmp.actions.New['code']) {
				crmcliView.doNewCountry()
			} else if (actid == HY.Cmp.actions.Modify['code']) {
				
			} else if (actid == HY.Cmp.actions.Save['code']) {
			    crmcliView.doSaveCountry()
			} else if (actid == HY.Cmp.actions.Delete['code']) {
				
			} else if (actid == HY.Cmp.actions.Close['code']) {
				crmcliView.doCloseCountry();
			} else if (actid == HY.Cmp.actions.Prevrow['code']) {
				
			} else if (actid == HY.Cmp.actions.Nextrow['code']) {
				
			} else if (actid == HY.Cmp.actions.Refresh['code']) {
				
			}
		}
	}),
	title: '贸易国家编辑',
	formFields: [
		  {xtype: 'hidden', name:'pkid',},
		  {xtype: 'hidden', name:'clientid',},
		  {xtype: 'hidden', name:'countryid',},
		  {
			layout:'absolute', height: 260, border: true,items:[
				{xtype: 'label', html: '国家代码', width: 60, x: 5, y: 9},
				{xtype: 'textfield', name: 'councode', width: 140, x: 70, y: 7, tabIndex: 501},
				HY.Cmp.createQryClrButton({btn1:{x: 210, y: 7, fn: function(){ crmcliView.popCountry({callback: crmcliView.setEditCountry}); }}, btn2:{x: 230, y: 7, fn: function(){ crmcliView.clearPop('editcoun'); }}}),
				{xtype: 'label', html: '国家名称', width: 60, x: 5, y: 39},
				{xtype: 'textfield', name: 'counname_e', width: 180, x: 70, y: 37, tabIndex: 502},
				{xtype: 'label', html: '进出口', width: 60, x: 5, y: 69},
				HY.Const.createNCombo ([['I','进口'],['O','出口']], {hiddenName: 'impexp',width: 180, x: 70, y: 67, editable: false, tabIndex: 503}),
				{xtype: 'label', html: '备注', width: 60, x: 5, y: 99},
				{xtype: 'textarea', name: 'remarks', width: 265, height:45,x: 70, y: 97, tabIndex: 506},
		    ]
		  }
	],
	height: 320,
	width: 800
});

crmcliView.chkupStaWin = new Ext.Window({
	title:'客户查重',
	width: 640,
	height: 420,
    layout:"border",
	model:true,
	closable: true,
	closeAction: "hide",
	iconCls: "icon-win",
	resizable: true,
	maximizable: false,
	maximized: false,
	items:[
		crmcliView.chkupStaQueryPanel,
		crmcliView.chkupStaPanel
	],
	onHide:function(){
		crmcliView.hkupStaStore.removeAll();
	},
	onDestroy:function(){
		Ext.destroy(
			crmcliView.chkupStaQueryPanel,
		    crmcliView.chkupStaPanel
	    );
	}
});


//-----------------功能函数
crmcliView.doNew = function(){
	var frm = crmcliView.editNewCliWin.formPanel.getForm();
	HY.Cmp.clearFormData(frm);
	crmcliView.editNewCliWin.show();
	frm.clearInvalid();
	frm.findField('cliname_c').focus(true,500);
};
crmcliView.doRefresh = function(){
	var me = this;
	if(me.mainWindow.isVisible()){
		var frm = me.formBase.getForm();
		var pkval = HY.fv(frm, me.pkName);
		if (HY.isNumber(pkval) && pkval > 0) {
			crmcliView.doLoadDetail(pkval, frm);
			crmcliView.doRefreshAcc(pkval);
			crmcliView.doRefreshCountry(pkval);
			crmcliView.doRefreshPort(pkval);
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
crmcliView.doModify = function(pktmp){
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
		me.doRefreshAcc(pkval);
		me.doRefreshCountry(pkval);
		me.doRefreshPort(pkval);
		me.mainWindow.show();
	}
};
crmcliView.doSave = function(){
	var me =this;
	var frm = me.formBase.getForm();
	var frm1 = me.formOth.getForm();
	if (!frm.isValid()) {
		return;
	}
	HY.confirm ({
		callback: function() {
			var params = frm.getValues();
			Ext.apply(params, frm1.getValues());
			HY.AjaxRequest({
				params: params,
				showWat: true,
				url: me.ctx + '/clisave.do',
				callback: function(datobj) {
					HY.fv(frm, me.pkName, (datobj && datobj.clientid) ? datobj.clientid : 0);
					me.doRefresh();
				}
			});
		}
	});
};
crmcliView.doNewSave = function(){
	var me =this;
	var frm = me.editNewCliWin.formPanel.getForm();
	if (!frm.isValid()) {
		return;
	}
	HY.confirm ({
		callback: function() {
			var params = frm.getValues();
			HY.AjaxRequest({
				params: params,
				showWat: true,
				showMsg: true,
				url: me.ctx + '/clisave.do',
				callback: function(datobj) {
					HY.fv(frm, me.pkName, (datobj && datobj.clientid) ? datobj.clientid : 0);
					me.doRefresh();
					crmcliView.autoAlloc(datobj.clientid);
					crmcliView.doEditClose();
				}
			});
		}
	});
};
crmcliView.doDelete = function(){
	var rec = this.mainPanel.getSelectionModel().getSelected();
	if( rec ) {
		var pkval = rec.get(crmcliView.pkName);
		var params = {"clientid": pkval};
		if (!HY.isNumber(pkval)) return;
		HY.confirm ({
			showWat: true,
			callback: function() {
				var url = crmcliView.ctx + '/clideteled.do';
				HY.AjaxRequest({url: url,params:params,showMsg: true, callback: function(datobj){
					crmcliView.mainStore.remove(rec);
				}});
			}
		});
	}
};
crmcliView.doLoadDetail = function(pkval, frm) {
	var me = this;
	var frm1 = me.formOth.getForm();
	if (!HY.isNumber(pkval)) {
		HY.alert("参数有误，请重试。");
		return;
	}
	var url = crmcliView.ctx + '/clidetail.do';
	HY.AjaxRequest({
		params:{"clientid":pkval},
		url: url,
		callback: function(datobj){
		HY.Cmp.clearFormData(frm);
		HY.Cmp.clearFormData(frm1);
		frm.setValues(datobj);
		frm1.setValues(datobj);
		frm.findField(crmcliView.codeName).focus(true,500);
	}});
};
crmcliView.doClose = function() {
	this.mainWindow.hide();
};
crmcliView.doEditClose = function() {
	this.editNewCliWin.hide();
};
// ------------------------------------- DB Info
crmcliView.doRefreshAcc = function(srvid) {
	var me = this;
	var pkval = srvid;
	if( HY.isNumber(pkval) && pkval != '0' ) {
		var params = {"clientid": pkval};
		Ext.apply (me.accStore.baseParams, params);
		me.accStore.load();
		return;
	} else {
		HY.alert('请先保存数据');
		return;
	}
};
crmcliView.doRefreshCountry = function(srvid) {
	var me = this;
	var pkval = srvid;
	if( HY.isNumber(pkval) && pkval != '0' ) {
		var params = {"clientid": pkval};
		Ext.apply (me.countryStore.baseParams, params);
		me.countryStore.load();
		return;
	} else {
		HY.alert('请先保存数据');
		return;
	}
};
crmcliView.doRefreshPort = function(srvid) {
	var me = this;
	var pkval = srvid;
	if( HY.isNumber(pkval) && pkval != '0' ) {
		var params = {"clientid": pkval};
		Ext.apply (me.portStore.baseParams, params);
		me.portStore.load();
		return;
	} else {
		HY.alert('请先保存数据');
		return;
	}
};
crmcliView.doNewPort = function(){
	var me = this;
	var mfrm = me.formBase.getForm();
	var mpkval = HY.fv(mfrm, me.pkName);
	if (HY.isNumber(mpkval) && mpkval != '0') {
		//
	} else {
		HY.alert('请先保存数据');
		return;
	}
	var frm = me.editPortWin.formPanel.getForm();
	HY.Cmp.clearFormData(frm);
	me.editPortWin.show();
	
	HY.fv(frm, 'clientid', mpkval);
	
	frm.clearInvalid();
	frm.findField('portid').focus(true,500);
};
crmcliView.doSavePort = function(){
	var me = this;
	var frm = me.editPortWin.formPanel.getForm();
	if (!frm.isValid()) {
		return;
	}
	HY.confirm({
		callback:function(){
			var params = frm.getValues();
			HY.AjaxRequest({
				params: params,
				showWat: true,
				url: me.ctx + '/cliportsave.do',
				callback: function(datobj) {
					HY.fv(frm, 'pkid', datobj);
					me.doRefreshPort(HY.fv(frm, 'clientid'));
					me.countryStore.load();
					me.editPortWin.hide()
				}
			});
		}
	});
};
crmcliView.doModifyPort= function(){
	var me = this;
	var frm = me.editPortWin.formPanel.getForm();
	var rec = me.portPanel.getSelectionModel().getSelected();
	if( rec ) {
		var pkval = rec.get('pkid');
		var lnkid = rec.get('clientid');
		me.doLoadDetailPort(pkval, frm, lnkid);
		me.editPortWin.show();
	}
};
crmcliView.doDeletePort = function(){
	var rec = this.portPanel.getSelectionModel().getSelected();
	if( rec ) {
		var pkval = rec.get('pkid');
		var params = {"pkid": pkval};
		if (!HY.isNumber(pkval)) return;
		HY.confirm ({
			showWat: true,
			callback: function() {
				var url = crmcliView.ctx + '/portdeteled.do';
				HY.AjaxRequest({url: url,params:params,showMsg: true, callback: function(datobj){
					crmcliView.portStore.remove(rec);
				}});
			}
		});
	}
};
crmcliView.doLoadDetailPort = function(pkval, frm, lnkid) {
	if (!HY.isNumber(pkval)) {
		HY.alert("参数有误，请重试。");
		return;
	}
	HY.AjaxRequest({
		params: {"pkid":pkval,"clientid":lnkid},
		showWat: true,
		url: crmcliView.ctx + '/getport.do',
		callback: function(datobj) {
			HY.Cmp.clearFormData(frm);
			frm.setValues(datobj);
			frm.findField('portcode').focus(true,500);
		}
	});
};
crmcliView.doClosePort = function() {
	this.editPortWin.hide()
};
crmcliView.doNavPort = function(inc) {
	//
};
crmcliView.doNewCountry = function(){
	var me = this;
	var mfrm = me.formBase.getForm();
	var mpkval = HY.fv(mfrm, me.pkName);
	if (HY.isNumber(mpkval) && mpkval != '0') {
		//
	} else {
		HY.alert('请先保存数据');
		return;
	}
	var frm = me.editCounWin.formPanel.getForm();
	HY.Cmp.clearFormData(frm);
	me.editCounWin.show();
	
	HY.fv(frm, 'clientid', mpkval);
	
	frm.clearInvalid();
	frm.findField('countryid').focus(true,500);
};
crmcliView.doSaveCountry = function(){
	var me = this;
	var frm = me.editCounWin.formPanel.getForm();
	if (!frm.isValid()) {
		return;
	}
	HY.confirm({
		callback:function(){
			var params = frm.getValues();
			HY.AjaxRequest({
				params: params,
				showWat: true,
				url: me.ctx + '/clicounsave.do',
				callback: function(datobj) {
					HY.fv(frm, 'pkid', datobj);
					me.doRefreshCountry(HY.fv(frm, 'clientid'));
					me.countryStore.load();
					me.editCounWin.hide();
				}
			});
		}
	});
};
crmcliView.doModifyCountry = function(){
	var me = this;
	var frm = me.editCounWin.formPanel.getForm();
	var rec = me.countryPanel.getSelectionModel().getSelected();
	if( rec ) {
		var pkval = rec.get('pkid');
		var lnkid = rec.get('clientid');
		me.doLoadDetailCountry(pkval, frm, lnkid);
		me.editCounWin.show();
	}
};
crmcliView.doDeleteCountry = function(){
	var rec = this.countryPanel.getSelectionModel().getSelected();
	if( rec ) {
		var pkval = rec.get('pkid');
		var params = {"pkid": pkval};
		if (!HY.isNumber(pkval)) return;
		HY.confirm ({
			showWat: true,
			callback: function() {
				var url = crmcliView.ctx + '/coundeteled.do';
				HY.AjaxRequest({url: url,params:params,showMsg: true, callback: function(datobj){
					crmcliView.countryStore.remove(rec);
				}});
			}
		});
	}
};
crmcliView.doLoadDetailCountry = function(pkval, frm, lnkid) {
	if (!HY.isNumber(pkval)) {
		HY.alert("参数有误，请重试。");
		return;
	}
	HY.AjaxRequest({
		params: {"pkid":pkval,"clientid":lnkid},
		showWat: true,
		url: crmcliView.ctx + '/getcountry.do',
		callback: function(datobj) {
			HY.Cmp.clearFormData(frm);
			frm.setValues(datobj);
			frm.findField('councode').focus(true,500);
		}
	});
};
crmcliView.doCloseCountry = function() {
	this.editCounWin.hide();
};
crmcliView.doNavCountry = function(inc) {
	//
};
// -------------------------
crmcliView.clearPop = function(type){
	var me = this;
	var frm = crmcliView.formBase.getForm();
	var frm1 = crmcliView.editPortWin.formPanel.getForm();
	var frm2 = crmcliView.editCounWin.formPanel.getForm();
	if(type == 'area'){
		HY.fv(frm, 'areaid', '');
		HY.fv(frm, 'areacode', '');
	}
	if(type == 'country'){
		HY.fv(frm, 'counid', '');
		HY.fv(frm, 'councode', '');
	}
	if(type == 'port'){
		HY.fv(frm1, 'portid', '');
		HY.fv(frm1, 'portcode', '');
		HY.fv(frm1, 'portname_e', '');
	}
	if(type == 'editcoun'){
		HY.fv(frm2, 'countryid', '');
		HY.fv(frm2, 'councode', '');
		HY.fv(frm2, 'counname_e', '');
	}
};
crmcliView.setArea = function(record){
	var frm = crmcliView.formBase.getForm();
	if(record){
		HY.fv(frm ,'areaid' ,record.data['areaid']);
		HY.fv(frm ,'areacode' ,record.data['areacode']);
	}
};
crmcliView.setCountry= function(record){
	var frm = crmcliView.formBase.getForm();
	if(record){
		HY.fv(frm ,'counid' ,record.data['countryid']);
		HY.fv(frm ,'councode' ,record.data['councode']);
	}
};
crmcliView.setEditCountry= function(record){
	var frm = crmcliView.editCounWin.formPanel.getForm();
	if(record){
		HY.fv(frm ,'countryid' ,record.data['countryid']);
		HY.fv(frm ,'councode' ,record.data['councode']);
		HY.fv(frm ,'counname_e' ,record.data['counname_e']);
	}
};
crmcliView.setEditPort= function(record){
	var frm = crmcliView.editPortWin.formPanel.getForm();
	if(record){
		HY.fv(frm ,'portid' ,record.data['portid']);
		HY.fv(frm ,'portcode' ,record.data['portcode']);
		HY.fv(frm ,'portname_e' ,record.data['portname_e']);
	}
};
crmcliView.popArea = function(configs){
	var win_id = configs.id || 'area';
	HY.Cmp.createPopQuery({
		id: 'ppw_' + win_id
		,width: 618
		,dataUrl: ctx + '/combo/area.do'
		,dataParams: {}
		,fields: ['areaid','areacode','areaname_c','areaname_e']
		,colModel: new Ext.grid.ColumnModel([
			new Ext.grid.RowNumberer({width: 30})
			,{header: '区域代码' ,dataIndex: 'areacode' ,width: 100}
			,{header: '区域名称' ,dataIndex: 'areaname_c' ,width: 140}
			,{header: '区域名称(英文)' ,dataIndex: 'areaname_e' ,width: 240}
		])
		,handler: function(grid ,rowIndex ,e) {
			var record = grid.store.getAt(rowIndex);
			if (configs.callback && typeof configs.callback == 'function') {
				configs.callback (record);
			}
		}
	});
};
crmcliView.popCountry = function(configs){
	var win_id = configs.id || 'country';
	HY.Cmp.createPopQuery({
		id: 'ppw_' + win_id
		,width: 618
		,dataUrl: ctx + '/combo/country.do'
		,dataParams: {}
		,fields: ['countryid','councode','counname_c','counname_e']
		,colModel: new Ext.grid.ColumnModel([
			new Ext.grid.RowNumberer({width: 30})
			,{header: '国家代码' ,dataIndex: 'councode' ,width: 100}
			,{header: '国家名称' ,dataIndex: 'counname_c' ,width: 140}
			,{header: '国家名称(英文)' ,dataIndex: 'counname_e' ,width: 240}
		])
		,handler: function(grid ,rowIndex ,e) {
			var record = grid.store.getAt(rowIndex);
			if (configs.callback && typeof configs.callback == 'function') {
				configs.callback (record);
			}
		}
	});
};
crmcliView.autoAlloc = function(srvid){
	var pkval = srvid;
	var url = crmcliView.ctx + '/alloc.do';
	HY.AjaxRequest({
		params:{"clientid":pkval},
		url: url,
		callback: function(datobj){
			
	}});
};

crmcliView.showAttach = function(datpkid){
	var me = this;
	if( HY.isNumber(datpkid) && datpkid > 0) {
		
	} else {
		HY.alert('请先保存数据');
		return;
	}
	HY.Const.popEdocView(datpkid, {
		editable: true
	});
};

crmcliView.popChkupsta = function(params){
	crmcliView.hkupStaStore.removeAll();
	Ext.apply(crmcliView.hkupStaStore.baseParams,params);
	crmcliView.hkupStaStore.load();
	crmcliView.chkupStaWin.show();
};
crmcliView.popChkupstaEnter =function(){
	var frm = crmcliView.chkupStaQueryPanel.getForm();
	var params = {};
	Ext.apply (params, frm.getValues());
	Ext.apply (crmcliView.hkupStaStore.baseParams, params);
	crmcliView.hkupStaStore.load();
};
