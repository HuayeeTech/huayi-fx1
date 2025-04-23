Ext.ns("HY.Const");
HY.Const.combo = {
	"dept": {name: 'deptname', hiddenName: 'deptid', displayField: 'deptname', valueField: 'deptid', fields: ['deptid','deptcode','deptname'], 
		width: 120, listWidth: 120, pageSize: 0, forceSelection: true, editable: false}
	,"org": {name: 'orgabbr', hiddenName: 'orgid', displayField: 'orgabbr', valueField: 'orgid', fields: ['orgid','orgcode','orgabbr'], 
		width: 120, listWidth: 120, pageSize: 0, forceSelection: true, editable: true}
	,"region": {name: 'rgncode', hiddenName: 'rgnid', displayField: 'rgncode', valueField: 'rgnid', fields: ['rgnid','rgncode','rgnname'], 
		width: 160, listWidth: 160, pageSize: 0, forceSelection: true, editable: true}
	,"client": {name: 'clientabbr', hiddenName: 'clientid', displayField: 'clientabbr', valueField: 'clientid', fields: ['clientid','clientcode','clientabbr','clientname','clientname_e'], 
		width: 320, listWidth: 320, pageSize: 20, forceSelection: true, editable: true}
	,"area": {name: 'areacode', hiddenName: 'areaid', displayField: 'areaname', valueField: 'areaid', fields: ['areaid','areacode','areaname'], 
		width: 240, listWidth: 240, pageSize: 0, forceSelection: true, editable: true}
	,"country": {name: 'councode', hiddenName: 'counid', displayField: 'counname', valueField: 'counid', fields: ['counid','councode','counname'], 
		width: 240, listWidth: 240, pageSize: 0, forceSelection: true, editable: true}
	,"port": {name: 'portcode', hiddenName: 'portid', displayField: 'portname_e', valueField: 'portid', fields: ['portid','portcode','portname_c','portname_e'], 
		width: 240, listWidth: 240, pageSize: 20, forceSelection: true, editable: true}
	,"user": {name: 'usercode', hiddenName: 'userid', displayField: 'username', valueField: 'userid', fields: ['userid','usercode','username'], 
		width: 240, listWidth: 240, pageSize: 20, forceSelection: true, editable: true}
	,"datitem": {name: 'fildesc', hiddenName: 'filcode', displayField: 'fildesc', valueField: 'filcode', fields: ['pkid','fdtid','sno','filcode','fildesc','fdtdesc'], 
		width: 240, listWidth: 240, pageSize: 20, forceSelection: true, editable: true}
	,"packing": {name: 'packing', hiddenName: 'packid', displayField: 'packdesc_e', valueField: 'packid', fields: ['packid','packcode','packdesc_c','packdesc_e'], 
		width: 240, listWidth: 240, pageSize: 20, forceSelection: true, editable: true}
	,"cnttype": {name: 'cntcode', hiddenName: 'cnttypeid', displayField: 'cntcode', valueField: 'cnttypeid', fields: ['cnttypeid','cntcode','cntsize','cnttype','isfreeze','isocode','amscode'], 
		width: 240, listWidth: 240, pageSize: 20, forceSelection: true, editable: true}
};
HY.Const.createCombo = function(comboId, params) {
	var newid = comboId;
	var srtxt = '';
	if (comboId.indexOf('datitem_') == 0) {
		newid = 'datitem';
		srtxt = 'fdtid=' + comboId.substring('datitem_'.length);
	}
	var url = ctx + HY.Cmp.comboUrl + "/" + newid + ".do";
	if (srtxt.length > 0) {
		url += '?' + srtxt;
	}
	var fixeds = HY.Const.combo[newid];
	
	var _p = {url: url};
	Ext.apply(_p, fixeds);
	Ext.apply(_p, params);
	return HY.Cmp.createJsonCombo(_p);
};

HY.Const.getComboUrl = function(_ctx, comboId) {
	var url = _ctx + HY.Cmp.comboUrl + "/" + comboId + ".do";
	return url;
};

HY.Const.addParmsToUrl = function(url, comboId) {
	var sr = "";
	if ('crmstatus' == comboId) {
		sr = 'typecode=CRM_STATUS';
	}
	var ret = url + '?' + sr;
	return ret;
};

/**
 * 创建常量数据源
 * @param {Object} datas 可以是定义的数据源常量，也可以是数据源数组。
 * @return {Ext.data.ArrayStore} 如果datas为空，则返回null。否则，新建一对象返回。
 */
HY.Const.createNDS = function(datas) {
	if (HY.isEmpty(datas)) return null;
	var obj = null;
	if (typeof datas == 'string') {
		eval("obj = HY.Const.nds." + datas + ";");
	}
	else {
		obj = datas;
	}
	return new Ext.data.ArrayStore({
			fields: ['key','value']
			,data: obj
		});
};
/**
 * 构建基于HY.Const.ndsXXX常规数据源的下拉框。
 * @param {String} datas 数据源
 * @param {Object} configs Ext.form.ComboBox相关设置
 */
