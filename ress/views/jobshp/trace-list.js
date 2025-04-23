Ext.ns("Ext.HY.ShptraView");
var shptraView = Ext.HY.ShptraView;

Ext.apply(shptraView,{
	ctx:ctx + '/jobshp/trace', pkName: 'jobid', codeName:'', title:'海运货物追踪', iconCls:'nav-shptrace'
});

Ext.onReady(function(){
	Ext.QuickTips.init();
	
	var viewport = new Ext.Viewport({
		layout:'border',
		items:[
			shptraView.queryPanel,
			shptraView.mainPanel
		]
	});
	viewport.doLayout();
	
})

// ------------ 零部件

shptraView.mainStore = HY.Cmp.createJsonStore({
	fields: ['jobid', 'shpid' , 'jobno', 'jobid_sep', 'jobid_com', 'jobdate', 'clititle', 'salescode', 'refno', 'subscribed', 'subsdate', 'subsoprby', 'subsoprbycode', 'subsmode', 'ackupdate', 'ackdate', 'datid', 'ackresults', 'shpdate', 'shpyear', 'shprtitle', 'shptype', 'shprtel', 'shprmail', 'shprcontact', 'cnorid', 'cnorname', 'cneeid', 'cneename', 'notifyid', 'notifyparty', 'hagenid', 'hagentitle', 'hagenname', 'sodate', 'bltype', 'hbltype', 'mbltype', 'blnoh', 'blnom', 'precarr', 'placerecid', 'placerec', 'sono', 'shpnid', 'shpnabbr', 'shpntitle', 'lineid', 'ssid', 'vslid', 'vessel', 'voyage', 'pol', 'polid', 'pod', 'podid', 'pot', 'potid', 'dockid', 'dockname', 'placedel', 'pldid', 'destination', 'goodsid', 'goodsname', 'placeissued', 'gdskindid', 'gdskind', 'shpned', 'servicetype', 'vesseled', 'voyageed', 'blnomed', 'jobdays',  'oprdays', 'shpdays', 'sodays','etddays','etadays','cmddays','loaddays','dcldays','compdays', 'orgid', 'orgcode','createusercode','createtime','lastupdusercode','lastupdtime'],
	url: shptraView.ctx + '/datlst.do',
	sortInfo: {field: 'jobid', direction: 'DESC'}
});

shptraView.renderDtl = function(value, metaData, record, rowIndex, colIndex, store) {
	var s = '<a href="javascript:void(0)" onclick="HY.openInMain (\'' + value + '\', \''+HY.ls('9460','海运货物追踪详情')+'\', \'/sapi/cargotrace/view.do?shpid=' + value + '\', {iconCls: \'nav-shptrace\'})" >'+ HY.ls('8117','详情') +'</a>';
	return s;
};
shptraView.renderLocDtl = function(value, metaData, record, rowIndex, colIndex, store) {
	var s = '<a href="javascript:void(0)" onclick="HY.openInMain (\'' + value + '\', \''+_defLsCargoTitle+'\', \'/sapi/cargotrace/viewloc.do?shpid=' + value + '\', {iconCls: \'nav-shptrace\'})" >详情</a>';
	return s;
};

