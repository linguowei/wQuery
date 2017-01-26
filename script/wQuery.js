'use strict';

// 事件绑定
function myAddEvent(obj, sEv, fn){
	if (obj.attachEvent) {
		// 兼容IE 7 8
		obj.attachEvent('on' + sEv, function(){
			fn.call(obj)
		});
	} else {
		// IE9以上
		obj.addEventListener(sEv, fn, false);
	}
}

function getByClass(oParent, sClass){
	var aEle = oParent.getElementsByTagName('*');
	var aResult = [];
	var i = 0;

	for (var i = 0; i < aEle.length; i++) {
		if (aEle[i].className == sClass) {
			aResult.push(aEle[i])
		}
	}
	return aResult;
}
// 获取元素属性
function getStyle(obj, attr){
	if (obj.currentStyle) {
		// 兼容IE
		return obj.currentStyle[attr];
	} else {
		// DOM 标准方法
		return getComputedStyle(obj, false)[attr];
	}
}

function WQuery(vArg){
	// 保存选中元素
	this.elements = []

	switch (typeof vArg){
		case 'function':
			myAddEvent(window, 'load', vArg);
			break;
		case 'string':
			switch (vArg.charAt(0)){
				case '#': // ID
					var obj = document.getElementById(vArg.substring(1));
					this.elements.push(obj)
					break;
				case '.': // class
					this.elements = getByClass(document, vArg.substring(1));
					break;
				default: // tagName
					this.elements = document.getElementsByTagName(vArg);
			}
			break;
		case 'object':
			this.elements.push(vArg);
	}
}
// 点击事件
WQuery.prototype.click = function(fn){
	for (var i = 0; i < this.elements.length; i++) {
		myAddEvent(this.elements[i], 'click', fn);
	}
}
// 显示方法
WQuery.prototype.show = function(){
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.display = 'block'
	}
}
// 隐藏方法
WQuery.prototype.hide = function(){
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.display = 'none'
	}
}
// 鼠标移入移出方法
WQuery.prototype.hover = function(fnOver, fnOut){
	for (var i = 0; i < this.elements.length; i++) {
		myAddEvent(this.elements[i], 'mouseover', fnOver);
		myAddEvent(this.elements[i], 'mouseout', fnOut);
	}
}
// 样式操作方法
WQuery.prototype.css = function(attr, value){
	if (arguments.length == 2) { // 参数2为设置样式
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].style[attr] = value;
		}
	} else {
		return getStyle(this.elements[0], attr);
	}
}
// toggle方法
WQuery.prototype.toggle = function(fun1, fun2){
	var _arguments = arguments;
	for(var i=0; i<this.elements.length; i++){    
		(function(obj){
			var count = 0;
			myAddEvent(obj, 'click', function(){
				_arguments[count++%_arguments.length].call(obj);
			})
		})(this.elements[i])
	}
	return this;
}
// attr方法
WQuery.prototype.attr = function(attr, value){
	if(arguments.length==2){ // 设置样式
		for(var i=0; i<this.elements.length; i++){
		this.elements[i][attr] = value;
		}
	} else {
		return this.elements[0][attr];
	}
}
// eq方法
WQuery.prototype.eq = function(n){
	return $(this.elements[n])
}
// find方法
WQuery.prototype.find = function(str){
	var aResult = [];
	for(var i = 0; i<this.elements.length; i++){
		switch(str.charAt(0)){
			case '.':
				var aEle = getByClass(this.elements[i], str.substring(1))
				aResult.concat(aEle);
				break;
			default: 
				var aEle = this.elements[i].getElementsByTagName(str)
				aResult.concat(aEle);
		}
	}
}
function $ (vArg){
	return new WQuery(vArg);
}















