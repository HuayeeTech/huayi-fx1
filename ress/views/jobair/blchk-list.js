Ext.ns("Ext.HY.AirBLCheckView");
var airblchkView = Ext.HY.AirBLCheckView;

Ext.apply(airblchkView, {
	ctx: ctx + '/jobair/blchk', pkName: '', codeName: '', title: '空运提单补料'
});

Ext.onReady(function(){
	Ext.QuickTips.init();
	
	var viewport = new Ext.Viewport({
		layout: 'border',
		items: [
			airblchkView.queryPanel,
			airblchkView.mainPanel
		]
	});
	viewport.doLayout();
})


//----------------零部件
airblchkView.mainStore = HY.Cmp.createJsonStore({
	fields: [ ],
	url: airblchkView.ctx + '',
	sortInfo: {field: '', direction: 'ASC'}
});

airblchkView.mainCM = new Ext.grid.ColumnModel({
	columns:[
		new Ext.grid.RowNumberer({width:36}),
		{header: 'H/BL No.', dataIndex: 'blnoh', width: 120, sortable: true},
		{header: 'M/BL No.', dataIndex: 'blnom', width: 120, sortable: true},
		//{header: '船名', dataIndex: 'vessel', width: 100, sortable: true},
		{header: '航班', dataIndex: 'voyage', width: 100, sortable: true},
		{header: 'ETD', dataIndex: 'etd', width: 100, align: 'center', sortable: true, renderer: HY.renderAsDate},
		{header: 'ETA', dataIndex: 'eta', width: 100, align: 'center', sortable: true, renderer: HY.renderAsDate},
		{header: '起飞港', dataIndex: 'pol', width: 100, sortable: true},
		{header: '中转港', dataIndex: 'pot', width: 100, sortable: true},
		{header: '卸货港', dataIndex: 'pod', width: 100, sortable: true},
		{header: '目的地', dataIndex: 'destination', width: 100, sortable: true},
		{header: '工作单号', dataIndex: 'jobno', width: 120, sortable: true},
		{header: '录入人', dataIndex: 'createusername', width: 80, sortable: true},
		{header: '录入时间', dataIndex: 'createtime', width: 120, align: 'center', sortable: true, renderer: HY.renderAsDateTime},
		{header: '最近更新人', dataIndex: 'lastupdusername', width: 80, sortable: true},
		{header: '最近更新时间', dataIndex: 'lastupdtime', width: 120, align: 'center', sortable: true, renderer: HY.renderAsDateTime}
	],
	defaults: HY.Cmp.cmDefaults
});

