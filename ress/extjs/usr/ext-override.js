/*!
 * Override for Extjs
 * Required HY namespace
 */
/**
 * 请求完成
 */
Ext.Ajax.on('requestcomplete', function (conn, response, options) {
	if (typeof response.getResponseHeader == "function") {
		var _time;
		var sessionStatus = response.getResponseHeader("session-status");
		if (sessionStatus == "timeout") {
			Ext.Msg.alert(HY.defTitle, '<span style="color:red"><b>登录已失效，请重新登录。</b></span>', function () {
	            HY.showLoginWindow();
			});
			return false;
		}
		else if (sessionStatus == "exception") { // Exception
			var msg = response.responseText;
			var needlg = false;
			try {
				var obj = Ext.decode(msg);
				if (obj.msg !== undefined) {
					msg = obj.msg;
					if (obj.msgkey && obj.msgkey == 'UNKUSER') {
						needlg = true;
					}
				}
			} catch (e) {
				
			}
			Ext.Msg.alert(HY.defTitle, msg, function () {
				if (needlg === true) {
					HY.showLoginWindow();
				}
			});
			return false;
		}
	}
}, this);

/**
 * 处理请求异常
 */
Ext.Ajax.on('requestexception', function (conn, response, options) {
	if (typeof response.getResponseHeader == "function") {
		HY.ExWindow('', response.responseText);
	}
}, this);

/**
 * 屏蔽退格键（BACKSPACE）
 */
Ext.EventManager.on(Ext.isIE ? document : window, 'keydown', function (e, i) {
	var t = e.target.tagName;
	if (e.getKey() == e.BACKSPACE && t !== "INPUT" && t !== "TEXTAREA") {
		e.stopEvent();
	} else if (e.getKey() == e.BACKSPACE && (i.disabled || i.readOnly)) {
		e.stopEvent();
	}
});

//正则表达式扩展
if('function' !== typeof RegExp.escape){
	RegExp.escape = function(s){
		if ('string' !== typeof s) return s;
		return s.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
	}
};

/**
 * 密码输入一致性校验
 * vtype : "password" //自定义的验证类型
 * vtypeText : "两次输入的密码不一致！" //验证不通过时提示消息
 * confirmTo : "password" //要比较的另外一个的组件的id
 */
Ext.apply(Ext.form.VTypes, {
	// 密码框比对，val指这里的文本框值，field指这个文本框组件
	password: function (val, field) {
		// confirmTo是我们自定义的配置参数，一般用来保存另外的组件的id值
		if (field.confirmTo) {
			var pwd = Ext.getCmp(field.confirmTo); // 取得confirmTo的那个id的值
			return (val == pwd.getValue());
		}
		return true;
	},
	passwordText: '两次输入的密码不一致',
	// -- 非空-排除空格
	notBlank: function (val) {
		return (val.trim().length > 0);
	},
	notBlankText: '不能为空!',
	//电话号码验证
	telNum: function(val) {
		var el = /^(\d{3,4}-)?\d{7,8}$/;
		return el.test(val);
	},
	telNumText: '电话号码格式错误！',
	//邮箱验证
	email: function(val){
		var el = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		return el.test(val);
	},
	emailText: '请正确填写邮箱！'
	
});

/**
* 日期限制
 * inspectionscheme.startTime = new Ext.form.DateField({ id : 'startTime', name :
 * 'startTime', width : 85, value : new Date().getFirstDateOfMonth(), format :
 * 'Y-m-d', vtype : 'daterange', endDateField : 'endTime' });
 * inspectionscheme.endTime = new Ext.form.DateField({ id : 'endTime', name :
 * 'endTime', width : 85, value : new Date(), format : 'Y-m-d',
 * vtype : 'daterange', startDateField : 'startTime' });
 * var s = inspectionscheme.startTime;
 * var e = inspectionscheme.endTime;
 * var st = s.formatDate(s.getValue());
 * var et = e.formatDate(e.getValue());
 * st = st.length > 0 ? st + " 00:00:00" : ""; et = et.length > 0 ? et + " 23:59:59" : * "";
 */
