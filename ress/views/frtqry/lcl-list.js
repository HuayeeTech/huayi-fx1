Ext.ns("Ext.HY.FrtqryLclView");
var frtlclView = Ext.HY.FrtqryLclView;

Ext.apply(frtlclView, {
	ctx: ctx + '/frtqry', pkName: 'priceid', codeName: '', title: '海运散货运价', iconCls: 'nav-frtlcl'
});

Ext.onReady(function() {
	Ext.QuickTips.init();
	
	var viewport = new Ext.Viewport({
		layout: 'border',
		items: [
			frtlclView.queryPanel,
			frtlclView.mainPanel
		]
	});
	viewport.doLayout();
});

// ------------------ 零部件
frtlclView.mainStore = HY.Cmp.createJsonStore({
	fields: ['priceid','shpncode','shpnname','pol','polcode','pod','podcode','placedel','pldcode','potcode','pot','lastupdtime','closedate','saildays','validays','remarks','amt_0','amt_1','amt_2','amt_3','amt_4','amt_5','amt_6','amt_7','amt_8','amt_9','amt_10','amt_11'],
	url: frtlclView.ctx + '/lcl-list.do',
	sortInfo: {field: 'lastupdtime', direction: 'DESC'}
});
frtlclView.mainCM = new Ext.grid.ColumnModel({
	columns: mainCols,
	defaults: HY.Cmp.cmDefaults
});


// ------------------ 主面板
/**
 * 查询面板
 */
frtlclView.queryPanel = new HY.Cmp.QueryPanel({
	tarObj: frtlclView,
	tbarConfig: {editMode: 0, enableNav: false, statusConfig: ['Modify!00','Delete!00','New!00']},
	items: [
		{
			layout: 'absolute', border: false, height: 36,
			items: [
				{xtype: 'label', html: '起运港', width: 45, x: 5, y: 7},
				{xtype: 'textfield', name: 'pol', width: 80, x: 50, y: 6, tabIndex: 101},
				{xtype: 'label', html: '目的港', width: 45, x: 140, y: 7},
				{xtype: 'textfield', name: 'pod', width: 60, x: 185, y: 6, tabIndex: 102}
			]
		}
	]
});
/**
 * 主列表面板
 */
frtlclView.mainPanel = new Ext.grid.GridPanel({
	region: 'center',
	border: true,
	margins: '0 0',
	store: frtlclView.mainStore,
	cm: frtlclView.mainCM,
	bbar: new HY.Cmp.PagingToolbar({tarObj: frtlclView, store: frtlclView.mainStore}),
	listeners: {
		'rowdblclick': function() {
			frtlclView.doModify();
		}
	}
});

frtlclView.mainWindow = new Ext.Window({
	tbar: new HY.Cmp.Toolbar({
		tarObj: frtlclView,
		editMode: 1,
		enableNav: true,
		statusConfig: []
	}),
	iconCls: frtlclView.iconCls,
	title: frtlclView.title,
	maximizable: false,
	maximized: true,
	layout: 'border',
	items: [
		
	]
});

// ------------------ 功能函数
frtlclView.doRefresh = function(){
	var me = this;
	if (me.mainWindow.isVisible()) {
		var frm = me.formBase.getForm();
		var pkval = HY.fv(frm, me.pkName);
		if (HY.isNumber(pkval) && pkval > 0) {
			frtlclView.doLoadDetail(pkval, frm);
			frtlclView.doRefreshFee(pkval);
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

frtlclView.doClose = function() {
	this.mainWindow.hide();
};

frtlclView.showFees = function(datpk){
//	HY.alert(datpk);
	showFeesWindow(datpk, {"uri": 'lcl-fees'})
}