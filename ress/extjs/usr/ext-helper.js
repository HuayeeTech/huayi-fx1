/*extend founction for extJS lib*/
var HY = {};

HY.defTitle = '温馨提示';

HY.setCookie = function(name, value) {
	var d = new Date();
	d.setTime(d.getTime() + 7*24*3600*1000);
	Ext.util.Cookies.clear(name);
	Ext.util.Cookies.set(name, value, d);
};

HY.getCookie = function(name) {
	return Ext.util.Cookies.get(name);
};
/**
 * 一般提示窗口，支持只传一个参数
 */
HY.alert = function(title, message) {
	var t = title;
	var msg = message;
	if (message === undefined) {
		msg = title;
		title = HY.defTitle;
	}
	Ext.Msg.alert (title, msg);
};
/**
 * 得到最顶层的window对象
 */
HY.topWin = function() {
    var win = window;
    while (win != win.parent) {
        win = win.parent;
    }
    return win;
};
/**
 * 清空表格的选中状态
 */
HY.resetGrid = function(grid) {
    grid.getSelectionModel().clearSelections();
    grid.getEl().select('div.x-grid3-hd-checker').removeClass('x-grid3-hd-checker-on');
};
/**
 * 确认窗口
 * @param config.title 标题，可选
 * @param config.msg 内容，可选
 * @param config.callback 选择“是”后执行的回调函数，必选
 * @param config.falseFn 选择“否”后执行的回调函数，可选
 */
HY.confirm = function(config) {
	Ext.Msg.show ({
		buttons: {yes:HY.ls('1642', '是'), no: HY.ls('1957', '取消')}, 
		title: (HY.isEmpty(config.title) ? HY.defTitle : config.title), 
		msg: (HY.isEmpty(config.msg) ? "是否继续？" : config.msg), 
		icon: Ext.MessageBox.QUESTION, 
		fn: function(btn) {
			if ("yes" == btn) {
				if (HY.isFn(config.callback)) config.callback();
			} else {
				if (HY.isFn(config.falseFn)) config.falseFn();
			}
		}
	});
};
/**
 * 渲染为日期格式
 */
HY.renderAsDate = function(value, metaData, record, rowIndex, colIndex, store) {
	var dt = HY.parseDate(value);
	return HY.isEmpty(dt) ? '' : dt.format('Y/m/d');
};
/**
 * 渲染为日期时间格式
 */
HY.renderAsDateTime = function(value, metaData, record, rowIndex, colIndex, store) {
	var dt = HY.parseDate(value);
	return HY.isEmpty(dt) ? '' : dt.format('Y/m/d H:i');
};
/**
 * 渲染为日期时间格式，有秒
 */
HY.renderAsDateTimex = function(value, metaData, record, rowIndex, colIndex, store) {
	var dt = HY.parseDate(value);
	return HY.isEmpty(dt) ? '' : dt.format('Y/m/d H:i:s');
};
/**
 * 渲染为短日期时间格式
 */
HY.renderAsDateTimeShort = function(value, metaData, record, rowIndex, colIndex, store) {
	var dt = HY.parseDate(value);
	return HY.isEmpty(dt) ? '' : dt.format('m/d H:i');
};
/**
 * 渲染为时间格式
 */
HY.renderAsTime = function(value, metaData, record, rowIndex, colIndex, store) {
	var dt = HY.parseDate(value);
	return HY.isEmpty(dt) ? '' : dt.format('H:i');
};
/**
 * 渲染为整数格式
 */
HY.renderAsInt = function(value, metaData, record, rowIndex, colIndex, store) {
	if (value && value > 0) {
		var s = Ext.util.Format.number(value, '0,000');
		return s;
	}
	return "";
};
/**
 * 渲染为2位小数格式
 */
HY.renderAsFloat2 = function(value, metaData, record, rowIndex, colIndex, store) {
	if (value && value > 0) {
		var s = Ext.util.Format.number(value, '0.00');
		return s;
	}
	return "";
};
/**
 * 渲染为3位小数格式
 */
