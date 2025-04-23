Ext.ns("Ext.HY.AirOrderView");
var airodView = Ext.HY.AirOrderView;

Ext.apply(airodView, {
	ctx: ctx + '/jobair/order', pkName: 'ordaid', codeName: 'm_clicontact', title: '空运订单', iconCls: 'nav-airorder'
});

Ext.onReady(function() {
	Ext.QuickTips.init();
	
	var viewport = new Ext.Viewport({
		layout: 'border',
		items: [
			airodView.queryPanel,
			airodView.mainPanel
		]
	});
	viewport.doLayout();
	
	airodView.cnttypeStore.load();
	airodView.packingStore.load();
	
	window.setInterval("HY.fireBeat()",600000);
	if (!HY.isEmpty(prfmID)) {
		airodView.doNew(prfmID);
	}
});

// ------------------ 零部件
airodView.mainStore = HY.Cmp.createJsonStore({
	fields: ['m_ordid','m_ordno','m_orddate','m_clientid','m_clientcode','m_clititle','m_clicontact','m_clitel','ordaid','m_ordnox','pol','placedel','destination','polcode','pldcode','createusername','createtime','lastupdusername','lastupdtime','x_submitted','x_submitte_byname','x_submitte_date','m_accepted','m_accepte_byname','m_accepte_date','m_cancelled','m_cancelled_byname','m_cancelled_date','m_cancelled_desc','m_checked','m_checked_byname','m_checked_date','m_smted','m_smt_by','m_smt_date','m_smt_byname','m_confirmed','m_confirmby','m_confirmdt','m_confirmbyname'],
	url: airodView.ctx + '/datlst.do',
	sortInfo: {field: 'm_orddate', direction: 'DESC'}
});
airodView.mainCM = new Ext.grid.ColumnModel({
	columns:[
		new Ext.grid.RowNumberer({width: 36}),
		{header: '日期', dataIndex: 'm_orddate', width: 80, align: 'center', sortable: true, renderer: HY.renderAsDate},
		{header: '订单号', dataIndex: 'm_ordno', width: 130, sortable: true},
		{header: '预编号', dataIndex: 'm_ordnox', width: 140, sortable: true},
		{header: '起运港', dataIndex: 'pol', width: 100, sortable: true},
		{header: '目的港', dataIndex: 'placedel', width: 100, sortable: true},
		{header: '目的地', dataIndex: 'destination', width: 100, sortable: true},
		{header: '起运港代码', dataIndex: 'polcode', width: 80, sortable: true},
		{header: '目的港代码', dataIndex: 'pldcode', width: 80, sortable: true},
		{header: '委托人', dataIndex: 'm_clititle', width: 160, sortable: true},
		{header: '录入人', dataIndex: 'createusername', width: 80, sortable: true},
		{header: '录入时间', dataIndex: 'createtime', width: 120, align: 'center', sortable: true, renderer: HY.renderAsDateTime},
		{header: '最近更新人', dataIndex: 'lastupdusername', width: 80, sortable: true},
		{header: '最近更新时间', dataIndex: 'lastupdtime', width: 120, align: 'center', sortable: true, renderer: HY.renderAsDateTime},
		{header: '提交', dataIndex: 'x_submitted', width: 50, align: 'center', sortable: true, renderer: HY.renderAsCheckbox},
		{header: '提交人', dataIndex: 'x_submitte_byname', width: 80, sortable: true},
		{header: '提交时间', dataIndex: 'x_submitte_date', width: 120, align: 'center', sortable: true, renderer: HY.renderAsDateTime},
		{header: '受理', dataIndex: 'm_accepted', width: 50, align: 'center', sortable: true, renderer: HY.renderAsCheckbox},
		{header: '受理人', dataIndex: 'm_accepte_byname', width: 80, sortable: true},
		{header: '受理时间', dataIndex: 'm_accepte_date', width: 120, align: 'center', sortable: true, renderer: HY.renderAsDateTime},
		{header: '审核', dataIndex: 'm_checked', width: 50, align: 'center', sortable: true, renderer: HY.renderAsCheckbox},
		{header: '审核人', dataIndex: 'm_checked_byname', width: 80, sortable: true},
		{header: '审核时间', dataIndex: 'm_checked_date', width: 120, align: 'center', sortable: true, renderer: HY.renderAsDateTime},
		{header: '打回', dataIndex: 'm_cancelled', width: 50, align: 'center', sortable: true, renderer: HY.renderAsCheckbox},
		{header: '打回操作员', dataIndex: 'm_cancelled_byname', width: 80, sortable: true},
		{header: '打回时间', dataIndex: 'm_cancelled_date', width: 120, align: 'center', sortable: true, renderer: HY.renderAsDateTime},
		{header: '打回说明', dataIndex: 'm_cancelled_desc', width: 140, sortable: false}
	],
	defaults: HY.Cmp.cmDefaults
});
airodView.mainFields = [
	{xtype: 'hidden', name: 'ordaid'},
	{xtype: 'hidden', name: 'ordid'},
	{xtype: 'hidden', name: 'cnorid'},
	{xtype: 'hidden', name: 'cnortitle'},
	{xtype: 'hidden', name: 'cnorctc'},
	{xtype: 'hidden', name: 'cnortel'},
	{xtype: 'hidden', name: 'cnorfax'},
	{xtype: 'hidden', name: 'cnormail'},
	{xtype: 'hidden', name: 'cneeid'},
	{xtype: 'hidden', name: 'cneetitle'},
	{xtype: 'hidden', name: 'cneectc'},
	{xtype: 'hidden', name: 'cneetel'},
	{xtype: 'hidden', name: 'cneefax'},
	{xtype: 'hidden', name: 'cneemail'},
	{xtype: 'hidden', name: 'lineid'},
	{xtype: 'hidden', name: 'fwdrid'},
	{xtype: 'hidden', name: 'fwdrtel'},
	{xtype: 'hidden', name: 'fwdrfax'},
	{xtype: 'hidden', name: 'agenid'},
	{xtype: 'hidden', name: 'goodsid'},
	{xtype: 'hidden', name: 'packid'},
	{layout: 'absolute', height: 368, border: true, items:[		
		{xtype: 'label', html: '起飞港/POL', width: 160, x: 5, y: 7, cls: 'x-required'},{xtype: 'hidden', name: 'polid'},
		{xtype: 'textfield', name: 'polcode', width: 60, x: 5, y: 25, tabIndex: 301, allowBlank: true, readOnly: true},
		{xtype: 'textfield', name: 'pol', width: 97, x: 68, y: 25, tabIndex: 302, allowBlank: false},
		HY.Cmp.createQryClrButton({btn1:{x: 170, y: 25, fn: function(){ HY.Const.popPort({callback: airodView.setPortPol}); }}, btn2:{x: 193, y: 25, fn: function(){ airodView.clearPop('portpol'); }}}),
		
		{xtype: 'label', html: '目的港/FPOD', width: 160, x: 5, y: 50, cls: 'x-required'},{xtype: 'hidden', name: 'pldid'},
		{xtype: 'textfield', name: 'pldcode', width: 60, x: 5, y: 68, tabIndex: 307, allowBlank: true, readOnly: true},
		{xtype: 'textfield', name: 'placedel', width: 97, x: 68, y: 68, tabIndex: 308, allowBlank: false},
		HY.Cmp.createQryClrButton({btn1:{x: 170, y: 68, fn: function(){ HY.Const.popPort({callback: airodView.setPortPld}); }}, btn2:{x: 193, y: 68, fn: function(){ airodView.clearPop('portpld'); }}}),
		
		{xtype: 'label', html: '目的地/DEST', width: 160, x: 5, y: 93},
		{xtype: 'textfield', name: 'destination', width: 210, x: 5, y: 111, tabIndex: 309, allowBlank: true},
		
		{xtype: 'label', html: '航空公司/Airline', width: 200, x: 5, y: 136},{xtype: 'hidden', name: 'carrierid'},{xtype: 'hidden', name: 'carriertitle'},
		{xtype: 'textfield', name: 'carrierabbr', width: 160, x: 5, y: 154, tabIndex: 0, allowBlank: true, readOnly: true},
		HY.Cmp.createQryClrButton({btn1:{x: 170, y: 154, fn: function(){ HY.Const.popClient({id: 'airlines', comboid: 'airlines', callback: airodView.setAirline}); }}, btn2:{x: 193, y: 154, fn: function(){ airodView.clearPop('airl'); }}}),
		{xtype: 'label', html: '航班/Flight', width: 80, x: 5, y: 179},
		{xtype: 'textfield', name: 'flightcode', width: 210, x: 5, y: 197, tabIndex: 334},
		{xtype: 'label', html: '截关日', width: 96, x: 5, y: 222},
		{xtype: 'datefield', name: 'cmdate', width: 210, x: 5, y: 240, tabIndex: 335, allowBlank: true},
		{xtype: 'label', html: 'ETD', width: 96, x: 5, y: 265},
		{xtype: 'datefield', name: 'etd', width: 100, x: 5, y: 283, tabIndex: 337, allowBlank: true},
		{xtype: 'label', html: 'ETA', width: 96, x: 115, y: 265},
		{xtype: 'datefield', name: 'eta', width: 100, x: 115, y: 283, tabIndex: 338, allowBlank: true},

		{xtype: 'label', html: '承运条款/Delivery Term', width: 180, x: 235, y: 7},
		HY.Const.createCombo('datitem_13', {name: 'frttermdesc', hiddenName: 'frtterm', width: 180, x: 235, y: 25, tabIndex: 339, allowBlank: true, pageSize: 0}),
		{xtype: 'label', html: '运费条款/Freight Term', width: 180, x: 235, y: 50},
		HY.Const.createCombo('datitem_14', {id: 'elm_srppcc', name: 'srppcc', hiddenName: 'srppccid', width: 180, x: 235, y: 68, tabIndex: 340, allowBlank: true, pageSize: 0}),
		{xtype: 'label', html: '付款方式/Payment Term', width: 180, x: 235, y: 93},
		HY.Const.createCombo('datitem_14', {id: 'elm_snppcc', name: 'snppcc', hiddenName: 'snppccid', width: 180, x: 235, y: 111, tabIndex: 341, allowBlank: true, pageSize: 0}),
		{xtype: 'label', html: '付款地点/Payment place', width: 180, x: 235, y: 136},
		{xtype: 'textfield', name: 'snpaymentat', width: 180, x: 235, y: 154, tabIndex: 342, allowBlank: true},
		{xtype: 'label', html: '结算方式', width: 154, x: 450, y: 136},
		HY.Const.createCombo('datitem_19', {id: 'elm_settletype', name: 'settletypedesc', hiddenName: 'settletype', width: 154, x: 450, y: 154, tabIndex: 343, allowBlank: true, pageSize: 0}),

		{xtype: 'label', html: '费率(每万)', width: 168, x: 450, y: 7},
		{xtype: 'numberfield', name: 'feerate', width: 154, x: 450, y: 25, tabIndex: 345, allowBlank: true},		

		{xtype: 'label', html: '订舱单号/Bkg No.', width: 178, x: 450, y: 50},
		{xtype: 'textfield', name: 'sono', width: 154, x: 450, y: 68, tabIndex: 351, allowBlank: true},
		{xtype: 'label', html: '提单类型/BL Type', width: 178, x: 450, y: 93},
		HY.Const.createNCombo('airbltype', {name: 'bltypedesc', hiddenName: 'bltype', width: 154, x: 450, y: 111, tabIndex: 352, allowBlank: true}),
		
		{xtype: 'label', html: '备注/Remark', width: 120, x: 235, y: 179},
		{xtype: 'textarea', name: 'remarks', width: 430, height: 108, x: 235, y: 197, tabIndex: 355, allowBlank: true, cls: "nowrap"}
	]}
];
airodView.renderInused = function(value, metaData, record, rowIndex, colIndex, store) {
	var nds = HY.Const.nds.yesno;
	var s = HY.Const.getNdsText(nds, value);
	return s;
};
airodView.feeCols = ['pkid', 'ordid', 'rptype', 'clientid', 'ppccid', 'feetypeid', 'feeid', 'cyid', 'amt', 'cntqty', 'unitprice', 'unit', 'disamt', 'oprtype', 'srctype', 'cntpkid', 'cntcode', 'linkid', 'linktype', 'remarks', 'rowacttype', 'colchanged', 'isdeleted', 'orgid', 'createuser', 'createtime', 'lastupduser', 'lastupdtime'];
airodView.feeStore = HY.Cmp.createJsonStore({
	fields: airodView.feeCols,
	url: airodView.ctx + '/feelst.do',
	sortInfo: {}
});
airodView.renderDtlRowdatype = function(value, metaData, record, rowIndex, colIndex, store) {
	var s = "";
	if (value && value.length > 0) {
		switch(value) {
		case '10':
			s = '原单(未修改)';
			break;
		case '20':
			s = '原单(已修改)';
			break;
		case '30':
			s = '补料新增';
			break;
		default:
			s = value;
		}
	}
	return s;
};
airodView.feeCM = new Ext.grid.ColumnModel({
	columns:[
		new Ext.grid.RowNumberer({width: 36}),
		{header: '费用代码', dataIndex: 'feecode', width: 100, sortable: true},
		{header: '费用名称', dataIndex: 'feename', width: 130, sortable: true},
		{header: '币制', dataIndex: 'cyid', width: 130, sortable: true},
		{header: '数量', dataIndex: 'cntqty', width: 80, align: 'right', sortable: true},
		{header: '单位', dataIndex: 'unit', width: 100, align: 'right', sortable: true},
		{header: '单价', dataIndex: 'unitprice', width: 100, align: 'right', sortable: true},
		{header: '金额', dataIndex: 'amt', width: 120, sortable: true},
		{header: '备注', dataIndex: 'remarks', width: 240, sortable: true},
		{header: '结算公司', dataIndex: 'cliabbr', width: 240, sortable: true},
		{header: '类别', dataIndex: 'rptype', width: 60, sortable: true, renderer: airodView.renderDtlRowdatype}
	],
	defaults: HY.Cmp.cmDefaults
});
airodView.cnttypeStore = HY.Cmp.createJsonStore({
	fields: ['cnttypeid','cntcode','cntsize','cnttype','isfreeze','isocode','amscode']
	,url: ctx + '/combo/cnttype.do'
	,sortInfo: {field: 'cntcode', direction: 'ASC'}
	,pageSize: 0
});
airodView.packingStore = HY.Cmp.createJsonStore({
	fields: ['packid','packcode','packdesc_c','packdesc_e']
	,url: ctx + '/combo/packing.do'
	,sortInfo: {field: 'packdesc_e', direction: 'ASC'}
	,pageSize: 0
});