HY.Const.createNCombo = function(datas, configs){
	var store = HY.Const.createNDS(datas);
	if (store == null || store === undefined) {
		HY.alert('Create store failed.');
	}
	Ext.applyIf(configs, {store: store ,displayField: 'value' ,valueField: 'key' ,mode: 'local' ,triggerAction: 'all' ,forceSelection: true});
	return new Ext.form.ComboBox(configs);
};

/**
 * 是/否
 */
HY.Const.nds = {
	applang: [['0', '简体中文'], ['1', 'English'], ['2', '繁體中文']],
	dayType: [['0', '今天'], ['1', '昨天'], ['2', '明天']],
	basecy: [['CNY', 'CNY'], ['HKD', 'HKD'], ['USD', 'USD']],
	inused: [['Y', '使用中'], ['N', '已停用']],
	yesno: [['Y','是'],['N','否']],
	yesnoqry: [['11','是'],['10','否'],['0','全部']],
	stmtype: [['DML','DML'],['DDL','DDL'],['FUN','FUNCTION'],['TBL','TABLE'],['VEW','VIEW'],['TRG','TRIGGER']],
	stmexcsta: [['N','未执行'],['Y','成功执行'],['E','执行异常']],
	dbtype: [['CLI','客户'],['STD','产品'],['DEM','演示'],['DEV','开发'],['LOC','自测'],['SOA','OA正式'],['LOA','OA自测'],['COA','OA客户']],
	shpldtype: [['FCL','整柜'],['LCL','散货']],
	bltype: [['H','House BL'],['M','Master BL']],
	airbltype: [['H','HAWB'],['M','MAWB'],['S','SUB HAWB']],
	langid: [['zh_CN','简体中文'],['en_US','English']]
};

HY.Const.getNdsText = function(arrNds, value) {
	if (HY.isEmpty(arrNds)) return value;
	var s = value;
	for (var i = 0; i < arrNds.length; i = i + 1) {
		if (arrNds[i][0] == value) {
			s = arrNds[i][1];
			break;
		}
	}
	return s;
};

HY.Const.loadMask = {
	msg: '数据正在加载中......'
};

// ----------------------- 弹窗选择
/**
 * 客户弹窗
 * @param {String} id
 */
HY.Const.popClient = function(configs){
	var comboid = configs.comboid || 'client';
	var win_id = configs.id || 'client';
	HY.Cmp.createPopQuery({
		id: 'ppw_' + win_id
		,width: 618
		,dataUrl: HY.Const.getComboUrl (ctx, comboid)
		,dataParams: {}
		,fields: ['clientid' ,'clicode' ,'cliabbr' ,'cliname_c','cliname_e']
		,colModel: new Ext.grid.ColumnModel([
			new Ext.grid.RowNumberer({width: 30})
			,{header: '代码' ,dataIndex: 'clicode' ,width: 100}
			,{header: '简称' ,dataIndex: 'cliabbr' ,width: 120}
			,{header: '名称(中文)' ,dataIndex: 'cliname_c' ,width: 200}
			,{header: '名称(英文)' ,dataIndex: 'cliname_e' ,width: 200}
		])
		,handler: function(grid ,rowIndex ,e) {
			var record = grid.store.getAt(rowIndex);
			if (configs.callback && typeof configs.callback == 'function') {
				configs.callback (record);
			}
		}
	});
};

/**
 * 港口弹窗
 * @param {String} id
 */
HY.Const.popPort = function(configs){
	var win_id = configs.id || 'port';
	HY.Cmp.createPopQuery({
		id: 'ppw_' + win_id
		,width: 618
		,dataUrl: HY.Const.getComboUrl (ctx, 'port')
		,dataParams: {"ptype": 105}
		,fields: ['portid' ,'portcode' ,'portname_c' ,'portname_e']
		,colModel: new Ext.grid.ColumnModel([
			new Ext.grid.RowNumberer({width: 30})
			,{header: '代码' ,dataIndex: 'portcode' ,width: 100}
			,{header: '名称(中文)' ,dataIndex: 'portname_c' ,width: 120}
			,{header: '名称(英文)' ,dataIndex: 'portname_e' ,width: 200}
		])
		,handler: function(grid ,rowIndex ,e) {
			var record = grid.store.getAt(rowIndex);
			if (configs.callback && typeof configs.callback == 'function') {
				configs.callback (record);
			}
		}
	});
};

/**
 * 包装弹窗
 * @param {String} id
 */
HY.Const.popPacking = function(configs){
	var win_id = configs.id || 'packing';
	HY.Cmp.createPopQuery({
		id: 'ppw_' + win_id
		,width: 618
		,dataUrl: HY.Const.getComboUrl (ctx, 'packing')
		,dataParams: {}
		,fields: ['packid','packcode','packdesc_c','packdesc_e']
		,colModel: new Ext.grid.ColumnModel([
			new Ext.grid.RowNumberer({width: 30})
			,{header: '代码' ,dataIndex: 'packcode' ,width: 100}
			,{header: '名称(中文)' ,dataIndex: 'packdesc_c' ,width: 120}
			,{header: '名称(英文)' ,dataIndex: 'packdesc_e' ,width: 200}
		])
		,handler: function(grid ,rowIndex ,e) {
			var record = grid.store.getAt(rowIndex);
			if (configs.callback && typeof configs.callback == 'function') {
				configs.callback (record);
			}
		}
	});
};

