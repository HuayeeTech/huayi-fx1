Ext.ns("Ext.HY.IStkView");
var istkView = Ext.HY.IStkView;

Ext.apply(istkView, {
	ctx: ctx + '/jobstk/ostkqry', pkName: 'stoid', codeName: 'stono', title: '出库单详情'
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
	fields: ['stoid','stono','stodate','depotname','cliname','remarks','jobcliname','pieces','grswgt','gdscbm','pod','refno','stkstatus','actdate','istonos','oth01','oth02','oth03','oth04','oth05','oth06'],
	url: istkView.ctx + '/datlst.do',
	sortInfo: {field: 'stodate', direction: 'DESC'}
});
istkView.mainCM = new Ext.grid.ColumnModel({
	columns:[
		new Ext.grid.RowNumberer({width: 36}),
		{header: '出库单号', dataIndex: 'stono', width: 100, sortable: true},
		{header: '日期', dataIndex: 'stodate', width: 80, sortable: true, renderer: HY.renderAsDate},
		{header: '仓库', dataIndex: 'depotname', width: 100, sortable: true},
		{header: '件数', dataIndex: 'pieces', width: 60, sortable: true, align: 'right'},
		{header: '毛重(KGS)', dataIndex: 'grswgt', width: 90, sortable: true, align: 'right'},
		{header: '体积(CBM)', dataIndex: 'gdscbm', width: 90, sortable: true, align: 'right'},
		{header: '实际出库', dataIndex: 'actdate', width: 80, sortable: true, renderer: HY.renderAsDate},
		{header: '其他1', dataIndex: 'oth01', width: 140, sortable: true},
		{header: '其他2', dataIndex: 'oth02', width: 140, sortable: true},
		{header: '其他3', dataIndex: 'oth03', width: 140, sortable: true},
		{header: '其他4', dataIndex: 'oth04', width: 140, sortable: true},
		{header: '其他5', dataIndex: 'oth05', width: 140, sortable: true},
		{header: '其他6', dataIndex: 'oth06', width: 140, sortable: true}
		
	],
	defaults: HY.Cmp.cmDefaults
});
istkView.mainFields = [
	{xtype: 'hidden', name: 'stoid'},
	{xtype: 'hidden', name: 'jobid'},
	{layout: 'absolute', height: 270, border: true, items:[
		{xtype: 'label', html: '出库单号', width: 180, x: 5, y: 7},
		{xtype: 'textfield', name: "stono", width: 180, x: 5, y: 25, readOnly: true},
		{xtype: 'label', html: '日期', width: 180, x: 5, y: 50},
		{xtype: 'datefield', name: "stodate", width: 180, x: 5, y: 68, readOnly: true},
		{xtype: 'label', html: '仓库', width: 180, x: 5, y: 93},
		{xtype: 'textfield', name: "depotname", width: 180, x: 5, y: 111, readOnly: true},
		{xtype: 'label', html: '目的港', width: 180, x: 5, y: 136},
		{xtype: 'textfield', name: "pod", width: 180, x: 5, y: 154, readOnly: true},
		
		{xtype: 'label', html: '出库类型', width: 180, x: 200, y: 7},
		{xtype: 'textfield', name: "transtypedesc", width: 180, x: 200, y: 25, readOnly: true},
		{xtype: 'label', html: '司机', width: 180, x: 200, y: 50},
		{xtype: 'textfield', name: "drivername", width: 180, x: 200, y: 68, readOnly: true},
		{xtype: 'label', html: '司机电话', width: 180, x: 200, y: 93},
		{xtype: 'textfield', name: "drivertel", width: 180, x: 200, y: 111, readOnly: true},
		{xtype: 'label', html: '车牌号', width: 180, x: 200, y: 136},
		{xtype: 'textfield', name: "vehno", width: 180, x: 200, y: 154, readOnly: true},
		
		{xtype: 'label', html: '总件数', width: 60, x: 5, y: 179, cls: 'label-sm'},
		{xtype: 'numberfield', name: "pieces", width: 60, x: 5, y: 197, readOnly: true},
		{xtype: 'label', html: '总毛重(KGS)', width: 70, x: 67, y: 179, cls: 'label-sm'},
		{xtype: 'numberfield', name: "grswgt", width: 70, x: 67, y: 197, readOnly: true, decimalPrecision: 3},
		{xtype: 'label', html: '总体积(CBM)', width: 80, x: 139, y: 179, cls: 'label-sm'},
		{xtype: 'numberfield', name: "gdscbm", width: 80, x: 139, y: 197, readOnly: true, decimalPrecision: 4},
		
		{xtype: 'label', html: '其他1', width: 180, x: 395, y: 7},
		{xtype: 'textarea', name: "oth01", width: 180, x: 395, y: 25, readOnly: true},
		{xtype: 'label', html: '其他2', width: 180, x: 395, y: 93},
		{xtype: 'textarea', name: "oth02", width: 180, x: 395, y: 111, readOnly: true},
		{xtype: 'label', html: '其他3', width: 180, x: 395, y: 179},
		{xtype: 'textarea', name: "oth03", width: 180, x: 395, y: 197, readOnly: true},
		{xtype: 'label', html: '其他4', width: 180, x: 590, y: 7},
		{xtype: 'textarea', name: "oth04", width: 180, x: 590, y: 25, readOnly: true},
		{xtype: 'label', html: '其他5', width: 180, x: 590, y: 93},
		{xtype: 'textarea', name: "oth05", width: 180, x: 590, y: 111, readOnly: true},
		{xtype: 'label', html: '其他6', width: 180, x: 590, y: 179},
		{xtype: 'textarea', name: "oth06", width: 180, x: 590, y: 197, readOnly: true},
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
istkView.dbCols = ['pkid', 'goodsname_c_in', 'goodsname_e_in', 'pieces', 'packing', 'grswgt', 'gdscbm', 'gdstypedesc_in', 'gdskinddesc_in', 'stoloccode','batchno','markno'];
istkView.dbStore = HY.Cmp.createJsonStore({
	fields: istkView.dbCols,
	url: istkView.ctx + '/gdslst.do',
	sortInfo: {}
});
istkView.dbCM = new Ext.grid.ColumnModel({
	columns:[
		new Ext.grid.RowNumberer({width: 36}),
		{header: '入仓编号', dataIndex:'batchno', width: 100, sortable: true},
		{header: '唛头', dataIndex:'markno', width: 120, sortable: true},
		{header: '货名', dataIndex: 'goodsname_c_in', width: 150, sortable: true},
		{header: '货名(英文)', dataIndex: 'goodsname_e_in', width: 150, sortable: true},
		{header: '件数', dataIndex: 'pieces', width: 60, align: 'right', sortable: true},
		{header: '包装', dataIndex: 'packing', width: 80, align: 'right', sortable: true},
		{header: '毛重(KGS)', dataIndex: 'grswgt', width: 90, align: 'right', sortable: true},
		{header: '体积(CBM)', dataIndex: 'gdscbm', width: 90, align: 'right', sortable: true},
		{header: '货物类别', dataIndex: 'gdstypedesc_in', width: 80, sortable: true},
		{header: '货物材质', dataIndex: 'gdskinddesc_in', width: 80, sortable: true},
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
				{xtype: 'label', html: '出库单号', width: 65, x: 5, y: 7},
				{xtype: 'textfield', name: 'stono', width: 120, x: 80, y: 5, tabIndex: 101, value: ''},
				{xtype: 'label', html: '出库仓库', width: 65, x: 210, y: 7},
				{xtype: 'textfield', name: 'depot', width: 80, x: 275, y: 5, tabIndex: 102, value: ''},
				{xtype: 'label', html: '关联入库单号', width: 75, x: 365, y: 7},
				{xtype: 'textfield', name: 'istono', width: 120, x: 440, y: 5, tabIndex: 103, value: ''},
				{xtype: 'label', html: '日期', width: 30, x: 575, y: 7},
				{xtype: 'datefield', name: 'datefrom', width: 95, x: 610, y: 5, tabIndex: 104},
				{xtype: 'label', html: '&nbsp;-', width: 10, x: 715, y: 7},
				{xtype: 'datefield', name: 'dateto', width: 95, x: 730, y: 5, tabIndex: 105},
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
	formHeight: 280,
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
			window.open(dwnurl, 'ostkqry', 'width=300,height=200');
		}
	});
};

// -------------------------