// ------------------ 主面板
/**
 * 查询面板
 */
airodView.queryPanel = new HY.Cmp.QueryPanel({
	tarObj: airodView,
	tbarConfig: {editMode: 0, enableNav: false, statusConfig: [],
		actionCustom1: new Ext.Action({text: '复制新增', iconCls: 'tbar-new', handler: function(){
			var rec = airodView.mainPanel.getSelectionModel().getSelected();
			var pkval = "";
			if( rec ) {
				pkval = rec.get(airodView.pkName);
			} else {
				HY.alert('请选择一票单');
				return;
			}
			airodView.doNew(pkval);
		}})	
	},
	items: [
		{
			layout: 'absolute', border: false, height: 36,
			items: [
				{xtype: 'label', html: '订单号', width: 45, x: 5, y: 7, border: true},
				{xtype: 'textfield', name: 'ordno', width: 120, x: 50, y: 6, tabIndex: 101},
				{xtype: 'label', html: '预编号', width: 45, x: 175, y: 7},
				{xtype: 'textfield', name: 'ordnox', width: 120, x: 220, y: 6, tabIndex: 102},
				{xtype: 'label', html: '起运港', width: 45, x: 345, y: 7},
				{xtype: 'textfield', name: 'pol', width: 60, x: 395, y: 6, tabIndex: 103},
				{xtype: 'label', html: '目的港', width: 45, x: 460, y: 7},
				{xtype: 'textfield', name: 'pod', width: 60, x: 510, y: 6, tabIndex: 104},
				{xtype: 'label', html: '日期', width: 30, x: 575, y: 7},
				{xtype: 'datefield', name: 'datefm', width: 95, x: 610, y: 6, tabIndex: 105},
				{xtype: 'label', html: '&nbsp;-', width: 10, x: 705, y: 7},
				{xtype: 'datefield', name: 'dateto', width: 95, x: 715, y: 6, tabIndex: 106},
				{xtype: 'label', html: '提交', width: 30, x: 815, y: 7},
				HY.Const.createNCombo ('yesnoqry', {hiddenName: 'sumttype', value: '0', width: 50, x: 845, y: 5, editable: false, tabIndex: 107}),
				{xtype: 'label', html: '受理', width: 30, x: 900, y: 7},
				HY.Const.createNCombo ('yesnoqry', {hiddenName: 'acpttype', value: '0', width: 50, x: 930, y: 5, editable: false, tabIndex: 108})
			]
		}
	]
});
/**
 * 主列表面板
 */