Ext.apply(Ext.form.VTypes, {
    daterange: function (val, field) {
        var date = field.parseDate(val);
        if (!date) {
            return false;
        }
        if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
            var start = Ext.getCmp(field.startDateField);
            start.setMaxValue(date);
            this.dateRangeMax = date;
            start.validate();
        } else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
            var end = Ext.getCmp(field.endDateField);
            end.setMinValue(date);
            this.dateRangeMin = date;
            end.validate();
        }
        return true;
    }
});

/**
 * TextField必填提示
 */
Ext.override(Ext.form.TextField, {
    initComponent: Ext.form.TextField.prototype.initComponent.createInterceptor(function () {
        if (this.allowBlank === false) {
        	if (this.fieldLabel) {
        		this.fieldLabel += " <span class='label-required'>&nbsp;</span>";
        	} else {
        		this.cls += " textfield-required";
        	}
		}
		if (!this.labelSeparator) {
			this.labelSeparator = "";
		}
		if (this.label) {
			this.label.addClass ("label-required");
		}
		if (this.readOnly == true) {
			this.cls += " textfield-readonly";
		}
    })
});

Ext.override(Ext.form.ComboBox, {
    initComponent: Ext.form.ComboBox.prototype.initComponent.createInterceptor(function () {
		if (this.readOnly == true) {
			this.cls += " textfield-readonly";
		}
		if (!Ext.isDefined(this.valueNotFoundText) && this.forceSelection === true ) {
			this.valueNotFoundText = '';
		}
    })
});

/** 必填提示 */
Ext.override(Ext.form.RadioGroup, {
    initComponent: Ext.form.RadioGroup.prototype.initComponent.createInterceptor(function () {
        if (this.allowBlank === false && this.fieldLabel) {
            this.fieldLabel = '<font color=red>*</font>' + this.fieldLabel;
        }
    })
}); 

/** 必填提示 */
Ext.override(Ext.form.CheckboxGroup, {
    initComponent: Ext.form.CheckboxGroup.prototype.initComponent.createInterceptor(function () {
        if (this.allowBlank === false && this.fieldLabel) {
            this.fieldLabel = '<font color=red>*</font>' + this.fieldLabel;
        }
    })
});

/**
 * 重写Ext.form.TextField的字符串长度验证 一个中文算2个字符长度 适用于Extjs 3.3
 */
Ext.override(Ext.form.TextField, {
    _CheckLength: function (strTemp) {
        var i, sum;
        sum = 0;
        for (i = 0; i < strTemp.length; i++) {
            if ((strTemp.charCodeAt(i) >= 0) && (strTemp.charCodeAt(i) <= 255)) sum = sum + 1;
            else sum = sum + 2;
        }
        return sum;
    },
    getErrors: function (value) {
        var errors = Ext.form.TextField.superclass.getErrors.apply(this, arguments);
        value = Ext.isDefined(value) ? value : this.processValue(this.getRawValue());
        if (Ext.isFunction(this.validator)) {
            var msg = this.validator(value);
            if (msg !== true) {
                errors.push(msg);
            }
        }
        if (value.length < 1 || value === this.emptyText) {
            if (this.allowBlank) {
                // if value is blank and allowBlank is true, there
                // cannot be any additional errors
                return errors;
            } else {
                errors.push(this.blankText);
            }
        }
        if (!this.allowBlank && (value.length < 1 || value === this.emptyText)) {
            // if it's blank
            errors.push(this.blankText);
        }
        var valueLength = this._CheckLength(value);
        if (valueLength < this.minLength) {
            errors.push(String.format(this.minLengthText + ', 实际输入长度 ' + valueLength, this.minLength));
        }
        if (valueLength > this.maxLength) {
            errors.push(String.format(this.maxLengthText + ', 实际输入长度 ' + valueLength, this.maxLength));
        }
        if (this.vtype) {
            var vt = Ext.form.VTypes;
            if (!vt[this.vtype](value, this)) {
                errors.push(this.vtypeText || vt[this.vtype + 'Text']);
            }
        }
        if (this.regex && !this.regex.test(value)) {
            errors.push(this.regexText);
        }
        return errors;
    }
});

