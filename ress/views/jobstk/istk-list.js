Ext.ns("Ext.HY.IStkView");
var istkView = Ext.HY.IStkView;

Ext.apply(istkView, {
	ctx: ctx + '/jobstk/istkqry', pkName: 'stoid', codeName: 'stono', title: '入库单详情'
});

Ext.onReady(function() {
	Ext.QuickTips.init();
	
	var viewport = new Ext.Viewport({
		layout: 'border',
		items: [
			istkView.queryPanel,
			istkView.mainPanel
		]
	});
	viewport.doLayout();
	
	if (HY.isNumber(to_pkval) && to_pkval > 0) {
		istkView.doModify(to_pkval);
//		istkView.doNewDb();
	}
});

// ------------------ 零部件
istkView.mainStore = HY.Cmp.createJsonStore({
	fields: ['stoid','stono','stodate','depotname','cliname','remarks','jobcliname','pieces','grswgt','gdscbm','pod','refno','stkstatus','actdate','salescode','salesname','podcode','jobcliextcode','markno','goodsname','packing'],
	url: istkView.ctx + '/datlst.do',
	sortInfo: {field: 'stodate', direction: 'DESC'}
});
istkView.mainCM = new Ext.grid.ColumnModel({
	columns:[
		new Ext.grid.RowNumberer({width: 36}),
		{header: '入库单号', dataIndex: 'stono', width: 100, sortable: true},
		{header: '日期', dataIndex: 'stodate', width: 80, sortable: true, renderer: HY.renderAsDate},
		{header: '仓库', dataIndex: 'depotname', width: 100, sortable: true},
		{header: '件数', dataIndex: 'pieces', width: 60, sortable: true, align: 'right'},
		{header: '毛重(KGS)', dataIndex: 'grswgt', width: 90, sortable: true, align: 'right'},
		{header: '体积(CBM)', dataIndex: 'gdscbm', width: 90, sortable: true, align: 'right'},
		{header: '实际入库', dataIndex: 'actdate', width: 80, sortable: true, renderer: HY.renderAsDate},
		{header: '库存状态', dataIndex: 'stkstatus', width: 80, sortable: true},
		{header: '品名',dataIndex:'goodsname', width:140,sortable: true},
		{header: '包装',dataIndex:'packing', width:140,sortable: true},
		{header: '唛头',dataIndex:'markno', width:140,sortable: true},
		{header: '业务员代码', dataIndex: 'salescode', width: 80, sortable: true},
		{header: '目的港代码', dataIndex: 'podcode', width: 100, sortable: true},
		{header: '委托人辅助编码', dataIndex: 'jobcliextcode', width: 120, sortable: true},
		{header: '客户单号', dataIndex: 'refno', width: 100, sortable: true},
		{header: '业务员', dataIndex: 'salesname', width: 80, sortable: true},
		{header: '目的港', dataIndex: 'pod', width: 100, sortable: true},
		{header: '委托人', dataIndex: 'jobcliname', width: 180, sortable: true},
		{header: '发货人', dataIndex: 'cliname', width: 180, sortable: true},
		{header: '备注', dataIndex: 'remarks', width: 180, sortable: true}
	],
	defaults: HY.Cmp.cmDefaults
});
istkView.mainFields = [
	{xtype: 'hidden', name: 'stoid'},
	{xtype: 'hidden', name: 'jobid'},
	{layout: 'absolute', height: 250, border: true, items:[
		{xtype: 'label', html: '入库单号', width: 180, x: 5, y: 7},
		{xtype: 'textfield', name: "stono", width: 180, x: 5, y: 25, readOnly: true},
		{xtype: 'label', html: '日期', width: 180, x: 5, y: 50},
		{xtype: 'datefield', name: "stodate", width: 180, x: 5, y: 68, readOnly: true},
		{xtype: 'label', html: '仓库', width: 180, x: 5, y: 93},
		{xtype: 'textfield', name: "depotname", width: 180, x: 5, y: 111, readOnly: true},
		{xtype: 'label', html: '发货人', width: 180, x: 5, y: 136},
		{xtype: 'textfield', name: "cliname", width: 180, x: 5, y: 154, readOnly: true},
		
		{xtype: 'label', html: '委托人', width: 180, x: 200, y: 7},
		{xtype: 'textfield', name: "jobcliname", width: 180, x: 200, y: 25, readOnly: true},
		{xtype: 'label', html: '业务员', width: 180, x: 200, y: 50},
		{xtype: 'textfield', name: "salesname", width: 180, x: 200, y: 68, readOnly: true},
		{xtype: 'label', html: '目的港', width: 180, x: 200, y: 93},
		{xtype: 'textfield', name: "pod", width: 180, x: 200, y: 111, readOnly: true},
		{xtype: 'label', html: '客户单号', width: 180, x: 200, y: 136},
		{xtype: 'textfield', name: "refno", width: 180, x: 200, y: 154, readOnly: true},
		
		{xtype: 'label', html: '入库类型', width: 180, x: 395, y: 7},
		{xtype: 'textfield', name: "transtypedesc", width: 180, x: 395, y: 25, readOnly: true},
		{xtype: 'label', html: '司机', width: 180, x: 395, y: 50},
		{xtype: 'textfield', name: "drivername", width: 180, x: 395, y: 68, readOnly: true},
		{xtype: 'label', html: '司机电话', width: 180, x: 395, y: 93},
		{xtype: 'textfield', name: "drivertel", width: 180, x: 395, y: 111, readOnly: true},
		{xtype: 'label', html: '车牌号', width: 180, x: 395, y: 136},
		{xtype: 'textfield', name: "vehno", width: 180, x: 395, y: 154, readOnly: true},
		
		{xtype: 'label', html: '总件数', width: 60, x: 360, y: 179, cls: 'label-sm'},
		{xtype: 'numberfield', name: "pieces", width: 60, x: 360, y: 197, readOnly: true},
		{xtype: 'label', html: '总毛重(KGS)', width: 70, x: 422, y: 179, cls: 'label-sm'},
		{xtype: 'numberfield', name: "grswgt", width: 70, x: 422, y: 197, readOnly: true, decimalPrecision: 3},
		{xtype: 'label', html: '总体积(CBM)', width: 80, x: 494, y: 179, cls: 'label-sm'},
		{xtype: 'numberfield', name: "gdscbm", width: 80, x: 494, y: 197, readOnly: true, decimalPrecision: 4},
		
		{xtype: 'label', html: '备注', width: 180, x: 5, y: 179},
		{xtype: 'textarea', name: "remarks", width: 350, height: 48, x: 5, y: 197, readOnly: true}
	]}
];
istkView.renderDbtype = function(value, metaData, record, rowIndex, colIndex, store) {
	var nds = HY.Const.nds.dbtype;
	var s = HY.Const.getNdsText(nds, value);
	return s;
};
istkView.renderInused = function(value, metaData, record, rowIndex, colIndex, store) {
	var nds = HY.Const.nds.yesno;
	var s = HY.Const.getNdsText(nds, value);
	return s;
};
istkView.dbCols = ['pkid', 'goodsname_c', 'goodsname_e', 'pieces', 'packing', 'grswgt', 'gdscbm', 'gdslength', 'gdswidth', 'gdsheight', 'gdstypedesc', 'gdskinddesc', 'stoloccode','batchno','markno'];
istkView.dbStore = HY.Cmp.createJsonStore({
	fields: istkView.dbCols,
	url: istkView.ctx + '/gdslst.do',
	sortInfo: {}
});
istkView.dbCM = new Ext.grid.ColumnModel({
	columns:[
		new Ext.grid.RowNumberer({width: 36}),
		{header: '入仓编号', dataIndex: 'batchno', width: 100, sortable: true},
		{header: '唛头', dataIndex: 'markno', width: 120, sortable: true},
		{header: '货名', dataIndex: 'goodsname_c', width: 150, sortable: true},
		{header: '货名(英文)', dataIndex: 'goodsname_e', width: 150, sortable: true},
		{header: '件数', dataIndex: 'pieces', width: 60, align: 'right', sortable: true},
		{header: '包装', dataIndex: 'packing', width: 80, align: 'right', sortable: true},
		{header: '毛重(KGS)', dataIndex: 'grswgt', width: 90, align: 'right', sortable: true},
		{header: '体积(CBM)', dataIndex: 'gdscbm', width: 90, align: 'right', sortable: true},
		{header: '长(cm)', dataIndex: 'gdslength', width: 60, align: 'right', sortable: true},
		{header: '宽(cm)', dataIndex: 'gdswidth', width: 60, align: 'right', sortable: true},
		{header: '高(cm)', dataIndex: 'gdsheight', width: 60, align: 'right', sortable: true},
		{header: '货物类别', dataIndex: 'gdstypedesc', width: 80, sortable: true},
		{header: '货物材质', dataIndex: 'gdskinddesc', width: 80, sortable: true},
		{header: '存放库位', dataIndex: 'stoloccode', width: 100, sortable: true}
	],
	defaults: HY.Cmp.cmDefaults
});