airblchkView.mainFields = [
	{xtype: 'hidden', name: 'jobid'},
	{xtype: 'hidden', name: 'airid'},
	{layout: 'absolute', height: 680, border: true, items:[
		{xtype: 'label', html: '发货人/Shipper', width: 320, x: 5, y: 7, cls: 'x-required'},
		{xtype: 'textarea', name: 'cnorname', width: 320, height: 85, x: 5, y: 25, tabIndex: 201, allowBlank: false, cls: "nowrap", enableKeyEvents: true
			,listeners: {
				
			}
		},
		{xtype: 'label', html: '收货人/Consignee', width: 320, x: 5, y: 115, cls: 'x-required'},
		{xtype: 'textarea', name: 'cneename', width: 320, height: 85, x: 5, y: 133, tabIndex: 202, allowBlank: false, cls: "nowrap", enableKeyEvents: true
			,listeners: {
				
			}
		},
		{xtype: 'label', html: '通知人/Notify', width: 320, x: 5, y: 222, cls: 'x-required'},
		{xtype: 'textarea', name: 'notifyparty', width: 320, height: 85, x: 5, y: 240, tabIndex: 203, allowBlank: false, cls: "nowrap", enableKeyEvents: true
			,listeners: {
				
			}
		},
		{xtype: 'label', html: '第二通知人/2nd Notify', width: 320, x: 5, y: 331},
		{xtype: 'textarea', name: 'notifyparty2', width: 320, height: 85, x: 5, y: 349, tabIndex: 204, allowBlank: true, cls: "nowrap", enableKeyEvents: true
			,listeners: {
				
			}
		},
		{xtype: 'label', html: '航空公司/Carrier', width: 200, x: 335, y: 7, cls: 'x-required'},{xtype: 'hidden', name: 'shpnid'},{xtype: 'hidden', name: 'shpntitle'},
		{xtype: 'textfield', name: 'shpnabbr', width: 200, x: 335, y: 25, tabIndex: 0, allowBlank: false, readOnly: true},
		HY.Cmp.createQryClrButton({btn1:{x: 538, y: 25, fn: function(){ HY.Const.popClient({id: 'shipper', comboid: 'shipper', callback: airairairairblchkView.setShipper}); }}, btn2:{x: 563, y: 25, fn: function(){ airairairairblchkView.clearPop('shpn'); }}}),
		{xtype: 'label', html: '提单号/BL No.', width: 200, x: 595, y: 7, cls: 'x-required'},
		{xtype: 'textfield', name: 'blnom', width: 200, x: 595, y: 25, tabIndex: 206, allowBlank: false},
		{xtype: 'label', html: '订舱单号/Bkg No.', width: 200, x: 335, y: 50, cls: 'x-required'},
		{xtype: 'textfield', name: 'sono', width: 200, x: 335, y: 68, tabIndex: 207, allowBlank: false},
		{xtype: 'label', html: '提单类型/BL Type', width: 200, x: 595, y: 50, cls: 'x-required'},
		HY.Const.createCombo('datitem_15', {name: 'mbltypedesc', hiddenName: 'mbltype', width: 200, x: 595, y: 68, tabIndex: 208, allowBlank: false, pageSize: 0}),
//		{xtype: 'label', html: '船名/Vsl Name', width: 200, x: 335, y: 93, cls: 'x-required'},
		{xtype: 'textfield', name: 'vessel', width: 200, x: 335, y: 111, tabIndex: 209, allowBlank: false},
		{xtype: 'label', html: '航班/Voyage', width: 200, x: 595, y: 93, cls: 'x-required'},
		{xtype: 'textfield', name: 'voyage', width: 200, x: 595, y: 111, tabIndex: 210, allowBlank: false},
		{xtype: 'label', html: 'AMS类型/AMS Type', width: 200, x: 335, y: 136},
		HY.Const.createCombo('datitem_23', {name: 'amssvctypedesc', hiddenName: 'amssvctype', width: 200, x: 335, y: 154, tabIndex: 211, allowBlank: true, pageSize: 0}),
		{xtype: 'label', html: 'SCAC Code', width: 200, x: 595, y: 136},
		{xtype: 'textfield', name: 'scaccode', width: 200, x: 595, y: 154, tabIndex: 212, allowBlank: true},
		{xtype: 'label', html: '付款方式/Payment Term', width: 200, x: 335, y: 179, cls: 'x-required'},
		HY.Const.createCombo('datitem_14', {id: 'elm_snppcc', name: 'snppcc', hiddenName: 'snppccid', width: 200, x: 335, y: 197, tabIndex: 213, allowBlank: false, pageSize: 0}),

		{xtype: 'label', html: 'House BL No.', width: 200, x: 595, y: 179},
		{xtype: 'textfield', name: 'blnoh', width: 200, x: 595, y: 197, tabIndex: 214, allowBlank: true},
		{xtype: 'label', html: '承运条款/Delivery Term', width: 200, x: 335, y: 222},
		HY.Const.createCombo('datitem_13', {name: 'frttermdesc', hiddenName: 'frtterm', width: 200, x: 335, y: 240, tabIndex: 215, allowBlank: true, pageSize: 0}),
		{xtype: 'label', html: '商品编码/HS Code', width: 200, x: 595, y: 222},
		{xtype: 'textfield', name: 'gdshscode', width: 200, x: 595, y: 240, tabIndex: 216, allowBlank: true},
		{xtype: 'label', html: '合约号/Contract No.', width: 200, x: 335, y: 265},
		{xtype: 'textfield', name: 'contractno', width: 200, x: 335, y: 283, tabIndex: 217, allowBlank: true},
		{xtype: 'label', html: '签约客户/Contract Holder', width: 200, x: 595, y: 265},
		{xtype: 'textfield', name: 'agreename', width: 200, x: 595, y: 283, tabIndex: 218, allowBlank: true},
		{xtype: 'label', html: '收货地/POR', width: 200, x: 335, y: 308, cls: 'x-required'},{xtype: 'hidden', name: 'placerecid'},
		{xtype: 'textfield', name: 'placereccode', width: 60, x: 335, y: 326, tabIndex: 219, allowBlank: true, readOnly: true},
		{xtype: 'textfield', name: 'placerec', width: 136, x: 400, y: 326, tabIndex: 220, allowBlank: false},
		HY.Cmp.createQryClrButton({btn1:{x: 538, y: 326, fn: function(){ HY.Const.popPort({callback: airairairairblchkView.setPortRec}); }}, btn2:{x: 563, y: 326, fn: function(){ airairairairblchkView.clearPop('portrec'); }}}),
		{xtype: 'label', html: '起运港/POL', width: 200, x: 595, y: 308, cls: 'x-required'},{xtype: 'hidden', name: 'polid'},
		{xtype: 'textfield', name: 'polcode', width: 60, x: 595, y: 326, tabIndex: 221, allowBlank: true, readOnly: true},
		{xtype: 'textfield', name: 'pol', width: 136, x: 660, y: 326, tabIndex: 222, allowBlank: false},
		HY.Cmp.createQryClrButton({btn1:{x: 798, y: 326, fn: function(){ HY.Const.popPort({callback: airairairairblchkView.setPortPol}); }}, btn2:{x: 823, y: 326, fn: function(){ airairairairblchkView.clearPop('portpol'); }}}),
		{xtype: 'label', html: '中转港/T/S', width: 200, x: 335, y: 351, cls: 'x-required'},{xtype: 'hidden', name: 'potid'},
		{xtype: 'textfield', name: 'potcode', width: 60, x: 335, y: 369, tabIndex: 223, allowBlank: true, readOnly: true},
		{xtype: 'textfield', name: 'pot', width: 136, x: 400, y: 369, tabIndex: 224, allowBlank: true},
		HY.Cmp.createQryClrButton({btn1:{x: 538, y: 369, fn: function(){ HY.Const.popPort({callback: airairairairblchkView.setPortPot}); }}, btn2:{x: 563, y: 369, fn: function(){ airairairairblchkView.clearPop('portpot'); }}}),
		{xtype: 'label', html: '卸货港/POD', width: 200, x: 595, y: 351, cls: 'x-required'},{xtype: 'hidden', name: 'podid'},
		{xtype: 'textfield', name: 'podcode', width: 60, x: 595, y: 369, tabIndex: 225, allowBlank: true, readOnly: true},
		{xtype: 'textfield', name: 'pod', width: 136, x: 660, y: 369, tabIndex: 226, allowBlank: false},
		HY.Cmp.createQryClrButton({btn1:{x: 798, y: 369, fn: function(){ HY.Const.popPort({callback: airairairairblchkView.setPortPod}); }}, btn2:{x: 823, y: 369, fn: function(){ airairairairblchkView.clearPop('portpod'); }}}),
		{xtype: 'label', html: '目的地/FPOD', width: 200, x: 335, y: 394, cls: 'x-required'},
		{xtype: 'textfield', name: 'destination', width: 200, x: 335, y: 412, tabIndex: 227, allowBlank: false},
		{xtype: 'label', html: '付款地点/Payment place', width: 200, x: 595, y: 394},
		{xtype: 'textfield', name: 'snpaymentat', width: 200, x: 595, y: 412, tabIndex: 228, allowBlank: true},
//		
//		{xtype: 'label', html: '唛头/Shipping Marks', width: 346, x: 5, y: 442, cls: 'x-required'},
//		HY.Cmp.createButton({x: 351, y: 438, cls: 'tbar-equal', fn: function(){airairairairblchkView.doSumMarks();}}),
//		{xtype: 'textarea', name: 'markno', width: 391, height: 160, x: 5, y: 459, tabIndex: 229, allowBlank: false, cls: "nowrap", enableKeyEvents: true
//			,listeners: {
//				keyup: function(src, evt) {
//					src.setValue(src.getValue().toUpperCase());
//				}
//			}
//		},
		{xtype: 'label', html: '货名/Commodity Name', width: 366, x: 404, y: 442, cls: 'x-required'},
		{xtype: 'textarea', name: 'commdesc', width: 391, height: 160, x: 404, y: 459, tabIndex: 230, allowBlank: false, cls: "nowrap", enableKeyEvents: true
			,listeners: {
				keyup: function(src, evt) {
					src.setValue(src.getValue().toUpperCase());
				}
			}
		},

		{xtype: 'checkbox', name: 'isblconfirm', boxLabel: '补料确认', inputValue: 'Y', disabled: true, width: 200, x: 835, y: 7, tabIndex: 260, allowBlank: true},
		{xtype: 'label', html: '确认日期', width: 60, x: 835, y: 30},
		{xtype: 'datefield', name: 'blcfmdate', width: 120, x: 895, y: 28, tabIndex: 261, allowBlank: true, readOnly: true},
		{xtype: 'label', html: '确认人', width: 60, x: 835, y: 55},
		{xtype: 'textfield', name: 'blcfmbyname', width: 120, x: 895, y: 53, tabIndex: 262, allowBlank: true, readOnly: true},
		HY.Cmp.createButton({x: 940, y: 5, cls: 'tbar-accept', text: '确认补料', fn: function(){airairairairblchkView.doConfirm();}}),

		{xtype: 'checkbox', name: 'isblacpted', boxLabel: '补料受理', inputValue: 'Y', disabled: true, width: 200, x: 835, y: 78, tabIndex: 263, allowBlank: true},
		{xtype: 'label', html: '受理日期', width: 60, x: 835, y: 101},
		{xtype: 'datefield', name: 'blacptedtime', width: 120, x: 895, y: 99, tabIndex: 264, allowBlank: true, readOnly: true},
		{xtype: 'label', html: '受理人', width: 60, x: 835, y: 127},
		{xtype: 'textfield', name: 'blacptedbyname', width: 120, x: 895, y: 125, tabIndex: 265, allowBlank: true, readOnly: true},
		{xtype: 'label', html: '受理说明', width: 60, x: 835, y: 154},
		{xtype: 'textarea', name: 'blacpteddesc', width: 120, height: 66, x: 895, y: 150, tabIndex: 266, allowBlank: true, readOnly: true},

		{xtype: 'label', html: '工作号', width: 60, x: 835, y: 222},
		{xtype: 'textfield', name: 'jobno', width: 120, x: 895, y: 220, tabIndex: 265, allowBlank: true, readOnly: true},

		{xtype: 'label', html: '包装/Packing', width: 200, x: 835, y: 265, cls: 'x-required'},{xtype: 'hidden', name: 'packid'},
		{xtype: 'textfield', name: 'packing', width: 100, x: 835, y: 283, tabIndex: 0, allowBlank: false},
		HY.Cmp.createQryClrButton({btn1:{x: 938, y: 283, fn: function(){ HY.Const.popPacking({id: 'm-packing', callback: airairairairblchkView.setPacking}); }}, btn2:{x: 963, y: 283, fn: function(){ airairairairblchkView.clearPop('pack'); }}}),

		{xtype: 'label', html: '对单备注/Remark', width: 212, x: 803, y: 442},
		{xtype: 'textarea', name: 'blchkdesc', width: 212, height: 160, x: 803, y: 459, tabIndex: 268, allowBlank: true, cls: "nowrap"},
		
		{xtype: 'hidden', name: 'clientid'}
     ]}
];