HY.renderAsFloat3 = function(value, metaData, record, rowIndex, colIndex, store) {
	if (value && value > 0) {
		var s = Ext.util.Format.number(value, '0.000');
		return s;
	}
	return "";
};
/**
 * 渲染为4位小数格式
 */
HY.renderAsFloat4 = function(value, metaData, record, rowIndex, colIndex, store) {
	if (value && value > 0) {
		var s = Ext.util.Format.number(value, '0.0000');
		return s;
	}
	return "";
};
/**
 * 渲染为6位小数格式
 */
HY.renderAsFloat6 = function(value, metaData, record, rowIndex, colIndex, store) {
	if (value && value > 0) {
		var s = Ext.util.Format.number(value, '0.000000');
		return s;
	}
	return "";
};
/**
 * 渲染勾选框样式
 */
HY.renderAsCheckbox = function(value, metaData, record, rowIndex, colIndex, store) {
	var imgfix = "empty";
	if ("Y" == value || 1 == value) {
		imgfix = "full";
	}
	var s = "<img src=\"" + ctx + "/ress/images/checkbox_" + imgfix + ".png\" border=\"0\" alt=\"\"/>";
	return s;
};
/**
 * 渲染为性别样式
 */
HY.renderAsSex = function(value, metaData, record, rowIndex, colIndex, store) {
	var s = "user.png";
	if (value && value.length > 0) {
		if (value == 'M') {
			s = "male.png";
		} else if (value == 'F') {
			s = "female.png";
		}
	}
	s = '<img src="' + ctx + '/ress/images/' + s + '" border="0" alt=""/>';
	return s;
};
/**
 * 获取或设置指定表单指定域的值
 * @param {Ext.form.FormPanel/Ext.form.BasicForm} formPanel 可以是基础表单，也可以是高级表单。
 * @param {String} fieldName 域名称
 * @param {String} fieldValue 域的值，未定义时按取值模式操作，否则，已定义的情况下按设置值模式操作。
 * @return {String} 取值模式时，返回指定域的值；设置值模式时，返回空串。
 */
HY.fv = function(formPanel, fieldName, fieldValue) {
	var frm = HY.isFn(formPanel.getForm) ? formPanel.getForm() : formPanel;
	if (frm == null || frm === undefined) return null;
	var field = frm.findField(fieldName);
	if (field == null) {
		return null;
	}
	if (fieldValue === undefined) {
		if (field.getXType() == 'radio') {
			return field.getGroupValue();
		}
		return field.getValue();
	} else {
		field.setValue(fieldValue);
	}
	return "";
};
/**
 * 转换日期，将长数值的日期串转换为常规格式
 */
HY.parseDate = function(datestr) {
	if (HY.isEmpty(datestr)) return null;
	if (typeof datestr == "object") return datestr;
	var val = datestr.toString();
	var dt = null;
	if (/^\d+$/.test(val)) {
		dt = new Date(parseInt(val));
	} else if (val.length <= 10) {
		dt = Date.parseDate(val, 'Y-m-d');
	} else {
		dt = Date.parseDate(val, 'Y-m-d H:i:s');
	}
	return dt;
};
/**
 * 返回两个日期之间日数差
 * @param {Date} date1
 * @param {Date} date2
 */
HY.DateDiff = function(date1 ,date2) {
	var ms = date1.getTime() - date2.getTime();
	return parseInt(ms/(24*3600*1000));
};
/**
 * 判断值是否为空
 * @param {Object} val
 */
HY.isEmpty = function(val) {
	if (val === undefined || val == null) return true;
	if (typeof val == 'object' || typeof val == 'function') return false;
	var t = val.toString();
	if (t.trim().length == 0) return true;
	return false;
};
/**
 * 判断是否函数
 */
HY.isFn = function(obj) {
	if (HY.isEmpty(obj)) return false;
	if (typeof obj == 'function') return true;
	return false;
};
/**
 * 检查指定值是否整数
 */
HY.isNumber = function(val) {
	if (val === undefined || val == null) return false;
	return /^-?[0-9]+$/.test(val.toString());
};
/**
 * 正则表达式左匹配字符串。
 */
