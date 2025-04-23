Ext.ns("Ext.HY.AccStmView");
var astmView = Ext.HY.AccStmView;

Ext.apply(astmView, {
	ctx: ctx + '/accstl/stmqry', pkName: 'invid', codeName: 'invno', title: '对账单'
});

Ext.onReady(function() {
	Ext.QuickTips.init();
	
	var viewport = new Ext.Viewport({
		layout: 'border',
		items: [
			astmView.queryPanel,
			astmView.mainPanel
		]
	});
	viewport.doLayout();
	
});

// ------------------ 零部件
astmView.mainStore = HY.Cmp.createJsonStore({
	fields: ['invid','clientid','clicode','cliabbr','cliname_c','invno','invdate','invtype','printdate','refno','locked','lockdate','lockedby','dctype','reqinv','remarks','accttext','amtinword_c','amtinword_e','cyto','invdesc','clitelno','cliaddr','createtime','lastupdtime','createusername','lastupdusername','oth01','oth02','oth03','oth04','oth05','oth06',],
	url: astmView.ctx + '/datlst.do',
	sortInfo: {field: 'invdate', direction: 'DESC'}
});
astmView.mainCM = new Ext.grid.ColumnModel({
	columns:[
		new Ext.grid.RowNumberer({width: 36}),
		{header: '账单号', dataIndex: 'invno', width: 120, sortable: true},
		{header: '账单日期', dataIndex: 'invdate', width: 120, sortable: true, renderer: HY.renderAsDate},
		{header: '客户代码', dataIndex: 'clicode', width: 120, sortable: true},
		{header: '客户简称', dataIndex: 'cliabbr', width: 120, sortable: true},
		{header: '客户名称', dataIndex: 'cliname_c', width: 220, sortable: true},
		{header: '合计金额(大写)', dataIndex: 'amtinword_c', width: 220, sortable: false},
		{header: '合计金额(英文)', dataIndex: 'amtinword_e', width: 220, sortable: false},
		{header: '类别', dataIndex: 'invtype', width: 80, sortable: true},
		{header: '参考号', dataIndex: 'refno', width: 100, sortable: true},
		{header: '摘要', dataIndex: 'invdesc', width: 120, sortable: true},
		{header: '结算公司', dataIndex: 'cliabbr', width: 100, sortable: true},
		{header: '电话', dataIndex: 'clitelno', width: 120, sortable: true},
		{header: '地址', dataIndex: 'cliaddr', width: 120, sortable: true},
		{header: '备注', dataIndex: 'remarks', width: 140, sortable: false},
		{header: '录入人', dataIndex: 'createusername', width: 80, sortable: true},
		{header: '录入时间', dataIndex: 'createtime', width: 120, align: 'center', sortable: true, renderer: HY.renderAsDateTime},
		{header: '最近更新人', dataIndex: 'lastupdusername', width: 80, sortable: true},
		{header: '最近更新时间', dataIndex: 'lastupdtime', width: 120, align: 'center', sortable: true, renderer: HY.renderAsDateTime}
	],
	defaults: HY.Cmp.cmDefaults
});
astmView.mainFields = [
	{xtype: 'hidden', name: 'invid'},
	{layout: 'absolute', height: 530, border: true, items:[
		{xtype: 'label', html: '结算公司', width: 280, x: 5, y: 7},
		{xtype: 'textfield', name: 'cliabbr', width: 280, x: 5, y: 25, tabIndex: 201, readOnly: true},
		{xtype: 'label', html: '电话', width: 280, x: 5, y: 50},
		{xtype: 'textfield', name: 'clitelno', width: 280, x: 5, y: 68, tabIndex: 202, readOnly: true},
		{xtype: 'label', html: '地址', width: 280, x: 5, y: 93},
		{xtype: 'textfield', name: 'cliaddr', width: 280, x: 5, y: 111, tabIndex: 203, readOnly: true},
		{xtype: 'label', html: '收款账号', width: 280, x: 5, y: 136},
		{xtype: 'textarea', name: 'accttext', width: 280, height: 85, x: 5, y: 154, tabIndex: 204, readOnly: true, cls: "nowrap"},
		{xtype: 'label', html: '摘要', width: 280, x: 5, y: 244},
		{xtype: 'textarea', name: 'invdesc', width: 280, height: 82, x: 5, y: 262, tabIndex: 205, readOnly: true},

		{xtype: 'label', html: '账单号', width: 140, x: 305, y: 7},
		{xtype: 'textfield', name: 'invno', width: 140, x: 305, y: 25, tabIndex: 206, readOnly: true},
		{xtype: 'label', html: '日期', width: 140, x: 455, y: 7},
		{xtype: 'datefield', name: 'invdate', width: 140, x: 455, y: 25, tabIndex: 207, readOnly: true, format: 'Y/m/d'},
		{xtype: 'label', html: '合计金额(大写)', width: 280, x: 305, y: 93},
		{xtype: 'textarea', name: 'amtinword_c', width: 500, height: 105, x: 305, y: 111, tabIndex: 208, readOnly: true},
		{xtype: 'label', html: '合计金额(英文)', width: 280, x: 305, y: 221},
		{xtype: 'textarea', name: 'amtinword_e', width: 500, height: 105, x: 305, y: 239, tabIndex: 209, readOnly: true},
		
		{xtype: 'label', html: '备注', width: 200, x: 605, y: 7},
		{xtype: 'textarea', name: 'remarks', width: 200, height: 65, x: 605, y: 25, tabIndex: 210, readOnly: true},
		
		{xtype: 'label', html: '折合币制', width: 140, x:305, y: 50},
		{xtype: 'textfield', name: 'cyto', width: 140, x: 305, y: 68, tabIndex: 206, readOnly: true},
		{xtype: 'label', html: '审核日期', width: 60, x: 455, y: 50},
		{xtype: 'datefield', name: 'lockdate', width: 140, x: 455, y: 68, tabIndex: 267, allowBlank: true, readOnly: true, format: 'Y/m/d'},
		
		{xtype: 'label', html: '其他1', width: 280, x: 5, y: 352},
		{xtype: 'textarea', name: 'oth01', width: 280, height: 60, x: 5, y: 370, tabIndex: 210, readOnly: true},
		{xtype: 'label', html: '其他2', width: 240, x: 305, y: 352},
		{xtype: 'textarea', name: 'oth02', width: 240, height: 60, x: 305, y: 370, tabIndex: 210, readOnly: true},
		{xtype: 'label', html: '其他3', width: 240, x: 565, y: 352},
		{xtype: 'textarea', name: 'oth03', width: 240, height: 60, x: 565, y: 370, tabIndex: 210, readOnly: true},
		
		{xtype: 'label', html: '其他4', width: 280, x: 5, y: 435},
		{xtype: 'textarea', name: 'oth04', width: 280, height: 60, x: 5, y: 455, tabIndex: 210, readOnly: true},
		{xtype: 'label', html: '其他5', width: 240, x: 305, y: 435},
		{xtype: 'textarea', name: 'oth05', width: 240, height: 60, x: 305, y: 455, tabIndex: 210, readOnly: true},
		{xtype: 'label', html: '其他6', width: 240, x: 565, y: 435},
		{xtype: 'textarea', name: 'oth06', width: 240, height: 60, x: 565, y: 455, tabIndex: 210, readOnly: true},
	]}
];
astmView.renderDbtype = function(value, metaData, record, rowIndex, colIndex, store) {
	var nds = HY.Const.nds.dbtype;
	var s = HY.Const.getNdsText(nds, value);
	return s;
};
astmView.renderInused = function(value, metaData, record, rowIndex, colIndex, store) {
	var nds = HY.Const.nds.yesno;
	var s = HY.Const.getNdsText(nds, value);
	return s;
};
astmView.dbCols = ['invid', 'arap', 'feeid', 'feecode', 'feename_c', 'feename_e', 'cyidact', 'amtact', 'cntno', 'uprice', 'cntqty', 'rptype','orgid', 'createuser', 'createtime', 'lastupduser', 'lastupdtime','createusername','lastupdusername'];
astmView.dbStore = HY.Cmp.createJsonStore({
	fields: astmView.dbCols,
	url: astmView.ctx + '/feelst.do',
	sortInfo: {}
});
astmView.dbCM = new Ext.grid.ColumnModel({
	columns:[
		new Ext.grid.RowNumberer({width: 36}),
		{header: '费用名称', dataIndex: 'feename_c', width: 160, sortable: true},
		{header: '费用名称(英文)', dataIndex: 'feename_e', width: 220, sortable: true},
		{header: '币制', dataIndex: 'cyidact', width: 60, align: 'center', sortable: true},
		{header: '单价', dataIndex: 'uprice', width: 100, align: 'right', sortable: true, renderer:HY.renderAsFloat2},
		{header: '数量', dataIndex: 'cntqty', width: 80, align: 'right', sortable: true},
		{header: '金额', dataIndex: 'amtact', width: 120, align: 'right', sortable: true},
		{header: '柜号', dataIndex: 'cntno', width: 120, sortable: true}
	],
	defaults: HY.Cmp.cmDefaults
	
});
astmView.cnttypeStore = HY.Cmp.createJsonStore({
	fields: ['cnttypeid','cntcode','cntsize','cnttype','isfreeze','isocode','amscode']
	,url: ctx + '/combo/cnttype.do'
	,sortInfo: {field: 'cntcode', direction: 'ASC'}
	,pageSize: 0
	});
