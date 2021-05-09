(this.webpackJsonplists=this.webpackJsonplists||[]).push([[0],{28:function(e,t,n){e.exports=n(42)},33:function(e,t,n){},34:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var i=n(0),a=n.n(i),r=n(14),o=n.n(r),c=(n(33),n(10)),l=n(17),d=n(2),s=(n(34),n(3)),u=n(27),p=n(9),f=n(13),m=n.n(f),v=Object(p.d)(),h=Object(p.b)(),g=h.getInitialState({topList:v,displayedList:v});g=h.addOne(g,{id:v,title:"List Name",description:"",children:[]});var b=Object(p.c)({name:"list",initialState:g,reducers:{changeListTitle:function(e,t){var n=t.payload,i=n.id,a=n.title,r=e.entities[i];r&&(r.title=a)},changeListDescription:function(e,t){var n=t.payload,i=n.id,a=n.description,r=e.entities[i];r&&(r.description=a)},addList:{reducer:function(e,t){h.addOne(e,{id:t.payload.childId,title:t.payload.title,description:t.payload.description,children:[]}),e.entities[t.payload.parentId].children.push(t.payload.childId)},prepare:function(e){return{payload:{parentId:e,childId:Object(p.d)(),title:"List Name",description:""}}}},addParentToList:{reducer:function(e,t){h.addOne(e,{id:t.payload.parentId,title:t.payload.title,description:t.payload.description,children:[t.payload.childId]});var n=Object.values(e.entities).find((function(e){return null===e||void 0===e?void 0:e.children.includes(t.payload.childId)}));if(n){var i=e.entities[n.id].children.findIndex((function(e){return e===t.payload.childId}));e.entities[n.id].children[i]=t.payload.parentId}e.displayedList=t.payload.parentId,e.topList===t.payload.childId&&(e.topList=t.payload.parentId)},prepare:function(e){return{payload:{parentId:Object(p.d)(),childId:e,title:"List Name",description:""}}}},dropList:function(e,t){var n=t.payload,i=n.parentId,a=n.childId,r=n.oldParentId;if(r&&i!==a&&i!==r&&!function e(t,n){var i=n.parentId,a=n.childId,r=t.entities[i];if(!(null===r||void 0===r?void 0:r.children))return!1;if(null===r||void 0===r?void 0:r.children.includes(a))return!0;var o,c=Object(u.a)(r.children);try{for(c.s();!(o=c.n()).done;){if(e(t,{parentId:o.value,childId:a}))return!0}}catch(l){c.e(l)}finally{c.f()}return!1}(e,{parentId:a,childId:i})){var o=e.entities[i],c=e.entities[r],l=c.children.findIndex((function(e){return e===a}));c.children.splice(l,1),o.children.push(a)}},removeList:function(e,t){var n=t.payload,i=n.listId,a=n.parentId,r=e.entities[a],o=r.children.findIndex((function(e){return e===i}));r.children.splice(o,1)},changeDisplayedList:function(e,t){e.displayedList=t.payload}}}),E=b.actions,I=E.changeListTitle,y=E.changeListDescription,O=E.addList,L=(E.addParentToList,E.dropList),j=E.removeList,w=(E.changeDisplayedList,E.undo,E.redo,function(e){return e.list.present.topList}),S=h.getSelectors((function(e){return e.list.present})),N=(S.selectAll,S.selectById),B=(S.selectIds,function(e){return e.list.past.length>0}),k=function(e){return e.list.future.length>0},C=m()(b.reducer);function D(e){var t=Object(i.useState)(e.title),n=Object(c.a)(t,2),r=n[0],o=n[1],l=Object(i.useState)(!1),d=Object(c.a)(l,2),u=d[0],p=d[1],f=Object(s.b)();return a.a.createElement("summary",{className:"ListTitle"},u?a.a.createElement("input",{type:"text",value:r,autoFocus:!0,onBlur:function(){p(!1),f(I({id:e.id,title:r}))},onChange:function(e){o(e.currentTarget.value)},onFocus:function(e){e.currentTarget.select()},onKeyDown:function(e){"Enter"===e.key&&e.currentTarget.blur()}}):a.a.createElement("span",null,e.title,a.a.createElement("button",{className:"EditButton EditTitleButton",onClick:function(){o(e.title),p(!0)}},"Edit"),a.a.createElement("button",{className:"EditButton DragButton",draggable:"true",onDragStart:function(t){t.dataTransfer.setData("text/plain",JSON.stringify({id:e.id,parentId:e.parentId}))}},"Drag Here"),e.parentId?a.a.createElement("button",{className:"EditButton RemoveTitleButton",onClick:function(){f(j({listId:e.id,parentId:e.parentId}))}},"Remove"):""))}function T(e){var t=Object(i.useState)(e.description),n=Object(c.a)(t,2),r=n[0],o=n[1],l=Object(i.useState)(!1),d=Object(c.a)(l,2),u=d[0],p=d[1],f=Object(s.b)();return u?a.a.createElement("textarea",{value:r,autoFocus:!0,onBlur:function(){p(!1),f(y({id:e.id,description:r}))},onChange:function(e){o(e.currentTarget.value)},onFocus:function(e){e.currentTarget.select()}}):a.a.createElement("div",null,e.description?a.a.createElement("p",{className:"ListDescription"},e.description):"",a.a.createElement("button",{className:"EditButton EditDescriptionButton",onClick:function(){o(e.description),p(!0)}},"Edit"))}function x(e){var t=e.listId,n=e.parentId,i=Object(s.b)(),r=Object(s.c)((function(e){return N(e,t)}));return r?a.a.createElement("details",{className:"ListItem",open:!0,onDragOver:function(e){return e.preventDefault()},onDrop:function(e){e.stopPropagation();var n=JSON.parse(e.dataTransfer.getData("text/plain")),a=n.id,r=n.parentId;return i(L({parentId:t,childId:a,oldParentId:r})),!1}},a.a.createElement(D,{id:r.id,parentId:n,title:r.title}),a.a.createElement("div",{className:"ListChildren"},a.a.createElement(T,{id:r.id,description:r.description}),r.children.map((function(e){return a.a.createElement(x,{key:e,listId:e,parentId:r.id})})),a.a.createElement("div",null,a.a.createElement("button",{onClick:function(){return i(O(r.id))},className:"EditButton AddChildButton"},"+")))):a.a.createElement("div",null,"missing list")}var A=function(e){var t=e.match,n=Object(s.c)(w);t&&(n=t.params.id);var r=Object(s.c)((function(e){return N(e,n)})),o=Object(s.b)(),l=Object(s.c)(B),d=Object(s.c)(k),u=Object(i.useState)("ViewMode"),p=Object(c.a)(u,2),m=p[0],v=p[1];if(!r)return a.a.createElement("p",null,"Not a valid list");var h=r.id,g=r.title,b=r.description;return a.a.createElement(a.a.Fragment,null,a.a.createElement("select",{value:m,onChange:function(e){return v(e.currentTarget.value)}},a.a.createElement("option",{value:"EditMode"},"Edit"),a.a.createElement("option",{value:"ViewMode"},"View")),a.a.createElement("div",{className:m,onDragOver:function(e){return e.preventDefault()},onDrop:function(e){e.stopPropagation();var t=JSON.parse(e.dataTransfer.getData("text/plain")),n=t.id,i=t.parentId;return o(L({parentId:h,childId:n,oldParentId:i})),!1}},a.a.createElement(D,{id:h,title:g,parentId:""}),a.a.createElement(T,{id:h,description:b}),r.children.map((function(e){return a.a.createElement(x,{key:e,listId:e,parentId:h})})),a.a.createElement("div",null,a.a.createElement("button",{onClick:function(){return o(O(h))},className:"EditButton AddChildButton"},"+")),a.a.createElement("button",{className:"EditButton ControlButton UndoButton",disabled:!l,onClick:function(){o(f.ActionCreators.undo())}}," ","Undo"),a.a.createElement("button",{className:"EditButton ControlButton RedoButton",disabled:!d,onClick:function(){o(f.ActionCreators.redo())}}," ","Redo")))};var P=function(){return Object(s.c)(w),a.a.createElement(l.a,null,a.a.createElement("div",{className:"App"},a.a.createElement(d.d,null,a.a.createElement(d.b,{path:"/lists"},a.a.createElement(A,null)),a.a.createElement(d.b,{exact:!0,path:"lists/:id",component:A}),a.a.createElement(d.a,{to:"/lists"}))))},W=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function J(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var R=localStorage.getItem("reduxState"),F=R?{list:JSON.parse(R)}:{};console.log("Loaded: ",R);var U=Object(p.a)({reducer:{list:C},preloadedState:F});U.subscribe((function(){return function(){var e=U.getState(),t=JSON.stringify(e.list.present);localStorage.setItem("reduxState",t),console.log("Saved state",t)}()}));var M=U;o.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(s.a,{store:M},a.a.createElement(P,null))),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/lists",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/lists","/service-worker.js");W?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var i=n.headers.get("content-type");404===n.status||null!=i&&-1===i.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):J(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):J(t,e)}))}}()}},[[28,1,2]]]);
//# sourceMappingURL=main.3e9f5f4f.chunk.js.map