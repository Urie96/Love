!function(t){var n={};function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:i})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(e.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var r in t)e.d(i,r,function(n){return t[n]}.bind(null,r));return i},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=6)}([function(t,n,e){var i=e(1),r=e(2);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[t.i,r,""]]);var a={insert:"head",singleton:!1};i(r,a);t.exports=r.locals||{}},function(t,n,e){"use strict";var i,r=function(){return void 0===i&&(i=Boolean(window&&document&&document.all&&!window.atob)),i},a=function(){var t={};return function(n){if(void 0===t[n]){var e=document.querySelector(n);if(window.HTMLIFrameElement&&e instanceof window.HTMLIFrameElement)try{e=e.contentDocument.head}catch(t){e=null}t[n]=e}return t[n]}}(),o=[];function s(t){for(var n=-1,e=0;e<o.length;e++)if(o[e].identifier===t){n=e;break}return n}function c(t,n){for(var e={},i=[],r=0;r<t.length;r++){var a=t[r],c=n.base?a[0]+n.base:a[0],u=e[c]||0,h="".concat(c," ").concat(u);e[c]=u+1;var l=s(h),f={css:a[1],media:a[2],sourceMap:a[3]};-1!==l?(o[l].references++,o[l].updater(f)):o.push({identifier:h,updater:p(f,n),references:1}),i.push(h)}return i}function u(t){var n=document.createElement("style"),i=t.attributes||{};if(void 0===i.nonce){var r=e.nc;r&&(i.nonce=r)}if(Object.keys(i).forEach((function(t){n.setAttribute(t,i[t])})),"function"==typeof t.insert)t.insert(n);else{var o=a(t.insert||"head");if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(n)}return n}var h,l=(h=[],function(t,n){return h[t]=n,h.filter(Boolean).join("\n")});function f(t,n,e,i){var r=e?"":i.media?"@media ".concat(i.media," {").concat(i.css,"}"):i.css;if(t.styleSheet)t.styleSheet.cssText=l(n,r);else{var a=document.createTextNode(r),o=t.childNodes;o[n]&&t.removeChild(o[n]),o.length?t.insertBefore(a,o[n]):t.appendChild(a)}}function d(t,n,e){var i=e.css,r=e.media,a=e.sourceMap;if(r?t.setAttribute("media",r):t.removeAttribute("media"),a&&btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),t.styleSheet)t.styleSheet.cssText=i;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(i))}}var m=null,v=0;function p(t,n){var e,i,r;if(n.singleton){var a=v++;e=m||(m=u(n)),i=f.bind(null,e,a,!1),r=f.bind(null,e,a,!0)}else e=u(n),i=d.bind(null,e,n),r=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)};return i(t),function(n){if(n){if(n.css===t.css&&n.media===t.media&&n.sourceMap===t.sourceMap)return;i(t=n)}else r()}}t.exports=function(t,n){(n=n||{}).singleton||"boolean"==typeof n.singleton||(n.singleton=r());var e=c(t=t||[],n);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var i=0;i<e.length;i++){var r=s(e[i]);o[r].references--}for(var a=c(t,n),u=0;u<e.length;u++){var h=s(e[u]);0===o[h].references&&(o[h].updater(),o.splice(h,1))}e=a}}}},function(t,n,e){var i=e(3),r=e(4),a=e(5);n=i(!1);var o=r(a);n.push([t.i,"@font-face {\n  font-family: digit;\n  src: url("+o+') format("truetype");\n}\n\nhtml {\n  height: 100%;\n}\nbody {\n  margin: 0;\n  height: 100%;\n  background: -webkit-linear-gradient(\n    top,\n    rgb(203, 235, 219) 0%,\n    rgb(55, 148, 192) 120%\n  );\n  background: -moz-linear-gradient(\n    top,\n    rgb(203, 235, 219) 0%,\n    rgb(55, 148, 192) 120%\n  );\n  background: -o-linear-gradient(\n    top,\n    rgb(203, 235, 219) 0%,\n    rgb(55, 148, 192) 120%\n  );\n  background: -ms-linear-gradient(\n    top,\n    rgb(203, 235, 219) 0%,\n    rgb(55, 148, 192) 120%\n  );\n  background: linear-gradient(\n    top,\n    rgb(203, 235, 219) 0%,\n    rgb(55, 148, 192) 120%\n  );\n}\n\n#words {\n  font-family: "sans-serif";\n  font-size: 24px;\n  color: #666;\n  width: 500px;\n}\n\n#elapseClock {\n  text-align: right;\n  font-size: 18px;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n\n#elapseClock .digit {\n  font-family: "digit";\n  font-size: 36px;\n}\n\n#loveu {\n  padding: 5px;\n  font-size: 22px;\n  margin-top: 80px;\n  margin-right: 120px;\n  text-align: right;\n}\n\n#loveu .signature {\n  margin-top: 10px;\n  font-size: 20px;\n  font-style: italic;\n}\n\n.fullscreen {\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  height: 100%;\n  width: 100%;\n}\n\n.container {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n',""]),t.exports=n},function(t,n,e){"use strict";t.exports=function(t){var n=[];return n.toString=function(){return this.map((function(n){var e=function(t,n){var e=t[1]||"",i=t[3];if(!i)return e;if(n&&"function"==typeof btoa){var r=(o=i,s=btoa(unescape(encodeURIComponent(JSON.stringify(o)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),"/*# ".concat(c," */")),a=i.sources.map((function(t){return"/*# sourceURL=".concat(i.sourceRoot||"").concat(t," */")}));return[e].concat(a).concat([r]).join("\n")}var o,s,c;return[e].join("\n")}(n,t);return n[2]?"@media ".concat(n[2]," {").concat(e,"}"):e})).join("")},n.i=function(t,e,i){"string"==typeof t&&(t=[[null,t,""]]);var r={};if(i)for(var a=0;a<this.length;a++){var o=this[a][0];null!=o&&(r[o]=!0)}for(var s=0;s<t.length;s++){var c=[].concat(t[s]);i&&r[c[0]]||(e&&(c[2]?c[2]="".concat(e," and ").concat(c[2]):c[2]=e),n.push(c))}},n}},function(t,n,e){"use strict";t.exports=function(t,n){return n||(n={}),"string"!=typeof(t=t&&t.__esModule?t.default:t)?t:(/^['"].*['"]$/.test(t)&&(t=t.slice(1,-1)),n.hash&&(t+=n.hash),/["'() \t\n]/.test(t)||n.needQuotes?'"'.concat(t.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):t)}},function(t,n,e){"use strict";e.r(n),n.default=e.p+"23d9ef58f3d9156ac33d6b7311e03258.ttf"},function(t,n,e){"use strict";e.r(n);var i,r=(new Date).toLocaleDateString(),a=function(){for(var t=["2020/8/16","2021/8/5","2022/7/25","2023/8/13","2024/8/1","2025/7/21","2026/8/9","2027/7/30","2028/8/17","2029/8/6","2030/7/27"],n=0;n<t.length;n++){if(r===t[n])return"悦悦|"+(t[n].substring(0,4)-1998)+"岁|生日快乐"}}()||function(){switch(r.substring(5)){case"7/13":return"悦悦|今天是|在一起|"+((new Date).getFullYear()-"2019")+"周年";case"5/8":return"悦悦|今天是|相识|"+((new Date).getFullYear()-"2019")+"周年";case"6/30":return"悦悦|今天是|见到你|"+((new Date).getFullYear()-"2019")+"周年";case"5/20":return"悦悦|520快乐";case"2/14":return"悦悦|情人节快乐"}}()||function(){var t=o(new Date("2019/5/8")),n=o(new Date("2019/7/13")),e=o(new Date("2019/6/30")),i={347:"三千万秒",463:"四千万秒",579:"五千万秒",695:"六千万秒",810:"七千万秒",926:"八千万秒",1158:"九千万秒"};function r(t,n){return i[n]?t+i[n]:n%100==0||n%1111==0||n%111==0?t+n+"天":void 0}return r("悦悦|今天是|在一起|",n)||r("悦悦|今天是|相识|",t)||r("悦悦|今天是|见到你|",e)}()||(i=["悦悦|余生有你|未来可期","悦悦|一生一世|一爱一人","悦悦|久伴不离|此生不弃","春水初生|春林初盛|春风十里|都不如你"])[Math.floor(Math.random()*i.length)];function o(t){var n=new Date;return Math.floor((Date.parse(n)-Date.parse(t))/864e5)}function s(t){return function(t){if(Array.isArray(t))return c(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,n){if(!t)return;if("string"==typeof t)return c(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(t);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return c(t,n)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,i=new Array(n);e<n;e++)i[e]=t[e];return i}function u(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function h(t,n){for(var e=0;e<n.length;e++){var i=n[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function l(t,n,e){return n&&h(t.prototype,n),e&&h(t,e),t}var f=function(){function t(n){u(this,t),this.canvas=n,this.ctx=n.getContext("2d")}return l(t,[{key:"getArea",value:function(){var t=this.canvas;return{width:t.width,height:t.height}}},{key:"clear",value:function(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)}}]),t}(),d=function(){function t(n,e){u(this,t),this.canvas=n,this.gap=e,this.dots=[]}return l(t,[{key:"render",value:function(){var t=this;this.dots.forEach((function(n){n.update(),t._drawCircle(n)}))}},{key:"_drawCircle",value:function(t){var n=t.x,e=t.y,i=t.z,r=t.a,a=this.canvas.ctx,o=this.gap;a.fillStyle="rgba(255,255,255,"+r+")",a.beginPath(),a.arc(Math.floor(n),Math.floor(e),o/11*i,0,2*Math.PI,!0),a.closePath(),a.fill()}},{key:"switchShape",value:function(t,n){var e=this.dots,i=this.canvas.canvas,r=i.width,a=i.height;if(t.length+99>e.length)for(var o=t.length-e.length+99,s=0;s<o;s++)e.push(new p(r/2,a/2));var c=0;for(t.forEach((function(t){var i=e[c];i.e=n?.25:i.s?.14:.11,i.move({z:i.s?10*Math.random()+10:5*Math.random()+5,a:i.s?Math.random():.5,h:i.s||n?18:30}),i.s=!0,i.move({x:t.x,y:t.y,a:1,z:5,h:0}),c++}));c<e.length;c++){var u=e[c];u.s&&(u.move({z:10*Math.random()+10,a:Math.random(),h:20}),u.s=!1,u.e=.04,u.move({x:Math.random()*r,y:Math.random()*a,a:.2+.4*Math.random(),z:3+3*Math.random(),h:0}))}}},{key:"_shuffleDots",value:function(){for(var t=this.dots,n=t.length-1;n>=0;n--){var e=Math.floor(Math.random()*(n+1)),i=t[e];t[e]=t[n],t[n]=i}}}]),t}(),m=function(){function t(n,e,i,r){u(this,t),this.canvas=n,this.callback=r,this.sequence=[],this.maxRows=0,this.interval=0,this.gap=e||22,this.shape=i}return l(t,[{key:"_loopSwitchShape",value:function(){var t=this.sequence.shift();if(t)switch(v(t)){case"stop":this.shape.switchShape(this.shapeBuilder("")),setTimeout(this.callback,2e3);break;default:this.shape.switchShape(this.shapeBuilder(t))}else clearInterval(this.interval)}},{key:"_setSequence",value:function(t){this.sequence=t.split("|"),this.maxRows=Math.max.apply(Math,s(this.sequence.filter((function(t){return!v(t)})).map((function(t){return t.length}))))}},{key:"set",value:function(t){var n=this;this.interval&&clearInterval(this.interval),this._setSequence(t),this._loopSwitchShape(),this.interval=setInterval((function(){n._loopSwitchShape()}),3e3)}},{key:"shapeBuilder",value:function(t){var n=this.canvas,e=n.ctx,i=n.canvas,r=function(t){e.font="bold ".concat(t,"px Avenir, Helvetica Neue, Helvetica, Arial, sans-serif")};r(500);var a=t.split(""),o=Math.min.apply(Math,s(a.map((function(t){return e.measureText(t).width})))),c=Math.min(500,i.width/o*.8*500,.8*i.height/this.maxRows);return r(c),e.clearRect(0,0,i.width,i.height),a.forEach((function(t,n){var r=e.measureText(t).width,o=(i.width-r)/2,s=(i.height-c*a.length)/2+c*(n+1)-.035*i.height;e.fillText(t,Math.floor(o),Math.floor(s))})),this._processCanvas()}},{key:"_processCanvas",value:function(){for(var t=this.canvas,n=t.canvas,e=n.width,i=n.height,r=t.ctx,a=this.gap,o=r.getImageData(0,0,e,i).data,s=[],c=0,u=0,h=0;h<o.length;h+=4*a)o[h+3]>0&&s.push({x:c,y:u}),(c+=a)>=e&&(c=0,h=4*(u+=a)*e-4*a);return s}}]),t}();function v(t){return(t=t&&t.split(" ")[0])&&"#"===t[0]&&t.substring(1)}var p=function(){function t(n,e){u(this,t),this.x=n,this.y=e,this.z=5,this.a=1,this.h=0,this.e=.07,this.s=!0,this.q=[],this.t={x:n,y:e,z:5,a:1,h:0},this.isStaticPrevious=!1}return l(t,[{key:"move",value:function(t,n){(!n||this.distanceTo(t)>1)&&this.q.push(t)}},{key:"distanceTo",value:function(t,n){var e=this.x-t.x,i=this.y-t.y,r=Math.sqrt(e*e+i*i);return n?{dx:e,dy:i,d:r}:r}},{key:"_moveTowards",value:function(t){var n=this.distanceTo(t,!0),e=n.dx,i=n.dy,r=n.d;return-1===this.h?(this.x=t.x,this.y=t.y,!0):r>1?(this.x-=e*this.e,this.y-=i*this.e,!1):!(this.h>0)||(this.h--,!1)}},{key:"update",value:function(){if(this._moveTowards(this.t)){var t=this.q.shift();t?(this.t.x=t.x||this.x,this.t.y=t.y||this.y,this.t.z=t.z||this.z,this.t.a=t.a||this.a,this.h=t.h||0):this.s||this.move({x:this.x+50*Math.random()-25,y:this.y+50*Math.random()-25})}var n=this.a-this.t.a;this.a=Math.max(.1,this.a-.05*n),n=this.z-this.t.z,this.z=Math.max(1,this.z-.05*n)}}]),t}();function g(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function y(t,n){for(var e=0;e<n.length;e++){var i=n[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function w(t,n,e){return n&&y(t.prototype,n),e&&y(t,e),t}function b(t,n){return function(t){if(Array.isArray(t))return t}(t)||function(t,n){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var e=[],i=!0,r=!1,a=void 0;try{for(var o,s=t[Symbol.iterator]();!(i=(o=s.next()).done)&&(e.push(o.value),!n||e.length!==n);i=!0);}catch(t){r=!0,a=t}finally{try{i||null==s.return||s.return()}finally{if(r)throw a}}return e}(t,n)||function(t,n){if(!t)return;if("string"==typeof t)return x(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(t);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return x(t,n)}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function x(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,i=new Array(n);e<n;e++)i[e]=t[e];return i}var M=function(t){return new Promise((function(n){var e=t.getContext("2d");e.globalCompositeOperation="lighter";var i=new I(e,t),r=function(){i.render(),window.requestAnimationFrame(r)};window.requestAnimationFrame(r);!function(t,n){var e=n.height,i=n.width,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){},a=10,o=[],s=setInterval((function(){for(var n=b(k({height:e,width:i},a),2),c=n[0],u=n[1],h=!0,l=0;l<o.length;l++){var f=o[l];if(Math.sqrt(Math.pow(f[0]-c,2)+Math.pow(f[1]-u,2))<1.3*I.options.bloomRadius.max){h=!1;break}}h&&(o.push([c,u]),t.createRandomBloom(c,u)),a>=30?(r(),clearInterval(s)):a+=.2}),50)}(i,t,(function(){n(),setTimeout((function(){r=function(){}}),5e3)}))}))};function k(t,n){var e=t.height,i=t.width,r=n/Math.PI,a=Math.min(e+100,i)/35;return[i/2+16*a*Math.pow(Math.sin(r),3),e/2+-a*(13*Math.cos(r)-5*Math.cos(2*r)-2*Math.cos(3*r)-Math.cos(4*r))-50]}var S=function(){function t(n,e){g(this,t),this.x=n,this.y=e}return w(t,[{key:"rotate",value:function(t){var n=this.x,e=this.y;return this.x=Math.cos(t)*n-Math.sin(t)*e,this.y=Math.sin(t)*n+Math.cos(t)*e,this}},{key:"mult",value:function(t){return this.x*=t,this.y*=t,this}},{key:"clone",value:function(){return new t(this.x,this.y)}},{key:"length",value:function(){return Math.sqrt(this.x*this.x+this.y*this.y)}},{key:"subtract",value:function(t){return this.x-=t.x,this.y-=t.y,this}},{key:"set",value:function(t,n){return this.x=t,this.y=n,this}}]),t}(),A=function(){function t(n,e,i,r,a,o){g(this,t),this.stretchA=n,this.stretchB=e,this.startAngle=i,this.angle=r,this.bloom=o,this.growFactor=a,this.r=1,this.isfinished=!1}return w(t,[{key:"draw",value:function(){var t=this.bloom.garden.ctx,n=new S(0,this.r).rotate(I.degrad(this.startAngle)),e=n.clone().rotate(I.degrad(this.angle)),i=n.clone().mult(this.stretchA),r=e.clone().mult(this.stretchB);t.strokeStyle=this.bloom.c,t.beginPath(),t.moveTo(n.x,n.y),t.bezierCurveTo(i.x,i.y,r.x,r.y,e.x,e.y),t.stroke()}},{key:"render",value:function(){this.r<=this.bloom.r?(this.r+=this.growFactor,this.draw()):this.isfinished=!0}}]),t}(),C=function(){function t(n,e,i,r,a){g(this,t),this.p=n,this.r=e,this.c=i,this.pc=r,this.petals=[],this.garden=a,this.init()}return w(t,[{key:"draw",value:function(){this.garden.ctx.save(),this.garden.ctx.translate(this.p.x,this.p.y),this.petals.forEach((function(t){t.render()})),this.garden.ctx.restore()}},{key:"init",value:function(){for(var t=360/this.pc,n=I.randomInt(0,90),e=0;e<this.pc;e++)this.petals.push(new A(I.random(I.options.petalStretch.min,I.options.petalStretch.max),I.random(I.options.petalStretch.min,I.options.petalStretch.max),n+e*t,t,I.random(I.options.growFactor.min,I.options.growFactor.max),this))}}]),t}(),I=function(){function t(n,e){g(this,t),this.blooms=[],this.element=e,this.ctx=n}return w(t,[{key:"render",value:function(){for(var t=0;t<this.blooms.length;t++)this.blooms[t].draw()}},{key:"addBloom",value:function(t){this.blooms.push(t)}},{key:"removeBloom",value:function(t){for(var n=0;n<this.blooms.length;n++)if(this.blooms[n]===t)return this.blooms.splice(n,1),this}},{key:"createRandomBloom",value:function(n,e){var i=t.options,r=t.randomInt(i.bloomRadius.min,i.bloomRadius.max),a=t.randomrgba(i.color.rmin,i.color.rmax,i.color.gmin,i.color.gmax,i.color.bmin,i.color.bmax,i.color.opacity),o=t.randomInt(i.petalCount.min,i.petalCount.max);this.createBloom(n,e,r,a,o)}},{key:"createBloom",value:function(t,n,e,i,r){this.addBloom(new C(new S(t,n),e,i,r,this))}},{key:"clear",value:function(){this.blooms=[],this.ctx.clearRect(0,0,this.element.width,this.element.height)}}],[{key:"random",value:function(t,n){return Math.random()*(n-t)+t}},{key:"randomInt",value:function(t,n){return Math.floor(Math.random()*(n-t+1))+t}},{key:"degrad",value:function(n){return t.circle/360*n}},{key:"raddeg",value:function(n){return n/t.circle*360}},{key:"rgba",value:function(t,n,e,i){return"rgba("+t+","+n+","+e+","+i+")"}},{key:"randomrgba",value:function(n,e,i,r,a,o,s){var c=Math.round(t.random(n,e)),u=Math.round(t.random(i,r)),h=Math.round(t.random(a,o));return Math.abs(c-u)<=5&&Math.abs(u-h)<=5&&Math.abs(h-c)<=5?t.rgba(n,e,i,r,a,o,s):t.rgba(c,u,h,s)}}]),t}();function T(t){var n=window.devicePixelRatio;t.width=parseInt(window.getComputedStyle(t).width)*n,t.height=parseInt(window.getComputedStyle(t).height)*n}function j(t,n){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){},i=document.getElementById(t),r=0,a=setInterval((function(){r>=1&&(clearInterval(a),e()),i.style.opacity=r,r+=200/n}),200)}I.options={petalCount:{min:9,max:9},petalStretch:{min:1,max:3},growFactor:{min:.1,max:1},bloomRadius:{min:20,max:20},density:10,growSpeed:25,color:{rmin:128,rmax:255,gmin:0,gmax:128,bmin:0,bmax:128,opacity:.1},tanAngle:60},I.circle=2*Math.PI;e(0);function F(){var t=new Date;t.setFullYear(2019,6,13),t.setHours(23),t.setMinutes(45),t.setSeconds(0),t.setMilliseconds(0),q(t),setInterval((function(){q(t)}),1e3),j("messages",5e3,R)}function R(){j("loveu",2e3)}function q(t){var n=Date(),e=(Date.parse(n)-Date.parse(t))/1e3,i=Math.floor(e/86400);e%=86400;var r=Math.floor(e/3600);r<10&&(r="0"+r),e%=3600;var a=Math.floor(e/60);a<10&&(a="0"+a),(e%=60)<10&&(e="0"+e),document.getElementById("elapseClock").innerHTML='\n      <span class="digit">'.concat(i,'</span> days\n      <span class="digit">').concat(r,'</span> hours\n      <span class="digit">').concat(a,'</span> minutes\n      <span class="digit">').concat(e,"</span> seconds\n    ")}window.onload=function(){document.addEventListener("touchmove",(function(t){t.preventDefault()}),{passive:!1}),document.body.style.overflow="hidden",function(){for(var t=0,n=["webkit","moz"],e=0;e<n.length&&!window.requestAnimationFrame;++e)window.requestAnimationFrame=window[n[e]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[n[e]+"CancelAnimationFrame"]||window[n[e]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){},e=(new Date).getTime(),i=Math.max(0,16-(e-t)),r=window.setTimeout((function(){n(e+i)}),i);return t=e+i,r}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)})}(),document.getElementsByTagName("body").item(0).innerHTML='\n        <canvas id="bubbles" class="fullscreen" ></canvas>\n        <canvas id="garden" class="fullscreen"></canvas>\n        <div class="fullscreen container">\n            <div id="words">\n                <div id="messages" style="opacity: 0">\n                    Yue Yue, We have been together for\n\t\t\t\t<div id="elapseClock"></div>\n                </div>\n                <div id="loveu" style="opacity: 0">\n                    My heart belongs to you.\n\t\t\t\t<div class="signature">- Rui Rui</div>\n                </div>\n            </div>\n        </div>\n        <audio autoplay="autoplay" loop="loop">\n            <source src="http://oss.sweetlove.top/chun.mp3" type="audio/mpeg">\n        </audio>',function(){var t=document.getElementById("bubbles"),n=document.getElementById("garden"),e=Math.min(window.innerWidth/700,window.innerHeight/550,1);document.getElementById("words").style.transform="scale(".concat(e,")"),T(t),T(n);var i=window.devicePixelRatio;(function(t,n){return new Promise((function(e){var i=7*n,r=new f(t),o=new d(r,i),s=new m(r,i,o,e);window.requestAnimationFrame((function t(){r.clear(),o.render(),window.requestAnimationFrame(t)})),s.set(a+"|#stop")}))})(t,i).then((function(){return M(n)})).then(F)}()}}]);