astmView.packingStore = HY.Cmp.createJsonStore({
	fields: ['packid','packcode','packdesc_c','packdesc_e']
	,url: ctx + '/combo/packing.do'
	,sortInfo: {field: 'packdesc_e', direction: 'ASC'}
	,pageSize: 0
	});
astmView.dbFields = [
	{xtype: 'hidden', name: 'arap'},
	{xtype: 'hidden', name: 'invid'},
	{xtype: 'hidden', name: 'jobid'},
	{layout: 'absolute', height: 240, border: false, items:[
		{xtype: 'label', html: '费用名称', width: 200, x: 5, y: 7}
		
	]}
];


// ------------------ 主面板
/**
 * 查询面板
 */
astmView.queryPanel = new HY.Cmp.QueryPanel({
	tarObj: astmView,
	tbarConfig: {editMode: 0, enableNav: false, statusConfig: ['New#Modify#Delete!00','Close!11']
		,actionClose: new Ext.Action({
			text: '查看附件', iconCls: 'tbar-attach' ,handler: function(){
				var rec = astmView.mainPanel.getSelectionModel().getSelected();
				var pkval = "";
				if( rec ) {
					pkval = rec.get(astmView.pkName);
				} else {
					HY.alert('请选择一行记录');
					return;
				}
				HY.Const.popEdocView(pkval, {
					editable: false
				});
			}
		})
	},
	items: [
		{
			layout: 'absolute', border: false, height: 36,
			items: [
				{xtype: 'label', html: '账单号', width: 45, x: 5, y: 7, border: true},
				{xtype: 'textfield', name: 'invno', width: 120, x: 50, y: 6, tabIndex: 101},
				{xtype: 'label', html: '工作单号', width: 55, x: 175, y: 7},
				{xtype: 'textfield', name: 'jobno', width: 120, x: 230, y: 6, tabIndex: 102},
				{xtype: 'label', html: '账单日期', width: 55, x: 355, y: 7},
				{xtype: 'datefield', name: 'datefm', width: 95, x: 405, y: 6, tabIndex: 103},
				{xtype: 'label', html: '&nbsp;-', width: 10, x: 500, y: 7},
				{xtype: 'datefield', name: 'dateto', width: 95, x: 510, y: 6, tabIndex: 104}
			]
		}
	]
});
/**
 * 主列表面板
 */
