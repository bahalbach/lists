(this.webpackJsonplists=this.webpackJsonplists||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var c,o=n(0),a=n.n(o),l=n(7),i=n.n(l),r=(n(13),n(4)),u=n(1),s=n(5);n(14);!function(e){e[e.None=0]="None",e[e.Title=1]="Title",e[e.Description=2]="Description"}(c||(c={}));var d=Object(s.a)(),m=[],f=[];function h(e){var t=Object(o.useState)(c.None),n=Object(u.a)(t,2),l=n[0],i=n[1],r=Object(o.useState)(e.text),s=Object(u.a)(r,2),d=s[0],m=s[1],f=Object(o.useState)(e.desc),E=Object(u.a)(f,2),b=E[0],g=E[1];return console.log("Render: ",e.text),a.a.createElement("details",{className:"ListItem"},a.a.createElement("summary",{className:"ListTitle"},l===c.Title?a.a.createElement("input",{type:"text",value:d,autoFocus:!0,onBlur:function(){i(c.None),e.global.saveChangedTitle(e.nodeId,d)},onChange:function(e){m(e.currentTarget.value)},onFocus:function(e){e.currentTarget.select()}}):a.a.createElement("span",null,e.text,a.a.createElement("button",{className:"EditButton EditTitleButton",onClick:function(){m(e.text),i(c.Title)}},"Edit"),a.a.createElement("button",{className:"EditButton RemoveTitleButton",onClick:e.global.removeThis(e.nodeId)},"Remove"))),a.a.createElement("div",{className:"ListChildren"},a.a.createElement("div",{className:"ListDescription"},l===c.Description?a.a.createElement("textarea",{value:b,autoFocus:!0,onBlur:function(){return i(c.None)},onChange:function(e){g(e.currentTarget.value)}}):a.a.createElement("div",null,e.desc,a.a.createElement("br",null),a.a.createElement("button",{className:"EditButton EditDescriptionButton",onClick:function(){g(e.desc),i(c.Description)}},"Edit"))),e.children.map((function(t){var n=e.global.nodes.find((function(e){return e.id===t.childId})),c=n.text,o=n.desc,l=e.global.children.filter((function(t){return t.parentId===e.nodeId}));return a.a.createElement(h,{key:t.childId,nodeId:t.childId,text:c,desc:o,children:l,global:e.global})})),a.a.createElement("div",null,a.a.createElement("button",{onClick:e.global.addChild(e.nodeId),className:"AddChildButton"},"+"))))}function E(){return a.a.createElement("select",null)}var b=function(){var e=Object(o.useState)(0),t=Object(u.a)(e,2),n=t[0],l=t[1],i=Object(o.useState)([m]),b=Object(u.a)(i,2),g=b[0],v=b[1],p=Object(o.useState)([f]),I=Object(u.a)(p,2),N=I[0],C=I[1],T=Object(o.useState)(c.None),j=Object(u.a)(T,2),B=j[0],O=j[1],x=Object(o.useState)("Title"),k=Object(u.a)(x,2),y=k[0],D=k[1],S=Object(o.useState)(""),w=Object(u.a)(S,2),F=w[0],L=w[1],R=g[n],A=N[n];console.log("Nodes: ",R),console.log("Children: ",A);var H=function(e,t){var c=R.slice(),o=R.findIndex((function(t){return e===t.id})),a=R[o];c[o]={id:a.id,text:t,desc:a.desc},v(g.slice(0,n+1).concat([c])),C(N.slice(0,n+1).concat([A])),l(n+1),console.log("New title: ",t)},J=function(e,t){var c=R.slice(),o=R.findIndex((function(t){return e===t.id})),a=R[o];c[o]={id:a.id,text:a.text,desc:t},v(g.slice(0,n+1).concat([c])),C(N.slice(0,n+1).concat([A])),l(n+1)},U=function(e){return function(){var t=Object(s.a)();v(g.slice(0,n+1).concat([[].concat(Object(r.a)(R),[{id:t,text:"Title",desc:""}])])),C(N.slice(0,n+1).concat([[].concat(Object(r.a)(A),[{parentId:e,childId:t}])])),l(n+1)}},W=function(e){return function(){for(var t=[e],c=g[n],o=N[n],a=0,i=function(){var e=t;c=c.filter((function(t){return!e.includes(t.id)})),o=o.filter((function(t){return!e.includes(t.childId)})),t=A.filter((function(t){return e.includes(t.parentId)})).map((function(e){return e.childId})),a+=e.length};t.length;)i();console.log("Removed ids: ",a),v(g.slice(0,n+1).concat([c])),C(N.slice(0,n+1).concat([o])),l(n+1)}};return a.a.createElement("div",{className:"App"},a.a.createElement(E,null),a.a.createElement("summary",{className:"ListTitle"},B===c.Title?a.a.createElement("input",{type:"text",value:y,autoFocus:!0,onBlur:function(){return O(c.None)},onChange:function(e){D(e.currentTarget.value)},onFocus:function(e){e.currentTarget.select()}}):a.a.createElement("span",null,y,a.a.createElement("button",{className:"EditButton EditTitleButton",onClick:function(){O(c.Title)}},"Edit"))),a.a.createElement("div",{className:"ListDescription"},B===c.Description?a.a.createElement("textarea",{value:F,autoFocus:!0,onBlur:function(){return O(c.None)},onChange:function(e){L(e.currentTarget.value)}}):a.a.createElement("div",null,F,a.a.createElement("br",null),a.a.createElement("button",{className:"EditButton EditDescriptionButton",onClick:function(){O(c.Description)}},"Edit"))),A.filter((function(e){return e.parentId===d})).map((function(e){var t=R.find((function(t){return t.id===e.childId})),n=t.text,c=t.desc,o=A.filter((function(e){return e.parentId===d}));return a.a.createElement(h,{key:e.childId,nodeId:e.childId,text:n,desc:c,children:o,global:{nodes:R,children:A,addChild:U,removeThis:W,saveChangedTitle:H,saveChangedDescription:J}})})),a.a.createElement("div",null,a.a.createElement("button",{onClick:U(d),className:"AddChildButton"},"+")),a.a.createElement("button",{className:"ControlButton UndoButton",onClick:function(){console.log("historyIndex: ",n),console.log("nodeHistory.length: ",g.length),n>0&&l(n-1)}}," Undo"),a.a.createElement("button",{className:"ControlButton RedoButton",onClick:function(){console.log("historyIndex: ",n),console.log("nodeHistory.length: ",g.length),n<g.length-1&&l(n+1)}}," Redo"))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(b,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},8:function(e,t,n){e.exports=n(15)}},[[8,1,2]]]);
//# sourceMappingURL=main.55433912.chunk.js.map