airodView.mainPanel = new Ext.grid.GridPanel({
	region: 'center',
	border: true,
	margins: '0 0',
	store: airodView.mainStore,
	cm: airodView.mainCM,
	bbar: new HY.Cmp.PagingToolbar({tarObj: airodView, store: airodView.mainStore}),
	listeners: {
		'rowdblclick': function() {
			airodView.doModify();
		}
	}
});
/**
 * 主编辑窗口
 */
airodView.formTitle = new Ext.form.FormPanel({
	region: 'north',
	height: 145,
	border: false,
	bodyStyle: 'padding:5px',
	autoScroll: true,
	bodyCssClass: 'ne-form-panel',
	items: [
		{xtype: 'hidden', name: 'm_ordid'},
		{xtype: 'hidden', name: 'm_ordyear'},
		{xtype: 'hidden', name: 'm_clientid'},
		{xtype: 'hidden', name: 'm_jobtype'},
		{xtype: 'hidden', name: 'm_salesid'},
		{xtype: 'hidden', name: 'm_salescode'},
		{xtype: 'hidden', name: 'm_deptid'},
		{xtype: 'hidden', name: 'm_deptcode'},
		{xtype: 'hidden', name: 'm_srctype'},
		{xtype: 'hidden', name: 'm_cancelled_desc'},
		{xtype: 'hidden', name: 'noprefix'},
		{layout: 'absolute', height: 135, border: true, items:[
			{xtype: 'label', html: '委托人', width: 60, x: 5, y: 7},
			{xtype: 'textfield', name: 'm_clititle', width: 160, x: 65, y: 5, tabIndex: 201},
			{xtype: 'label', html: '联系人', width: 60, x: 5, y: 32},
			{xtype: 'textfield', name: 'm_clicontact', width: 160, x: 65, y: 30, tabIndex: 202},
			{xtype: 'label', html: '电话', width: 60, x: 5, y: 57},
			{xtype: 'textfield', name: 'm_clitel', width: 160, x: 65, y: 55, tabIndex: 203},
			{xtype: 'label', html: '传真', width: 60, x: 5, y: 82},
			{xtype: 'textfield', name: 'm_clifax', width: 160, x: 65, y: 80, tabIndex: 204},

			{xtype: 'label', html: '进出口', width: 60, x: 235, y: 7},
			HY.Const.createCombo('datitem_2', {id: 'elm_impexp', name: 'm_impexpdesc', hiddenName: 'm_impexp', width: 120, listWidth: 120, x: 295, y: 5, tabIndex: 205, allowBlank: false, pageSize: 0, editable: false}),
			{xtype: 'label', html: '装箱类型', width: 60, x: 235, y: 32},
			HY.Const.createNCombo('shpldtype', {id: 'elm_ldtype', name: 'm_ldtypedesc', hiddenName: 'm_ldtype', width: 120, listWidth: 120, x: 295, y: 30, tabIndex: 206, allowBlank: false, pageSize: 0, editable: false}),
			{xtype: 'label', html: '业务员', width: 60, x: 235, y: 57},
			{xtype: 'textfield', name: 'm_salesname', width: 120, x: 295, y: 55, tabIndex: 207, readOnly: true},
			{xtype: 'label', html: '合约号', width: 60, x: 235, y: 82},
			{xtype: 'textfield', name: 'm_contractno', width: 120, x: 295, y: 80, tabIndex: 208},

			{xtype: 'label', html: '参考号', width: 60, x: 425, y: 7},
			{xtype: 'textfield', name: 'm_refno', width: 120, x: 485, y: 5, tabIndex: 209},
			{xtype: 'label', html: '预编号', width: 60, x: 425, y: 32},
			{xtype: 'textfield', name: 'm_ordnox', width: 120, x: 485, y: 30, tabIndex: 210, readOnly: true},
			{xtype: 'label', html: '订单号', width: 60, x: 425, y: 57},
			{xtype: 'textfield', name: 'm_ordno', id: "m_ordno_box", width: 90, x: 485, y: 55, tabIndex: 211, readOnly: true},
			HY.Cmp.createButton({id: 'npfixbtn', x: 580 , y: 55, cls: 'tbar-npfix', fn: function(btn){airodView.showNorules(btn);}}),
			
			{xtype: 'label', html: '下单日期', width: 60, x: 425, y: 82},
			{xtype: 'datefield', name: 'm_orddate', width: 120, x: 485, y: 80, tabIndex: 212, readOnly: true, format: 'datetime'},

			{xtype: 'checkbox', name: 'm_opr_hau', boxLabel: '派车', inputValue: 'Y', width: 60, x: 615, y: 5, tabIndex: 260, allowBlank: true},
			{xtype: 'checkbox', name: 'm_opr_dec', boxLabel: '报关', inputValue: 'Y', width: 60, x: 685, y: 5, tabIndex: 260, allowBlank: true},
			{xtype: 'checkbox', name: 'x_submitted', boxLabel: '提交', inputValue: 'Y', disabled: true, width: 60, x: 615, y: 32, tabIndex: 260, allowBlank: true},
			HY.Cmp.createButton({x: 710, y: 32, cls: 'tbar-accept', text: '提交订单&nbsp;', fn: function(){airodView.doConfirm();}}),
			{xtype: 'label', html: '提交日期', width: 60, x: 615, y: 57},
			{xtype: 'datefield', name: 'x_submitte_date', width: 110, x: 675, y: 55, tabIndex: 261, allowBlank: true, readOnly: true},
			{xtype: 'label', html: '提交人', width: 60, x: 615, y: 82},
			{xtype: 'textfield', name: 'x_submitte_byname', width: 110, x: 675, y: 80, tabIndex: 262, allowBlank: true, readOnly: true},

			{xtype: 'checkbox', name: 'm_accepted', boxLabel: '订单受理', inputValue: 'Y', disabled: true, width: 70, x: 795, y: 5, tabIndex: 263, allowBlank: true},
			{xtype: 'datefield', name: 'm_accepte_date', width: 110, x: 865, y: 5, tabIndex: 264, allowBlank: true, readOnly: true},
			{xtype: 'label', html: '受理人', width: 60, x: 795, y: 32},
			{xtype: 'textfield', name: 'm_accepte_byname', width: 110, x: 865, y: 30, tabIndex: 265, allowBlank: true, readOnly: true},
			
			{xtype: 'checkbox', name: 'm_cancelled', boxLabel: '作废', inputValue: 'Y', disabled: true, width: 70, x: 795, y: 55, tabIndex: 263, allowBlank: true},
			{xtype: 'datefield', name: 'm_cancelled_date', width: 110, x: 865, y: 55, tabIndex: 266, allowBlank: true, readOnly: true},
			{xtype: 'label', html: '作废人', width: 60, x: 795, y: 82},
			{xtype: 'textfield', name: 'm_cancelled_byname', width: 110, x: 865, y: 80, tabIndex: 267, allowBlank: true, readOnly: true},
			
			{xtype: 'checkbox', name: 'm_checked', boxLabel: '审核', inputValue: 'Y', disabled: true, width: 70, x: 615, y: 105, tabIndex: 263, allowBlank: true},
			{xtype: 'datefield', name: 'm_checked_date', width: 110, x: 675, y: 105, tabIndex: 266, allowBlank: true, readOnly: true},
			{xtype: 'label', html: '审核人', width: 60, x: 795, y: 105},
			{xtype: 'textfield', name: 'm_checked_byname', width: 110, x: 865, y: 105, tabIndex: 267, allowBlank: true, readOnly: true},
			
			{xtype: 'checkbox', name: 'm_confirmed', boxLabel: '会员提交', inputValue: 'Y', disabled: true, width: 70, x:235, y: 105, tabIndex: 263, allowBlank: true},
			{xtype: 'textfield', name: 'm_confirmbyname', width: 110, x: 305, y: 105, tabIndex: 267, allowBlank: true, readOnly: true},
			{xtype: 'textfield', name: 'm_confirmdt', width: 180, x: 425, y: 105, tabIndex: 266, allowBlank: true, readOnly: true},
		]}
	]
});
airodView.formBase = new Ext.form.FormPanel({
	region: 'center',
	border: false,
	bodyStyle: 'padding:5px',
	autoScroll: true,
	bodyCssClass: 'ne-form-panel',
	items: airodView.mainFields
});
airodView.formBook = new Ext.form.FormPanel({
	region: 'center',
	border: false,
	bodyStyle: 'padding:5px',
	autoScroll: true,
	bodyCssClass: 'ne-form-panel',
	items: [
		{layout: 'absolute', height: 346, border: true, items:[
			{xtype: 'label', html: '发货人/Shipper', width: 320, x: 5, y: 7},
			{xtype: 'textarea', name: 'cnorname', width: 320, height: 85, x: 5, y: 25, tabIndex: 401, allowBlank: true, cls: "nowrap", enableKeyEvents: true
				,listeners: {
					keyup: function(src, evt) {
						src.setValue(src.getValue().toUpperCase());
					}
				}
			},
			{xtype: 'label', html: '收货人/Consignee', width: 320, x: 5, y: 115},
			{xtype: 'textarea', name: 'cneename', width: 320, height: 85, x: 5, y: 133, tabIndex: 402, allowBlank: true, cls: "nowrap", enableKeyEvents: true
				,listeners: {
					keyup: function(src, evt) {
						src.setValue(src.getValue().toUpperCase());
					}
				}
			},
			{xtype: 'label', html: '通知人/Notify', width: 320, x: 5, y: 222},
			{xtype: 'textarea', name: 'notifyparty', width: 320, height: 85, x: 5, y: 240, tabIndex: 403, allowBlank: true, cls: "nowrap", enableKeyEvents: true
				,listeners: {
					keyup: function(src, evt) {
						src.setValue(src.getValue().toUpperCase());
					}
				}
			},
			
			{xtype: 'label', html: '件数', width: 120, x: 345, y: 7},
			{xtype: 'numberfield', name: 'pieces', width: 120, x: 345, y: 25, tabIndex: 404},
			{xtype: 'label', html: '包装/Packing', width: 200, x: 475, y: 7},
			{xtype: 'textfield', name: 'packing', width: 120, x: 475, y: 25, tabIndex: 405, allowBlank: true},
			HY.Cmp.createQryClrButton({btn1:{x: 600, y: 25, fn: function(){ HY.Const.popPacking({id: 'm-packing', callback: airodView.setPacking}); }}, btn2:{x: 625, y: 25, fn: function(){ airodView.clearPop('pack'); }}}),
			{xtype: 'label', html: '毛重(KGS)', width: 102, x: 345, y: 50},
			{xtype: 'numberfield', name: 'grswgt', width: 102, x: 345, y: 68, tabIndex: 406},
			{xtype: 'label', html: '体积(CBM)', width: 96, x: 451, y: 50},
			{xtype: 'numberfield', name: 'gdscbm', width: 96, x: 451, y: 68, tabIndex: 407},
			{xtype: 'label', html: '净重(KGS)', width: 96, x: 551, y: 50},
			{xtype: 'numberfield', name: 'netwgt', width: 96, x: 551, y: 68, tabIndex: 408},
			
			{xtype: 'label', html: '货名/Commodity Name', width: 320, x: 345, y: 115},
			{xtype: 'textarea', name: 'goodsname', width: 320, height: 85, x: 345, y: 133, tabIndex: 410, allowBlank: true, cls: "nowrap", enableKeyEvents: true
				,listeners: {
					keyup: function(src, evt) {
						src.setValue(src.getValue().toUpperCase());
					}
				}
			},

			{xtype: 'label', html: '装货地址', width: 120, x: 685, y: 7},
			{xtype: 'textarea', name: 'ld_add', width: 288, height: 72, x: 685, y: 25, tabIndex: 411, allowBlank: true, cls: "nowrap"},
			{xtype: 'label', html: '装货日期', width: 60, x: 813, y: 7},
			{xtype: 'datefield', name: 'haudate', width: 100, x: 873, y: 2, tabIndex: 412},
			
			{xtype: 'label', html: '装货联系人', width: 140, x: 685, y: 100},
			{xtype: 'textfield', name: 'ld_ctcname', width: 140, x: 685, y: 118, tabIndex: 413},
			{xtype: 'label', html: '装货电话', width: 140, x: 834, y: 100},
			{xtype: 'textfield', name: 'ld_telno', width: 140, x: 834, y: 118, tabIndex: 414},
			{xtype: 'label', html: '装货手机', width: 140, x: 685, y: 143},
			{xtype: 'textfield', name: 'ld_mobile', width: 140, x: 685, y: 161, tabIndex: 415},
			{xtype: 'label', html: '装货传真', width: 140, x: 834, y: 143},
			{xtype: 'textfield', name: 'ld_faxno', width: 140, x: 834, y: 161, tabIndex: 416}
		]}
	]
});
airodView.formOth = new Ext.form.FormPanel({
	region: 'center',
	border: false,
	bodyStyle: 'padding:5px',
	autoScroll: true,
	bodyCssClass: 'ne-form-panel',
	items: [
		{layout: 'absolute', height: 420, border: true, items:[
			{xtype: 'label', html: '其它1', width: 320, x: 5, y: 7},
			{xtype: 'textarea', name: 'oth01', width: 320, height: 56, x: 5, y: 25, tabIndex: 501, allowBlank: true, cls: "nowrap"},
			{xtype: 'label', html: '其它2', width: 320, x: 5, y: 84},
			{xtype: 'textarea', name: 'oth02', width: 320, height: 56, x: 5, y: 102, tabIndex: 502, allowBlank: true, cls: "nowrap"},
			{xtype: 'label', html: '其它3', width: 320, x: 5, y: 162},
			{xtype: 'textarea', name: 'oth03', width: 320, height: 56, x: 5, y: 180, tabIndex: 503, allowBlank: true, cls: "nowrap"},
			{xtype: 'label', html: '其它4', width: 320, x: 5, y: 240},
			{xtype: 'textarea', name: 'oth04', width: 320, height: 56, x: 5, y: 258, tabIndex: 504, allowBlank: true, cls: "nowrap"},
			
			{xtype: 'label', html: '其它5', width: 320, x: 335, y: 7},
			{xtype: 'textarea', name: 'oth05', width: 320, height: 56, x: 335, y: 25, tabIndex: 505, allowBlank: true, cls: "nowrap"},
			{xtype: 'label', html: '其它6', width: 320, x: 335, y: 84},
			{xtype: 'textarea', name: 'oth06', width: 320, height: 56, x: 335, y: 102, tabIndex: 506, allowBlank: true, cls: "nowrap"},
			{xtype: 'label', html: '其它7', width: 320, x: 335, y: 162},
			{xtype: 'textarea', name: 'oth07', width: 320, height: 56, x: 335, y: 180, tabIndex: 507, allowBlank: true, cls: "nowrap"},
			
			{xtype: 'label', html: '其它8', width: 308, x: 665, y: 7},
			{xtype: 'textarea', name: 'oth08', width: 308, height: 56, x: 665, y: 25, tabIndex: 508, allowBlank: true, cls: "nowrap"},
			{xtype: 'label', html: '其它9', width: 308, x: 665, y: 84},
			{xtype: 'textarea', name: 'oth09', width: 308, height: 56, x: 665, y: 102, tabIndex: 509, allowBlank: true, cls: "nowrap"},
			{xtype: 'label', html: '其它10', width: 308, x: 665, y: 162},
			{xtype: 'textarea', name: 'oth10', width: 308, height: 56, x: 665, y: 180, tabIndex: 510, allowBlank: true, cls: "nowrap"}
			
		]}
	]
});
airodView.mainWindow = new Ext.Window({
	tbar: new HY.Cmp.Toolbar({
		tarObj: airodView,
		editMode: 1,
		enableNav: true,
		statusConfig: [],
		actionCustom1: new Ext.Action({text: '提交订单', iconCls: 'tbar-accept', handler: function(){
			airodView.doConfirm();
		}}),
		actionCustom2: new Ext.Action({text: '撤回提交', iconCls: 'tbar-cancel', handler: function(){
			airodView.doUnconfirm();
		}}),
		actionCustom3: new Ext.Action({text: '查看附件', iconCls: 'tbar-attach', handler: function(){
			var frm = airodView.formTitle.getForm();
			var pkval = HY.fv(frm, 'm_ordid');
			airodView.showAttach(pkval);
		}}),
	    actionCustom4: new Ext.Action({text: '订单审核', iconCls: 'tbar-accept', handler: function(){
	    	airodView.doCheck();
	    }}),
	    actionCustom5: new Ext.Action({text: '订单取消', iconCls: 'tbar-delete', handler: function(){
	    	airodView.doCancel();
	    }})
	}),
	iconCls: airodView.iconCls,
	title: airodView.title,
	maximizable: false,
	maximized: true,
	layout: 'border',
	items: [
		airodView.formTitle,
		new Ext.TabPanel({
			id: 'ord-subs',
			region: 'center',
			activeTab: 0,
			deferredRender: false,
			enableTabScroll: true,
			margins: '0 0',
			defaults: {
				layout: 'border',
				autoScroll: true
			},
			items: [
				{
					layout: 'border',
					title: '基本信息',
					items:[
						airodView.formBase
					]
				},
				{
					layout: 'border',
					title: '订舱&派车',
					items:[
						airodView.formBook
					]
				},
				{
					layout: 'border',
					title: '其它',
					items:[
						airodView.formOth
					]
				}
			]
		})
	]
});

