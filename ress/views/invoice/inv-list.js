Ext.ns("Ext.HY.InvView");
var invView = Ext.HY.InvView;

Ext.apply(invView,{
	ctx: ctx + '/invoice/inv', pkName: 'invid', codeName: '', title: '发票'
});

Ext.onReady(function() {
	Ext.QuickTips.init();
	
	var viewport = new Ext.Viewport({
		layout: 'border',
		items: [
			invView.queryPanel,
			invView.mainPanel,
		]
	});
	viewport.doLayout();
	
});

//------------------ 零部件
invView.rendersendNouinv = function(value, metaData, record, rowIndex, colIndex, store){
	var s = '<a href="javascript:void(0)" onclick="invView.sendNouinv(' + value + ')">金税发票</a>';
	return s;
};
invView.requestQuerynou = function(value, metaData, record, rowIndex, colIndex, store) {
	var s = '<a href="javascript:void(0)" onclick="invView.queryNouinv()" >查询</a>';
	return s;
};
invView.mainStore = HY.Cmp.createJsonStore({
	fields: ['invid','jobid','invno','invdate','invtype','invtypedesc','clientid','clicode','cliabbr','cliname','cliname_inv','arexist','aramtstlto','arstatus','recvdate','cyto','aramtto','invnolist','reqinv','expcardx','impcardx','bankname','rpdesc','invclassdesc','printed','printdate','deleted','rptid','rptid_prn_name','txt_remarks','taxrate','invid1','locked','apamtstlto','apstatus','paytdate'],
	url: invView.ctx + '/datlst.do',
	sortInfo: {field: 'invdate', direction: 'DESC'},
	pageSize:30
});
invView.mainCols = [
	  new Ext.grid.RowNumberer({width:36}),
		{header: '在线开票', dataIndex:'invid', width:140, align:'center',sortable: true,renderer:invView.rendersendNouinv},
		{header: '在线查票', dataIndex:'invid', width:140, align:'center',sortable: true,renderer:invView.requestQuerynou},
		{header: '发票日期', dataIndex:'invdate', width:120, align:'center',sortable: true,renderer: HY.renderAsDate},
		{header: '类型', dataIndex:'invtypedesc', width:120, align:'center',sortable: true},
		{header: '发票号', dataIndex:'invno', width:160, align:'center',sortable: true},
		{header: '发票类型', dataIndex:'invclassdesc', width:120, align:'center',sortable: true},
		{header: '客户代码', dataIndex:'clicode', width:140, align:'center',sortable: true},
		{header: '客户简称', dataIndex:'cliabbr', width:140, align:'center',sortable: true},
		{header: '客户名称', dataIndex:'cliname', width:200, align:'center',sortable: true},
		{header: '客户抬头', dataIndex:'cliname_inv', width:200, align:'center',sortable: true},
		{header: '应收', dataIndex:'arexist', width:80, align:'center',sortable: true},
		{header: '是否开票', dataIndex:'reqinv', width:80, align:'center',sortable: true},
		{header: '折合币制', dataIndex:'cyto', width:100, align:'center',sortable: true},
		{header: '折合金额', dataIndex:'aramtto', width:100, align:'center',sortable: true},
		{header: '收款金额', dataIndex:'aramtstlto', width:100, align:'center',sortable: true},
		{header: '收款状态', dataIndex:'arstatus', width:80, align:'center',sortable: true},
		{header: '收款日期', dataIndex:'recvdate', width:120, align:'center',sortable: true,renderer: HY.renderAsDate},
		{header: '银行', dataIndex:'bankname', width:140, align:'center',sortable: true},
		{header: '摘要', dataIndex:'rpdesc', width:180, align:'center',sortable: true},
		{header: '税率', dataIndex:'taxrate', width:80, align:'center',sortable: true},
		{header: '付款金额', dataIndex:'apamtstlto', width:120, align:'center',sortable: true},
		{header: '付款状态', dataIndex:'apstatus', width:80, align:'center',sortable: true},
		{header: '付款日期', dataIndex:'paytdate', width:120, align:'center',sortable: true,renderer: HY.renderAsDate},
		{header: '备注', dataIndex:'txt_remarks', width:200, align:'center',sortable: true},
];
invView.mainCM = new Ext.grid.ColumnModel({
	columns: invView.mainCols,
	defaults: HY.Cmp.cmDefaults
});