astmView.mainPanel = new Ext.grid.GridPanel({
	region: 'center',
	border: true,
	margins: '0 0',
	store: astmView.mainStore,
	cm: astmView.mainCM,
	bbar: new HY.Cmp.PagingToolbar({tarObj: astmView, store: astmView.mainStore}),
	listeners: {
		'rowdblclick': function() {
			astmView.doModify();
		}
	}
});
/**
 * 装箱资料编辑窗口
 */
astmView.dbEditWin = new HY.Cmp.WindowEditMst ({
	tbar: new HY.Cmp.Toolbar({
		editMode: 1,
		enableNav: true,
		setAction: function(actid) {
			if (actid == HY.Cmp.actions.New['code']) {
				astmView.doNewDb();
			} else if (actid == HY.Cmp.actions.Modify['code']) {
				astmView.doModifyDb();
			} else if (actid == HY.Cmp.actions.Save['code']) {
				astmView.doSaveDb();
			} else if (actid == HY.Cmp.actions.Delete['code']) {
				astmView.doDeleteDb();
			} else if (actid == HY.Cmp.actions.Close['code']) {
				astmView.doCloseDb();
			} else if (actid == HY.Cmp.actions.Prevrow['code']) {
				astmView.doNavDb(-1);
			} else if (actid == HY.Cmp.actions.Nextrow['code']) {
				astmView.doNavDb(1);
			} else if (actid == HY.Cmp.actions.Refresh['code']) {
				astmView.doRefreshDb();
			}
		}
	}),
	title: '费用详情',
	formFields: astmView.dbFields,
	height: 320,
	width: 800
});
/**
 * 主编辑窗口
 */