// ------------------ 主面板
/**
 * 查询面板
 */
istkView.queryPanel = new HY.Cmp.QueryPanel({
	tarObj: istkView,
	tbarConfig: {editMode: 0, enableNav: false, statusConfig: ['New!00','Modify!00','Delete!00','Export!11']},
	items: [
		{
			layout: 'absolute', border: false, height: 36,
			items: [
				{xtype: 'label', html: '入库单号', width: 65, x: 5, y: 7},
				{xtype: 'textfield', name: 'stono', width: 120, x: 80, y: 5, tabIndex: 101, value: ''},
				{xtype: 'label', html: '入库仓库', width: 65, x: 210, y: 7},
				{xtype: 'textfield', name: 'depot', width: 80, x: 275, y: 5, tabIndex: 102, value: ''},
				{xtype: 'label', html: '日期', width: 30, x: 365, y: 7},
				{xtype: 'datefield', name: 'datefrom', width: 95, x: 400, y: 5, tabIndex: 103},
				{xtype: 'label', html: '&nbsp;-', width: 10, x: 500, y: 7},
				{xtype: 'datefield', name: 'dateto', width: 95, x: 520, y: 5, tabIndex: 104},
				{xtype: 'label', html: '目的港', width: 65, x: 630, y: 7},
				{xtype: 'textfield', name: 'pod', width: 80, x: 675, y: 5, tabIndex: 106, value: ''},
				{xtype: 'label', html: '唛头', width: 30, x: 765, y: 7},
				{xtype: 'textfield', name: 'markno', width: 80, x: 800, y: 5, tabIndex: 106, value: ''}
			]
		}
	]
});
/**
 * 主列表面板
 */