HY.isMatch = function(str, qry) {
	if (HY.isEmpty(str) || HY.isEmpty(qry)) return false;
	var reg = null;
	eval("reg = new RegExp(/^" + qry.toString().toUpperCase() + "/);");
	if (reg != null) {
		return reg.test(str.toString().toUpperCase());
	}
	return false;
};
/**
 * 扩展基础类 判断以什么结尾
 */
String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
/**
 * 扩展基础类 得到字符串的长度，包括中文和英文
 */
String.prototype.charlen = function () {
    var arr = this.match(/[^\x00-\xff]/ig);
    return this.length + (arr == null ? 0 : arr.length);
};
/**
 * 扩展基础类 字符串首尾去空格
 */
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};
/**
 * 扩展基础类 字符串包含字符串判断
 */
String.prototype.contains = function (sub) {
    return this.indexOf(sub) != -1;
};
/**
 * 扩展基础类 字符串首尾去字母
 */
String.prototype.trimA = function () {
    return this.replace(/(^[A-Za-z]*)|([A-Za-z]*$)/g, "");
};

/**
 * Ajax异步请求
 */
HY.AjaxRequest = function (settings) {
	var params  = (settings.params === undefined)  ? {}    : settings.params, 
		showWat = (settings.showWat === undefined) ? false : settings.showWat,
		showMsg = (settings.showMsg === undefined) ? false : settings.showMsg,
		showErr = (settings.showErr === undefined) ? true  : settings.showErr,
		timeout = (settings.timeout === undefined) ? 60 * 1000 : settings.timeout,
		url     = settings.url,
		waiting = null;
	if (showWat) {
		waiting = Ext.Msg.wait('正在处理中，请稍侯......', '', '');
	}
	Ext.Ajax.request({
		url: url,
		params: params,
		timeout: timeout,
		success: function (response, options) {
			var sessionStatus = response.getResponseHeader("session-status");
			if (sessionStatus == "timeout") {
				Ext.Msg.alert(HY.defTitle, '<span style="color:red"><b>登录已失效，请重新登录。</b></span>', function () {
					HY.showLoginWindow();
				});
				return false;
			}
			if (waiting != null) { waiting.hide(); }
			var json = Ext.decode(response.responseText);
			if (json.success == true) {
				if (showMsg == true) {
					var successMsg = '操作成功';
					if (json.msg && json.msg != '') {
						successMsg = json.msg;
					} else if (settings.successMsg && settings.successMsg != '') {
						successMsg = settings.successMsg;
					}
					Ext.Msg.alert(HY.defTitle, successMsg, function () {
						if (settings.callback) {
							settings.callback(json.obj);
						}
					});
				} else {
					if (HY.isFn(settings.callback)) { // 回调方法
						settings.callback(json.obj);
					}
				}
			} else if (json.success == false) {
				if (showErr == true) { // 显示异常提示信息
					var message = '出错了';
					if (json.msg && json.msg != '') { // 后台设定的业务消息
						message = json.msg;
					} else if (settings.failureMsg && settings.failureMsg != '') { // 前台指定的错误信息
						message = settings.failureMsg;
					}
	                if (json.exceptionMessage && json.exceptionMessage != '') { // 有异常信息
	                	HY.ExWindow(message, json.exceptionMessage);
	                } else {
	                	Ext.Msg.alert(HY.defTitle, message, function () {
	                		if(HY.isFn(settings.falseFn)){//失败后想做的个性化操作函数
	                			settings.falseFn(json);
	                		}
	                	});
					}
				} else {
					if (HY.isFn(settings.falseFn)) { // 回调方法
						settings.falseFn(json);
					}
				}
            } else if (HY.isFn(response.getResponseHeader)) {
                var sessionStatus = response.getResponseHeader("session-status");
                if (sessionStatus == "timeout") { // timeout
                    Ext.Msg.alert(HY.defTitle, '<span style="color:red"><b>登录已失效，请重新登录。</b></span>', function () {
                    	HY.showLoginWindow();
                    });
                    return false;
                }
                if (settings.callback) { // 回调方法
                    settings.callback(json);
                }
            }
        },
        failure: function (response, options) {
            if (waiting != null) {
                waiting.hide();
            }
            HY.ExWindow(response.status + ' ' + response.statusText, response.responseText);
        }
    });
};