airblchkView.renderDbtype = function(value, metaData, record, rowIndex, colIndex, store) {
	var nds = HY.Const.nds.dbtype;
	var s = HY.Const.getNdsText(nds, value);
	return s;
};
airblchkView.renderInused = function(value, metaData, record, rowIndex, colIndex, store) {
	var nds = HY.Const.nds.yesno;
	var s = HY.Const.getNdsText(nds, value);
	return s;
};
airblchkView.dbCols = ['cntblid', 'cntsrcid', 'shpblid', 'jobid', 'ldtype', 'cnttypeid', 'cntcode', 'cntsize', 'cnttype', 'is45', 'cntqty', 'cntqtystd', 'cntno', 'sealno', 'sealno2', 'sealno3', 'refno', 'pieces', 'estgrswgt', 'grswgt', 'gdscbm', 'netwgt', 'goodsname', 'markno', 'packid', 'packing', 'fetype', 'vgmwgt', 'vgmdate', 'vgmmethod', 'vgmloc', 'isdmgds', 'd_imdg', 'd_unno', 'd_class', 'd_label', 'cntremarks', 'damagedesc', 'gdskind', 'gdshscode', 'orgid', 'createuser', 'createtime', 'lastupduser', 'lastupdtime','rowdatype'];
airblchkView.dbStore = HY.Cmp.createJsonStore({
	fields: airblchkView.dbCols,
	url: airblchkView.ctx + '',
	sortInfo: {}
});
airblchkView.renderDtlRowdatype = function(value, metaData, record, rowIndex, colIndex, store) {
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
airblchkView.dbCM = new Ext.grid.ColumnModel({
	columns:[
		new Ext.grid.RowNumberer({width: 36}),
		{header: '柜型/Cntr Type', dataIndex: 'cntcode', width: 100, sortable: true},
		{header: '柜号/Cntr No.', dataIndex: 'cntno', width: 130, sortable: true},
		{header: '封签/Seal', dataIndex: 'sealno', width: 130, sortable: true},
		{header: '件数/Pkg', dataIndex: 'pieces', width: 80, align: 'right', sortable: true},
		{header: '毛重(KGS)', dataIndex: 'grswgt', width: 100, align: 'right', sortable: true},
		{header: '体积(CBM)', dataIndex: 'gdscbm', width: 100, align: 'right', sortable: true},
		{header: '商品编码/HS Code', dataIndex: 'gdshscode', width: 120, sortable: true},
		{header: '货名/Commodity', dataIndex: 'goodsname', width: 240, sortable: true},
		{header: '唛头/Marks', dataIndex: 'markno', width: 240, sortable: true},
		{header: '包装/Pkg Type', dataIndex: 'packing', width: 100, sortable: true},
		{header: '状态', dataIndex: 'rowdatype', width: 60, sortable: true, renderer: airblchkView.renderDtlRowdatype}
	],
	defaults: HY.Cmp.cmDefaults
});
airblchkView.cnttypeStore = HY.Cmp.createJsonStore({
	fields: ['cnttypeid','cntcode','cntsize','cnttype','isfreeze','isocode','amscode']
	,url: ctx + '/combo/cnttype.do'
	,sortInfo: {field: 'cntcode', direction: 'ASC'}
	,pageSize: 0
	});
airblchkView.packingStore = HY.Cmp.createJsonStore({
	fields: ['packid','packcode','packdesc_c','packdesc_e']
	,url: ctx + '/combo/packing.do'
	,sortInfo: {field: 'packdesc_e', direction: 'ASC'}
	,pageSize: 0
	});
airblchkView.dbFields = [
	{xtype: 'hidden', name: 'cntblid'},
	{xtype: 'hidden', name: 'shpblid'},
	{xtype: 'hidden', name: 'jobid'},
	{xtype: 'hidden', name: 'cntsrcid'},
	{xtype: 'hidden', name: 'cntqty'},
	{xtype: 'hidden', name: 'cntqtystd'},
	{layout: 'absolute', height: 240, border: false, items:[
		{xtype: 'label', html: '柜型/Cntr Type', width: 200, x: 5, y: 7, cls: 'x-required'},
		{xtype: 'combo', id: 'eld_cntcode', name: 'cntcode', hiddenName: 'cnttypeid', valueField: 'cnttypeid', displayField: 'cntcode', width: 200, x: 5, y: 25, tabIndex: 301, triggerAction: 'all', forceSelection: true
			, store: airblchkView.cnttypeStore},
		{xtype: 'label', html: '柜号/Cntr No.', width: 200, x: 5, y: 50, cls: 'x-required'},
		{xtype: 'textfield', name: 'cntno', width: 200, x: 5, y: 68, tabIndex: 302, allowBlank: false, regex: /^[A-Z]{4,4}[0-9]{7,7}$/, regexText: '请输入有效箱号'},
		{xtype: 'label', html: '封签/Seal', width: 200, x: 5, y: 93, cls: 'x-required'},
		{xtype: 'textfield', name: 'sealno', width: 200, x: 5, y: 111, tabIndex: 302, allowBlank: false},
		{xtype: 'label', html: '商品编码/HS Code', width: 200, x: 5, y: 136, cls: 'x-required'},
		{xtype: 'textfield', name: 'gdshscode', width: 200, x: 5, y: 154, tabIndex: 304, allowBlank: false},
		
		{xtype: 'label', html: '包装/Pkg Type', width: 120, x: 215, y: 7, cls: 'x-required'},
		{xtype: 'combo',  id: 'eld_packing', name: 'packing', hiddenName: 'packid', valueField: 'packid', displayField: 'packdesc_e', allowBlank: false, width: 120, x: 215, y: 25, tabIndex: 306, triggerAction: 'all', forceSelection: true
			,store: airblchkView.packingStore},
		{xtype: 'label', html: '件数/Pkg', width: 120, x: 215, y: 50, cls: 'x-required'},
		{xtype: 'numberfield', name: 'pieces', width: 120, x: 215, y: 68, tabIndex: 307, allowBlank: false, regex: /([1-9]\d*)/, regexText: '请输入大于零的整数'},
		{xtype: 'label', html: '毛重(KGS)', width: 120, x: 215, y: 93, cls: 'x-required'},
		{xtype: 'numberfield', name: 'grswgt', width: 120, x: 215, y: 111, tabIndex: 308, allowBlank: false, regex: /([1-9]\d*(\.\d*[1-9])?)/, regexText: '请输入大于零的数'},
		{xtype: 'label', html: '体积(CBM)', width: 120, x: 215, y: 136, cls: 'x-required'},
		{xtype: 'numberfield', name: 'gdscbm', width: 120, x: 215, y: 154, tabIndex: 309, allowBlank: false, regex: /([1-9]\d*(\.\d*[1-9])?)/, regexText: '请输入大于零的数'},

		{xtype: 'label', html: '货名/Commodity', width: 200, x: 350, y: 7, cls: 'x-required'},
		{xtype: 'textarea', name: 'goodsname', width: 320, height: 85, x: 350, y: 25, tabIndex: 310, allowBlank: false, cls: "nowrap", enableKeyEvents: true
			,listeners: {
				keyup: function(src, evt) {
					src.setValue(src.getValue().toUpperCase());
				}
			}
		},
		{xtype: 'label', html: '唛头/Marks', width: 320, x: 350, y: 114},
		{xtype: 'textarea', name: 'markno', width: 320, height: 85, x: 350, y: 132, tabIndex: 311, allowBlank: true, cls: "nowrap", enableKeyEvents: true
			,listeners: {
				keyup: function(src, evt) {
					src.setValue(src.getValue().toUpperCase());
				}
			}
		}
	]}
];


// ------------------------------主界面
/**
 * 查询面板
 */
airblchkView.queryPanel = new HY.Cmp.QueryPanel({
	tarObj: airblchkView,
	tbarConfig: {editMode: 0, enableNav: false, statusConfig: ['New!00']},
	items: [
		{
			layout: 'absolute', border: false, height: 36,
			items: [
				{xtype: 'label', html: '关键字', width: 65, x: 5, y: 5},
				{xtype: 'textfield', name: 'keyword', width: 120, x: 80, y: 6, tabIndex: 101}
			]
		}
	]
});

/**
* 主列表面板
*/
airblchkView.mainPanel = new Ext.grid.GridPanel({
	region: 'center',
	border: true,
	margins: '0 0',
	store: airblchkView.mainStore,
	cm: airblchkView.mainCM,
	bbar: new HY.Cmp.PagingToolbar({tarObj: airblchkView, store: airblchkView.mainStore}),
	listeners: {
//		'rowdblclick': function() {
//			airairairairblchkView.doModify();
//		}
	}
});

/**
 * 装箱资料编辑窗口
 */
airblchkView.dbEditWin = new HY.Cmp.WindowEditMst ({
	tbar: new HY.Cmp.Toolbar({
		editMode: 1,
		enableNav: true,
		setAction: function(actid) {
			if (actid == HY.Cmp.actions.New['code']) {
				airblchkView.doNewDb();
			} else if (actid == HY.Cmp.actions.Modify['code']) {
				airblchkView.doModifyDb();
			} else if (actid == HY.Cmp.actions.Save['code']) {
				airblchkView.doSaveDb();
			} else if (actid == HY.Cmp.actions.Delete['code']) {
				airblchkView.doDeleteDb();
			} else if (actid == HY.Cmp.actions.Close['code']) {
				airblchkView.doCloseDb();
			} else if (actid == HY.Cmp.actions.Prevrow['code']) {
				airblchkView.doNavDb(-1);
			} else if (actid == HY.Cmp.actions.Nextrow['code']) {
				airblchkView.doNavDb(1);
			} else if (actid == HY.Cmp.actions.Refresh['code']) {
				airblchkView.doRefreshDb();
			}
		}
	}),
	title: '装箱资料编辑',
	formFields: airblchkView.dbFields,
	height: 320,
	width: 800
});

/**
 * 主编辑窗口
 */

airblchkView.mainWindow = new HY.Cmp.WindowEditMstDtl({
	tbar: new HY.Cmp.Toolbar({
		tarObj: airblchkView,
		editMode: 1,
		enableNav: true,
		statusConfig: ['New!00'],
		actionCustom1: new Ext.Action({text: '确认补料', iconCls: 'tbar-accept', handler: function(){
			airblchkView.doConfirm();
		}}),
		actionCustom2: new Ext.Action({text: '取消确认', iconCls: 'tbar-cancel', handler: function(){
			airblchkView.doUnconfirm();
		}}),
		actionCustom3: new Ext.Action({text: '另存为模板', iconCls: 'tbar-export', handler: function(){
			airblchkView.doSaveAsTmpl();
		}}),
		actionCustom4: new Ext.Action({text: '从模板载入', iconCls: 'tbar-query', handler: function(){
			airblchkView.doShowTmplList();
		}})
	}),
	title: airblchkView.title,
	maximizable: false,
	maximized: true,
	mstRegion: 'center',
	dtlRegion: 'south',
	formFields: airblchkView.mainFields,
	formHeight: 220,
	gridHeight: 200,
	gridStore: airblchkView.dbStore,
	gridColModel: airblchkView.dbCM,
	gridTbar: new HY.Cmp.DtlToolbar({
		title: '装箱资料',
		statusConfig: [{actionNew: '11'} ,{actionModify: '11'} ,{actionDelete: '11'}],
		setAction: function(actid) {
			if (actid == HY.Cmp.actions.New) {
				airblchkView.doNewDb();
			} else if (actid == HY.Cmp.actions.Modify) {
				airblchkView.doModifyDb();
			} else if (actid == HY.Cmp.actions.Delete) {
				airblchkView.doDeleteDb();
			}
		}
	}),
	gridEditWindow: airblchkView.dbEditWin
});

//---------------------功能函数
airblchkView.doRefresh = function(){
	var me = this;
	if (me.mainWindow.isVisible()) {
		var frm = me.mainWindow.formPanel.getForm();
		var pkval = HY.fv(frm, me.pkName);
		if (HY.isNumber(pkval) && pkval > 0) {
			airblchkView.doLoadDetail(pkval, frm);
			airblchkView.doRefreshDb(pkval);
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

airblchkView.doNew = function(){
	var frm = airblchkView.mainWindow.formPanel.getForm();
	HY.Cmp.clearFormData(frm);
	airblchkView.mainWindow.show();
	
	HY.fv(frm, 'inused', 'Y');
	airblchkView.dbStore.removeAll();
	
	frm.clearInvalid();
	frm.findField(airblchkView.codeName).focus(true,500);
};
airblchkView.doSave = function(){
	var me = this;
	var frm = me.mainWindow.formPanel.getForm();
	if (!frm.isValid()) {
		return;
	}
	HY.confirm ({
		callback: function() {
			var params = frm.getValues();
//			Ext.apply(params, {"snppcc": Ext.getCmp('elm_snppcc').getRawValue()});
			HY.AjaxRequest({
				params: params,
				showWat: true,
				url: me.ctx + '',
				callback: function(datobj) {
					HY.fv(frm, me.pkName, datobj);
					me.doRefresh();
				}
			});
		}
	});
};
airblchkView.doModify = function(pktmp){
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
airblchkView.doDelete = function(){
	var rec = this.mainPanel.getSelectionModel().getSelected();
	if( rec ) {
		var pkval = rec.get(airblchkView.pkName);
		if (!HY.isNumber(pkval)) return;
		HY.confirm ({
			showWat: true,
			callback: function() {
				var url = blchkView.ctx + '/ /' + pkval + '.do';
				HY.AjaxRequest({url: url, showMsg: true, callback: function(datobj){
					airblchkView.mainStore.remove(rec);
				}});
			}
		});
	}
};
airblchkView.doLoadDetail = function(pkval, frm) {
	if (!HY.isNumber(pkval)) {
		HY.alert("参数有误，请重试。");
		return;
	}
	var url = airblchkView.ctx + '/ /' + pkval + '.do';
	HY.AjaxRequest({url: url ,callback: function(datobj){
		HY.Cmp.clearFormData(frm);
		HY.Cmp.parseDateCols(datobj ,'blcfmdate,blacptedtime');
		frm.setValues(datobj);
		frm.findField(airblchkView.codeName).focus(true,500);
	}});
};
airblchkView.doClose = function() {
	this.mainWindow.hide();
};

//------------------------------------- DB Info
airblchkView.doRefreshDb = function(srvid) {
	var me = this;
	if (me.dbEditWin.isVisible()) {
		var frm = me.dbEditWin.formPanel.getForm();
		var pkval = HY.fv(frm, '');
		var lnkid = HY.fv(frm, '');
		me.doLoadDetailDb(pkval, frm, lnkid);
	} else { //刷新编辑窗口列表
		var frm = me.mainWindow.formPanel.getForm();
		var pkval = srvid || HY.fv(frm, me.pkName);
		if( HY.isNumber(pkval) && pkval != '0' ) {
			var params = {"shpblid": pkval};
			Ext.apply (me.dbStore.baseParams, params);
			me.dbStore.load();
			return;
		} else {
			HY.alert('请先保存数据');
			return;
		}
	}
};

airblchkView.doNewDb = function(){
	var me = this;
	var mfrm = me.mainWindow.formPanel.getForm();
	var mpkval = HY.fv(mfrm, me.pkName);
	if (HY.isNumber(mpkval) && mpkval != '0') {
		
	} else {
		HY.alert('请先保存数据');
		return;
	}
	var frm = me.dbEditWin.formPanel.getForm();
	HY.Cmp.clearFormData(frm);
	me.dbEditWin.show();
	
	HY.fv(frm, '', mpkval);
	
	frm.clearInvalid();
	frm.findField('').focus(true,500);
};
airblchkView.doSaveDb = function(){
	var me = this;
	var frm = me.dbEditWin.formPanel.getForm();
	if (!frm.isValid()) {
		return;
	}
	var bcode = HY.checkCntnoCode(HY.fv(frm, ''), function(isValid, num){
		if (isValid === true) {
			
		} else {
			HY.alert("箱号校验位不正确，应为：" + num);
		}
		return isValid;
	});
	if (!bcode) {
		return;
	}
	
	HY.confirm ({
		callback: function() {
			var params = frm.getValues();
			Ext.apply(params, {" ": Ext.getCmp('').getRawValue(), " ": Ext.getCmp('').getRawValue()});
			HY.AjaxRequest({
				params: params,
				showWat: true,
				url: me.ctx + ' ',
				callback: function(datobj) {
					HY.fv(frm, '', datobj);
					me.doRefreshDb();
					me.dbStore.load();
				}
			});
		}
	});
};
airblchkView.doModifyDb = function(){
	var me = this;
	var frm = me.dbEditWin.formPanel.getForm();
	var rec = me.mainWindow.gridPanel.getSelectionModel().getSelected();
	if( rec ) {
		var pkval = rec.get('');
		var lnkid = rec.get('');
		me.doLoadDetailDb(pkval, frm, lnkid);
		me.dbEditWin.show();
	}
};
airblchkView.doDeleteDb = function(){
	var rec = this.mainWindow.gridPanel.getSelectionModel().getSelected();
	if( rec ) {
		var pkval = rec.get('');
		var fkval = rec.get('');
		if (!HY.isNumber(pkval) || pkval == '0') {
			HY.alert('该柜子来源于提单，未修改，不能删除。');
			return;
		}
		HY.confirm ({
			showWat: true,
			callback: function() {
				var url = airblchkView.ctx + '/ /' + pkval + '.do?shpblid=' + fkval;
				HY.AjaxRequest({url: url, showMsg: true, callback: function(datobj){
					airblchkView.dbStore.remove(rec);
				}});
			}
		});
	}
};
airblchkView.doLoadDetailDb = function(pkval, frm, lnkid) {
	if (!HY.isNumber(pkval)) {
		HY.alert("参数有误，请重试。");
		return;
	}
	var url = airblchkView.ctx + '/ /' + pkval + '.do';
	if (HY.isNumber(lnkid)) url += '?cntsrcid=' + lnkid;
	HY.AjaxRequest({url: url ,callback: function(datobj){
		HY.Cmp.clearFormData(frm);
		frm.setValues(datobj);
		frm.findField('').focus(true,500);
	}});
};
airblchkView.doCloseDb = function() {
	var me = this;
	me.dbEditWin.hide();
};

airblchkView.doNavDb = function(inc) {
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

//另存为模板
airblchkView.doSaveAsTmpl = function() {
	var me = this;
	var frm = me.mainWindow.formPanel.getForm();
	Ext.Msg.prompt("另存为模板", "请填写模板名称", function(btn, text) {
		if (btn == 'ok') {
			if (HY.isEmpty(text)) {
				HY.alert('模板名称不能为空');
				return;
			}
			var srcid = HY.fv(frm, ' ');
			var params = {"tmplname": text.trim(), "srcid": srcid};
			HY.AjaxRequest({url: me.ctx + ' ', params: params, showMsg: true, callback: function(datobj){
				
			}});
		}
	});
};
//显示模板选择窗口
airblchkView.doShowTmplList = function() {
	airblchkView.popTemplates({callback: function(record){
		HY.confirm ({
			msg: "是否使用所选模板填充补料单？",
			showWat: true,
			callback: function() {
				if (record) {
					var excols = '';
					var frm = airblchkView.mainWindow.formPanel.getForm();
					var frmJson = frm.getValues();
					for (var key in frmJson) {
						var val = record.data[key];
						if (HY.isEmpty(val)) continue;
						if (HY.isNumber(val)) {
							if (val + 0 == 0) continue;
						}
						if (excols.indexOf(','+key+',') > -1) continue;
						HY.fv(frm, key, val);
					}
				}
			}
		});
	}});
};
//提单确认
airblchkView.doConfirm = function(){
	var me = this;
	var frm = me.mainWindow.formPanel.getForm();
	var pkval = HY.fv(frm, '');
	if (!HY.isNumber(pkval) || pkval == "0") {
		HY.alert('请先保存数据！');
		return;
	}
	HY.confirm ({
		showWat: true,
		msg: '此为一次性补料，一旦提交若有更改将会产生改单费！是否继续？',
		callback: function() {
			var url = me.ctx + '/confirm.do';
			var params = {"shpblid": pkval, "isblconfirm": "Y"};
			HY.AjaxRequest({url: url, params: params, showMsg: true, callback: function(datobj){
				airblchkView.doRefresh();
			}});
		}
	});
};
//取消提单确认
airblchkView.doUnconfirm = function(){
	var me = this;
	var frm = me.mainWindow.formPanel.getForm();
	var pkval = HY.fv(frm, '');
	if (!HY.isNumber(pkval) || pkval == "0") {
		HY.alert('请先保存数据！');
		return;
	}
	HY.confirm ({
		showWat: true,
		callback: function() {
			var url = me.ctx + '/confirm.do';
			var params = {"shpblid": pkval, "isblconfirm": "N"};
			HY.AjaxRequest({url: url, params: params, showMsg: true, callback: function(datobj){
				airblchkView.doRefresh();
			}});
		}
	});
};

airblchkView.popTemplates = function(configs){
	var win_id = 'tmpl';
	HY.Cmp.createPopQuery({
		id: 'ppw_' + win_id
		,pageSize: 0
		,width: 618
		,dataUrl: airblchkView.ctx + "/tmplst.do"
		,dataParams: {}
		,fields: ['shpblid','tmplname','cnorname','cneename','notifyparty','notifyparty2','shpntitle','blnom','sono','mbltype','vessel','voyage','amssvctype','amssvctype','scaccode','snppcc','snppccid','blnoh','frtterm','gdshscode','contractno','agreename','placerecid','placereccode','placerec','polid','polcode','pol','potid','potcode','pot','podid','podcode','pod','destination','snpaymentat','markno','commdesc']
		,colModel: new Ext.grid.ColumnModel([
			new Ext.grid.RowNumberer({width: 30})
			,{header: '模板名称' ,dataIndex: 'tmplname' ,width: 160}
			,{header: '发货人/Shipper' ,dataIndex: 'cnorname' ,width: 210}
			,{header: '收货人/Consignee' ,dataIndex: 'cneename' ,width: 210}
			,{header: '通知人/Notify' ,dataIndex: 'notifyparty' ,width: 210}
			,{header: '起运港/POL' ,dataIndex: 'pol' ,width: 100}
			,{header: '卸货港/POD' ,dataIndex: 'pod' ,width: 100}
			,{header: '商品编码/HS Code' ,dataIndex: 'gdshscode' ,width: 100}
		])
		,handler: function(grid ,rowIndex ,e) {
			var record = grid.store.getAt(rowIndex);
			if (configs.callback && typeof configs.callback == 'function') {
				configs.callback (record);
			}
		}
	});
};

airblchkView.doSumMarks = function () {
	var me = this;
	var frm = me.mainWindow.formPanel.getForm();
	var pkval = HY.fv(frm, '');
	if (!HY.isNumber(pkval) || pkval == "0") {
		HY.alert('请先保存数据！');
		return;
	}
	HY.confirm ({
		showWat: true,
		msg: '是否重算提单“唛头/Shipping Marks”和“货名/Commodity Name”？',
		callback: function() {
			var url = me.ctx + '/summarks.do';
			var params = {"shpblid": pkval};
			HY.AjaxRequest({url: url, params: params, showMsg: true, callback: function(datobj){
				HY.fv(frm, 'markno', datobj.markno);
				HY.fv(frm, 'commdesc', datobj.commdesc);
			}});
		}
	});
};

// -------------------------
/**
 * 清除弹窗填充的数据
 * @param {String} type
 */
airblchkView.clearPop = function(type) {
	var frm = airblchkView.mainWindow.formPanel.getForm();
	var frmDb = airblchkView.dbEditWin.formPanel.getForm();
	if (type == 'portrec') {
		HY.fv(frm, 'placerecid', '');
		HY.fv(frm, 'placereccode', '');
		HY.fv(frm, 'placerec', '');
	} else if (type == 'portpol') {
		HY.fv(frm, 'polid', '');
		HY.fv(frm, 'polcode', '');
		HY.fv(frm, 'pol', '');
	} else if (type == 'portpot') {
		HY.fv(frm, 'potid', '');
		HY.fv(frm, 'potcode', '');
		HY.fv(frm, 'pot', '');
	} else if (type == 'portpod') {
		HY.fv(frm, 'podid', '');
		HY.fv(frm, 'podcode', '');
		HY.fv(frm, 'pod', '');
	} else if (type == 'shpn') {
		HY.fv(frm, 'shpnid', '');
		HY.fv(frm, 'shpnabbr', '');
		HY.fv(frm, 'shpntitle', '');
	} else if (type == 'pack') {
		HY.fv(frm, 'packid', '');
		HY.fv(frm, 'packing', '');
	}
};
/**
 * 收货港口-弹窗回调函数
 */
airblchkView.setPortRec = function(record) {
	if (record) {
		var frm = airblchkView.mainWindow.formPanel.getForm();
		HY.fv(frm ,'placerecid' ,record.data['portid']);
		HY.fv(frm ,'placereccode' ,record.data['portcode']);
		HY.fv(frm ,'placerec' ,record.data['portname_e']);
	}
};
/**
 * 装货港口-弹窗回调函数
 */
airblchkView.setPortPol = function(record) {
	if (record) {
		var frm = airblchkView.mainWindow.formPanel.getForm();
		HY.fv(frm ,'polid' ,record.data['portid']);
		HY.fv(frm ,'polcode' ,record.data['portcode']);
		HY.fv(frm ,'pol' ,record.data['portname_e']);
	}
};
/**
 * 中转港口-弹窗回调函数
 */
airblchkView.setPortPot = function(record) {
	if (record) {
		var frm = airblchkView.mainWindow.formPanel.getForm();
		HY.fv(frm ,'potid' ,record.data['portid']);
		HY.fv(frm ,'potcode' ,record.data['portcode']);
		HY.fv(frm ,'pot' ,record.data['portname_e']);
	}
};
/**
 * 卸货港口-弹窗回调函数
 */
airblchkView.setPortPod = function(record) {
	if (record) {
		var frm = airblchkView.mainWindow.formPanel.getForm();
		HY.fv(frm ,'podid' ,record.data['portid']);
		HY.fv(frm ,'podcode' ,record.data['portcode']);
		HY.fv(frm ,'pod' ,record.data['portname_e']);
	}
};
/**
 * 船公司-弹窗回调函数
 */
airblchkView.setShipper = function(record) {
	if (record) {
		var frm = airblchkView.mainWindow.formPanel.getForm();
		HY.fv(frm ,'shpnid' ,record.data['clientid']);
		HY.fv(frm ,'shpnabbr' ,record.data['cliabbr']);
		HY.fv(frm ,'shpntitle' ,record.data['cliname_e']);
	}
};
/**
 * 主单包装-弹窗回调函数
 */
airblchkView.setPacking = function(record) {
	if (record) {
		var frm = airblchkView.mainWindow.formPanel.getForm();
		HY.fv(frm ,'packid' ,record.data['packid']);
		HY.fv(frm ,'packing' ,record.data['packdesc_e']);
	}
};