//上传附件窗口
HY.Const.getEdocEditWin = function(cfgs) {
	var _twin = new HY.Cmp.WindowEditMst ({
		tbar: new HY.Cmp.Toolbar({
			editMode: 1,
			enableNav: true,
			statusConfig: ['New#Delete#Close#Modify#Prevrow#Nextrow#Refresh!00'],
			setAction: function(actid) {
				if (actid == HY.Cmp.actions.New['code']) {
					
				} else if (actid == HY.Cmp.actions.Modify['code']) {
					
				} else if (actid == HY.Cmp.actions.Save['code']) {
					var frm = _twin.formPanel.getForm();
					if (!frm.isValid()) {
						return;
					}
					HY.confirm ({
						showWat: true,
						callback: function() {
							var params = frm.getValues();
							var url = ctx + '/edocs/update.do';
							HY.AjaxRequest({url: url, params: params, showMsg: true, callback: function(datobj){
								if (cfgs.callback && typeof cfgs.callback == 'function') {
									cfgs.callback(datobj);
								}
								_twin.close();
							}});
						}
					});
				} else if (actid == HY.Cmp.actions.Delete['code']) {
					
				} else if (actid == HY.Cmp.actions.Close['code']) {
					_twin.close();
				} else if (actid == HY.Cmp.actions.Prevrow['code']) {
					
				} else if (actid == HY.Cmp.actions.Nextrow['code']) {
					
				} else if (actid == HY.Cmp.actions.Refresh['code']) {
					
				}
			}
		}),
		title: '文档编辑',
		formFields: [
			{xtype: 'hidden', name: 'docid'},
			{xtype: 'hidden', name: 'datpkid'},
			{layout: 'absolute', height: 140, border: false, items:[
				{xtype: 'label', html: '文件名', width: 200, x: 5, y: 7, cls: 'x-required'},
				{xtype: 'textfield', name: 'filename', width: 320, x: 5, y: 25, tabIndex: 901, maxLength: 250, allowBlank: false},
				{xtype: 'label', html: '文件说明', width: 200, x: 5, y: 50},
				{xtype: 'textarea', name: 'filedesc', width: 320, height: 68, x: 5, y: 68, tabIndex: 902, maxLength: 250, allowBlank: true}
			]}
		],
		height: 220,
		width: 360
	});
	return _twin;
};

HY.Const.popEdocView = function(datpkid, configs) {
	if (!(HY.isNumber(datpkid) && datpkid > 1000)) {
		HY.alert('参数不是有效值');
		return;
	}
	var _cfgs = {
		title: '附件浏览窗口',
		width: 860,
		gridStore: HY.Cmp.createJsonStore({
			fields: ['docid','datpkid','filedesc','filename','docdate','mimetype','isimg','filesize','createusername'],
			url: ctx + '/edocs/listdat.do?datpkid=' + datpkid,
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
				{header: '文件大小', dataIndex: 'filesize', width: 90, align: 'right', sortable: false},
				{header: '录入人', dataIndex: 'createusername', width: 80, sortable: true}
			],
			defaults: HY.Cmp.cmDefaults
		}),
		doNew: function() {
			var me = this;
			var fupwin = new HY.Cmp.UploadWindow({
				url: ctx + "/edocs/uploadsm.do",
				success: function(datobj) {
					me.refreshGrid();
				}
			});
			var fup = fupwin.formPanel.getForm();
			HY.Cmp.clearFormData(fup);
			HY.fv(fup, 'datpkid', datpkid);
			fupwin.show();
		},
		doModify: function(record) {
			var me = this;
			var pkval = record.get('docid');
			var url = ctx + '/edocs/get/' + pkval + '.do';
			HY.AjaxRequest({url: url ,callback: function(datobj) {
				var _twin = HY.Const.getEdocEditWin({
					callback: function(datobj) {
						me.refreshGrid();
					}
				});
				var frm = _twin.formPanel.getForm();
				HY.Cmp.clearFormData(frm);
				frm.setValues(datobj);
				_twin.show();
			}});
		},
		doDelete: function(record) {
			var me = this;
			var _pk = record.get('docid');
			var _fk = record.get('datpkid');
			HY.confirm ({
				showWat: true,
				callback: function() {
					var url = ctx + '/edocs/delete.do';
					var params = {"docid": _pk, "datpkid": _fk};
					HY.AjaxRequest({url: url, params: params, showMsg: true, callback: function(datobj){
						me.refreshGrid();
					}});
				}
			});
		}
	};
	Ext.apply(_cfgs, configs);
	var _evw = new HY.Cmp.WindowDataView(_cfgs);
	_evw.show();
	_evw.gridStore.load();
};