/**
 * 异步提取HTML结果
 */
HY.AjaxGetHtml = function (settings) {
	// 参数对象
	var params 	 = (settings.params === undefined) ? {} : settings.params, 
		showWat  = (settings.showWat === undefined) ? true : settings.showWat,
		trimBody = (settings.trimBody === undefined) ? true : settings.trimBody,
		timeout  = (settings.timeout === undefined) ? 60 * 1000 : settings.timeout,
		url      = settings.url,
     	waiting = null;
	if (showWat) {
		waiting = Ext.Msg.wait('正在处理中，请稍候......', '', '');
	}
	Ext.Ajax.request({
		url: url,
		params: params,
		timeout: timeout,
		success: function (response, options) {
			if (waiting != null) { waiting.hide(); }
			var rst = response.responseText;
			if (trimBody) {
				var tg1 = '<body>', tg2 = '</body>';
				var inx1 = rst.indexOf(tg1);
				var inx2 = rst.lastIndexOf(tg2);
				if (inx1 > -1 && inx2 > -1) {
					rst = rst.substring(inx1 + tg1.length + 1, inx2).trim();
				}
			}
			if (settings.callback) { // 回调方法
				settings.callback(rst);
			}
        },
        failure: function (response, options) {
            if (waiting != null) {
                waiting.hide();
            }
            HY.ExWindow(response.status + ' ' + response.statusText, response.responseText);
        }
    });
};

/**
 * 显示异常信息的窗口
 * 
 * @param message 异常信息
 * @param exceptionMsg 异常详细信息
 */
HY.ExWindow = function (message, exceptionMessage) {
    var _message = (message === undefined || message == '') ? '请查看详细信息' : message,
     _exmsg = (exceptionMessage === undefined || exceptionMessage == '') ? '出错了' : exceptionMessage,
     _exwin = Ext.getCmp('_exWindow');
    if (!_exwin) {
        _exwin = new Ext.Window({
            id: '_exWindow',
            title: HY.defTitle,
            width: 400, y: 10,
            autoHeight: true,
            maximizable: true,
            modal: true,
            layout: 'fit',
            items: [new Ext.form.Label({
                html: '<div style="padding:5px;">' + _message + '</div>'
            }), new Ext.Panel({
                title: '详细信息',
                id: '_exWindow_detail',
                collapsible: true,
                collapsed: true,
                autoScroll: true,
                frame: false,
                border: false,
                height: 360,
                html: '<div style="padding: 6px;">' + _exmsg + '</div>',
            })]
        }).show();
    } else {
        _exwin.show();
    }
};
/**
 * 数据预览窗口
 * @param {Object} datas 数据对象
 * @param {String} xtpl 模板代码
 */
HY.DataViewWindow = function(datas, xtpl) {
	var _dvw = Ext.getCmp('_dataViewWindow');
	if (!_dvw) {
		_dvw = new Ext.Window({
			id: '_dataViewWindow',
			title: '数据详情',
			iconCls: 'icon-bar-preview',
			modal: true,
			height: 280,
			width: 420,
			layout: 'border',
			items: [
				new Ext.Panel({
					id: '_dataViewWindow_dtl',
					frame: false,
					border: false,
					region: 'center',
					autoScroll: true
				})
			]
		}).show();
	} else {
		_dvw.show();
	}
	var _dtl = Ext.getCmp('_dataViewWindow_dtl');
	if (_dtl) {
		xtpl.overwrite(_dtl.body, datas);
	} else {
		_dvw.close();
	}
};

/**
 * 对相对于应用系统根路径的URL添加相应的数值
 */