istkView.mainPanel = new Ext.grid.GridPanel({
	region: 'center',
	border: true,
	margins: '0 0',
	store: istkView.mainStore,
	cm: istkView.mainCM,
	bbar: new HY.Cmp.PagingToolbar({tarObj: istkView, store: istkView.mainStore}),
	listeners: {
		'rowdblclick': function() {
			istkView.doModify();
		}
	},
	loadMask: HY.Const.loadMask
});
/**
 * 主编辑窗口
 */
istkView.mainWindow = new HY.Cmp.WindowEditMstDtl({
	tbar: new HY.Cmp.Toolbar({
		tarObj: istkView,
		editMode: 1,
		enableNav: true,
		statusConfig: ['New!00','Save!00']
	}),
	title: istkView.title,
	maximizable: false,
	maximized: true,
	mstRegion: 'north',
	dtlRegion: 'center',
	formFields: istkView.mainFields,
	formHeight: 260,
	gridHeight: 200,
	gridStore: istkView.dbStore,
	gridColModel: istkView.dbCM,
	gridTbar: new HY.Cmp.DtlToolbar({
		title: '货物明细',
		statusConfig: [{actionNew: '00'} ,{actionModify: '00'} ,{actionDelete: '00'}],
		setAction: function(actid) {
			if (actid == HY.Cmp.actions.New) {
				istkView.doNewDb();
			} else if (actid == HY.Cmp.actions.Modify) {
				istkView.doModifyDb();
			} else if (actid == HY.Cmp.actions.Delete) {
				istkView.doDeleteDb();
			}
		}
	}),
	gridEditWindow: null
});