/**
 * 查询面板
 */
invView.queryPanel = new HY.Cmp.QueryPanel({
	tarObj:invView,
	tbarConfig:{editMode: 0, enableNav: false, statusConfig: ['Modify#Delete#New!00']},
	items:[
		{
			layout: 'absolute', border: false, height: 36,
			items:[
				{xtype: 'label', html: '发票号', width: 70, x: 5, y: 7, border: true},
				{xtype: 'textfield', name: 'pono', width: 120, x: 75, y: 6, tabIndex: 101},
				{xtype: 'label', html: '类型', width: 70, x: 210, y: 7},
				HY.Const.createNCombo ([['0','全部'],['3','普通'],['4','综合'],['5','代开']], {hiddenName: 'invtype', value: '0', width: 100, x: 270, y:4, editable: false, tabIndex: 102}),
				{xtype: 'label', html: '发票日期', width: 70, x: 405, y: 7},
				{xtype: 'datefield', name: 'datefrom', width: 95, x: 465, y: 5, tabIndex: 103,value:new Date().add(Date.YEAR,-1)},
				{xtype: 'label', html: '&nbsp;-', width: 10, x: 565, y: 7},
				{xtype: 'datefield', name: 'dateto', width: 95, x: 585, y: 5, tabIndex: 104,value:new Date()},
			]
		}
	]
});

/**
 * 主列表面板
 */
invView.mainPanel = new Ext.grid.GridPanel({
	region: 'center',
	border: false,
	margins: '0 0',
	store: invView.mainStore,
	cm: invView.mainCM,
	bbar: new HY.Cmp.PagingToolbar({pageSize:30,tarObj: invView, store: invView.mainStore}),
	listeners:{
		'rowdblclick': function() {
			
		}
	},
	viewConfig: {
		forceFit: false,
		enableRowBody: true
	},
});


invView.mainWindow = new Ext.Window({
	tbar: new HY.Cmp.Toolbar({
		tarObj: invView,
		editMode: 1,
		enableNav: true,
		statusConfig: []
	}),
	iconCls: invView.iconCls,
	title: invView.title,
	maximizable: false,
	maximized: true,
	layout: 'border',
	items: [
		
	]
});


//-----------------功能函数
invView.doRefresh = function(){
	var me = this;
	var frm = me.queryPanel.getForm();
	var params = {};
	Ext.apply (params, frm.getValues());
	Ext.apply (me.mainStore.baseParams, params);
	me.mainStore.load();

};
invView.sendNouinv = function(datpk){
	var _url = '/hyfx/sapi/nninv/send.do?invid='+datpk;

	if (invView.sendSuccessWin == null || invView.sendSuccessWin === undefined) {
		invView.sendSuccessWin = new Ext.Window({
			title:'金税发票',
			width: 480,
			height:380,
			modal: false,
			closable: true,
			closeAction: "hide",
			layout: "border",
			iconCls: "icon-win",
			resizable: true,
			maximizable: false,
			maximized: false,
			items:[
				new Ext.Panel({
					region:'center',
					border: false,
					header:false,
					bodyStyle: 'padding:5px',
					autoScroll: false,
					items: [
						{
							id:'successWin',
							html:"<iframe src="+ _url +" style='width:100%; height: 100%; min-height:380px; background-color:#fff' id='sendSuccessWinFrame'></iframe>"
						}
					]
				})
			]
		});
	} else {
		var iframe = window.document.getElementById('sendSuccessWinFrame');
		iframe.src = _url;
	}
	invView.sendSuccessWin.show();
};

invView.queryNouinv = function(){
	var me = this;
	var rec = this.mainPanel.getSelectionModel().getSelected();
	var pkval = rec.get('invid');
	var params = {invid:pkval};
	var url = '/hyfx/sapi/nninv/query.do';
	HY.AjaxRequest({
		params:params,
		url: url,
		showWat: true,
		showMsg: true,
		callback: function(datobj){
			
	}});
}