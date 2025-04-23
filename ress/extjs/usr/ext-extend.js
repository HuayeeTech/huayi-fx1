Ext.ns("HY.Cmp");
/**
 * 常量定义
 */
Ext.apply(HY.Cmp, {
	pageSize: 30,
	comboUrl: '/combo'
});
/**
 * 列表默认设置
 */
HY.Cmp.cmDefaults = {menuDisabled: true ,width: 80 ,sortable: false};
/**
 * 操作栏按钮代码定义
 */
HY.Cmp.actions = {
	 New: {text:  HY.ls('1026', '新增'), code:'new', call: 'doNew'}
	,Save: {text: HY.ls('1027', '保存'), code:'save', call: 'doSave'}
	,Modify: {text: HY.ls('1245', '修改'), code:'modify', call: 'doModify'}
	,Delete: {text: HY.ls('1028', '删除'), code:'delete', call: 'doDelete'}
	,Refresh: {text: HY.ls('1029', '刷新'), code:'refresh', call: 'doRefresh'}
	,Preview: {text: HY.ls('1030', '预览'), code:'preview', call: 'doPreview'}
	,Print: {text: HY.ls('1031', '打印'), code:'print', call: 'doPrint'}
	,Export: {text: HY.ls('1247', '导出'), code:'export', call: 'doExport'}
	,Rptdesi: {text: HY.ls('1246', '格式设计'), code:'rptdesi', call: 'doRptdesi'}
	,Reload: {text: '重载', code:'reload', call: 'doReload'}
	,Prevrow: {text: '上一行', code:'prevrow', call: 'doPrevrow'}
	,Nextrow: {text: '下一行', code:'nextrow', call: 'doNextrow'}
	,Close: {text: '关闭', code:'close', call: 'doClose'}
	,Custom1: {}
	,Custom2: {}
	,Custom3: {}
	,Custom4: {}
	,Custom5: {}
	,Custom6: {}
	,Custom7: {}
	,Custom8: {}
	,Custom9: {}
};

/**
 * 基本工具栏
 * @class HY.Cmp.Toolbar
 * @extends Ext.Toolbar
 */
HY.Cmp.Toolbar = Ext.extend (Ext.Toolbar, {
	 tarObj: null//目标对象
	,editMode: 0 //0 列表模式，1 编辑模式，3 统计报表模式，4 明细窗口模式
	,enableNav: false //是否启用导航功能
	,enableQuery: false //是否启用查询框功能
	,statusConfig: [] //按钮状态设置，例如：隐藏新增、保存按钮 ，显示刷新按钮['New#Save!00','Refresh!11']，以叹号作为键值分隔
	,actionNew: null //新增
	,actionSave: null //保存
	,actionModify: null //修改
	,actionDelete: null //删除
	,actionRefresh: null //刷新
	,actionPreview: null //预览
	,actionPrint: null //打印
	,actionExport: null //导出
	,actionRptdesi: null //格式设计
	,actionReload: null //重新载入
	,actionPrevrow: null //上一行
	,actionNextrow: null //下一行
	,actionClose: null //关闭
	,actionCustom1: null //自定义1...
	,actionCustom2: null
	,actionCustom3: null
	,actionCustom4: null
	,actionCustom5: null
	,actionCustom6: null
	,actionCustom7: null
	,actionCustom8: null
	,actionCustom9: null
	,custMenu: null
	,showByMenu: true //默认以“更多”子菜单形式展示定义按钮
	,initComponent: function() {
		var me = this;
		HY.Cmp.Toolbar.superclass.initComponent.call(me);
		//初始化完成后，增加常用按钮
		me.initActions();
		me.renderActions();
	}
	,initActions: function() {
		var me = this;
		Ext.iterate(HY.Cmp.actions, function(key, val) {
			var act = null;
			eval('act = me.action' + key + ';');
			if (key.indexOf('Custom') > -1 && !HY.isEmpty(act)) {
				if (me.showByMenu === true) {
					if (me.custMenu == null) {
						me.custMenu = new Ext.menu.Menu({
							items: [
								act
							]
						})
					} else {
						me.custMenu.addItem(act);
					}
				} else {
					eval('me.action'+key+' = act;');
				}
				return;
			}
			if (!HY.isEmpty(act)) return; //已定义的无需初始化
			var act = new Ext.Action({
				text: HY.Cmp.actions[key].text,
				iconCls: 'tbar-' + HY.Cmp.actions[key].code,
				handler: function(){
					var bfc = false;
					eval('bfc = (!HY.isEmpty(me.tarObj) && HY.isFn(me.tarObj.do' + key + '));');
					if (bfc == true) {
						eval('me.tarObj.do' + key + '();');
					} else {
						if (HY.Cmp.actions[key].code == HY.Cmp.actions['Reload'].code) {
							window.location.reload();
						} else {
							me.setAction(HY.Cmp.actions[key].code);
						}
					}
				}
			});
			eval('me.action'+key+' = act;');
		});
	}
	//添加按钮，一般情况下不要重写此方法
	,renderActions: function(){
		var me = this;
		me.addItem({xtype: 'tbseparator'});
		Ext.iterate(HY.Cmp.actions, function(key, val) {
			var act = null;
			eval('act = me.action' + key + ';');
			if (HY.isEmpty(act)) return;
			if (me.showByMenu === true) {
				if (key.indexOf('Custom') > -1) return;
			}
			if (key == 'Prevrow' || key == 'Nextrow') {
				if (me.enableNav == true) me.addItem(act);
			} else {
				me.addItem(act);
			}
		});
		if (!HY.isEmpty(me.custMenu)) {
			me.addItem(new Ext.Action({text: '更多', iconCls: 'tbar-more', menu: me.custMenu}));
		}
		
		// 根据状态相关参数处理按钮状态
		if (me.editMode == 0){
			me.setStatus('Save#Close#Export#Print#Reload#Preview#Rptdesi' ,'00');
		}
		else if (me.editMode == 1){
			me.setStatus('Modify#Delete#Reload#Export#Print#Reload#Preview#Rptdesi' ,'00');
		}
		else if (me.editMode == 3){
			me.setStatus('New#Save#Modify#Delete#Refresh#Print#Reload#Close' ,'00');
			me.setStatus('Preview#Export#Rptdesi' ,'11');
		}
		
		//按初始配置处理按钮状态
		if (!HY.isEmpty(me.statusConfig) && me.statusConfig.length > 0) {
			var arr = null;
			for (var i = 0; i < me.statusConfig.length; i = i + 1) {
				arr = me.statusConfig[i].split('!');
				if (arr.length > 1) me.setStatus(arr[0], arr[1]);
			}
		}
	}
	//如果未设置tarObj，所有预定义动作将执行此方法，构建实例时，可通过重写此方法实现相应的逻辑。
	,setAction: function(actcode) {
		var me = this;
		switch(actcode) {
			case HY.Cmp.actions.Prevrow.code:
			case HY.Cmp.actions.Nextrow.code:
				//标准模块结构，通用处理逻辑
				if (me.tarObj !== undefined && me.tarObj != null && me.tarObj.mainPanel !== undefined && me.tarObj.doModify !== undefined) {
					var rec = me.tarObj.mainPanel.getSelectionModel().getSelected();
					var index = me.tarObj.mainPanel.store.indexOf(rec);
					if (actcode == HY.Cmp.actions.Prevrow.code) {
						index = index - 1;
					} else {
						index = index + 1;
					}
					var rowsCount = me.tarObj.mainPanel.store.getCount();
					if (index >= 0 && index < rowsCount) {
						me.tarObj.mainPanel.getSelectionModel().selectRow(index);
						me.tarObj.doModify();
					}
					if (rowsCount > 0) {
						if (index <= 0) {
							me.setStatus('Prevrow', '10');
						} else {
							me.setStatus('Prevrow', '11');
						}
						if (index >= rowsCount - 1) {
							me.setStatus('Nextrow', '10');
						} else {
							me.setStatus('Nextrow', '11');
						}
					}
				}
				break;
			case HY.Cmp.actions.Rptdesi.code:
				HY.openInMain('rpt_design', '格式设计' ,'/rpttpl/desi/index.htpl?tplid=' ,{iconcls: 'tbar-rptdesi'});
				break;
			default:
				break;
		}
	}
	/**
	 * 设置按钮状态
	 * @param {String} keys 按钮名称串，多个以 # 号分隔，中间不要留空格
	 * @param {String} config 状态序列，使用0/1表示，依次为：是否可见、是否可用
	 */
	,setStatus: function(keys, config) {
		var me = this;
		var arr = keys.split("#");
		for (var i = 0; i < arr.length; i = i + 1) {
			if (HY.isEmpty(arr[i])) continue;
			var act = null;
			eval('act = me.action' + arr[i] + ';');
			if (HY.isEmpty(act) || HY.isEmpty(config)) {
				return;
			}
			var t = config.toString().trim();
			if (t.length > 0) {
				if (t.substr(0,1) == '1') {
					act.show();
				}
				if (t.substr(0,1) == '0') {
					act.hide();
				}
			}
			if (t.length > 1) {
				if (t.substr(1,1) == '1') {
					act.enable();
				}
				if (t.substr(1,1) == '0') {
					act.disable();
				}
			}
		}
	}
});

