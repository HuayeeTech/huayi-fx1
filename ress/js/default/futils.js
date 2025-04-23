HyUtils = {
	// 后台请求数据
	post: function (uri, data, callback, errback){
		var loadid = xtip.load();
		$.post(_g_ctx + uri,
			data,
			function(datret, status) {
				xtip.close(loadid);
				if (datret.success === true) {
					if (callback && typeof callback == 'function') {
						callback (datret.obj);
					} else {
						toastr.info('操作成功');
					}
				} else {
					// 如需要自行处理失败情况，可设置回调方法
					if (errback && typeof errback == 'function') {
						errback(datret);
					} else {
						toastr.error(datret.msg);	
					}
				}
			}
		);
	},
	
	// 格式化模板
	formatTemplate: function (data, tpl) {
		var format = {
			name: function(x) {
				return x;
			}
		};
		return tpl.replace(/{(\w+)}/g, function(m1, m2) {
			if (!m2)
				return "";
			return (format && format[m2]) ? format[m2](data[m2]) : (data[m2] ? data[m2] : "");
		});
	},
	// 格式化日期
	getFormatDate: function (dateval, format) {
		if (this.isEmpty(dateval)) return "";
		try {
			var format = format || 'yyyy-MM-dd HH:mm:ss';
			var date = (dateval instanceof Date) ? dateval : new Date(dateval);
			var lang = {
				'M+': date.getMonth() + 1,
				'd+': date.getDate(),
				'H+': date.getHours(),
				'm+': date.getMinutes(),
				's+': date.getSeconds()
			};
			if (/(y+)/.test(format)) {
				format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
			}
			for (var key in lang) {
				if (new RegExp('(' + key + ')').test(format)) {
					format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? lang[key] : ('00' + lang[key]).substr(('' + lang[key]).length));
				}
			}
			return format;
		} catch (e) {
			return '-';
		}
	},
	// 判断是否为空
	isEmpty: function(val) {
		if (val === undefined || val == null) return true;
		if (typeof val == 'object' || typeof val == 'function') return false;
		var t = val.toString();
		if (t.trim().length == 0) return true;
		return false;
	},
	// 判断是否函数类型
	isFn: function(obj) {
		if (this.isEmpty(obj)) return false;
		if (typeof obj == 'function') return true;
		return false;
	},
	// 检查是否整数
	isNumber: function(val) {
		if (this.isEmpty(val)) return false;
		return /^-?[0-9]+$/.test(val.toString());
	},
	// 检查是否正浮点数
	isNumeric: function(val) {
		if (this.isEmpty(val)) return false;
		return /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/.test(val.toString());
	},
	// 正则表达式左匹配字符串
	isMatch: function(str, qry) {
		if (this.isEmpty(str) || this.isEmpty(qry)) return false;
		var reg = null;
		eval("reg = new RegExp(/^" + qry.toString().toUpperCase() + "/);");
		if (reg != null) {
			return reg.test(str.toString().toUpperCase());
		}
		return false;
	},
	// 填充表单
	fillForm: function(domId, obj) {
		for (var property in obj) {
			if (obj.hasOwnProperty(property) == true) {
				if ($('#' + domId + ' [name="' + property + '"]').size() > 0) {
					$('#' + domId + ' [name="' + property + '"]').each(function() {
						var dom = this;
						if ($(dom).attr("type") == 'radio') {
							$(dom).filter('[value="' + obj[property] + '"]').attr("checked", true);
						}
						if ($(dom).attr("type") == 'checkbox') {
							obj[property] == true ? $(dom).attr("checked", "checked") : $(dom).attr("checked", "checked").removeAttr("checked");
						}
						if ($(dom).attr("type") == 'text' || $(dom).prop("tagName") == "SELECT" || $(dom).attr("type") == 'hidden' || $(dom).attr("type") == 'textarea') {
							$(dom).val(obj[property]);
						}
						if ($(dom).prop("tagName") == "TEXTAREA") {
							$(dom).val(obj[property]);
						}
					});
				}
			}
		}
	},
	checkCntnoCode: function(strCode, callback) {
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
	}
};