HY.parseURL = function(url) {
	var _url = encodeURI (encodeURI(url));
	if (_url.substring(0,7) == 'http://') {
	} else if (_url.substring(0,4) == 'www.') {
		_url = 'http://' + _url;
	} else if (_url.substring(0,1) == '/') {
		if (_url.indexOf(ctx) < 0) {
			_url = ctx + _url;
		}
	} else {
		if (_url.indexOf(ctx) < 0) {
			_url = ctx + '/' + _url;
		}
	}
	return _url;
};

/**
 * 在新的窗口打开
 */
HY.openWin = function (url, text, configs) {
	var featurse = '';
	if (configs !== undefined && configs != null) {
		featurse = configs;
	}
	window.open(url, text, featurse);
};
/**
 * 在新的Tab打开
 */
HY.openTab = function (node, url, parentTab, iconCls) {
	var id = node.id;
	var title = node.text;
	var tabPanel = (parentTab === undefined) ? appView.mainPanel : parentTab;
	var css = (iconCls === undefined) ? node.attributes.iconCls : iconCls;
	if (!(tabPanel) || title === "" || url === "" || id === "") {
		return;
	}
	var _url = HY.parseURL(url);
	var tab = tabPanel.get(id);
	if (!tab || tab === undefined) {
		var newTab = {
			id: id,
			title: title,
			iconCls: css,
			closable: true,
			autoScroll: false,
			html: '<iframe width="100%" name="ifm' + id + '" height="100%" frameborder="0" src="' + _url + '"></iframe>'
		};
		tabPanel.add(newTab);
		//限制标签窗口数
		if (tabPanel.items.length > 13) {
			var xtab = tabPanel.get(tabPanel.items.items[1]);
			if (xtab) {
				tabPanel.remove(xtab);
			}
		}
		tab = tabPanel.get(id);
	}
	tabPanel.setActiveTab(tab);
};

/**
 * 在主窗口Tab中打开URL
 * @param id Tab的ID
 * @param text Tab显示的文本
 * @param url 打开的URL
 * @param configs 其他配置信息
 * @return {}
 */
HY.openInMain = function (_id, _text, _url, configs) {
	if (_id === undefined || _id === '' || _text === undefined  || _text === '' || _url === undefined || _url === '') {
		Ext.Msg.alert(HY.defTitle, '参数无效');
		return false;
	}
	var node = new Ext.tree.TreeNode({id: _id, text: _text});
	var url = HY.parseURL(_url);;
	var cls = HY.isEmpty(configs.iconCls) ? "" : configs.iconCls;
	node.setIconCls(cls);
	var parentTab, mainWin;
	var deep = 4;
	try {
		do {
			mainWin = window.parent;
			deep --;
		} while (!((mainWin && mainWin.appView) || deep == 0));
	} catch (e) {
		deep = 0;
	}
	if (deep <= 0) {
		//无法找到指定的主窗口
		window.open(url, "_blank","");
		return;
	}
	parentTab = mainWin.appView.mainPanel;
	HY.openTab (node, url, parentTab, cls);
	//URL有变化时，刷新
	var oifms = mainWin.document.getElementsByTagName("iframe");
	if (oifms != null && oifms !== undefined) {
		var oifm = null;
		for (var i = 0; i < oifms.length; i = i + 1) {
			if (oifms[i].name == 'ifm' + _id) {
				oifm = oifms[i];
				break;
			}
		}
		if (oifm != null) {
			if (oifm.src.indexOf(url) == -1) {
				oifm.src = HY.parseURL(url);
				oifm.reload();
			}
		}
	}
};

/**
 * 登录窗口
 */