/**
 * 明细窗口操作工具栏，适用于MstDtl编辑模式
 * @class HY.Cmp.DtlToolbar
 * @extends Ext.Toolbar
 */
HY.Cmp.DtlToolbar = Ext.extend (Ext.Toolbar, {
	tarObj: null//目标对象
	,title: null //标题
	,statusConfig: [] //按钮状态设置，例如：隐藏新增、保存按钮 [{actionNew: '00'} ,{actionSave: '00'}]
	,textNew: '新增'
	,textModify: '修改'
	,textDelete: '删除'
	,actionNew: null //添加按钮
	,actionModify: null //修改按钮
	,actionDelete: null //移除按钮
	,actionCustom1: null //自定义按钮
	,actionCustom2: null
	,actionCustom3: null
	,actionCustom4: null
	,actionCustom5: null
	,initComponent: function(){
		var me = this;
		HY.Cmp.DtlToolbar.superclass.initComponent.call(me);
		//初始化完成后，增加通用按钮
		me.initActions();
		me.addCommonActions();
	}
	,initActions: function(){ //初始化Action对象
		var me = this;
		if (me.actionNew == null) {
			me.actionNew = new Ext.Action({
				text: me.textNew ,iconCls: 'tbar-plus' ,handler: function(){
					if (me.tarObj != null && (typeof me.tarObj.doNew) == "function") {
						me.tarObj.doNew();
					} else {
						me.setAction(HY.Cmp.actions.New);
					}
				}
			});
		}
		if (me.actionModify == null) {
			me.actionModify = new Ext.Action({
				text: me.textModify ,iconCls: 'tbar-pen' ,handler: function(){
					if (me.tarObj != null && (typeof me.tarObj.doModify) == "function") {
						me.tarObj.doModify();
					} else {
						me.setAction(HY.Cmp.actions.Modify);
					}
				}
			});
		}
		if (me.actionDelete == null) {
			me.actionDelete = new Ext.Action({
				text: me.textDelete ,iconCls: 'tbar-minus' ,handler: function(){
					if (me.tarObj != null && (typeof me.tarObj.doDelete) == "function") {
						me.tarObj.doDelete();
					} else {
						me.setAction(HY.Cmp.actions.Delete);
					}
				}
			});
		}
	}
	,addCommonActions: function(){ //添加按钮
		var me = this;
		if (!(HY.isEmpty(me.title))) {
			me.addItem({xtype: 'tbtext' ,text: me.title ,cls: 'dtltbar-title'});
			me.addItem({xtype: 'tbspacer'});
			me.addItem({xtype: 'tbspacer'});
		}
		me.addItem({xtype: 'tbseparator'});
		me.addItem(me.actionNew);
		me.addItem(me.actionModify);
		me.addItem(me.actionDelete);
		
		if (me.actionCustom1 != null) {
			me.addItem(me.actionCustom1);
		}
		if (me.actionCustom2 != null) {
			me.addItem(me.actionCustom2);
		}
		if (me.actionCustom3 != null) {
			me.addItem(me.actionCustom3);
		}
		if (me.actionCustom4 != null) {
			me.addItem(me.actionCustom4);
		}
		if (me.actionCustom5 != null) {
			me.addItem(me.actionCustom5);
		}
		//按初始配置处理按钮状态
		if (me.statusConfig != null && me.statusConfig.length !== undefined && me.statusConfig.length > 0) {
			var o = null;
			var keys = null;
			var val = '', key = '';
			for (var i = 0; i < me.statusConfig.length; i = i + 1) {
				o = me.statusConfig[i];
				Ext.iterate(o, function(key ,val ,obj){
					me.setStatus(key ,val);
				});
			}
		}
	}
	/**
	 * 按钮点击事件，传递参数为按钮标识码
	 * @param {String} actionId 常量，取自HY.Cmp.actions.XXX
	 */
	,setAction: function(actionId) {
		//alert(actionId);
	}
	/**
	 * 设置按钮(Action)状态
	 * @param {String} actionName 按钮名称
	 * @param {String} configs 状态序列，使用0/1表示，依次为：是否可见、是否可用
	 */
	,setStatus: function(actionName, configs) {
		var me = this;
		var action = eval('me.' + actionName);
		if (HY.isEmpty(action) || HY.isEmpty(configs)) {
			return;
		}
		var t = configs.toString().trim();
		if (t.length > 0) {
			if (t.substr(0,1) == '1') {
				action.show();
			}
			if (t.substr(0,1) == '0') {
				action.hide();
			}
		}
		if (t.length > 1) {
			if (t.substr(1,1) == '1') {
				action.enable();
			}
			if (t.substr(1,1) == '0') {
				action.disable();
			}
		}
	}
});

