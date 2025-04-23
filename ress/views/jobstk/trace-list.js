Ext.ns("Ext.HY.StktraView");
var stktraView = Ext.HY.StktraView;

Ext.apply(stktraView, {
	ctx: ctx + '/jobstk/trace', pkName: 'pkid_so', codeName: '', title: '仓储货物追踪'
});

Ext.onReady(function() {
	Ext.QuickTips.init();
	
	var viewport = new Ext.Viewport({
		layout: 'border',
		items: [
			stktraView.queryPanel,
			stktraView.mainPanel,
//			stktraView.footerPanel
		]
	});
	viewport.doLayout();
	stktraView.doRefresh();
	
});

//------------------ 零部件
stktraView.rendershowDoc = function(value, metaData, record, rowIndex, colIndex, store){
	var num = record.data['attcount'];
	if (num == null || num == 0) return '';
	var s = '<a href="javascript:void(0)" onclick="stktraView.showDoc(' + value + ',' + record.data['pkid_so'] + ')">&nbsp;'+ num +'&nbsp;</a>';
	return s;
};

stktraView.rendershowDetail = function(value, metaData, record, rowIndex, colIndex, store){
	if (HY.isEmpty(value)) return '';
	var s = '<a href="javascript:void(0)" onclick="stktraView.showTraceDetail(' + record.data['pkid_sd'] + ',' + record.data['pkid_so'] +')" style = "text-decoration: none;" >' + value + '</a>';
	return s;
};
stktraView.mainStore = HY.Cmp.createJsonStore({
	fields: ['jobid','jobno','jobdate','jobtype','clientid','clicode','stoid','stono','stodate','refno','checked','pono','pkid_sd','goodname_c','actgrswgt','actgdscbm','pieces','grswgt','gdscbm','receiver','txtval02','recaddr','rectelno','cntno','ccagcode','ccagenname','completed','compdate','packing','isnewstatus','pkid_so','stoid_out','attcount','newstatusdate','stono_so'],
	url: stktraView.ctx + '/datlist.do',
	sortInfo: {field: 'jobdate', direction: 'DESC'},
	pageSize:50
});
stktraView.mainCols = [
	  new Ext.grid.RowNumberer({width:36}),
		{header: '最新状态', dataIndex:'isnewstatus', width:140, align:'center',sortable: true, renderer: stktraView.rendershowDetail},
		{header: '最新状态日期', dataIndex: 'newstatusdate', width:100, align: 'center', sortable: true, renderer: HY.renderAsDate},
		{header: '入库单号', dataIndex:'stono', width:120, align:'left',sortable: true},
		{header: '入库日期', dataIndex:'stodate', width:100, align:'center',sortable: true, renderer: HY.renderAsDate},
		{header: '件数', dataIndex:'pieces', width:80, align:'right',sortable: true, summaryType: 'sum', renderer: HY.renderAsInt},
		{header: '体积', dataIndex:'actgdscbm', width:120, align:'right',sortable: true, summaryType: 'sum', renderer: HY.renderAsFloat3},
		{header: 'PO号码', dataIndex:'pono', width:120, align:'left',sortable: true},
		{header: '入库客户单号', dataIndex:'refno', width:120, align:'left',sortable: true},
		{header: '货物名称', dataIndex:'goodname_c', width:140, align:'left',sortable: true},
		{header: '包装中文', dataIndex:'packing', width:120, align:'left',sortable: true},
		{header: '出库单号', dataIndex: 'stono_so', width:120, align: 'left', sortable: true},
		{header: '工作号', dataIndex: 'jobno', width:120, align: 'left', sortable: true},
		{header: '工作单日期', dataIndex: 'jobdate', width:120, align: 'center', sortable: true, renderer: HY.renderAsDate},
		{header: '委托人', dataIndex:'clicode', width:120, align:'left',sortable: true},
		{header: '签收单图片', dataIndex:'stoid_out', width:120, align:'center',sortable: true, renderer: stktraView.rendershowDoc}
];
stktraView.mainCM = new Ext.grid.ColumnModel({
	columns: stktraView.mainCols,
	defaults: HY.Cmp.cmDefaults
});


/**
 * 查询面板
 */
stktraView.queryPanel = new HY.Cmp.QueryPanel({
	tarObj:stktraView,
	tbarConfig:{editMode: 0, enableNav: false, statusConfig: ['Modify#Delete#New!00', 'Export!11']},
	items:[
		{
			layout: 'absolute', border: false, height: 36,
			items:[
				{xtype: 'label', html: 'PO号码', width: 70, x: 5, y: 7, border: true},
				{xtype: 'textfield', name: 'pono', width: 120, x: 75, y: 6, tabIndex: 101},
				{xtype: 'label', html: '客户单号', width: 70, x: 210, y: 7, border: true},
				{xtype: 'textfield', name: 'refno', width: 120, x: 270, y: 6, tabIndex: 102},
				{xtype: 'label', html: '入库单号', width: 70, x: 405, y: 7},
				{xtype: 'textfield', name: 'stono', width: 120, x: 465, y: 6, tabIndex: 103},
				{xtype: 'label', html: '入库日期', width: 70, x: 595, y: 7},
				{xtype: 'datefield', name: 'datefrom', width: 95, x: 670, y: 5, tabIndex: 104},
				{xtype: 'label', html: '&nbsp;-', width: 10, x: 770, y: 7},
				{xtype: 'datefield', name: 'dateto', width: 95, x: 785, y: 5, tabIndex: 105},
				{xtype: 'label', html: '货物名称', width: 70, x: 890, y: 7, border: true},
				{xtype: 'textfield', name: 'goodsname', width: 120, x: 955, y: 6, tabIndex: 106},
				{xtype: 'label', html: '出库单号', width: 70, x: 1095, y: 7},
				{xtype: 'textfield', name: 'stonoso', width: 120, x: 1145, y: 6, tabIndex: 107},
				
			]
		}
	]
});