// ------------------ 功能函数
istkView.doRefresh = function(){
	var me = this;
	if (me.mainWindow.isVisible()) {
		var frm = me.mainWindow.formPanel.getForm();
		var pkval = HY.fv(frm, me.pkName);
		if (HY.isNumber(pkval) && pkval > 0) {
			istkView.doLoadDetail(pkval, frm);
			istkView.doRefreshDb(pkval);
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
istkView.doNew = function(){
	var frm = istkView.mainWindow.formPanel.getForm();
	HY.Cmp.clearFormData(frm);
	istkView.mainWindow.show();
	
	istkView.dbStore.removeAll();
	
	frm.clearInvalid();
	frm.findField(istkView.codeName).focus(true,500);
};
istkView.doSave = function(){
	return;
};
istkView.doModify = function(pktmp){
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
		me.doRefreshDb(pkval);
		me.mainWindow.show();
	}
};
istkView.doDelete = function(){
	return;
};
istkView.doLoadDetail = function(pkval, frm) {
	if (!HY.isNumber(pkval)) {
		HY.alert("参数有误，请重试。");
		return;
	}
	var url = istkView.ctx + '/get/' + pkval + '.do';
	HY.AjaxRequest({url: url, showWat: true, callback: function(datobj){
		HY.Cmp.clearFormData(frm);
		HY.Cmp.parseDateCols(datobj ,'stodate');
		frm.setValues(datobj);
		frm.findField(istkView.codeName).focus(true,500);
	}});
};
istkView.doClose = function() {
	this.mainWindow.hide();
};
// ------------------------------------- DB Info
istkView.doRefreshDb = function(srvid) {
	var me = this;
	me.dbStore.removeAll();
	var frm = me.mainWindow.formPanel.getForm();
	var pkval = srvid || HY.fv(frm, me.pkName);
	if( HY.isNumber(pkval) && pkval != '0' ) {
		var params = {"stoid": pkval};
		Ext.apply (me.dbStore.baseParams, params);
		me.dbStore.load();
		return;
	} else {
		HY.alert('请先保存数据');
		return;
	}
};
istkView.doNewDb = function(){
	//
};
istkView.doSaveDb = function(){
	//
};
istkView.doModifyDb = function(){
	//
};
istkView.doDeleteDb = function(){
	//
};
istkView.doLoadDetailDb = function(pkval, frm, lnkid) {
	
};
istkView.doCloseDb = function() {
	//
};
istkView.doNavDb = function(inc) {
	//
};
istkView.doExport = function(){
	var me = this;
	var frm = me.queryPanel.getForm();
	var params = {};
	Ext.apply (params, frm.getValues());
	Ext.apply (me.mainStore.baseParams, params);
	HY.AjaxRequest({
		params: params,
		showMsg: false,
		showWat: true,
		url: istkView.ctx + '/stkxls.do',
		callback: function(datobj) {
			var dwnurl = istkView.ctx + '/downxls.do'
			window.open(dwnurl, 'istkqry', 'width=300,height=200');
		}
	});
};

// -------------------------