/**
 * 创建工具栏
 * @param actionCfgs 按钮配置，格式参考 HY.Cmp.actions
 * @param config.tarObj 回调方法持有对象，格式：tarObj.do[按钮键名]
 */
HY.Cmp.createToolbar = function(actionCfgs, config){
	var bar = new Ext.Toolbar();
	bar.addItem('-');
	Ext.iterate(actionCfgs, function(key, val){
		var act = new Ext.Action({
			text: actionCfgs[key].text,
			iconCls: 'tbar-' + actionCfgs[key].code,
			handler: function(){
				var bfc = false;
				eval('bfc = (!HY.isEmpty(config.tarObj) && HY.isFn(config.tarObj.do' + key + '));');
				if (bfc == true) {
					eval('config.tarObj.do' + key + '();');
				}
			}
		});
		bar.addItem(act);
	});
	return bar;
};

/**
 * 查询面板，扩展了一些事件监听，操作菜单等
 */
HY.Cmp.QueryPanel = Ext.extend(Ext.FormPanel, {
	region: 'north',
	height: 64,
	border: false,
	frame: false,
	tarObj: null, //按钮事件方法的父对象
	tbarConfig: {},
	initComponent: function() {
		var me = this;
		var params = {tarObj: me.tarObj};
		if (!HY.isEmpty(me.tbarConfig)) Ext.apply(params, me.tbarConfig);
		me.tbar = new HY.Cmp.Toolbar(params);
		me.keys = [
			{
				key: [10, 13],
				fn: function() {
					if (!me.getForm().isValid()) return;
					if (!HY.isEmpty(me.tarObj) && HY.isFn(me.tarObj.doRefresh)) {
						me.tarObj.doRefresh();
					} else {
						me.doQuery();
					}
				}
			}
		];
		HY.Cmp.QueryPanel.superclass.initComponent.call(me);
	},
	doQuery: function() {
		HY.alert('do nothing');
	}
});

/**
 * 编辑单个记录的窗口对象，内置表单组件（优先按照formFields参数构建）
 * @class HY.Cmp.WindowEditMst
 * @extends Ext.Window
 */
HY.Cmp.WindowEditMst = Ext.extend (Ext.Window, {
	title: '编辑',
	width: 760,
	height: 470,
	modal: true,
	closable: true,
	closeAction: "hide",
	layout: "border",
	iconCls: "icon-win",
	resizable: true,
	maximizable: false,
	formFields: null, //优先按照此参数值构建 formPanel
	formPanel: null, //如需自定义，可赋值，同时不可对 formFields 赋值
	initComponent: function(){
		var me = this;
		if(!HY.isEmpty(me.formFields)){
			me.formPanel = new Ext.form.FormPanel({
				region: 'center',
				height: me.height - 48,
				border: false,
				bodyStyle: 'padding:3px',
				autoScroll: true,
				bodyCssClass: 'ne-form-panel',
				items: me.formFields
			});
		}
		me.items = [me.formPanel];
		HY.Cmp.WindowEditMst.superclass.initComponent.call(me);
	},
	onDestroy: function(){
		Ext.destroy(
			this.formPanel
		);
		HY.Cmp.WindowEditMst.superclass.onDestroy.call(this);
	}
});

/**
 * 树和表格组合窗口，左树右表
 */
HY.Cmp.WindowTreeGrid = Ext.extend (Ext.Window, {
	title: '编辑',
	width: 760,
	height: 470,
	modal: true,
	closable: true,
	closeAction: "hide",
	layout: "border",
	iconCls: "icon-win",
	resizable: true,
	maximizable: false,
	treePanel: null,
	treeDataUrl: '',//[M]
	treeBar: ['-'],//[C]
	gridPanel: null,
	gridStore: null,//[M]
	gridCM: null,//[M]
	showFooter: false,
	footerHtml: '这是底部',
	initComponent: function(){
		var me = this;
		
		me.treePanel = new Ext.tree.TreePanel({
			region: 'west',
			closable: false,
			split: false,
			header: false,
			width: 178,
			minSize: 58,
			maxSize: 368,
			collapsible: false,
			margins: '3 3',
			rootVisible: false,
			lines: false,
			useArrows: false,
			autoScroll: true,
			loader: new Ext.tree.TreeLoader({
				preloadChildren: true, clearOnLoad: true, dataUrl: me.treeDataUrl
			}),
			root: new Ext.tree.TreeNode({id: '0', expanded: true, text: '根节点'}),
			tbar: me.treeBar,
			listeners: {
				'load': function(node) {
					this.expandAll();
					var child = this.root.firstChild;
					try {
						if (!HY.isEmpty(child) && this.getSelectionModel() != null) {
							this.getSelectionModel().select(child);
							
						}
					} catch (e) {
						HY.alert(e);
					}
				},
				'click': function(node, e){
					me.refreshGrid(node);
				},
				'checkchange': function(node, flag) {
					me.treeNodeCheck(node, flag);
				}
			}
		});
		
		me.gridPanel = new Ext.grid.GridPanel({
			region: 'center',
			border: true,
			margins: '3 3',
			store: me.gridStore,
			cm: me.gridCM
		});
		
		if (me.showFooter == true) {
			me.footerPanel = new Ext.Panel({
				region: 'south',
				height: 22,
				border: false,
				html: me.footerHtml
			});
			me.items = [me.treePanel, me.gridPanel, me.footerPanel];
		} else {
			me.items = [me.treePanel, me.gridPanel];
		}
		HY.Cmp.WindowTreeGrid.superclass.initComponent.call(me);
	},
	onDestroy: function(){
		Ext.destroy(
			this.treePanel
		);
		HY.Cmp.WindowTreeGrid.superclass.onDestroy.call(this);
	},
	refreshTree: function(parms) {
		var me = this;
		var loader = me.treePanel.getLoader();
		Ext.apply(loader, parms);
		loader.load(me.treePanel.getRootNode(), function(){
			me.treePanel.expandAll();
		});
		me.gridStore.removeAll();
	},
	refreshGrid: function(node){
		var me = this;
		Ext.apply (me.gridStore.baseParams, {'node': node.id});
		me.gridStore.load();
	},
	treeNodeCheck: function(node, flag){
		// empty ......
	}
});