/**
 * 多选框
 */
Ext.override(Ext.grid.CheckboxSelectionModel, {
    onMouseDown: function (e, t) {
        if (e.button === 0 && t.className == 'x-grid3-row-checker') {
            e.stopEvent();
            var row = e.getTarget('.x-grid3-row');
            // mouseHandled flag check for a duplicate selection
            // (handleMouseDown) call
            if (!this.mouseHandled && row) {
                // alert(this.grid.store.getCount());
                var gridEl = this.grid.getEl(); // 得到表格的EL对象
                var hd = gridEl.select('div.x-grid3-hd-checker'); // 得到表格头部的全选CheckBox框
                var index = row.rowIndex;
                if (this.isSelected(index)) {
                    this.deselectRow(index);
                    var isChecked = hd.hasClass('x-grid3-hd-checker-on');
                    // 判断头部的全选CheckBox框是否选中，如果是，则删除
                    if (isChecked) {
                        hd.removeClass('x-grid3-hd-checker-on');
                    }
                } else {
                    this.selectRow(index, true);
                    // 判断选中当前行时，是否所有的行都已经选中，如果是，则把头部的全选CheckBox框选中
                    if (gridEl.select('div.x-grid3-row-selected').elements.length == gridEl.select('div.x-grid3-row').elements.length) {
                        hd.addClass('x-grid3-hd-checker-on');
                    };
                }
            }
        }
        this.mouseHandled = false;
    },
    onHdMouseDown: function (e, t) {
        /**
         * 大家觉得上面重写的代码应该已经实现了这个功能了，可是又发现下面这行也重写了
         * 由原来的t.className修改为t.className.split(' ')[0]
         * 为什么呢？这个是我在快速点击头部全选CheckBox时，
         * 操作过程发现，有的时候x-grid3-hd-checker-on这个样式还没有删除或者多一个空格，结果导致下面这个判断不成立
         * 去全选或者全选不能实现
         */
        if (t.className.split(' ')[0] == 'x-grid3-hd-checker') {
            e.stopEvent();
            var hd = Ext.fly(t.parentNode);
            var isChecked = hd.hasClass('x-grid3-hd-checker-on');
            if (isChecked) {
                hd.removeClass('x-grid3-hd-checker-on');
                this.clearSelections();
            } else {
                hd.addClass('x-grid3-hd-checker-on');
                this.selectAll();
            }
        }
    },
    handleMouseDown: function (g, rowIndex, e) {
        if (e.button !== 0 || this.isLocked()) {
            return;
        }
        var view = this.grid.getView();
        if (e.shiftKey && !this.singleSelect && this.last !== false) {
            var last = this.last;
            this.selectRange(last, rowIndex, e.ctrlKey);
            this.last = last; // reset the last
            view.focusRow(rowIndex);
        } else {
            var gridEl = this.grid.getEl(); // 得到表格的EL对象
            var hd = gridEl.select('div.x-grid3-hd-checker'); // 得到表格头部的全选CheckBox框
            var isSelected = this.isSelected(rowIndex);
            if (isSelected) {
                this.deselectRow(rowIndex);
                var isChecked = hd.hasClass('x-grid3-hd-checker-on');
                // 判断头部的全选CheckBox框是否选中，如果是，则删除
                if (isChecked) {
                    hd.removeClass('x-grid3-hd-checker-on');
                }
            } else if (!isSelected || this.getCount() > 1) {
                this.selectRow(rowIndex, true);
                // 判断选中当前行时，是否所有的行都已经选中，如果是，则把头部的全选CheckBox框选中
                if (gridEl.select('div.x-grid3-row-selected').elements.length == gridEl.select('div.x-grid3-row').elements.length) {
                    hd.addClass('x-grid3-hd-checker-on');
                };
                view.focusRow(rowIndex);
            }
        }
    }
});

