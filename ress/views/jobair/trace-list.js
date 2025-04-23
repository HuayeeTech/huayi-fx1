Ext.ns("Ext.HY.AirtraView");
var airtraView = Ext.HY.AirtraView;

Ext.apply(airtraView,{
	ctx:ctx + 'jobair/trace', pkName: '', codeName: '', title:'空运货物追踪', iconCls:'nav-shptrace'
});

Ext.onReady(function(){
	Ext.QuickTips.init();
	
	var viewport = new Ext.Viewport({
		layout:'border',
		items:[
			airtraView.queryPanel,
			airtraView.mainPanel
		]
	});
	viewport.doLayout();
	
})

// ------------ 零部件

airtraView.mainStore = HY.Cmp.createJsonStore({
	fields: ['jobno','blnom', 'sono', 'shpnid', 'shpnabbr', 'vessel', 'voyage', 'pol', 'polid', 'pod', 'podid', 'pot', 'potid', 'placedel', 'pldid', 'destination', 'etd', 'eta'],
	url: airtraView.ctx + '',
	sortInfo: {field: '', direction: 'DESC'}
});

airtraView.mainCM = new Ext.grid.ColumnModel({
	columns:[
		new Ext.grid.RowNumberer({width:36}),
		{header: '航空公司', dataIndex: 'shpnabbr', width: 140,sortable: true},
		{header: '订舱号', dataIndex: 'sono', width: 120, sortable: true},
		{header: '工作号', dataIndex: 'jobno', width:120, sortable: true},
//		{header: '船名', dataIndex: 'vessel', width: 80, sortable: true},
		{header: '航班', dataIndex: 'vovyage', width: 80, sortable: true},
		{header: '起运港', dataIndex: 'pol', width: 160,  sortable: true},
		{header: '卸货港', dataIndex: 'pod', width: 160,  sortable: true},
		{header: '目的港', dataIndex: 'pod', width: 160,  sortable: true},
		{header: '目的地', dataIndex: 'destination', width: 160, sortable: true},
		{header: '转运港', dataIndex: 'pot', width: 160, sortable: true},
		{header: '预计离港时间', dataIndex: 'etd', width: 120, align: 'center', sortable: true, renderer:HY.renderAsDate},
		{header: '预计到港时间', dataIndex: 'eta', width: 120, align: 'center', sortable: true, renderer:HY.renderAsDate}
	],
	defaults: HY.Cmp.cmDefaults
});


//--------------- 主面板

/**
 * 查询面板
 */
airtraView.queryPanel = new HY.Cmp.QueryPanel({
	tarObj:airtraView,
	tbarConfig:{editMode: 0, enableNav: false, statusConfig: ['Modify!00','Delete!00','New!00']},
	items:[
		{
			layout: 'absolute', border: false, height: 36,
			items:[
				{xtype: 'label', html: '订舱号', width: 45, x: 5, y: 7, border: true},
				{xtype: 'textfield', name: 'sono', width: 120, x: 50, y: 6, tabIndex: 101},
				{xtype: 'label', html: '航空公司', width: 60, x: 175, y: 7},
				{xtype: 'textfield', name: 'shpnabbr', width: 120, x: 230, y: 6, tabIndex: 102},
				{xtype: 'label', html: '起运港', width: 45, x: 355, y: 7},
				{xtype: 'textfield', name: 'pol', width: 60, x: 405, y: 6, tabIndex: 103},
				{xtype: 'label', html: '目的港', width: 45, x: 470, y: 7},
				{xtype: 'textfield', name: 'placedel', width: 60, x: 520, y: 6, tabIndex: 104},
			]
		}
	]
});

/**
 * 主列表面板
 */
 
airtraView.mainPanel = new Ext.grid.GridPanel({
	region: 'center',
	border: true,
	margins: '0 0',
	store: airtraView.mainStore,
	cm: airtraView.mainCM,
	bbar: new HY.Cmp.PagingToolbar({tarObj:airtraView, store:''}),
	listeners:{
		
	}
});