/**
 * 主从记录窗口，一对一，即一个表单（form）组件、一个表格（grid）组件
 * @class HY.Cmp.WindowEditMstDtl
 * @extends Ext.Window
 */
HY.Cmp.WindowEditMstDtl = Ext.extend (Ext.Window, {
	title: '主从窗口'
	,width: 800
	,height: 500
	,modal: true
	,closable: true
	,closeAction: "hide"
	,layout: "border"
	,iconCls: "icon-win"
	,resizable: true
	,maximizable: false
	,formPanel: null //表单面板
	,formFields: null //表单字段
	,formHeight: 300
	,gridHeight: 180
	,gridPanel: null //列表面板
	,gridFields: null //列表数据源字段
	,gridSortInfo: null //列表排序
	,gridDataUrl: null //列表加载数据URL
	,gridColModel: null //列表列模型
	,gridTbar: null //列表顶部菜单栏
	,gridEditMode: 0 //列表编辑模式：0 正常模式，1 采用可编辑表格，2 单行编辑插件
	,gridPlugins: [] //列表插件
	,gridEditWindow: null //gridEditMode = 1 自动创建
	,gridSm: null
	,pageSize: -1
	,mstRegion: 'north'
	,dtlRegion: 'center'
	,initComponent: function(){
		var me = this;
		if(me.formFields != null && !(me.formFields === undefined)){
			me.formPanel = new Ext.form.FormPanel({
				region: me.mstRegion
				,height: me.formHeight
				,border: false
				,bodyStyle: 'padding:5px'
				,autoScroll: true
				,bodyCssClass: 'ne-form-panel'
				,items: me.formFields
			});
		}
		if (me.gridPanel == null) {
			if (me.gridStore == null) {
				me.gridStore = HY.Cmp.createJsonStore({
					fields: me.gridFields
					,url: me.gridDataUrl
					,sortInfo: me.gridSortInfo
					,pageSize: me.pageSize
				});
			}
			if (me.pageSize > 0) {
				me.pageBar = new HY.Cmp.PagingToolbar({tarObj: me ,store: me.gridStore ,displayPageSizeBox: true});
			} else {
				me.pageBar = undefined;
			}
			if (me.gridEditMode == 1) {
				me.gridPanel = new Ext.grid.EditorGridPanel({
					region: me.dtlRegion
					,border: true
					,margins: '2 2 2 2'
					,store: me.gridStore
					,cm: me.gridColModel
					,sm: me.gridSm
					,tbar: me.gridTbar
					,bbar: me.pageBar
					,clicksToEdit: 1
					,height: me.gridHeight
					,loadMask: HY.Const.loadMask
				});
			} else if (me.gridEditMode == 2) {
				me.gridPanel = new Ext.grid.GridPanel({
					region: me.dtlRegion
					,border: true
					,margins: '2 2 2 2'
					,store: me.gridStore
					,cm: me.gridColModel
					,sm: me.gridSm
					,tbar: me.gridTbar
					,bbar: me.pageBar
					,plugins: me.gridPlugins
					,height: me.gridHeight
					,loadMask: HY.Const.loadMask
				});
			} else {
				me.gridPanel = new Ext.grid.GridPanel({
					region: me.dtlRegion
					,border: true
					,margins: '2 2 2 2'
					,store: me.gridStore
					,cm: me.gridColModel
					,sm: me.gridSm
					,tbar: me.gridTbar
					,bbar: me.pageBar
					,height: me.gridHeight
					,listeners: {
						"rowdblclick" : function(){
							if (me.gridEditWindow != null) {
								var wx = me.gridEditWindow;
								var rec = me.gridPanel.getSelectionModel().getSelected();
								if (rec) {
									if (wx.formPanel && (typeof wx.formPanel.getForm) == 'function') {
										var frm = wx.formPanel.getForm();
										frm.setValues(rec.data);
									}
								}
								wx.show();
							}
						}
					}
					,loadMask: HY.Const.loadMask
				});
			}
		} else {
			me.gridStore = me.gridPanel.store;
		}
		me.items = [me.formPanel ,me.gridPanel];
		HY.Cmp.WindowEditMstDtl.superclass.initComponent.call(this);
	}
	,onDestroy: function(){
		Ext.destroy(
			 this.formPanel
			,this.gridPanel
			,this.gridTbar
			,this.gridEditWindow
		);
		HY.Cmp.WindowEditMstDtl.superclass.onDestroy.call(this);
	}
	/**
	 * 刷新列表数据
	 * @param {Object} params 列表访问参数
	 */
	,refreshGrid: function(params){
		var me = this;
		Ext.apply(me.gridStore.baseParams, params);
		me.gridStore.load();
	}
});

/**
 * 主从记录窗口，一对多，内含一个表单（form）组件、可以支持多个标签页（tab）组件
 * @class HY.Cmp.WindowEditMstDtl2
 * @extends Ext.Window
 */
