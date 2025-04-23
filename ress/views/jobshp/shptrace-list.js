Ext.ns("Ext.HY.ShploctraView");
var shploctraView = Ext.HY.ShploctraView;

Ext.apply(shploctraView,{
	ctx:ctx + '/jobshp/shptrace', pkName: 'shpid', codeName:'', title:'海运货物追踪', iconCls:'nav-shptrace'
});

Ext.onReady(function(){
	Ext.QuickTips.init();
	
	var viewport = new Ext.Viewport({
		layout:'border',
		items:[
			shploctraView.queryPanel,
			shploctraView.mainPanel
		]
	});
	viewport.doLayout();
	
})

// ------------ 零部件

shploctraView.mainStore = HY.Cmp.createJsonStore({
	fields: ['jobid', 'shpid','etd','eta','atd','ata','shpnabbr','isnewstatus','newstatusdate','cntno','pol','pod','placedel','attcount','jobno','loaddate_hau','placedel','jobdate'],
	url: shploctraView.ctx + '/datlst.do',
	sortInfo: {field: 'jobdate', direction: 'DESC'},
	pageSize:50
});


shploctraView.rendershowDetail = function(value, metaData, record, rowIndex, colIndex, store){
	 var s = '<a href="javascript:void(0)" onclick="shploctraView.showTraceDetail( ' + value + ' )" style = "text-decoration: none;" >查看</a>';
	 return s;
};

shploctraView.rendershowDoc = function(value, metaData, record, rowIndex, colIndex, store){
	 var s = '<a href="javascript:void(0)" onclick="shploctraView.showDoc(' + value + ')">'+ record.data['attcount'] +'</a>';
	 return s;
};



shploctraView.mainCM = new Ext.grid.ColumnModel({
	columns:[
		new Ext.grid.RowNumberer({width:36}),
		{header: '最新状态', dataIndex:'isnewstatus', width:80, align:'center',sortable: true},
		{header: '最新状态日期', dataIndex: 'newstatusdate', width:120, align: 'center', sortable: true, renderer:HY.renderAsDate},
		{header: '货物动态节点', dataIndex: 'shpid', width:100, align: 'center', sortable: true, renderer:shploctraView.rendershowDetail},
		{header: '工作号', dataIndex: 'jobno', width:120, align: 'center', sortable: true},
		{header: '工作单日期',dataIndex:'jobdate', width:120, align: 'center', sortable: true, renderer:HY.renderAsDate},
		{header: '船公司简称', dataIndex: 'shpnabbr', width: 140, align: 'center', sortable: true},
		{header: '起运港', dataIndex:'pol', width:120, align:'center',sortable: true},
		{header: '目的港', dataIndex:'placedel', width:120, align:'center',sortable: true},
		{header: '装柜日期', dataIndex:'loaddate_hau',width:160, align:'center',sortable: true, renderer:HY.renderAsDate},
		{header: 'ETD', dataIndex:'etd', width:160, align:'center',sortable: true, renderer:HY.renderAsDate},
		{header: 'ETA', dataIndex:'eta', width:160, align:'center',sortable: true, renderer:HY.renderAsDate},
		{header: 'ATD', dataIndex:'atd', width:160, align:'center',sortable: true, renderer:HY.renderAsDate},
		{header: 'ATA', dataIndex:'ata', width:160, align:'center',sortable: true, renderer:HY.renderAsDate},
		{header: '签收单图片', dataIndex:'shpid', width:120, align:'center',sortable: true, renderer:shploctraView.rendershowDoc}
	],
	defaults: HY.Cmp.cmDefaults 
});

//--------------- 主面板

/**
 * 查询面板
 */
shploctraView.queryPanel = new HY.Cmp.QueryPanel({
	tarObj:shploctraView,
	tbarConfig:{editMode: 0, enableNav: false, statusConfig: ['Modify!00','Delete!00','New!00','Export!11']},
	items:[
		{
			layout: 'absolute', border: false, height: 36,
			items:[
				{xtype: 'label', html: '船公司', width: 45, x: 5, y: 7, border: true},
				{xtype: 'textfield', name: 'shpnabbr', width: 90, x: 60, y: 6, tabIndex: 101},
				{xtype: 'label', html: '起运港', width: 45, x: 165, y: 7, border: true},
				{xtype: 'textfield', name: 'pol', width: 90, x: 216, y: 6, tabIndex: 102},
				{xtype: 'label', html: '目的港', width: 45, x: 316, y: 7},
				{xtype: 'textfield', name: 'pod', width: 90, x: 370, y: 6, tabIndex: 103},
				{xtype: 'label', html: '工作单日期', width: 70, x: 470, y: 7},
				{xtype: 'datefield', name: 'datefrom', width: 95, x: 550, y: 5, tabIndex: 104},
				{xtype: 'label', html: '&nbsp;-', width: 10, x: 655, y: 7},
				{xtype: 'datefield', name: 'dateto', width: 95, x: 670, y: 5, tabIndex: 105},
				{xtype: 'label', html: 'ETD', width: 25, x: 770, y: 7},
				{xtype: 'datefield', name: 'datefrometd', width: 95, x: 800, y: 5, tabIndex: 106},
				{xtype: 'label', html: '&nbsp;-', width: 10, x: 900, y: 7},
				{xtype: 'datefield', name: 'datetoetd', width: 95, x: 915, y: 5, tabIndex: 107},
				{xtype: 'label', html: 'ATD', width: 25, x: 1025, y: 7},
				{xtype: 'datefield', name: 'datefromatd', width: 95, x: 1055, y: 5, tabIndex: 108},
				{xtype: 'label', html: '&nbsp;-', width: 10, x: 1155, y: 7},
				{xtype: 'datefield', name: 'datetoatd', width: 95, x:1170, y: 5, tabIndex: 109},
			]
		}
	]
});