HY.LoginWindow = Ext.extend(Ext.Window, {
	title: '',
	modal: true,
	width: 360,
	height: 225,
	layout: 'absolute',
	closable: false,
	draggable: false,
	resizable: false,
	shadow: false,
	border: true,
	formPanel: null,
	formFields: null,
	actionLogin: null,
	actionCancel: null,
	initComponent: function() {
		var me = this;
		me.actionLogin = new Ext.Action({text: HY.ls('9450', '登录'), iconCls: 'tbar-login', handler: me.doLogin, scope: me});
		me.actionCancel = new Ext.Action({text: HY.ls('1957', '取消'), iconCls: 'tbar-cancel', handler: me.doCancel, scope: me});
		me.formPanel = new Ext.form.FormPanel({
			height: 208,
			border: false,
			bodyStyle: 'padding: 12px 5px 5px 5px',
			items: [
				{
					width: 335,
					layout: 'form',
					border: false,
					items: [
						{
							border: false,
							height: 26,
							bodyStyle: 'text-align: center; font-size: 12pt; color: #2E86C1; line-height: 22px; margin-bottom: 3px;',
							html: HY.ls('9466', '用户名密码登录')
						},
						new Ext.form.RadioGroup({
							items: [{
								boxLabel:  HY.ls('9464', '会员用户'),
								inputValue: "10",
								name: "utype",
								checked: true
							},{
								boxLabel: HY.ls('9463', '员工用户'),
								inputValue: "20",
								name: "utype",
								checked: false
							}]
						}),
						{
							xtype: 'textfield',
							name: 'uid',
							id: 'login.uid',
							width: 210,
							allowBlank: false,
							blankText: '用户名不能为空',
							emptyText: HY.ls('9465', '用户名'),
							fieldLabel: HY.ls('9465', '用户名')
						},
						{
							xtype: 'textfield',
							name: 'psw',
							id: 'login.psw',
							width: 210,
							allowBlank: false,
							blankText: HY.ls('1386', '密码不能为空，请正确输入'),
							inputType: 'password',
							fieldLabel: HY.ls('1002', '密码')
						},
						{
							border: false,
							items: [
								{
									layout: 'table',
									border: false,
									items: [
										{
											layout: 'form',
											width: 170,
											border: false,
											items: [
												{
													name: 'vcode',
													id: 'login.vcode',
													xtype: 'textfield',
													regex: /^[0-9A-Za-z]{4}$/,
													regexText: '图片不清楚？点击更换',
													width: 60,
													allowBlank: false,
													blankText: '验证码不能为空',
													emptyText: '验证码',
													fieldLabel: "验证码",
													labelWidth : 20,
													listeners: {
														'change': function(e) {
															var vcode = Ext.getCmp("login.vcode").getValue();
															if (vcode.length == 4) {
																HY.AjaxRequest({
																	url: ctx + '/login/chkvcode.do',
																	params: {vcode: vcode},
																	showMsg: false,
																	showErr: false,
																	showWat: false,
																	callback: function(result) {
																		Ext.get("vcodechk").addClass("imgbg_ok");
																		Ext.get("vcodechk").removeClass("imgbg_err");
																	},
																	falseFn: function() {
																		Ext.get("vcodechk").removeClass("imgbg_ok");
																		Ext.get("vcodechk").addClass("imgbg_err");
																	}
																});
															}
														}
													}
												}
											]
										},
										{
											border: false,
											html: '<img id="vcodeimg" src="' + ctx + '/login/createvc.do?v=202103.1" border="0" width="80" height="24" onclick="HY.resetVcode();" title="点击刷新"/>'
										},
										{
											border: false,
											html: '<div id="vcodechk" style="width: 20px; height: 20px;">&nbsp;</div>&nbsp;'
										}
									]
								}
							]
						},
						{
							border: false,
							height: 18,
							bodyStyle: 'text-align: right; font-size: 9pt; color: #4A4B4B;',
							html: '<a href="' + ctx + '/main/forgetpwd.do" target="_blank" style="color: #37474F;">'+HY.ls('9467', '忘记密码')+'</a>'
						}
					]
				}
			],
			bbar: ['->', me.actionLogin, '-', me.actionCancel]
		});
		me.items = [me.formPanel];
		me.keys = [
			{
				key: [10, 13],
				fn: function() {
					if (!me.formPanel.getForm().isValid()) return;
					me.doLogin();
				}
			}
		];
		HY.LoginWindow.superclass.initComponent.call(me);
	},
	doLogin: function() {
		var me = this;
		if (!me.formPanel.getForm().isValid()) {
			return;
		}
		var u0 = HY.getCookie('uid');//curuid;
		var u1 = HY.fv(me.formPanel.getForm(), 'uid');
		var isChanged = (HY.isEmpty(u0)) ? true : !(u0.toLowerCase() == u1.toLowerCase());
		var url = ctx + "/logincs.do";
		if (HY.fv(me.formPanel.getForm(), 'utype') == '20') {
			url = ctx + "/login.do";
		}
		HY.AjaxRequest({
			url: url,
			showMsg: false,
			showWat: true,
			params: me.formPanel.getForm().getValues(),
			callback: function(result) {
				HY.setCookie("uid", HY.fv(me.formPanel.getForm(), 'uid'));
				var cururi = HY.topWin().location.href;
				if (isChanged || cururi.indexOf(ctx + "/index") == -1) {
					HY.topWin().location.href = ctx + "/index.do";
				} else {
					me.close();
				}
			},
			falseFn: function(retobj) {
				var k = retobj.msgkey;
				if ("NEEDVCODE" == k) {
					var vc = Ext.getDom("vcodeimg");
					vc.style.visibility = 'visible';
					Ext.getCmp('login.vcode').allowBlank = false;
					Ext.getCmp('login.vcode').show();
				}
				HY.resetVcode();
			}
		});
	},
	doCancel: function() {
		var me = this;
		me.close();
	},
	doFocus: function() {
		//var me = this;
		//me.formPanel.getForm().findField('uid').focus(true, 15000);
	},
	initEvents: function() {
		var me = this;
		HY.LoginWindow.superclass.initEvents.call(me);
		me.keyMap = new Ext.KeyMap (me.el, [
			{
				key: [10, 13],
				fn: me.doLogin()
			}
		]);
	}
});
HY.resetVcode = function() {
	var vc = Ext.getDom("vcodeimg");
	vc.src.replace('#vcodeimg', '');
	vc.src = vc.src + '#vc_img';
	Ext.get("vcodechk").removeClass("imgbg_ok");
	Ext.get("vcodechk").removeClass("imgbg_err");
};
HY.showLoginWindow = function() {
	var loginWin = new HY.LoginWindow({
		modal: true
	});
	loginWin.show('', function(){
		var vc = Ext.getDom("vcodeimg");
		vc.style.visibility = 'hidden';
		Ext.getCmp('login.vcode').allowBlank = true;
		Ext.getCmp('login.vcode').hide();
		loginWin.formPanel.getForm().clearInvalid();
	});
};
HY.checkCntnoCode = function(strCode, callback) {
	var Charcode = "0123456789A?BCDEFGHIJK?LMNOPQRSTU?VWXYZ";
	if (strCode.length != 11) return false;
	var result = true;
	var num = 0;
	for (var i = 0; i < 10; i++) {
		var idx = Charcode.indexOf(strCode[i]);
		if (idx == -1 || Charcode[idx] == '?') {
			result = false;
			break;
		}
		idx = idx * Math.pow(2, i);
		num += idx;
	}
	num = (num % 11) % 10;
	var isValid = (parseInt(strCode[10]) == num);
	if (callback && typeof callback == 'function') {
		return callback(isValid, num);
	}
	return isValid;
};

HY.fireBeat = function() {
	var url = ctx + '/main/curtime.do';
	HY.AjaxRequest({url: url, showMsg: false, callback: function(datobj){
		
	}});
};

/**
 * 获取多语言值
 * @lsid 多语言ID，一般以前缀加数字方式（如：HY.ls('ls1957', '取消') ），也兼容纯数字的简写（如：HY.ls('1957', '取消') ）。
 */
HY.ls = function(lsid, defVal) {
	if (HY.isEmpty(lsid) || lsa === undefined || lsa == null) return defVal;
	var lskey = isNaN(lsid) ? lsid : 'ls' + lsid;
	var curVal = lsa[lskey];
	if (HY.isEmpty(curVal)) return defVal;
	
	return curVal;
}