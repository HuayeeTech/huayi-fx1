Ext.ns('Ext.HY.QuickstkView')
var quickstkView = Ext.HY.QuickstkView;

Ext.apply(quickstkView, {
	ctx: ctx + '/jobstk/quickqry', pkName: 'pkid_out', codeName: '', title: '库存查询快捷'
});

Ext.onReady(function(){
    Ext.QuickTips.init();
	
	var viewport = new Ext.Viewport({
		layout: 'border',
		items: [
			quickstkView.queryPanel,
			quickstkView.mainPanel,
			quickstkView.footerPanel
		]
	});
	viewport.doLayout();
	quickstkView.loadFooter();
});


quickstkView.mainStore = HY.Cmp.createJsonStore({
	fields: ['pkid','refno','stoid','pkid_out','stkstatus','depotname','stodate','stono','pieces','pieces_stk','grswgt_stk','gdscbm_stk','goodsname_c','packing','markno','vehno','drivertel','drivername','pieces_out','grswgt_out','gdscbm_out','stoloccode','daystock','remarks'],
	url: quickstkView.ctx + '/datlst.do',
	sortInfo: {field: 'stodate', direction: 'DESC'}
});
quickstkView.mainCM = new Ext.grid.ColumnModel({
	columns:[
		new Ext.grid.RowNumberer({width:36}),
		{header: '库存状态', dataIndex: 'stkstatus', width: 80, sortable: true},
		{header: '仓库', dataIndex: 'depotname', width: 100, sortable: true},
		{header: '日期', dataIndex: 'stodate', width: 80, sortable: true, renderer: HY.renderAsDate},
		{header: '入仓号', dataIndex: 'refno', width: 140, sortable: true},
		{header: '入库单号', dataIndex: 'stono', width: 100, sortable: true},
		{header: '入库件数', dataIndex: 'pieces', width: 80, sortable: true, align: 'center'},
		{header: '库存件数', dataIndex: 'pieces_stk', width: 80, sortable: true, align: 'center'},
		{header: '库存毛重(KGS)', dataIndex: 'grswgt_stk', width: 120, sortable: true, align: 'center'},
		{header: '库存体积(CBM)', dataIndex: 'gdscbm_stk', width: 120, sortable: true, align: 'center'},
		{header: '品名', dataIndex: 'goodsname_c', width: 140, sortable: true},
		{header: '包装', dataIndex: 'packing', width:140,sortable:true},
		{header: '唛头', dataIndex: 'markno', width:140, sortable:true},
		{header: '车牌号', dataIndex: 'vehno', width:140, sortable:true},
		{header: '电话', dataIndex: 'drivertel', width:140, sortable:true},
		{header: '司机', dataIndex: 'drivername', width:140, sortable:true},
		{header: '出库件数', dataIndex:'pieces_out', width:140, sortable:true,align: 'center'},
		{header: '出库数量', dataIndex:'grswgt_out', width:140, sortable:true,align: 'center'},
		{header: '出库体积', dataIndex:'gdscbm_out', width:140, sortable:true,align: 'center'},
		{header: '货位号', dataIndex:'stoloccode', width:140, sortable:true,align: 'center'},
		{header: '库存天数', dataIndex:'daystock', width:80, sortable:true,align: 'center'},
		{header: '备注', dataIndex: 'remarks', width: 180, sortable: true}
	],
	defaults: HY.Cmp.cmDefaults
});


quickstkView.queryPanel = new HY.Cmp.QueryPanel({
	height:64,
	tarObj:quickstkView,
	tbarConfig:{editMode: 0, enableNav: false, statusConfig: ['Modify!00','Delete!00','New!00','Export!11']},
	items:[
		{
			layout: 'absolute', border: false, height: 36,
			items:[	
				{xtype: 'label', html: '入库单号', width: 70, x: 5, y: 7, border: true},
				{xtype: 'textfield', name: 'stono', width: 120, x: 75, y: 6, tabIndex: 101},
				{xtype: 'label', html: '唛头', width: 70, x: 210, y: 7, border: true},
				{xtype: 'textfield', name: 'markno', width: 120, x: 270, y: 6, tabIndex: 102},
				{xtype: 'label', html: '入库日期', width: 70, x: 400, y: 7},
				{xtype: 'datefield', name: 'datefrom', width: 95, x: 475, y: 6, tabIndex: 103},
				{xtype: 'label', html: '&nbsp;-', width: 10, x: 575, y:7},
				{xtype: 'datefield', name: 'dateto', width: 95, x: 590, y: 6, tabIndex: 104},
				{xtype: 'label', html: '货物名称', width: 70, x: 700, y: 7, border: true},
				{xtype: 'textfield', name: 'goodsname', width: 120, x: 775, y: 6, tabIndex: 105},
				{xtype: 'label', html: '库存状态', width: 70, x: 905, y: 7, border: true},
				HY.Const.createNCombo ([['0','全部'],['10','已入库'],['20','全部出库'],['30','负库存'],['40','排单未走'],['21','部分出库'],['41','部分排单']], {hiddenName: 'stkstatuscode', value: '0', width: 100, x: 980, y: 5, editable: false, tabIndex: 106})
			]
		}
	]
});

quickstkView.mainPanel = new Ext.grid.GridPanel({
	region: 'center',
	border: true,
	margins: '0 0',
	store: quickstkView.mainStore,
	cm: quickstkView.mainCM,
	bbar: new HY.Cmp.PagingToolbar({tarObj: quickstkView, store: quickstkView.mainStore}),
	listeners:{
		'rowdblclick': function() {
//			quickstkView.doModify();
		}
	}
});

quickstkView.footerPanel= new Ext.Panel({
	region: 'south',
	border: false,
	margins: '0 15',
	height: 24
});



//-----------------功能函数
quickstkView.doRefresh = function(){
	var me = this;
	var frm = me.queryPanel.getForm();
	var params = {};
	Ext.apply (params, frm.getValues());
	Ext.apply (me.mainStore.baseParams, params);
	me.mainStore.load();
};
quickstkView.doExport = function(){
	var me = this;
	var frm = me.queryPanel.getForm();
	var params = {};
	Ext.apply (params, frm.getValues());
	Ext.apply (me.mainStore.baseParams, params);
	HY.AjaxRequest({
		params: params,
		showMsg: false,
		showWat: true,
		url: quickstkView.ctx + '/stkxls.do',
		callback: function(datobj) {
			var dwnurl = quickstkView.ctx + '/downxls.do'
			window.open(dwnurl, 'stkquickly', 'width=300,height=200');
		}
	});
};
quickstkView.doModify = function(pktmp){
	
};
quickstkView.doDelete = function(){
	
};
quickstkView.doLoadDetail = function(pkval, frm) {
	
};
quickstkView.doClose = function() {
	
};
// ------------------------------------- DB Info
quickstkView.doRefreshDb = function(srvid) {
	
};
quickstkView.doNewDb = function(){
	//
};
quickstkView.doSaveDb = function(){
	//
};
quickstkView.doModifyDb = function(){
	//
};
quickstkView.doDeleteDb = function(){
	//
};
quickstkView.doLoadDetailDb = function(pkval, frm, lnkid) {
	
};
quickstkView.doCloseDb = function() {
	//
};
quickstkView.doNavDb = function(inc) {
	//
};
quickstkView.loadFooter = function(){
	HY.AjaxGetHtml({
		url: ctx + "/index/main/render.do",
		params: {to: 'jobstk/quickqry-header'},
		showWat: false,
		callback: function (result) {
			quickstkView.footerPanel.update(result);
		}
	});
};
// -------------------------