/**
 * 主列表面板
 */
stktraView.summary = new Ext.grid.GridSummary();
stktraView.mainPanel = new Ext.grid.GridPanel({
	region: 'center',
	border: false,
	margins: '0 0',
	store: stktraView.mainStore,
	cm: stktraView.mainCM,
	bbar: new HY.Cmp.PagingToolbar({pageSize:50,tarObj: stktraView, store: stktraView.mainStore}),
	listeners:{
		'rowdblclick': function() {
			
		}
	},
	viewConfig: {
		forceFit: false,
		enableRowBody: true
	},
	plugins: stktraView.summary
});


stktraView.mainWindow = new Ext.Window({
	tbar: new HY.Cmp.Toolbar({
		tarObj: stktraView,
		editMode: 1,
		enableNav: true,
		statusConfig: []
	}),
	iconCls: stktraView.iconCls,
	title: stktraView.title,
	maximizable: false,
	maximized: true,
	layout: 'border',
	items: [
		
	]
});

stktraView.footerPanel = new Ext.Panel({
	region: 'south',
	border: false,
	margins: '0 0',
	height: 24,
	
});


//-----------------功能函数
stktraView.doRefresh = function(){
	var me = this;
	var frm = me.queryPanel.getForm();
	var params = {};
	Ext.apply (params, frm.getValues());
	Ext.apply (me.mainStore.baseParams, params);
	me.mainStore.load();
//	me.mainCM.setSummaryData({'goodname_c': '总计', 'pieces': 12980});
//	me.loadFooter();
};
stktraView.doExport = function(){
	var me = this;
	var frm = me.queryPanel.getForm();
	var params = {};
	Ext.apply (params, frm.getValues());
	Ext.apply (me.mainStore.baseParams, params);
	HY.AjaxRequest({
		params: params,
		showMsg: false,
		showWat: true,
		url: stktraView.ctx + '/stktracexls.do',
		callback: function(datobj) {
			var dwnurl = stktraView.ctx + '/downxls.do'
			window.open(dwnurl, 'tracestk', 'width=300,height=200');
		}
	});
};


stktraView.showDoc = function(datpkid,datrefid){
		if (!(HY.isNumber(datpkid) && datpkid > 1000)) {
			HY.alert('此动态暂未上传附件');
			return;
		}
		var _cfgs = {
			title: '附件浏览窗口',
			width: 860,
			gridStore: HY.Cmp.createJsonStore({
				fields: ['docid','datpkid','filedesc','filename','docdate','mimetype','isimg','filesize','createusername','intval02'],
				url: ctx + '/edocs/listdat.do?datpkid='+datpkid+'&refid=' + datrefid,
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
						if(record.data['intval02'] > 0){
							_url = ctx + "/edocs/download.do?docid=" + record.data['intval02'];
						}
						var _href = "<a href=\"" + _url + "\" target=\"_blank\" class=\"celnk\">下载</a>";
						return _href;
					}},
					{header: '预览', dataIndex: 'docid', width: 80, align: 'center', sortable: false, renderer: function(value, metaData, record, rowIndex, colIndex, store) {
						var _url = ctx + "/edocs/download.do?docid=" + value + "&linktype=11";
						if(record.data['intval02'] > 0){
							_url = ctx + "/edocs/download.do?docid=" + record.data['intval02'] + '&linktype=11';
						}
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

stktraView.showTraceDetail = function(datpkid, datrefid){
	var url = stktraView.ctx + '/detail.do?datpkid='+ datpkid +'&datpkval='+ datrefid;
	
	if (stktraView.traceDetailWin == null || stktraView.traceDetailWin === undefined) {
		stktraView.traceDetailWin = new Ext.Window({
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
							html:"<iframe src="+ url +" style='width:100%; height: 100%; min-height:480px; background-color:#fff' id='stktraViewFrame'></iframe>"
						}
					]
				})
			]
		});
	} else {
		var iframe = window.document.getElementById('stktraViewFrame');
		iframe.src = url;
	}
	stktraView.traceDetailWin.show();
};
stktraView.footerPanel = new Ext.Panel({
	region: 'south',
	border: false,
	margins: '0 0',
	height: 24
})
stktraView.loadFooter = function() {
	var me = this;
	var frm = me.queryPanel.getForm();
	var params = {};
	Ext.apply (params, frm.getValues());
//	Ext.apply (params, me.mainStore.baseParams);
	var sort = me.mainStore.sortInfo.field;
	var dir = me.mainStore.sortInfo.direction;
	var sortparams = {sort:sort, dir:dir};
	Ext.apply(params, sortparams);
	console.log(params);
	HY.AjaxGetHtml({
		url: stktraView.ctx + "/footer.do",
		params: params,
		showWat: false,
		callback: function (result) {
			stktraView.footerPanel.update(result);
		}
	});
};