/**
 * 主列表面板
 */
 
shploctraView.mainPanel = new Ext.grid.GridPanel({
	region: 'center',
	border: true,
	margins: '0 0',
	store: shploctraView.mainStore,
	cm: shploctraView.mainCM,
	bbar: new HY.Cmp.PagingToolbar({pageSize:50,tarObj: shploctraView, store: shploctraView.mainStore}),
	listeners:{
		'rowdblclick': function() {

		}
	}
});


shploctraView.mainWindow = new Ext.Window({
	tbar: new HY.Cmp.Toolbar({
		tarObj: shploctraView,
		editMode: 1,
		enableNav: true,
		statusConfig: []
	}),
	iconCls: shploctraView.iconCls,
	title: shploctraView.title,
	maximizable: false,
	maximized: true,
	layout: 'border',
	items: [
		
	]
});

shploctraView.showDoc = function(datpkid){
	if (!(HY.isNumber(datpkid) && datpkid > 1000)) {
		HY.alert('此动态暂未上传附件');
		return;
	}
	var _cfgs = {
		title: '附件浏览窗口',
		width: 860,
		gridStore: HY.Cmp.createJsonStore({
			fields: ['docid','datpkid','filedesc','filename','docdate','mimetype','isimg','filesize','createusername'],
			url: ctx + '/edocs/listdat.do?datpkid='+datpkid,
			sortInfo: {}
		}),
		gridColModel: new Ext.grid.ColumnModel({
			columns:[
				new Ext.grid.RowNumberer({width: 36}),
				{header: '日期', dataIndex: 'docdate', width: 120, sortable: true, renderer: HY.renderAsDateTime},
				{header: '文件名称', dataIndex: 'filename', width: 160, sortable: true},
				{header: '文件说明', dataIndex: 'filedesc', width: 160, sortable: true},
				{header: '文件类型', dataIndex: 'mimetype', width: 80, sortable: true},
				{header: '操作', dataIndex: 'docid', width: 80, align: 'center', sortable: false, renderer: function(value, metaData, record, rowIndex, colIndex, store) {
					var _url = ctx + "/edocs/download.do?docid=" + value;
					var _href = "<a href=\"" + _url + "\" target=\"_blank\" class=\"celnk\">下载</a>";
					return _href;
				}},
				{header: '预览', dataIndex: 'docid', width: 80, align: 'center', sortable: false, renderer: function(value, metaData, record, rowIndex, colIndex, store) {
					var _url = ctx + "/edocs/download.do?docid=" + value + "&linktype=11";
					var _href = "<a href=\"" + _url + "\" target=\"_blank\" class=\"celnk\">预览</a>";
					return _href;
				}},
				{header: '文件大小', dataIndex: 'filesize', width: 90, align: 'right', sortable: false},
				{header: '录入人', dataIndex: 'createusername', width: 80, sortable: true}
			],
			defaults: HY.Cmp.cmDefaults
		}),
	};
	Ext.apply(_cfgs, {editable:false});
	var _evw = new HY.Cmp.WindowDataView(_cfgs);
	_evw.show();
	_evw.gridStore.load();
};

//-----------------功能函数
shploctraView.doRefresh = function(){
	 var me = this;
		if (me.mainWindow.isVisible()) {
			var frm = me.formBase.getForm();
			var pkval = HY.fv(frm, me.pkName);
			if (HY.isNumber(pkval) && pkval > 0) {
//				shploctraView.doLoadDetail(pkval, frm);
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

shploctraView.doExport = function(){
	var me = this;
	var frm = me.queryPanel.getForm();
	var params = {};
	Ext.apply (params, frm.getValues());
	Ext.apply (me.mainStore.baseParams, params);
	HY.AjaxRequest({
		params: params,
		showMsg: false,
		showWat: true,
		url: shploctraView.ctx + '/shptracexls.do',
		callback: function(datobj) {
			var dwnurl = shploctraView.ctx + '/downxls.do'
			window.open(dwnurl, 'traceshp', 'width=300,height=200');
		}
	});
};

shploctraView.showTraceDetail = function(datpkid){
	var url = shploctraView.ctx + '/detail.do?datpkid='+ datpkid;
	
	if (shploctraView.traceDetailWin == null || shploctraView.traceDetailWin === undefined) {
		shploctraView.traceDetailWin = new Ext.Window({
			title:'货物追踪详情',
			width: 480,
			height: 530,
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
							id:'detailItem',
							html:"<iframe src="+ url +" style='width:100%; height: 100%; min-height:480px; background-color:#fff' id='shptraViewFrame'></iframe>"
						}
					]
				})
			]
		});
	} else {
		var iframe = window.document.getElementById('shptraViewFrame');
		iframe.src = url;
	}
	shploctraView.traceDetailWin.show();
};