// ------------------ 功能函数
airodView.doRefresh = function(){
	var me = this;
	if (me.mainWindow.isVisible()) {
		var frm = me.formBase.getForm();
		var pkval = HY.fv(frm, me.pkName);
		if (HY.isNumber(pkval) && pkval > 0) {
			airodView.doLoadDetail(pkval, frm);
			airodView.doRefreshFee(pkval);
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
airodView.doNew = function(cpfmid){
	var me = this;
	var frm = me.formTitle.getForm();
	var frm1 = me.formBase.getForm();
	var frm2 = me.formBook.getForm();
	var frm3 = me.formOth.getForm();
	HY.Cmp.clearFormData(frm);
	HY.Cmp.clearFormData(frm1);
	HY.Cmp.clearFormData(frm2);
	HY.Cmp.clearFormData(frm3);
	if (HY.isNumber(cpfmid)) {
		me.doLoadDetail('cpfm'+cpfmid, frm1);
	} else if (!HY.isEmpty(cpfmid)) {
		me.doLoadDetail(cpfmid, frm1);
	} else {
		me.doLoadDetail(0, frm1);
	}
	me.mainWindow.show();
	
	me.feeStore.removeAll();
	
	frm.clearInvalid();
	frm1.clearInvalid();
	frm2.clearInvalid();
	frm3.clearInvalid();
	frm.findField('m_clicontact').focus(true,800);
};
airodView.doSave = function(){
	var me = this;
	var frm = me.formTitle.getForm();
	var frm1 = me.formBase.getForm();
	var frm2 = me.formBook.getForm();
	var frm3 = me.formOth.getForm();
	if (!frm.isValid()) {
		return;
	}
	if (!frm1.isValid()) {
		return;
	}
	if (!frm2.isValid()) {
		return;
	}
	if (!frm3.isValid()) {
		return;
	}
	HY.confirm ({
		callback: function() {
			var params = frm.getValues();
			Ext.apply(params, frm1.getValues());
			Ext.apply(params, frm2.getValues());
			Ext.apply(params, frm3.getValues());
			HY.AjaxRequest({
				params: params,
				showWat: true,
				url: me.ctx + '/save.do',
				callback: function(datobj) {
					HY.fv(frm1, me.pkName, (datobj && datobj.ordaid) ? datobj.ordaid : 0);
					HY.fv(frm, 'm_ordid', (datobj && datobj.ordid) ? datobj.ordid : 0);
					me.doRefresh();
				}
			});
		}
	});
};
airodView.doModify = function(pktmp){
	var me = this;
	var frm = me.formBase.getForm();
	var rec = me.mainPanel.getSelectionModel().getSelected();
	var pkval = "";
	if( rec ) {
		pkval = rec.get(me.pkName);
	} else {
		pkval = pktmp;
	}
	if( HY.isNumber(pkval) && pkval != '0' ) {
		me.doLoadDetail(pkval, frm);
		me.doRefreshFee(pkval);
		me.mainWindow.show();
	}
};
airodView.doDelete = function(){
	var rec = this.mainPanel.getSelectionModel().getSelected();
	if( rec ) {
		var pkval = rec.get(airodView.pkName);
		if (!HY.isNumber(pkval)) return;
		HY.confirm ({
			showWat: true,
			callback: function() {
				var url = airodView.ctx + '/del/' + pkval + '.do';
				HY.AjaxRequest({url: url, showMsg: true, callback: function(datobj){
					airodView.mainStore.remove(rec);
				}});
			}
		});
	}
};
airodView.doLoadDetail = function(pkval, frm) {
	var me = this;
	var frm1 = me.formTitle.getForm();
	var frm2 = me.formBook.getForm();
	var frm3 = me.formOth.getForm();
	if (!HY.isNumber(pkval) && !HY.isNumber((pkval + '').trimA())) {
		HY.alert("参数有误，请重试。");
		return;
	}
	
	var url = airodView.ctx + '/get/' + pkval + '.do';
	HY.AjaxRequest({url: url ,callback: function(datobj){
		HY.Cmp.clearFormData(frm);
		HY.Cmp.clearFormData(frm1);
		HY.Cmp.clearFormData(frm2);
		HY.Cmp.clearFormData(frm3);
		HY.Cmp.parseDateCols(datobj ,'m_submitte_date,m_accepte_date,m_cancelled_date,cmdate,etd,eta,bgetd,haudate,receivedate,precmdate,x_submitte_date,m_checked_date');
		HY.Cmp.parseDateCols(datobj ,'m_orddate', 'Y/m/d H:mi');
		frm.setValues(datobj);
		frm1.setValues(datobj);
		frm2.setValues(datobj);
		frm3.setValues(datobj);
		frm1.findField(airodView.codeName).focus(true,500);
	}});
};
airodView.doClose = function() {
	this.mainWindow.hide();
};
// ------------------------------------- DB Info
airodView.doRefreshFee = function(lnkid) {
	var me = this;
	var frm = me.formBase.getForm();
	var pkval = lnkid || HY.fv(frm, "ordid");
	if( HY.isNumber(pkval) && pkval != '0' ) {
		var params = {"ordid": pkval};
		Ext.apply (me.feeStore.baseParams, params);
		me.feeStore.load();
		return;
	} else {
		HY.alert('请先保存数据');
		return;
	}
};
//订单提交
airodView.doConfirm = function(){
	var me = this;
	var frm = me.formBase.getForm();
	var pkval = HY.fv(frm, me.pkName);
	if (!HY.isNumber(pkval) || pkval == "0") {
		HY.alert('请先保存数据！');
		return;
	}
	HY.confirm ({
		showWat: true,
		callback: function() {
			var url = me.ctx + '/submit.do';
			var params = {"pk": pkval, "isconfirm": "Y"};
			HY.AjaxRequest({url: url, params: params, showMsg: true, callback: function(datobj){
				airodView.doRefresh();
			}});
		}
	});
};
//取消提单确认
airodView.doUnconfirm = function(){
	var me = this;
	var frm = me.formBase.getForm();
	var pkval = HY.fv(frm, me.pkName);
	if (!HY.isNumber(pkval) || pkval == "0") {
		HY.alert('请先保存数据！');
		return;
	}
	HY.confirm ({
		showWat: true,
		callback: function() {
			var url = me.ctx + '/submit.do';
			var params = {"pk": pkval, "isconfirm": "N"};
			HY.AjaxRequest({url: url, params: params, showMsg: true, callback: function(datobj){
				airodView.doRefresh();
			}});
		}
	});
};
// 订单审核
airodView.doCheck = function(){
	var me = this;
	var frm = me.formBase.getForm();
	var pkval = HY.fv(frm, "ordid");
	if (!HY.isNumber(pkval) || pkval == "0") {
		HY.alert('请先保存数据！');
		return;
	}
	HY.confirm({
		showWat:true,
		callback:function(){
			var url = me.ctx + '/check.do';
			var params = {"pk": pkval, "status": "Y"};
			HY.AjaxRequest({url: url, params: params, showMsg: true, callback: function(datobj){
				airodView.doRefresh();
			}});
		}
	})	
};
// 订单取消
airodView.doCancel = function(){
	var me = this;
	var frm = me.formBase.getForm();
	var pkval = HY.fv(frm, "ordid");
	if (!HY.isNumber(pkval) || pkval == "0") {
		HY.alert('请先保存数据！');
		return;
	}
	HY.confirm({
		showWat:true,
		callback:function(){
			var url = me.ctx + '/cancel.do';
			var params = {"pk": pkval, "status": "Y"};
			HY.AjaxRequest({url: url, params: params, showMsg: true, callback: function(datobj){
				airodView.doRefresh();
			}});
		}
	})	
};
airodView.showAttach = function(datpkid) {
	var me = this;
	if( HY.isNumber(datpkid) && datpkid > 0) {
		
	} else {
		HY.alert('请先保存数据');
		return;
	}
	HY.Const.popEdocView(datpkid, {
		editable: true
	});
};

// -------------------------
/**
 * 清除弹窗填充的数据
 * @param {String} type
 */
airodView.clearPop = function(type) {
	var me = this;
	var frm1 = me.formBase.getForm();
	var frm2 = me.formBook.getForm();
	if (type == 'portrec') {
		HY.fv(frm1, 'placerecid', '');
		HY.fv(frm1, 'placereccode', '');
		HY.fv(frm1, 'placerec', '');
	} else if (type == 'portpol') {
		HY.fv(frm1, 'polid', '');
		HY.fv(frm1, 'polcode', '');
		HY.fv(frm1, 'pol', '');
	} else if (type == 'portpot') {
		HY.fv(frm1, 'potid', '');
		HY.fv(frm1, 'potcode', '');
		HY.fv(frm1, 'pot', '');
	} else if (type == 'portpod') {
		HY.fv(frm1, 'podid', '');
		HY.fv(frm1, 'podcode', '');
		HY.fv(frm1, 'pod', '');
	} else if (type == 'portpld') {
		HY.fv(frm1, 'pldid', '');
		HY.fv(frm1, 'pldcode', '');
		HY.fv(frm1, 'placedel', '');
	} else if (type == 'airl') {
		HY.fv(frm1, 'carrierid', '');
		HY.fv(frm1, 'carrierabbr', '');
		HY.fv(frm1, 'carriertitle', '');
	} else if (type == 'pack') {
		HY.fv(frm2, 'packid', '');
		HY.fv(frm2, 'packing', '');
	}
};

/**
 * 装货港口-弹窗回调函数
 */
airodView.setPortPol = function(record) {
	if (record) {
		var frm = airodView.formBase.getForm();
		HY.fv(frm ,'polid' ,record.data['portid']);
		HY.fv(frm ,'polcode' ,record.data['portcode']);
		HY.fv(frm ,'pol' ,record.data['portname_e']);
	}
};
/**
 * 目的港口-弹窗回调函数
 */
airodView.setPortPld = function(record) {
	if (record) {
		var frm = airodView.formBase.getForm();
		HY.fv(frm ,'pldid' ,record.data['portid']);
		HY.fv(frm ,'pldcode' ,record.data['portcode']);
		HY.fv(frm ,'placedel' ,record.data['portname_e']);
	}
};
/**
 * 航空公司-弹窗回调函数
 */
airodView.setAirline = function(record) {
	if (record) {
		var frm = airodView.formBase.getForm();
		HY.fv(frm ,'carrierid' ,record.data['clientid']);
		HY.fv(frm ,'carrierabbr' ,record.data['cliabbr']);
		HY.fv(frm ,'carriertitle' ,record.data['cliname_e']);
	}
};

/**
 * 主单包装-弹窗回调函数
 */
airodView.setPacking = function(record) {
	if (record) {
		var frm = airodView.formBook.getForm();
		HY.fv(frm ,'packid' ,record.data['packid']);
		HY.fv(frm ,'packing' ,record.data['packdesc_e']);
	}
};

/**
 * 编号规则-弹窗回调函数
 */
airodView.showNorules = function(btn){
//	HY.alert ("success")
	if (airodView.npfixMenu === undefined) {
		airodView.npfixMenu = new Ext.menu.Menu({
			id: 'npfixmenu'
		});
	} else {
		airodView.npfixMenu.removeAll();
	}
	HY.AjaxRequest({url: ctx + "/combo/npfixord.do", params: {}, showMsg: false, callback: function(datobj){
		for (var i = 0; i < datobj.results; i ++) {
			airodView.npfixMenu.add({text: datobj.rows[i].prefix, checked: (datobj.rows[i].prefix === airodView.curNpfix), group: 'npfixOrd', handler: function(obj) {
				airodView.curNpfix = obj.text;
				airodView.setNorules(airodView.curNpfix);
			}});
		}
		var b = Ext.get("m_ordno_box");
		airodView.npfixMenu.show(b);
	}});
};

airodView.setNorules = function(npfix) {
	var me = airodView;
	var frm = me.formTitle.getForm();
	HY.fv(frm, 'noprefix', npfix);
};