// ==UserScript==
// @name 苹果园 HTTPS 化脚本
// @description 将页面内所有链接和表单的指向改为 HTTPS，保证全站升级到 HTTPS 前的安全性
// @match https://www.goddessfantasy.net/*
// @match http://www.goddessfantasy.net/*
// @version 0.1.3
// @updateURL https://gist.github.com/bnoctis/4d8782b75dce60e2a6110afc8997604a/raw/goddessfantasy-https.user.js
// @downloadURL https://gist.github.com/bnoctis/4d8782b75dce60e2a6110afc8997604a/raw/goddessfantasy-https.user.js
// ==/UserScript==

// 0.1.3 修复引用快速回复时弹出回复框依然使用 HTTP URL 发出 XHR 请求的问题
// 0.1.3 设置更新 URL
// 0.1.2 将 [...arr] 降级为 Array.from() 以兼容 TamperMonkey

const HTTP_START = 'http://www.goddessfantasy.net'
const HTTPS_START = 'https://www.goddessfantasy.net'

Array.from(document.querySelectorAll('a')).forEach(a => {
	if(a.href.toLowerCase().startsWith(HTTP_START)) {
		a.href = HTTPS_START + a.href.slice(HTTP_START.length)
	}
});

Array.from(document.querySelectorAll('form')).forEach(f => {
	if(f.action.toLowerCase().startsWith(HTTP_START)) {
		f.action = HTTPS_START + f.action.slice(HTTP_START.length)
	}
});

// 当 oQuickReply.bCollapsed 为 false 时，引用回复调用的 oQuickReply.quote
// 会发起一个 XHR 请求拉取回复内容，而这个请求是 HTTP 的；请求的 URL 是用
// oQuickReply.opt.sScriptUrl 组合其他参数得到的，在此将其改为 HTTPS
//
if(unsafeWindow.oQuickReply !== undefined) {
	unsafeWindow.oQuickReply.opt.sScriptUrl = oQuickReply.opt.sScriptUrl
		.toLowerCase()
		.replace(HTTP_START, HTTPS_START)
}
