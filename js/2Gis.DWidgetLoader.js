function DGWidgetLoader(insertid, a) {
    this.options = {};
    this.CLASS_NAME = "DG.Widget.Loader";
    this._urls = {urlWidget: {ru: "http://firmsonmap.api.2gis.ru/", it: "http://firmsonmap.api.2gis.it/"}, urlCurrentMapsApi: "http://maps.api.2gis.ru/1.0"};
    this._localeMsgs = {ru: {goToMap: "\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u043a \u0431\u043e\u043b\u044c\u0448\u043e\u0439 \u043a\u0430\u0440\u0442\u0435", loadsMarkers: "\u041f\u043e\u0434\u043e\u0436\u0434\u0438\u0442\u0435, \u0438\u0434\u0435\u0442 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u043c\u0430\u0440\u043a\u0435\u0440\u043e\u0432",
        Mon: "\u041f\u043d", Tue: "\u0412\u0442", Wed: "\u0421\u0440", Thu: "\u0427\u0442", Fri: "\u041f\u0442", Sat: "\u0421\u0431", Sun: "\u0412\u0441", workingTime: "\u0420\u0430\u0431\u043e\u0447\u0435\u0435 \u0432\u0440\u0435\u043c\u044f", lunch: "\u041e\u0431\u0435\u0434"}, it: {goToMap: "Vai alla mappa grande", loadsMarkers: "Attendere, caricamento marcatori", Mon: "Lun", Tue: "Mar", Wed: "Mer", Thu: "Gio", Fri: "Ven", Sat: "Sab", Sun: "Dom", workingTime: "Orario di lavoro", lunch: "Pranzo"}};
    var b = "", c = this;
    if (!window.allWidgetsOptions)window.allWidgetsOptions =
        [];
    b = window.allWidgetsOptions.length;
    if (document.getElementById("firmsonmap_biglink"))document.getElementById("firmsonmap_biglink").style.display = "none";
    this.options = a;
    this.options.id = b;
    this.options.iframeId = "DGWidgetIframe" + b;
    this.options.divId = "widget";
    window.allWidgetsOptions.push(this.options);
    this.writeIframe(insertid);
    fix_resize();
    (function (a) {
        setTimeout(function () {
            c.writeIframeContent(a)
        }, 100)
    })(DGWidgetLoader.lang)
}
DGWidgetLoader.lang = "ru";
DGWidgetLoader.prototype.writeIframe = function (insertid) {
    //ifr= document.getElementById(insertid);
    //ifr.appendChild();
   $(insertid).append('<iframe frameborder="no" style="border:1px solid ' + this.options.borderColor + ';" id="' + this.options.iframeId + '" width="' + this.options.width + '" height="' + this.options.height + '" ></iframe>')
};
DGWidgetLoader.prototype.getIframeContent = function () {
    var a, b;
    a = document.getElementById(this.options.iframeId);
    a.contentDocument ? b = a.contentDocument : a.contentWindow && (b = a.contentWindow.write ? a.contentWindow : a.contentWindow.document);
    if (!b)throw"Error initializing DG.Widget.Loader";
    return b
};
DGWidgetLoader.prototype.writeIframeContent = function (a) {
    var b = document.getElementById(this.options.iframeId), c = this.getIframeContent(), a = '<!doctype html><html><head><base href="' + this._urls.urlWidget[a] + '" />' + this.addScriptLine(this._urls.urlCurrentMapsApi) + this.addScriptLine(this._urls.urlWidget[a] + "minify/widget.js?v=1a293d8") + this.addStyleLine(this._urls.urlCurrentMapsApi + "/dg-css/dg.css?v=1a293d8") + this.addStyleLine(this._urls.urlWidget[a] + "minify/widget.css?v=1a293d8") + '</head><body style="background:#fff;margin:0;padding:0;overflow:hidden">' +
        this.writeReference() + this.writeLinkToDGOnline(a) + this.writeMapContainer(a) + this.writeInnerTemplates(a) + this.writeInitScript(a) + "</body></html>";
    navigator.userAgent && navigator.userAgent.indexOf("MSIE") === -1 ? (b.contentWindow.contents = a, b.src = 'javascript:window["contents"]') : (c.open(), c.write(a), setTimeout(function () {
        c.close()
    }, 3E4))
};
DGWidgetLoader.prototype.addScriptLine = function (a) {
    return'<script charset="utf-8" type="text/javascript" src="' + a + '"><\/script>'
};
DGWidgetLoader.prototype.addStyleLine = function (a) {
    return'<link rel="stylesheet" type="text/css" href="' + a + '" />'
};
DGWidgetLoader.prototype.writeReference = function () {
    return'<div id="reference" style="padding:0;width:262px;display:none;"><div class="cl"></div></div>'
};
DGWidgetLoader.prototype.writeLinkToDGOnline = function (a) {
    return'<a id="biglink" href="#" target="_blank">' + this._localeMsgs[a].goToMap + "</a>"
};
DGWidgetLoader.prototype.writeMapContainer = function (a) {
    var b;
    b = document.getElementById(this.options.iframeId);
    return'<div id="' + this.options.divId + '" data-id="' + this.options.id + '" style="' + ("float:right;width:" + b.clientWidth + "px;height:" + b.clientHeight + "px") + '"></div>' + ('<div class="maploader">' + this._localeMsgs[a].loadsMarkers + "</div>")
};
DGWidgetLoader.prototype.writeInitScript = function (a) {
    var b, a = 'function jqReady() { DG.WidgetLocale.currentLang = "' + a + '";DG.Widget.Config.setLocale(DG.WidgetLocale.currentLang);var widget = new DG.Widget(' + makeString(this.options) + "); }";
    b = '<script type="text/javascript">';
    b += "if (window.jQuery && window.DG) { jqReady(); } else { ";
    b += "intervalId = setInterval(function() { if (window.jQuery && window.DG && this.endLoad) { clearInterval(intervalId); jqReady(); } }, 400);";
    b += "}; " + a + "<\/script>";
    return b
};
DGWidgetLoader.prototype.writeInnerTemplates = function () {
    var a = [];
    a.push('<div id="orgTemplate" class="firmcard template"><div class="name"><span></span></div><div class="address"></div><div class="note"></div><div style="z-index:1000;"class="toggler"><div class="contacts"></div><div class="schedule"></div><div class="flamp"></div><div class="payings"></div></div><div class="cl"></div><div class="firm-id" style="display: none;"></div></div>');
    a.push('<div id="styleTemplate" class="template"><style type="text/css"> ##CLASSNAMES## { display:none; }</style></div>');
    return a.join("")
};
function makeString(a) {
    var b = typeof a;
    if (b != "object" || a === null)return b == "string" && (a = '"' + a + '"'), String(a); else {
        var c, d, f = [], e = a && Object.prototype.toString.apply(a) === "[object Array]";
        for (c in a)a.hasOwnProperty(c) && (d = a[c], b = typeof d, b == "string" ? d = '"' + d + '"' : b == "object" && d !== null && (d = makeString(d)), f.push((e ? "" : '"' + c + '":') + String(d)));
        return(e ? "[" : "{") + String(f) + (e ? "]" : "}")
    }
};