shptraView.mainCM = new Ext.grid.ColumnModel({
	columns:[
		new Ext.grid.RowNumberer({width:36}),
		{header: HY.ls('7648','状态更新'), dataIndex: 'ackupdate', width: 100, align: 'center', sortable: true, renderer: HY.renderAsCheckbox},
		{header: HY.ls('7649','更新日期'), dataIndex: 'ackdate', width:120, align: 'center', sortable: true, renderer:HY.renderAsDate},
		{header: HY.ls('9451','在线动态'), dataIndex: 'shpid', width:120, align: 'center', sortable: true, renderer:shptraView.renderDtl},
		{header: HY.ls('1422','工作号'), dataIndex: 'jobno', width:120, sortable: true},
		{header: HY.ls('1867','工作单日期'), dataIndex: 'jobdate', width:120, align: 'center', sortable: true, renderer:HY.renderAsDate},
		{header: HY.ls('1973','委托人'), dataIndex: 'clititle', width:160, sortable: true},
		{header: HY.ls('1253','业务员'), dataIndex: 'salescode', width:80, align: 'center', sortable: true},
		{header: HY.ls('1656','参考号'), dataIndex: 'refno', width:120, sortable: true},
		{header: HY.ls('3798','船公司简称'), dataIndex: 'shpnabbr', width: 140, align: 'center', sortable: true},
		{header: HY.ls('1423','订舱号'), dataIndex: 'sono', width: 120, sortable: true},
		{header: HY.ls('1868','订舱日期'), dataIndex: 'sodate', width:120, sortable: true, align:'center', renderer:HY.renderAsDate},
		{header: HY.ls('2649','船名'), dataIndex: 'vessel', width: 120, align: 'center', sortable: true},
		{header: HY.ls('2650','航次'), dataIndex: 'vovyage', width: 80, align: 'center', sortable: true},
		{header: HY.ls('2158','装货港'), dataIndex: 'pol', width: 160,  sortable: true},
		{header: HY.ls('2157','卸货港'), dataIndex: 'pod', width: 160,  sortable: true},
		{header: HY.ls('2830','码头'), dataIndex: 'dockname', width: 160,  sortable: true},
		{header: HY.ls('1629','目的港'), dataIndex: 'placedel', width: 160,  sortable: true},
		{header: HY.ls('2394','目的地'), dataIndex: 'destination', width: 160, sortable: true},
		{header: HY.ls('2954','中转港'), dataIndex: 'pot', width: 160, sortable: true},
		{header: HY.ls('1668','发货人'), dataIndex: 'cnorname', width:160, sortable: true},
		{header: HY.ls('1750','收货人'), dataIndex: 'cneename', width:160, sortable: true},
		{header: HY.ls('1751','通知人'), dataIndex: 'notifyparty', width:80, sortable: true},
		{header: HY.ls('1753','HBL代理'), dataIndex: 'hagenname', width:160, sortable: true},
		{header: HY.ls('7644','订阅'), dataIndex: 'subscribed', width: 50, align: 'center', sortable: true, renderer: HY.renderAsCheckbox},
		{header: HY.ls('7645','订阅日期'), dataIndex: 'subsdate', width:120, sortable: true, align:'center', renderer:HY.renderAsDate},
		{header: HY.ls('7647','订阅人'), dataIndex: 'subsoprbycode', align: 'center', width:80, sortable: true},
		{header: HY.ls('7646','订阅方式'), dataIndex: 'subsmode', width:80, align: 'center', sortable: true},
		{header: HY.ls('7681','返回值'), dataIndex: 'ackresults', width: 50, align: 'center', sortable: true, renderer: HY.renderAsCheckbox},
		{header: HY.ls('3788','海运日期'), dataIndex: 'shpdate', width:120, align: 'center', sortable: true, renderer:HY.renderAsDate},
		{header: HY.ls('1711','提单类型'), dataIndex: 'bltype', width:80, align: 'center', sortable: true},
		{header: HY.ls('2532','HBL类型'), dataIndex: 'hbltype', width:80, align: 'center', sortable: true},
		{header: HY.ls('2554','MBL类型'), dataIndex: 'mbltype', width:80, align: 'center', sortable: true},
		{header: HY.ls('3548','HBL号码'), dataIndex: 'blnoh', width:100, align: 'center', sortable: true},
		{header: HY.ls('3790','MBL号码'), dataIndex: 'blnom', width:100, align: 'center', sortable: true},
		{header: HY.ls('2648','前程运输'), dataIndex: 'precarr', width:100, sortable: true},
		{header: HY.ls('2741','收货地址'), dataIndex: 'placerec', width:160, sortable: true},
		{header: HY.ls('1110','货物名称'), dataIndex: 'goodsname', width: 160, sortable: true},
		{header: HY.ls('2388','签单地点'), dataIndex: 'placeissued', width: 160, sortable: true},
		{header: HY.ls('2979','货类'), dataIndex: 'gdskind', width: 140, sortable: true},
		{header: HY.ls('7653','已录入船公司'), dataIndex: 'shpned', width: 100, align: 'center', sortable: true, renderer: HY.renderAsCheckbox},
		{header: HY.ls('7641','已录入船名'), dataIndex: 'vesseled', width: 100, align: 'center', sortable: true, renderer: HY.renderAsCheckbox},
		{header: HY.ls('7642','已录入航次'), dataIndex: 'voyageed', width: 100, align: 'center', sortable: true, renderer: HY.renderAsCheckbox},
		{header: HY.ls('7643','已录入MBL'), dataIndex: 'blnomed', width: 100, align: 'center', sortable: true, renderer: HY.renderAsCheckbox},
		{header: HY.ls('7631','工作单天数'), dataIndex: 'jobdays', width: 100, align: 'center', sortable: true},
		{header: HY.ls('7632','工作单完成天数'), dataIndex: 'oprdays', width:100, align: 'center', sortable: true},
		{header: HY.ls('7633','委托单天数'), dataIndex: 'shpdays', width: 100, align: 'center', sortable: true},
		{header: HY.ls('7634','订舱天数'), dataIndex: 'sodays', width: 100,  align: 'center', sortable: true},
		{header: HY.ls('7635','离港天数'), dataIndex: 'etddays', width: 100, align: 'center', sortable: true},
		{header: HY.ls('3811','到港天数'), dataIndex: 'etadays', width: 100, align: 'center', sortable: true},
		{header: HY.ls('7636','截关天数'), dataIndex: 'cmddays', width: 100, align: 'center', sortable: true},
		{header: HY.ls('7637','装船天数'), dataIndex: 'loaddays', width: 100, align: 'center', sortable: true},
		{header: HY.ls('7638','报关天数'), dataIndex: 'dcldays', width: 100, align: 'center',  sortable: true},
		{header: HY.ls('7639','委托单完成天数'), dataIndex: 'compdays', width: 100, align: 'center',  sortable: true},
//		{header: '组织', dataIndex: 'orgcode', width: 80, sortable: true},
//		{header: '录入人', dataIndex: 'createusercode', width: 80, align: 'center', sortable: true},
//		{header: '录入日期', dataIndex: 'createtime', width:120, align: 'center', sortable: true, renderer:HY.renderAsDate},
//		{header: '修改人', dataIndex: 'lastupdusercode', width: 80, align: 'center', sortable: true},
//		{header: '修改日期', dataIndex: 'lastupdtime', width:120, align: 'center', sortable: true, renderer:HY.renderAsDate},
//		{header: '本地预览', dataIndex: 'shpid', width:120, align: 'center', sortable: true, renderer:shptraView.renderLocDtl},
	],
	defaults: HY.Cmp.cmDefaults
});

