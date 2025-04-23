Ext.ns("Ext.HY.FrtqryFclView");
var frtfclView = Ext.HY.FrtqryFclView;

Ext.apply(frtfclView, {
	ctx: ctx + '/frtqry', pkName: 'priceid', codeName: '', title: '海运整柜运价', iconCls: 'nav-frtfcl'
});

Ext.onReady(function() {
	Ext.QuickTips.init();
	
	var viewport = new Ext.Viewport({
		layout: 'border',
		items: [
			frtfclView.queryPanel,
			frtfclView.mainPanel
		]
	});
	viewport.doLayout();
});

// ------------------ 零部件
frtfclView.mainStore = HY.Cmp.createJsonStore({
	fields: ['priceid','shpncode','shpnname','pol','polcode','pod','podcode','placedel','pldcode','potcode','pot','lastupdtime','closedate','saildays','validays','remarks','amt_0','amt_1','amt_2','amt_3','amt_4','amt_5','amt_6','amt_7','amt_8','amt_9','amt_10','amt_11'],
	url: frtfclView.ctx + '/fcl-list.do',
	sortInfo: {field: 'lastupdtime', direction: 'DESC'}
});
frtfclView.mainCM = new Ext.grid.ColumnModel({
	columns: mainCols,
	defaults: HY.Cmp.cmDefaults
});



// ------------------ 主面板
/**
 * 查询面板
 */
frtfclView.queryPanel = new HY.Cmp.QueryPanel({
	tarObj: frtfclView,
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
frtfclView.mainPanel = new Ext.grid.GridPanel({
	region: 'center',
	border: true,
	margins: '0 0',
	store: frtfclView.mainStore,
	cm: frtfclView.mainCM,
	bbar: new HY.Cmp.PagingToolbar({tarObj: frtfclView, store: frtfclView.mainStore}),
	listeners: {
		'rowdblclick': function() {
//			frtfclView.doModify();
		}
	}
});

frtfclView.mainWindow = new Ext.Window({
	tbar: new HY.Cmp.Toolbar({
		tarObj: frtfclView,
		editMode: 1,
		enableNav: true,
		statusConfig: []
	}),
	iconCls: frtfclView.iconCls,
	title: frtfclView.title,
	maximizable: false,
	maximized: true,
	layout: 'border',
	items: [
		
	]
});

// ------------------ 功能函数
frtfclView.doRefresh = function(){
	var me = this;
	if (me.mainWindow.isVisible()) {
		var frm = me.formBase.getForm();
		var pkval = HY.fv(frm, me.pkName);
		if (HY.isNumber(pkval) && pkval > 0) {
			frtfclView.doLoadDetail(pkval, frm);
			frtfclView.doRefreshFee(pkval);
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

frtfclView.doClose = function() {
	this.mainWindow.hide();
};

frtfclView.showFees = function(datpk){
//	HY.alert(datpk);
	showFeesWindow(datpk, {"uri": 'fcl-fees'})
}