HY.Cmp.WindowEditMstDtl2 = Ext.extend (Ext.Window, {
	title: '主从窗口（Tab）'
	,width: 800
	,height: 500
	,modal: true
	,closable: true
	,closeAction: "hide"
	,layout: "border"
	,iconCls: "icon-win"
	,resizable: true
	,maximizable: false
	,formPanel: null //表单面板
	,formFields: null //表单字段
	,formHeight: 300
	,tabItems: null
	,tabPanel: null
	,tabPanelId: 'wemd_tabPanel'
	,tabRender: true
	,mstRegion: 'north'
	,dtlRegion: 'center'
	,initComponent: function(){
		var me = this;
		if(me.formFields != null && !(me.formFields === undefined)){
			me.formPanel = new Ext.form.FormPanel({
				region: me.mstRegion
				,height: me.formHeight
				,border: false
				,bodyStyle: 'padding:5px'
				,autoScroll: true
				,bodyCssClass: 'ne-form-panel'
				,items: me.formFields
			});
		}
		if(me.tabItems !=null && !(me.tabItems === undefined)){
			me.tabPanel = new Ext.TabPanel({
				region: me.dtlRegion
				,id: me.tabPanelId
				,plain: false
				,activeTab: 0
				,border: false
				,deferredRender: me.tabRender
				,defaults: {
					 layout: 'fit', autoScroll: true
				}
				,items: me.tabItems
			});
		}
		me.items = [me.formPanel ,me.tabPanel];
		HY.Cmp.WindowEditMstDtl2.superclass.initComponent.call(this);
	}
	,onDestroy: function(){
		Ext.destroy(
			 this.formPanel
			,this.tabPanel
		);
		HY.Cmp.WindowEditMstDtl2.superclass.onDestroy.call(this);
	}
});

/**
 * 构建动态数据源
 * @param {Number} config.pageSize [C] 分页大小，不提供时，取默认值
 * @param {String} config.root [C] JSON的数据的根节点，默认值为：rows
 * @param {String} config.totalProperty [C] JSON的记录数节点，默认值为：results
 * @param {Array}  config.fields [M] 字段名称数组
 * @param {String} config.url [C] 获取数据的完整的地址，与config.datas排斥使用
 * @param {String} config.datas [C] 本地数据对象，与config.url排斥使用
 * @param {Object} config.sortInfo 排序信息，默认值为空对象
 * @return {Ext.data.JsonStore}
 */
HY.Cmp.createJsonStore = function(config) {
	var pageSize = config.pageSize === undefined ? this.pageSize : config.pageSize;
	var root = config.root === undefined ? 'obj.rows' : config.root;
	var totalProperty = config.totalProperty === undefined ? 'obj.results' : config.totalProperty;
	var fields = config.fields === undefined ? [] : config.fields;
	var sortInfo = config.sortInfo === undefined ? {} : config.sortInfo;
	var autoLoad = config.autoLoad === undefined ? false : config.autoLoad;
	var proxy = null;
	if (config.url !== undefined && config.url != null) {
		proxy = new Ext.data.HttpProxy({url: config.url});
	} else if (config.datas !== undefined && config.datas != null) {
		proxy = new Ext.data.MemoryProxy(config.datas);
	}
	var params = config.params === undefined ? {} : config.params;
	Ext.apply(params, {start: 0, limit: pageSize});
	var store = new Ext.data.JsonStore({
		root: root,
		autoDestroy: true,
		totalProperty: totalProperty,
		remoteSort: true,
		baseParams: params,
		fields: fields,
		autoLoad: autoLoad,
		proxy: proxy,
		sortInfo: sortInfo
	});
	return store;
};

/**
 * 创建基于动态数据源的下拉框
 * @param {Object} [M] config 配置信息
 * @param {Object} [C] config.jsonData JSON格式数据，从本地获取数据时传递此参数，不用设置 config.url 参数
 * @param {Object} [M] config.storeConfig 数据源配置
 * @param {Object} [M] config.store 指定数据源，与storeConfig排斥使用，优先使用此值
 * @return {}
 */
HY.Cmp.createJsonCombo = function(config) {
	var me = this;
	var fields = config.fields === undefined ? ['id','code','name'] : config.fields ;
	var url = config.url;
	var cboxStore = config.store;
	if (HY.isEmpty(cboxStore)) {
		cboxStore = me.createJsonStore(Ext.apply({fields: fields, url: url, autoLoad: true}, config.storeConfig));
	}
	var cboxConfig = {};
	Ext.iterate(config, function(key ,val ,config){
		if (key == "storeConfig" || key == "onSelect") {
			
		} else {
			cboxConfig[key] = val;
		}
	});
	Ext.applyIf(cboxConfig, {
		store: cboxStore,
		listWidth: (cboxConfig.listWidthRate === undefined ? 256 : config.width * cboxConfig.listWidthRate),
		forceSelection: true,
		triggerAction: 'all',
		pageSize: 10,
		minChars: 1,
		queryParam: 'keyword',
		allowBlank: true
	});
	var cbox = new Ext.form.ComboBox(cboxConfig);
	if (HY.isFn(config.onSelect)) {
		cbox.on('select', function(combo, record, index) { config.onSelect(combo, record, index); }, cbox);
	}
	return cbox;
};

/**
 * 根据记录集创建JSON数组格式的参数串
 * @param {Ext.data.Record Array} records
 * @return {String}
 */
HY.Cmp.createJsonArrayParam = function(records){
	var count = records.length;
	var param = '';
	if (count > 0) {
		param = '[';
		for (var i = 0; i < count; i = i + 1) {
			if (i > 0) {
				param += ",";
			}
			param += Ext.util.JSON.encode(records[i].data);
		}
		param += ']';
	}
	return param;
};

/**
 * 清除指定表单数据
 * @param {Ext.form.FormPanel} frm [M] 目标表单
 * @param {String} excludes [C] 需要排除的字段名，多个以逗号“,”分隔
 */
HY.Cmp.clearFormData = function(frm, excludes){
	var values = frm.getFieldValues();
	var t = '';
	if (excludes != null && excludes !== undefined && excludes.length > 0) {
		t = ',' + excludes.replace(" ", "") + ',';
	}
	Ext.iterate(values, function(key ,val ,obj){
		var _cmp = frm.findField(key);
		if (t.indexOf(',' + key + ',') > -1) {
			//do nothing			
		} else {
			if (!(HY.isEmpty(_cmp) || HY.isEmpty(_cmp.valueNotFoundText))) {
				_cmp.valueNotFoundText = "";
			}
			if (typeof val == 'object') {
				obj[key] =[];
			} else {
				obj[key] ="";
			}
		}
	});
	frm.setValues(values);
};

/**
 * 解析所有日期字段
 * @param {Object} jsonData JSON格式数据对象
 * @param {String} cols 日期字段串，多个以逗号（,）分隔
 * @param {String} format 格式，可选
 */