//--------------- 主面板

/**
 * 查询面板
 */
shptraView.queryPanel = new HY.Cmp.QueryPanel({
	tarObj:shptraView,
	tbarConfig:{editMode: 0, enableNav: false, statusConfig: ['Modify!00','Delete!00','New!00']},
	items:[
		{
			layout: 'absolute', border: false, height: 36,
			items:[
				{xtype: 'label', html: HY.ls('1504','HBL提单号'), width: 70, x: 5, y: 7, border: true},
				{xtype: 'textfield', name: 'blno', width: 120, x: 75, y: 6, tabIndex: 101},
				{xtype: 'label', html: HY.ls('1423','订舱号'), width: 70, x: 200, y: 7, border: true,style:{'text-align':'right'}},
				{xtype: 'textfield', name: 'sono', width: 120, x: 275, y: 6, tabIndex: 101},
				{xtype: 'label', html: HY.ls('2891','船公司'), width: 45, x: 400, y: 7},
				{xtype: 'textfield', name: 'shpnabbr', width: 120, x: 450, y: 6, tabIndex: 102},
				{xtype: 'label', html: HY.ls('2409','起运港'), width: 85, x: 575, y: 7,style:{'text-align':'right'}},
				{xtype: 'textfield', name: 'pol', width: 60, x: 665, y: 6, tabIndex: 103},
				{xtype: 'label', html: HY.ls('1629','目的港'), width: 85, x: 715, y: 7,style:{'text-align':'right'}},
				{xtype: 'textfield', name: 'placedel', width: 60, x: 805, y: 6, tabIndex: 104},
				{xtype: 'label',html: HY.ls('1867','工作单日期'), width:65, x:875, y: 7,style:{'text-align':'right'} },
				{xtype: 'datefield', name:'datefrom',width: 95,x: 950, y:5, tabIndex:105,value:new Date().add(Date.MONTH,-3)},
				{xtype: 'label', html: '&nbsp;-', width: 10, x: 1045, y: 7},
				{xtype: 'datefield', name: 'dateto', width: 95, x: 1055, y: 5, tabIndex: 106,value:new Date()},
			]
		}
	]
});

/**
 * 主列表面板
 */
 
shptraView.mainPanel = new Ext.grid.GridPanel({
	region: 'center',
	border: true,
	margins: '0 0',
	store: shptraView.mainStore,
	cm: shptraView.mainCM,
	bbar: new HY.Cmp.PagingToolbar({tarObj: shptraView, store: shptraView.mainStore}),
	listeners:{
		'rowdblclick': function() {

		}
	}
});


shptraView.mainWindow = new Ext.Window({
	tbar: new HY.Cmp.Toolbar({
		tarObj: shptraView,
		editMode: 1,
		enableNav: true,
		statusConfig: []
	}),
	iconCls: shptraView.iconCls,
	title: shptraView.title,
	maximizable: false,
	maximized: true,
	layout: 'border',
	items: [
		
	]
});



//-----------------功能函数
shptraView.doRefresh = function(){
	 var me = this;
		if (me.mainWindow.isVisible()) {
			var frm = me.formBase.getForm();
			var pkval = HY.fv(frm, me.pkName);
			if (HY.isNumber(pkval) && pkval > 0) {
				shptraView.doLoadDetail(pkval, frm);
			} else {
				return;
			}
		} else {
			var frm = me.queryPanel.getForm();
			var params = {};
			Ext.apply (params, frm.getValues());
			Ext.apply (me.mainStore.baseParams, params);
			me.mainStore.load();
		}
};
