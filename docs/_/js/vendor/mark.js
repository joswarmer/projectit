!function o(a,s,c){function u(t,e){if(!s[t]){if(!a[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(l)return l(t,!0);var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}var i=s[t]={exports:{}};a[t][0].call(i.exports,function(e){return u(a[t][1][e]||e)},i,i.exports,o,a,s,c)}return s[t].exports}for(var l="function"==typeof require&&require,e=0;e<c.length;e++)u(c[e]);return u}({1:[function(e,t,n){var r,i;r=this,i=function(){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},e=function(){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}(),t=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function u(e){var t=!(1<arguments.length&&void 0!==arguments[1])||arguments[1],n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:[],r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:5e3;i(this,u),this.ctx=e,this.iframes=t,this.exclude=n,this.iframesTimeout=r}return e(u,[{key:"getContexts",value:function(){var n=[];return(void 0!==this.ctx&&this.ctx?NodeList.prototype.isPrototypeOf(this.ctx)?Array.prototype.slice.call(this.ctx):Array.isArray(this.ctx)?this.ctx:"string"==typeof this.ctx?Array.prototype.slice.call(document.querySelectorAll(this.ctx)):[this.ctx]:[]).forEach(function(t){var e=0<n.filter(function(e){return e.contains(t)}).length;-1!==n.indexOf(t)||e||n.push(t)}),n}},{key:"getIframeContents",value:function(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:function(){},r=void 0;try{var i=e.contentWindow;if(r=i.document,!i||!r)throw new Error("iframe inaccessible")}catch(e){n()}r&&t(r)}},{key:"isIframeBlank",value:function(e){var t="about:blank",n=e.getAttribute("src").trim();return e.contentWindow.location.href===t&&n!==t&&n}},{key:"observeIframeLoad",value:function(t,n,r){var i=this,o=!1,a=null,e=function e(){if(!o){o=!0,clearTimeout(a);try{i.isIframeBlank(t)||(t.removeEventListener("load",e),i.getIframeContents(t,n,r))}catch(e){r()}}};t.addEventListener("load",e),a=setTimeout(e,this.iframesTimeout)}},{key:"onIframeReady",value:function(e,t,n){try{"complete"===e.contentWindow.document.readyState?this.isIframeBlank(e)?this.observeIframeLoad(e,t,n):this.getIframeContents(e,t,n):this.observeIframeLoad(e,t,n)}catch(e){n()}}},{key:"waitForIframes",value:function(e,t){var n=this,r=0;this.forEachIframe(e,function(){return!0},function(e){r++,n.waitForIframes(e.querySelector("html"),function(){--r||t()})},function(e){e||t()})}},{key:"forEachIframe",value:function(e,n,r){var i=this,t=3<arguments.length&&void 0!==arguments[3]?arguments[3]:function(){},o=e.querySelectorAll("iframe"),a=o.length,s=0;o=Array.prototype.slice.call(o);var c=function(){--a<=0&&t(s)};a||c(),o.forEach(function(t){u.matches(t,i.exclude)?c():i.onIframeReady(t,function(e){n(t)&&(s++,r(e)),c()},c)})}},{key:"createIterator",value:function(e,t,n){return document.createNodeIterator(e,t,n,!1)}},{key:"createInstanceOnIframe",value:function(e){return new u(e.querySelector("html"),this.iframes)}},{key:"compareNodeIframe",value:function(e,t,n){if(e.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_PRECEDING){if(null===t)return!0;if(t.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_FOLLOWING)return!0}return!1}},{key:"getIteratorNode",value:function(e){var t=e.previousNode();return{prevNode:t,node:null===t?e.nextNode():e.nextNode()&&e.nextNode()}}},{key:"checkIframeFilter",value:function(e,t,n,r){var i=!1,o=!1;return r.forEach(function(e,t){e.val===n&&(i=t,o=e.handled)}),this.compareNodeIframe(e,t,n)?(!1!==i||o?!1===i||o||(r[i].handled=!0):r.push({val:n,handled:!0}),!0):(!1===i&&r.push({val:n,handled:!1}),!1)}},{key:"handleOpenIframes",value:function(e,t,n,r){var i=this;e.forEach(function(e){e.handled||i.getIframeContents(e.val,function(e){i.createInstanceOnIframe(e).forEachNode(t,n,r)})})}},{key:"iterateThroughNodes",value:function(t,e,n,r,i){for(var o,a=this,s=this.createIterator(e,t,r),c=[],u=[],l=void 0,h=void 0;void 0,o=a.getIteratorNode(s),h=o.prevNode,l=o.node;)this.iframes&&this.forEachIframe(e,function(e){return a.checkIframeFilter(l,h,e,c)},function(e){a.createInstanceOnIframe(e).forEachNode(t,function(e){return u.push(e)},r)}),u.push(l);u.forEach(function(e){n(e)}),this.iframes&&this.handleOpenIframes(c,t,n,r),i()}},{key:"forEachNode",value:function(n,r,i){var o=this,a=3<arguments.length&&void 0!==arguments[3]?arguments[3]:function(){},e=this.getContexts(),s=e.length;s||a(),e.forEach(function(e){var t=function(){o.iterateThroughNodes(n,e,r,i,function(){--s<=0&&a()})};o.iframes?o.waitForIframes(e,t):t()})}}],[{key:"matches",value:function(t,e){var n="string"==typeof e?[e]:e,r=t.matches||t.matchesSelector||t.msMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.webkitMatchesSelector;if(r){var i=!1;return n.every(function(e){return!r.call(t,e)||!(i=!0)}),i}return!1}}]),u}(),a=function(){function n(e){i(this,n),this.ctx=e,this.ie=!1;var t=window.navigator.userAgent;(-1<t.indexOf("MSIE")||-1<t.indexOf("Trident"))&&(this.ie=!0)}return e(n,[{key:"log",value:function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"debug",n=this.opt.log;this.opt.debug&&"object"===(void 0===n?"undefined":r(n))&&"function"==typeof n[t]&&n[t]("mark.js: "+e)}},{key:"escapeStr",value:function(e){return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}},{key:"createRegExp",value:function(e){return"disabled"!==this.opt.wildcards&&(e=this.setupWildcardsRegExp(e)),e=this.escapeStr(e),Object.keys(this.opt.synonyms).length&&(e=this.createSynonymsRegExp(e)),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(e=this.setupIgnoreJoinersRegExp(e)),this.opt.diacritics&&(e=this.createDiacriticsRegExp(e)),e=this.createMergedBlanksRegExp(e),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(e=this.createJoinersRegExp(e)),"disabled"!==this.opt.wildcards&&(e=this.createWildcardsRegExp(e)),e=this.createAccuracyRegExp(e)}},{key:"createSynonymsRegExp",value:function(e){var t=this.opt.synonyms,n=this.opt.caseSensitive?"":"i",r=this.opt.ignoreJoiners||this.opt.ignorePunctuation.length?"\0":"";for(var i in t)if(t.hasOwnProperty(i)){var o=t[i],a="disabled"!==this.opt.wildcards?this.setupWildcardsRegExp(i):this.escapeStr(i),s="disabled"!==this.opt.wildcards?this.setupWildcardsRegExp(o):this.escapeStr(o);""!==a&&""!==s&&(e=e.replace(new RegExp("("+this.escapeStr(a)+"|"+this.escapeStr(s)+")","gm"+n),r+"("+this.processSynomyms(a)+"|"+this.processSynomyms(s)+")"+r))}return e}},{key:"processSynomyms",value:function(e){return(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(e=this.setupIgnoreJoinersRegExp(e)),e}},{key:"setupWildcardsRegExp",value:function(e){return(e=e.replace(/(?:\\)*\?/g,function(e){return"\\"===e.charAt(0)?"?":""})).replace(/(?:\\)*\*/g,function(e){return"\\"===e.charAt(0)?"*":""})}},{key:"createWildcardsRegExp",value:function(e){var t="withSpaces"===this.opt.wildcards;return e.replace(/\u0001/g,t?"[\\S\\s]?":"\\S?").replace(/\u0002/g,t?"[\\S\\s]*?":"\\S*")}},{key:"setupIgnoreJoinersRegExp",value:function(e){return e.replace(/[^(|)\\]/g,function(e,t,n){var r=n.charAt(t+1);return/[(|)\\]/.test(r)||""===r?e:e+"\0"})}},{key:"createJoinersRegExp",value:function(e){var t=[],n=this.opt.ignorePunctuation;return Array.isArray(n)&&n.length&&t.push(this.escapeStr(n.join(""))),this.opt.ignoreJoiners&&t.push("\\u00ad\\u200b\\u200c\\u200d"),t.length?e.split(/\u0000+/).join("["+t.join("")+"]*"):e}},{key:"createDiacriticsRegExp",value:function(n){var r=this.opt.caseSensitive?"":"i",e=this.opt.caseSensitive?["aàáảãạăằắẳẵặâầấẩẫậäåāą","AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćč","CÇĆČ","dđď","DĐĎ","eèéẻẽẹêềếểễệëěēę","EÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïī","IÌÍỈĨỊÎÏĪ","lł","LŁ","nñňń","NÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøō","OÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rř","RŘ","sšśșş","SŠŚȘŞ","tťțţ","TŤȚŢ","uùúủũụưừứửữựûüůū","UÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿ","YÝỲỶỸỴŸ","zžżź","ZŽŻŹ"]:["aàáảãạăằắẳẵặâầấẩẫậäåāąAÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćčCÇĆČ","dđďDĐĎ","eèéẻẽẹêềếểễệëěēęEÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïīIÌÍỈĨỊÎÏĪ","lłLŁ","nñňńNÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøōOÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rřRŘ","sšśșşSŠŚȘŞ","tťțţTŤȚŢ","uùúủũụưừứửữựûüůūUÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿYÝỲỶỸỴŸ","zžżźZŽŻŹ"],i=[];return n.split("").forEach(function(t){e.every(function(e){if(-1!==e.indexOf(t)){if(-1<i.indexOf(e))return!1;n=n.replace(new RegExp("["+e+"]","gm"+r),"["+e+"]"),i.push(e)}return!0})}),n}},{key:"createMergedBlanksRegExp",value:function(e){return e.replace(/[\s]+/gim,"[\\s]+")}},{key:"createAccuracyRegExp",value:function(e){var t=this,n=this.opt.accuracy,r="string"==typeof n?n:n.value,i="string"==typeof n?[]:n.limiters,o="";switch(i.forEach(function(e){o+="|"+t.escapeStr(e)}),r){case"partially":default:return"()("+e+")";case"complementary":return"()([^"+(o="\\s"+(o||this.escapeStr("!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~¡¿")))+"]*"+e+"[^"+o+"]*)";case"exactly":return"(^|\\s"+o+")("+e+")(?=$|\\s"+o+")"}}},{key:"getSeparatedKeywords",value:function(e){var t=this,n=[];return e.forEach(function(e){t.opt.separateWordSearch?e.split(" ").forEach(function(e){e.trim()&&-1===n.indexOf(e)&&n.push(e)}):e.trim()&&-1===n.indexOf(e)&&n.push(e)}),{keywords:n.sort(function(e,t){return t.length-e.length}),length:n.length}}},{key:"isNumeric",value:function(e){return Number(parseFloat(e))==e}},{key:"checkRanges",value:function(e){var i=this;if(!Array.isArray(e)||"[object Object]"!==Object.prototype.toString.call(e[0]))return this.log("markRanges() will only accept an array of objects"),this.opt.noMatch(e),[];var o=[],a=0;return e.sort(function(e,t){return e.start-t.start}).forEach(function(e){var t=i.callNoMatchOnInvalidRanges(e,a),n=t.start,r=t.end;t.valid&&(e.start=n,e.length=r-n,o.push(e),a=r)}),o}},{key:"callNoMatchOnInvalidRanges",value:function(e,t){var n=void 0,r=void 0,i=!1;return e&&void 0!==e.start?(r=(n=parseInt(e.start,10))+parseInt(e.length,10),this.isNumeric(e.start)&&this.isNumeric(e.length)&&0<r-t&&0<r-n?i=!0:(this.log("Ignoring invalid or overlapping range: "+JSON.stringify(e)),this.opt.noMatch(e))):(this.log("Ignoring invalid range: "+JSON.stringify(e)),this.opt.noMatch(e)),{start:n,end:r,valid:i}}},{key:"checkWhitespaceRanges",value:function(e,t,n){var r=void 0,i=!0,o=n.length,a=t-o,s=parseInt(e.start,10)-a;return o<(r=(s=o<s?o:s)+parseInt(e.length,10))&&(r=o,this.log("End range automatically set to the max value of "+o)),s<0||r-s<0||o<s||o<r?(i=!1,this.log("Invalid range: "+JSON.stringify(e)),this.opt.noMatch(e)):""===n.substring(s,r).replace(/\s+/g,"")&&(i=!1,this.log("Skipping whitespace only range: "+JSON.stringify(e)),this.opt.noMatch(e)),{start:s,end:r,valid:i}}},{key:"getTextNodes",value:function(e){var t=this,n="",r=[];this.iterator.forEachNode(NodeFilter.SHOW_TEXT,function(e){r.push({start:n.length,end:(n+=e.textContent).length,node:e})},function(e){return t.matchesExclude(e.parentNode)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},function(){e({value:n,nodes:r})})}},{key:"matchesExclude",value:function(e){return o.matches(e,this.opt.exclude.concat(["script","style","title","head","html"]))}},{key:"wrapRangeInTextNode",value:function(e,t,n){var r=this.opt.element?this.opt.element:"mark",i=e.splitText(t),o=i.splitText(n-t),a=document.createElement(r);return a.setAttribute("data-markjs","true"),this.opt.className&&a.setAttribute("class",this.opt.className),a.textContent=i.textContent,i.parentNode.replaceChild(a,i),o}},{key:"wrapRangeInMappedTextNode",value:function(s,c,u,l,h){var f=this;s.nodes.every(function(e,n){var t=s.nodes[n+1];if(void 0===t||t.start>c){if(!l(e.node))return!1;var r=c-e.start,i=(u>e.end?e.end:u)-e.start,o=s.value.substr(0,e.start),a=s.value.substr(i+e.start);if(e.node=f.wrapRangeInTextNode(e.node,r,i),s.value=o+a,s.nodes.forEach(function(e,t){n<=t&&(0<s.nodes[t].start&&t!==n&&(s.nodes[t].start-=i),s.nodes[t].end-=i)}),u-=i,h(e.node.previousSibling,e.start),!(u>e.end))return!1;c=e.end}return!0})}},{key:"wrapMatches",value:function(i,e,o,a,t){var s=this,c=0===e?0:e+1;this.getTextNodes(function(e){e.nodes.forEach(function(e){e=e.node;for(var t=void 0;null!==(t=i.exec(e.textContent))&&""!==t[c];)if(o(t[c],e)){var n=t.index;if(0!==c)for(var r=1;r<c;r++)n+=t[r].length;e=s.wrapRangeInTextNode(e,n,n+t[c].length),a(e.previousSibling),i.lastIndex=0}}),t()})}},{key:"wrapMatchesAcrossElements",value:function(o,e,a,s,c){var u=this,l=0===e?0:e+1;this.getTextNodes(function(e){for(var t=void 0;null!==(t=o.exec(e.value))&&""!==t[l];){var n=t.index;if(0!==l)for(var r=1;r<l;r++)n+=t[r].length;var i=n+t[l].length;u.wrapRangeInMappedTextNode(e,n,i,function(e){return a(t[l],e)},function(e,t){o.lastIndex=t,s(e)})}c()})}},{key:"wrapRangeFromIndex",value:function(e,s,c,t){var u=this;this.getTextNodes(function(o){var a=o.value.length;e.forEach(function(t,n){var e=u.checkWhitespaceRanges(t,a,o.value),r=e.start,i=e.end;e.valid&&u.wrapRangeInMappedTextNode(o,r,i,function(e){return s(e,t,o.value.substring(r,i),n)},function(e){c(e,t)})}),t()})}},{key:"unwrapMatches",value:function(e){for(var t=e.parentNode,n=document.createDocumentFragment();e.firstChild;)n.appendChild(e.removeChild(e.firstChild));t.replaceChild(n,e),this.ie?this.normalizeTextNode(t):t.normalize()}},{key:"normalizeTextNode",value:function(e){if(e){if(3===e.nodeType)for(;e.nextSibling&&3===e.nextSibling.nodeType;)e.nodeValue+=e.nextSibling.nodeValue,e.parentNode.removeChild(e.nextSibling);else this.normalizeTextNode(e.firstChild);this.normalizeTextNode(e.nextSibling)}}},{key:"markRegExp",value:function(e,t){var n=this;this.opt=t,this.log('Searching with expression "'+e+'"');var r=0,i="wrapMatches";this.opt.acrossElements&&(i="wrapMatchesAcrossElements"),this[i](e,this.opt.ignoreGroups,function(e,t){return n.opt.filter(t,e,r)},function(e){r++,n.opt.each(e)},function(){0===r&&n.opt.noMatch(e),n.opt.done(r)})}},{key:"mark",value:function(e,t){var i=this;this.opt=t;var o=0,a="wrapMatches",n=this.getSeparatedKeywords("string"==typeof e?[e]:e),s=n.keywords,c=n.length,u=this.opt.caseSensitive?"":"i";this.opt.acrossElements&&(a="wrapMatchesAcrossElements"),0===c?this.opt.done(o):function e(n){var t=new RegExp(i.createRegExp(n),"gm"+u),r=0;i.log('Searching with expression "'+t+'"'),i[a](t,1,function(e,t){return i.opt.filter(t,n,o,r)},function(e){r++,o++,i.opt.each(e)},function(){0===r&&i.opt.noMatch(n),s[c-1]===n?i.opt.done(o):e(s[s.indexOf(n)+1])})}(s[0])}},{key:"markRanges",value:function(e,t){var i=this;this.opt=t;var n=0,r=this.checkRanges(e);r&&r.length?(this.log("Starting to mark with the following ranges: "+JSON.stringify(r)),this.wrapRangeFromIndex(r,function(e,t,n,r){return i.opt.filter(e,t,n,r)},function(e,t){n++,i.opt.each(e,t)},function(){i.opt.done(n)})):this.opt.done(n)}},{key:"unmark",value:function(e){var r=this;this.opt=e;var i=this.opt.element?this.opt.element:"*";i+="[data-markjs]",this.opt.className&&(i+="."+this.opt.className),this.log('Removal selector "'+i+'"'),this.iterator.forEachNode(NodeFilter.SHOW_ELEMENT,function(e){r.unwrapMatches(e)},function(e){var t=o.matches(e,i),n=r.matchesExclude(e);return!t||n?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},this.opt.done)}},{key:"opt",set:function(e){this._opt=t({},{element:"",className:"",exclude:[],iframes:!1,iframesTimeout:5e3,separateWordSearch:!0,diacritics:!0,synonyms:{},accuracy:"partially",acrossElements:!1,caseSensitive:!1,ignoreJoiners:!1,ignoreGroups:0,ignorePunctuation:[],wildcards:"disabled",each:function(){},noMatch:function(){},filter:function(){return!0},done:function(){},debug:!1,log:window.console},e)},get:function(){return this._opt}},{key:"iterator",get:function(){return new o(this.ctx,this.opt.iframes,this.opt.exclude,this.opt.iframesTimeout)}}]),n}();return function(e){var n=this,r=new a(e);return this.mark=function(e,t){return r.mark(e,t),n},this.markRegExp=function(e,t){return r.markRegExp(e,t),n},this.markRanges=function(e,t){return r.markRanges(e,t),n},this.unmark=function(e){return r.unmark(e),n},this}},"object"==typeof n&&void 0!==t?t.exports=i():"function"==typeof define&&define.amd?define(i):r.Mark=i()},{}],2:[function(t,e,n){!function(){"use strict";var e=t("mark.js");window.addEventListener("load",function(){var a=new e(document.querySelectorAll(".sect1")),s=document.querySelectorAll(".doc .sect1");document.getElementById("search-tutorials").addEventListener("input",function(){var i=document.getElementsByClassName("doc")[0],o=document.getElementById("search-tutorials").value.toLowerCase();a.unmark({done:function(){a.mark(o);for(var e=[],t=0;t<s.length;t++)0<s[t].querySelectorAll("mark").length&&e.push(s[t]);i.innerHTML="";for(var n=0;n<e.length;n++)i.appendChild(e[n]);if(""===o){i.innerHTML="";for(var r=0;r<s.length;r++)i.appendChild(s[r])}}})})})}()},{"mark.js":1}]},{},[2]);