astmView.mainWindow = new HY.Cmp.WindowEditMstDtl({
	tbar: new HY.Cmp.Toolbar({
		tarObj: astmView,
		editMode: 1,
		enableNav: true,
		statusConfig: ['New#Modify#Delete#Save!00']
	}),
	title: astmView.title,
	maximizable: false,
	maximized: true,
	mstRegion: 'center',
	dtlRegion: 'south',
	formFields: astmView.mainFields,
	formHeight: 220,
	gridHeight: 380,
	gridStore: astmView.dbStore,
	gridColModel: astmView.dbCM,
	gridTbar: new HY.Cmp.DtlToolbar({
		title: '费用明细',
		statusConfig: [{actionNew: '00'} ,{actionModify: '00'} ,{actionDelete: '00'}],
		setAction: function(actid) {
			
		}
	}),
	gridEditWindow: undefined
});
// ------------------ 功能函数
astmView.doRefresh = function(){
	var me = this;
	if (me.mainWindow.isVisible()) {
		var frm = me.mainWindow.formPanel.getForm();
		var pkval = HY.fv(frm, me.pkName);
		if (HY.isNumber(pkval) && pkval > 0) {
			astmView.doLoadDetail(pkval, frm);
			astmView.doRefreshDb(pkval);
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
astmView.doNew = function(){
	var frm = astmView.mainWindow.formPanel.getForm();
	HY.Cmp.clearFormData(frm);
	astmView.mainWindow.show();
	
	astmView.dbStore.removeAll();
	
	frm.clearInvalid();
	frm.findField(astmView.codeName).focus(true,500);
};
astmView.doSave = function(){
	var me = this;
	var frm = me.mainWindow.formPanel.getForm();
	if (!frm.isValid()) {
		return;
	}
	HY.alert('不支持');
};
astmView.doModify = function(pktmp){
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
astmView.doDelete = function(){
	var rec = this.mainPanel.getSelectionModel().getSelected();
	if( rec ) {
		HY.alert('不支持');
	}
};
astmView.doLoadDetail = function(pkval, frm) {
	if (!HY.isNumber(pkval)) {
		HY.alert("参数有误，请重试。");
		return;
	}
	var url = astmView.ctx + '/get/' + pkval + '.do';
	HY.AjaxRequest({url: url ,callback: function(datobj){
		HY.Cmp.clearFormData(frm);
		HY.Cmp.parseDateCols(datobj ,'invdate');
		frm.setValues(datobj);
		frm.findField(astmView.codeName).focus(true,500);
	}});
};
astmView.doClose = function() {
	this.mainWindow.hide();
};
// ------------------------------------- DB Info
astmView.doRefreshDb = function(srvid) {
	var me = this;
	if (me.dbEditWin.isVisible()) {
		var frm = me.dbEditWin.formPanel.getForm();
		var pkval = HY.fv(frm, 'arap');
		me.doLoadDetailDb(pkval, frm);
	} else { //刷新编辑窗口列表
		var frm = me.mainWindow.formPanel.getForm();
		var pkval = srvid || HY.fv(frm, me.pkName);
		if( HY.isNumber(pkval) && pkval != '0' ) {
			var params = {"invid": pkval};
			Ext.apply (me.dbStore.baseParams, params);
			me.dbStore.load();
			return;
		} else {
			HY.alert('请先保存数据');
			return;
		}
	}
};
astmView.doLoadDetailDb = function(pkval, frm) {
	if (!HY.isNumber(pkval)) {
		HY.alert("参数有误，请重试。");
		return;
	}
	var url = astmView.ctx + '/feeget/' + pkval + '.do';
	HY.AjaxRequest({url: url ,callback: function(datobj){
		HY.Cmp.clearFormData(frm);
		frm.setValues(datobj);
		frm.findField('feecode').focus(true,500);
	}});
};
astmView.doCloseDb = function() {
	var me = this;
	me.dbEditWin.hide();
};
astmView.doNavDb = function(inc) {
	var me = this;
	var tarObj = me.mainWindow.gridPanel;
	var rec = tarObj.getSelectionModel().getSelected();
	var index = tarObj.store.indexOf(rec);
	index = index + inc;
	var rowsCount = tarObj.store.getCount();
	if (index >= 0 && index < rowsCount) {
		tarObj.getSelectionModel().selectRow(index);
		me.doModifyDb();
	}
	if (rowsCount > 0) {
		var tbar = me.dbEditWin.getTopToolbar();
		if (index <= 0) {
			tbar.setStatus('Prevrow', '10');
		} else {
			tbar.setStatus('Prevrow', '11');
		}
		if (index >= rowsCount - 1) {
			tbar.setStatus('Nextrow', '10');
		} else {
			tbar.setStatus('Nextrow', '11');
		}
	}
};