HY.Cmp.parseDateCols = function(jsonData, cols, format) {
	if (jsonData === null || jsonData === undefined || cols === undefined || cols === null) return;
	var arr = cols.split(",");
	var tmp = "", valTmp = "";
	for (var i = 0; i < arr.length; i = i + 1) {
		tmp = arr[i].trim();
		valTmp = jsonData[tmp];
		if (valTmp === undefined || valTmp === null || valTmp === "") {
			continue;
		}
		jsonData[tmp] = HY.parseDate(valTmp);
	}
};

/**
 * 每页显示条数下拉选择框
 */
HY.Cmp.pageSizeCombo = Ext.extend(Ext.form.ComboBox, {
    name: 'pagesize',
    triggerAction: 'all',
    mode: 'local',
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: [['10','10'],['20','20'],['30','30'],['50','50'],['100','100'],['200','200']]
    }),
    valueField: 'value',
    displayField: 'text',
    value: '20',
    editable: false,
    width: 50,
    listWidth: 50
});

/**
 * 基本的分页工具条
 * @class HY.Cmp.PagingToolbar
 * @extends Ext.PagingToolbar
 */
HY.Cmp.PagingToolbar = Ext.extend(Ext.PagingToolbar, {
	pageSize: HY.Cmp.pageSize,
	tarObj: null,
	displayInfo: true,
	displayPageSizeBox: true,
	displayMsg: HY.ls('9471', '当前显示{0} - {1}条，共{2}条记录'),
	emptyMsg: HY.ls('9448', '没有数据'),
	beforePageText: HY.ls('3597', '第'),
	afterPageText: HY.ls('9472', '页，共 {0} 页') ,
	beforePageSizeText: HY.ls('8556', '每页显示'),
	afterPageSizeText: HY.ls('9473', '条'),
	initComponent: function() {
		var me = this;
		var psExists = (me.tarObj != null && me.tarObj !== undefined && me.tarObj.pageSize !== undefined);
		if (psExists == true && me.tarObj.pageSize > 0) {
			me.pageSize = me.tarObj.pageSize;
		}
		if (me.displayPageSizeBox === true){
			if (HY.isEmpty(me.beforePageSizeText)) me.beforePageSizeText = '&nbsp;';
			if (HY.isEmpty(me.afterPageSizeText)) me.afterPageSizeText = '&nbsp;';
			me.items = ['-', me.beforePageSizeText,
				new HY.Cmp.pageSizeCombo({
					value: me.pageSize
					,listeners: {
						select: function(obj){
							var pageSize = parseInt(obj.getValue());
							if (psExists == true) {
								me.tarObj.pageSize = pageSize;
							}
							me.pageSize = pageSize;
							if (me.store !== undefined && me.store != null) {
								Ext.apply(me.store.baseParams, {limit: pageSize, start: 0});
								me.store.load();
							}
						}
					}
				}),
				me.afterPageSizeText
			];
		}
		HY.Cmp.PagingToolbar.superclass.initComponent.call(me);
	}
});

/**
 * @param checked 当前字段的值
 * @param ctxPath 上下文路径
 * @param clickEvent 图标点击事件（字符串）
 */
HY.Cmp.getCellCheckboxHtml = function(checked, ctxPath, clickEvent) {
	var ix = "empty";
	if (checked == 'Y') ix = 'full';
	var s = '<img src="' + ctxPath + '/ress/img/checkbox_' + ix + '.png"';
	if (HY.isEmpty(clickEvent) == false) {
		s += ' onclick="' + clickEvent + '"';
	}
	s += '/>';
	return s;
};

/**
 * 弹出式查询-选择窗口
 * @class HY.Cmp.WindowPopQuery
 * @extends Ext.Window
 */
HY.Cmp.WindowPopQuery = Ext.extend(Ext.Window, {
	layout: "border"
	,modal: true
	,queryPanel: null
	,queryPanelHeight: null
	,queryFields: null
	,gridPanel: null
	,dataUrl: null
	,dataParams: null
	,fields: []
	,colModel: undefined
	,selModel: undefined
	,handler: null
	,closeAfterSelected: true
	,resetOnClose: false
	,iconCls: 'icon-win'
	,sortInfo: null
	,initComponent: function(){
		var me = this;
		var w = me.width;
		var h = me.height;
		var title = me.title;
		if (w === undefined || w <= 0) w = 636;
		if (h === undefined || h <= 0) h = 360;
		if (title === undefined || title == null) title = '选择';
		if (me.queryPanelHeight === undefined || me.queryPanelHeight == null) {
			me.queryPanelHeight = 36;
		}
		if (HY.isEmpty(me.iconCls)) me.iconCls = 'icon-win';
		if (me.queryPanel == null) {
			if (me.queryFields == null) {
				me.queryFields = [
					{layout: 'absolute' ,border: false ,height: 36 ,items:[
						{xtype: 'label' ,html: '关键字' ,width: 65 ,x: 5 ,y: 6}
						,{xtype: 'textfield' ,name: 'keyword' ,width: 120 ,x: 70 ,y: 6}
					]}
				];
			}
			me.queryPanel = new Ext.form.FormPanel({
				region: 'north'
				,height: me.queryPanelHeight ,border: false
				,items: me.queryFields
				,keys: [{
					key: [10,13]
					,fn: function() {
						me.doEnter();
					}
				}]
			});
		}
		if (me.pageSize === undefined || me.pageSize == null) {
			me.pageSize = HY.Cmp.pageSize;
		}
		if (me.sortInfo === undefined || me.sortInfo == null) {
			me.sortInfo = {};
		}
		if (me.gridPanel == null) {
			me.dataStore = HY.Cmp.createJsonStore({
				fields: me.fields ,url: me.dataUrl ,pageSize: me.pageSize
				,sortInfo: me.sortInfo
			});
			me.gridPanel = new Ext.grid.GridPanel({
				region: 'center'
				,border: true
				,margins: '2 2 2 2'
				,store: me.dataStore
				,cm: me.colModel
				,sm: me.selModel
				,loadMask: me.loadMask
				,bbar: (me.pageSize == 0 ? undefined : new HY.Cmp.PagingToolbar({tarObj: me ,store: me.dataStore}))
				,listeners:{
					"rowdblclick": function(grid ,rowIndex ,e){
						if (me.handler != null && typeof me.handler == 'function') {
							me.handler(grid ,rowIndex ,e);
						}
						e.stopEvent();
						if (me.closeAfterSelected === true) {
							me.close();
						}
					}
					,"rowclick": function(grid ,rowIndex ,e){
						e.stopEvent();
						me.doRowclick(grid ,rowIndex ,e);
					}
				}
			});
		} else {
			me.dataStore = this.gridPanel.store;
		}
		if (me.dataParams !== undefined && me.dataParams != null) {
			Ext.apply(me.dataStore.baseParams ,me.dataParams);
		}
		me.items = [me.queryPanel ,me.gridPanel];
		Ext.apply (me, {width: w ,height: h ,title: title});
		me.onHide = function() {
			if (me.resetOnHide == true) {
				me.dataStore.removeAll();
			}
			if (me.onHideFn != null && typeof me.onHideFn == 'function') {
				me.onHideFn(me);
			}
		};
		me.onShow = function() {
			if (me.resetOnHide == true) {
				me.dataStore.load();
			}
			if (me.onShowFn != null && typeof me.onShowFn == 'function') {
				me.onShowFn(me);
			}
		};
		HY.Cmp.WindowPopQuery.superclass.initComponent.call(this);
	}
	,doEnter: function(){
		var me = this;
		var frm = me.queryPanel.getForm();
		var params = {};
		Ext.apply (params, frm.getValues());
		Ext.apply (me.dataStore.baseParams, params);
		me.dataStore.load();
	}
	,doRowclick: function(grid ,rowIndex ,e){
		
	}
	,clearGrid: function() {
		var me = this;
		me.dataStore.removeAll();
	}
	,onDestroy: function(){
		Ext.destroy(
			 this.queryPanel
			,this.gridPanel
		);
		HY.Cmp.WindowPopQuery.superclass.onDestroy.call(this);
	}
});