/**
 * 重写日期字段格式
 */
Ext.override(Ext.form.DateField, {
    initComponent: Ext.form.DateField.prototype.initComponent.createInterceptor(function () {
        if (this.format == 'datetime') {
        	this.format = "Y/m/d H:i";
        } else {
        	this.format = "Y/m/d";
        }
    })
    ,onTriggerClick: function() {
    	if(this.disabled){
            return;
        }
        if(this.menu == null){
            this.menu = new Ext.menu.DateMenu({
                hideOnClick: false,
                focusOnSelect: false
            });
        }
        this.onFocus();
        Ext.apply(this.menu.picker,  {
            minDate : this.minValue,
            maxDate : this.maxValue,
            disabledDatesRE : this.disabledDatesRE,
            disabledDatesText : this.disabledDatesText,
            disabledDays : this.disabledDays,
            disabledDaysText : this.disabledDaysText,
            format : this.format,
            showToday : this.showToday,
            startDay: this.startDay,
            minText : String.format(this.minText, this.formatDate(this.minValue)),
            maxText : String.format(this.maxText, this.formatDate(this.maxValue))
        });
        //控制时间显示面板显示最小时间值，便于选择操作
        this.menu.picker.setValue(this.getValue() || this.minValue || new Date());
        this.menu.show(this.el, "tl-bl?");
        this.menuEvents('on');
    }
});

/**
 * 日历控件
 */
if(Ext.ux.BaseTimePicker){
	Ext.apply(Ext.ux.BaseTimePicker.prototype, {
		hoursLabel: '时'
		,minsLabel: '分'
		,nowText: '现在'
		,doneText: '完成'
	});
}
if(Ext.ux.DateTimePicker){
	Ext.apply(Ext.ux.DateTimePicker.prototype, {
		timeLabel: '时间'
		,changeTimeText: '更改'
		,doneText: '完成'
	});
}
if(Ext.DatePicker){
	Ext.apply(Ext.DatePicker.prototype, {
		todayText: '今天'
		,monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
		,dayNames: ['日','一','二','三','四','五','六']
		,okText: '确认'
		,cancelText: '取消'
	});
}
Ext.apply(Date ,{
	monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
	,dayNames: ['日','一','二','三','四','五','六']
});

Ext.override(Ext.menu.Menu, { autoWidth : function(){ var el = this.el, ul = this.ul; if(!el){ return; } var w = this.width; if(w){ el.setWidth(w); }else if(Ext.isIE && !Ext.isIE8){ el.setWidth(this.minWidth); var t = el.dom.offsetWidth;  el.setWidth(ul.getWidth()+el.getFrameWidth("lr")); } } });

/**
 * 处理谷歌浏览器列表宽度问题
 */
Ext.override(Ext.grid.GridView, {
	cellTpl: new Ext.Template(
		'<td class="x-grid3-col x-grid3-cell x-grid3-td-{id} x-selectable {css}" style="{style}" tabIndex="0" {cellAttr}>'
		,'<div class="x-grid3-cell-inner x-grid3-col-{id}" {attr}>{value}</div>'
		,'</td>'
	)
	,getColumnStyle: function(colIndex, isHeader) {
		var colModel = this.cm,
			colConfig = colModel.config,
			style = isHeader ? '' : colConfig[colIndex].css || '',
			align = colConfig[colIndex].align;
			
		if (Ext.isChrome) {
			style += String.format("width:{0};", (parseInt(this.getColumnWidth(colIndex)) - 2) + 'px');
		} else {
			style += String.format("width:{0};", this.getColumnWidth(colIndex));
		}
		if (colModel.isHidden(colIndex)) {
			style += 'display: none;';
		}
		if (align) {
			style += String.format("text-align:{0}", align);
		}
		return style;
	}
});