/**
 * 创建弹出式查询-选择窗口
 * @param {String} configs.id [C] 窗口标识
 * @param {String} configs.dataUrl [M] 数据源地址
 * @param {Array} configs.fields [M] 数据源字段
 * @param {Ext.grid.ColumnModel} configs.colModel [M] 表格列模型
 * @param {function} configs.handler [C] 双击选择后触发的事件
 */
HY.Cmp.createPopQuery = function(configs) {
	var id = configs.id;
	var w_pop = null;
	if (!(id == null || id === undefined)) {
		w_pop = Ext.getCmp(id);
	} else {
		id = null;
	}
	var closeAfterSelected = configs.closeAfterSelected === undefined ? true : configs.closeAfterSelected;
	var modal = configs.modal === undefined ? true : configs.modal;
	var popConfigs = {closeAction: 'hide', closeAfterSelected: closeAfterSelected, modal: modal};
	Ext.applyIf(popConfigs, configs);
	if (w_pop == null || w_pop === undefined) {
		w_pop = new HY.Cmp.WindowPopQuery(popConfigs);
	}
	w_pop.dataStore.dataUrl = configs.dataUrl;
	if (configs.dataParams !== undefined && configs.dataParams != null) {
		Ext.apply(w_pop.dataStore.baseParams, configs.dataParams);
	}
	w_pop.show();
	w_pop.dataStore.load();
};

/**
 * 创建按钮
 * @param {Object} configs x，y：位置XY轴，fn：处理函数，cls 图标样式类
 * @return {Ext.Button}
 */
HY.Cmp.createButton = function(configs) {
	var x = configs.x === undefined ? -1 : configs.x;
	var y = configs.y === undefined ? -1 : configs.y;
	var fn = configs.fn === undefined ? null : configs.fn;
	var tabIndex = configs.tabIndex;
	var tip = configs.tooltip === undefined ? undefined : configs.tooltip;
	var act;
	if (x != -1 && y != -1) {
		act = new Ext.Action({iconCls:configs.cls ,x: x ,y: y ,tabIndex: tabIndex ,handler: fn});
	} else {
		act = new Ext.Action({iconCls:configs.cls ,tabIndex: tabIndex ,handler: fn});
	}
	var btn = new Ext.Button(act);
	btn.setTooltip (tip);
	if (configs.text) {
		btn.setText(configs.text);
	}
	return btn;
};
/**
 * 创建查询按钮
 * @param {Object} configs x，y：位置XY轴，fn：处理函数
 * @return {Ext.Button}
 */
HY.Cmp.createQueryButton = function(configs) {
	var c = {cls:'tbar-query'};
	Ext.applyIf(c ,configs);
	return HY.Cmp.createButton(c);
};

/**
 * 创建清除按钮
 * @param {Object} configs x，y：位置XY轴，fn：处理函数
 * @return {Ext.Button}
 */
HY.Cmp.createClearButton = function(configs) {
	var c = {cls:'tbar-clear'};
	Ext.applyIf(c ,configs);
	return HY.Cmp.createButton(c);
};

/**
 * 创建查询和清除双按钮
 * @param {Object} configs btn1 参数，btn2 参数
 */
HY.Cmp.createQryClrButton = function(configs) {
	return [HY.Cmp.createQueryButton(configs.btn1) ,HY.Cmp.createClearButton(configs.btn2)];
};

/**
 * 上传窗口，后台需要返回 MessagePacket 对象的JSON格式字符串，用以判断操作是否成功，并接收返回值。
 * @class HY.Cmp.UploadWindow
 * @extends Ext.Window
 */
HY.Cmp.UploadWindow = Ext.extend(Ext.Window ,{
	title: '文件上传'
	,width: 400
	,height: 120
	,autoDestroy: true
	,modal: true
	,closeAction: 'hide'
	,url: null
	,formPanel: null
	,allowedExts: '.txt,.pdf,.xls,.xlsx,.doc,.docx,.jpg,.jpeg,.jpe,.png,.gif,.bmp,.jfif' //允许的扩展名
	,initComponent: function() {
		var me = this;
		if (me.formPanel == null || me.formPanel === undefined) {
			me.formPanel = new Ext.form.FormPanel({
				border: false
				,fileUpload: true
				,items: [
					{xtype: 'hidden' ,name: 'datpkid'}
					,{layout: 'absolute' ,height: 80 ,border: false ,items: [
						{xtype: 'textfield' ,name: 'uploadfile' ,inputType: 'file' ,x: 12 ,y: 10 ,width: 360 ,allowBlank: false}
						,{xtype: 'label' ,html: me.allowedExts ,x: 12 ,y: 36}
					]}
				]
			});
		}
		me.items = [me.formPanel];
		me.buttons = [
			{
				text: '上传'
				,handler: function() {
					me.doUpload();
				}
			}
			,{
				text: '取消'
				,handler: function() {
					me.hide();
				}
			}
		];
		HY.Cmp.UploadWindow.superclass.initComponent.call(this);
	}
	,doUpload: function() {
		var me = this;
		var frm = me.formPanel.getForm();
		if (frm.isValid()) {
			frm.submit({
				method: 'post'
				,url: me.url
				,waitMsg: '上传中......'
				,success: function(form, action) {
					var msg = action.response.responseText;
					msg = msg.replace(/<\/?[^>]*>/g, "");
					try {
						var mpk = Ext.decode(msg);
						if (mpk.success !== undefined) {
							if (mpk.success === true) {
								me.success(mpk.obj);
							} else {
								HY.alert(mpk.msg);
							}
						}
					} catch (e) {
						HY.alert(e);
					}
					me.hide();
				}
				,failure: function(form, action) {
					switch (action.failureType) {
						case Ext.form.Action.CLIENT_INVALID:
							HY.alert('表单未填写完整，未通过验证！');
							break;
						case Ext.form.Action.CONNECT_FAILURE:
							HY.alert('请求失败，无法与服务器通讯！');
							break;
						case Ext.form.Action.SERVER_INVALID:
							var msg = action.response.responseText;
							msg = msg.replace(/<\/?[^>]*>/g, "");
							try {
								var obj = Ext.decode(msg);
								if (obj.msg !== undefined) {
									msg = obj.msg;
								}
							} catch (e) {
								
							}
							HY.alert(msg);
							break;
					}
				}
			});
		} else {
			HY.alert('请先选择文件！');
		}
	}
	,sucess: function(datobj) {
		//实例中可扩展此方法，上传完毕后执行处理
	}
	,onDestroy: function(){
		Ext.destroy(
			 this.formPanel
		);
		HY.Cmp.UploadWindow.superclass.onDestroy.call(this);
	}
});

/**
 * 数据浏览窗口，一个表格（grid）组件列数据，一个面板预览数据详情
 * @class HY.Cmp.WindowDataView
 * @extends Ext.Window
 */
HY.Cmp.WindowDataView = Ext.extend (Ext.Window, {
	title: '数据浏览窗口'
	,width: 800
	,height: 380
	,modal: true
	,closable: true
	,closeAction: "hide"
	,layout: "border"
	,iconCls: "icon-win"
	,resizable: true
	,maximizable: false
	,editable: true //是否允许编辑：true 显示增删改按钮
	,viewPanel: null //展示面板
	,gridPanel: null //列表面板
	,gridFields: null //列表数据源字段
	,gridSortInfo: null //列表排序
	,gridDataUrl: null //列表加载数据URL
	,gridColModel: null //列表列模型
	,gridTbar: null //列表顶部菜单栏
	,gridPlugins: [] //列表插件
	,gridSm: null
	,pageSize: -1
	,initComponent: function(){
		var me = this;
		if(me.viewPanel == null){
			me.viewPanel = new Ext.Panel({
				region: 'south'
				,height: 2
				,border: false
				,bodyStyle: 'padding:5px'
				,autoScroll: true
				,items: []
			});
		}
		var _staCfg = [{actionNew: '00'},{actionModify: '00'},{actionDelete: '00'}];
		if (me.editable == true) {
			_staCfg = [{actionNew: '11'},{actionModify: '11'},{actionDelete: '11'}];
		}
		if (me.gridTbar == null) {
			me.gridTbar = new HY.Cmp.DtlToolbar({
				title: '文件列表',
				statusConfig: _staCfg,
				actionCustom1: new Ext.Action({
					text: '刷新', iconCls: 'tbar-refresh', handler: function(){
						me.refreshGrid();
					}
				}),
				setAction: function(actid) {
					switch(actid){
					case HY.Cmp.actions.New:
						me.doNew();
						break;
					case HY.Cmp.actions.Modify:
						var rec = me.gridPanel.getSelectionModel().getSelected();
						if (rec) {
							me.doModify(rec);
						} else {
							HY.alert('请选择一行记录');
						}
						break;
					case HY.Cmp.actions.Delete:
						var rec = me.gridPanel.getSelectionModel().getSelected();
						if (rec) {
							me.doDelete(rec);
						} else {
							HY.alert('请选择一行记录');
						}
						break;
					}
				}
			})
		}
		if (me.gridPanel == null) {
			if (me.gridStore == null) {
				me.gridStore = HY.Cmp.createJsonStore({
					fields: me.gridFields
					,url: me.gridDataUrl
					,sortInfo: me.gridSortInfo
					,pageSize: me.pageSize
				});
			}
			if (me.pageSize > 0) {
				me.pageBar = new HY.Cmp.PagingToolbar({tarObj: me ,store: me.gridStore ,displayPageSizeBox: true});
			} else {
				me.pageBar = undefined;
			}
			me.gridPanel = new Ext.grid.GridPanel({
				region: 'center'
				,border: true
				,margins: '2 2 2 2'
				,store: me.gridStore
				,cm: me.gridColModel
				,sm: me.gridSm
				,tbar: me.gridTbar
				,bbar: me.pageBar
				,listeners: {
					"rowdblclick" : function(){
						var rec = me.gridPanel.getSelectionModel().getSelected();
						if (rec) {
							me.doModify(rec);
						}
					}
				}
			});
		} else {
			me.gridStore = me.gridPanel.store;
		}
		me.items = [me.viewPanel ,me.gridPanel];
		HY.Cmp.WindowDataView.superclass.initComponent.call(this);
	}
	,onDestroy: function(){
		Ext.destroy(
			 this.viewPanel
			,this.gridPanel
			,this.gridTbar
		);
		HY.Cmp.WindowDataView.superclass.onDestroy.call(this);
	}
	/**
	 * 刷新列表数据
	 * @param {Object} params 列表访问参数
	 */
	,refreshGrid: function(params){
		var me = this;
		Ext.apply(me.gridStore.baseParams, params);
		me.gridStore.load();
	}
	,doNew: function() {HY.alert('新增');
		// 新增按钮触发事件，由派生类实现
	}
	,doModify: function(rec) {HY.alert('修改');
		// 修改按钮触发事件，由派生类实现
	}
	,doDelete: function(rec) {HY.alert('删除');
		// 删除按钮触发事件，由派生类实现
	}
});