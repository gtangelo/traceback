(this.webpackJsonptracker_2=this.webpackJsonptracker_2||[]).push([[0],{103:function(e,t,n){},104:function(e,t,n){},111:function(e,t,n){},113:function(e,t,n){},114:function(e,t,n){"use strict";n.r(t);var c=n(2),s=n(1),r=n.n(s),a=n(12),o=n.n(a),i=n(10),l=n(13),u=n.n(l);u.a.defaults.baseURL="https://ich7sma0mc.execute-api.us-east-2.amazonaws.com";n(103),n(104);var b=n(46),j=n(16),d=n(70),h=n(14),f=n(15),O=n(149);function x(){var e=Object(h.a)(["\n  width: ",";\n  height: ",";\n  border-radius: ",";\n"]);return x=function(){return e},e}function m(){var e=Object(h.a)(["\n  height: 25px;\n  /* background: linear-gradient(180deg, #bb6bd9 0%, #9144d8 100%); */\n  background: linear-gradient(\n    360deg,\n    rgba(51, 152, 67, 1) 0%,\n    rgba(56, 181, 76, 1) 100%\n  );\n  border-radius: 20px;\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  padding: 0 10px;\n  font-size: 15px;\n"]);return m=function(){return e},e}function g(){var e=Object(h.a)(["\n  width: 100px;\n"]);return g=function(){return e},e}function v(){var e=Object(h.a)(["\n  width: 20px;\n  height: 20px;\n  border-radius: 20px;\n  padding: 0;\n  background: ",";\n"]);return v=function(){return e},e}function p(){var e=Object(h.a)(["\n  width: 22px;\n  border-radius: 22px;\n  padding: 0;\n"]);return p=function(){return e},e}function k(){var e=Object(h.a)(["\n  ","\n  cursor: pointer;\n  padding: 0 5px;\n  height: 22px;\n  border-radius: 22px;\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n  background: linear-gradient(\n    360deg,\n    rgba(208, 208, 208, 1) 0%,\n    rgba(249, 249, 249, 1) 100%\n  );\n  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);\n  color: #333333;\n"]);return k=function(){return e},e}function T(){var e=Object(h.a)(["\n  border: 0;\n  padding: 0;\n  font-family: inherit;\n  font-weight: normal;\n  background: unset;\n  box-sizing: border-box;\n  outline: none;\n"]);return T=function(){return e},e}var D=Object(f.a)(T()),w=f.b.button(k(),D),C=Object(f.b)(w)(p()),N=Object(f.b)(w)(v(),(function(e){return e.colour})),I=Object(f.b)(w)(g()),y=Object(f.b)(w)(m()),S=Object(f.b)(N)(x(),(function(e){return!0===e.selected?"25px":"20px"}),(function(e){return!0===e.selected?"25px":"20px"}),(function(e){return!0===e.selected?"25px":"20px"})),F=function(e){var t=e.button,n=e.title,s=e.colour,r=e.children,a=e.onClick;return Object(c.jsx)(O.a,{title:n,arrow:!0,placement:"top",children:Object(c.jsx)(t,{colour:s,onClick:a,children:r})})},L=function(e){var t=e.tab,n=e.setTab,s="off",r="off",a="off",o="off";0===t&&(s="on"),1===t&&(r="on"),2===t&&(a="on"),3===t&&(o="on");return Object(c.jsxs)("nav",{className:"navbar-container",children:[Object(c.jsxs)("div",{style:{width:"100%"},children:[Object(c.jsx)("div",{className:"nav-item-"+s,onClick:function(){return n(0)},children:Object(c.jsx)(b.a,{size:"25px",color:"on"===s?"#333333":"#F2F2F2"})}),Object(c.jsx)("div",{className:"nav-item-"+r,onClick:function(){return n(1)},children:Object(c.jsx)(b.c,{size:"25px",color:"on"===r?"#333333":"#F2F2F2"})}),Object(c.jsx)("div",{className:"nav-item-"+a,onClick:function(){return n(2)},children:Object(c.jsx)(d.a,{size:"25px",color:"on"===a?"#333333":"#F2F2F2"})}),Object(c.jsx)("div",{className:"nav-item-"+o,onClick:function(){return n(3)},children:Object(c.jsx)(b.b,{size:"25px",color:"on"===o?"#333333":"#F2F2F2"})})]}),Object(c.jsxs)("div",{className:"navbar-btn-section",children:[Object(c.jsx)(F,{button:C,title:"Clear Local Storage",onClick:function(){chrome.storage.local.set({currTasks:[],totalTime:0}),chrome.storage.local.remove(["lastUsed"])},style:{marginBottom:10},children:Object(c.jsx)(j.g,{size:"14px",color:"#333333"})}),Object(c.jsx)(F,{button:C,title:"Reset Data",onClick:function(){chrome.storage.local.set({currTasks:[],totalTime:0}),chrome.storage.local.remove(["lastUsed"]),u.a.delete("/clear",{params:{userID:1}}).catch((function(e){return console.log(e)}))},style:{marginBottom:10},children:Object(c.jsx)(j.i,{size:"14px",color:"#333333"})})]})]})},z=n(72),P=(n(49),n(146));function E(){var e=Object(h.a)(["\n  font-weight: bolder;\n  font-size: 12px;\n"]);return E=function(){return e},e}function M(){var e=Object(h.a)(["\n  font-size: 14px;\n  font-weight: bold;\n"]);return M=function(){return e},e}function B(){var e=Object(h.a)(["\n  font-size: 16px;\n  font-weight: bolder;\n"]);return B=function(){return e},e}function A(){var e=Object(h.a)(["\n  color: ",";\n"]);return A=function(){return e},e}function U(){var e=Object(h.a)(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n"]);return U=function(){return e},e}var _=f.b.div(U()),H=f.b.div(A(),(function(e){return e.dark?"#333333":"#F2F2F2"})),R=Object(f.b)(H)(B()),J=Object(f.b)(H)(M()),Y=Object(f.b)(H)(E()),q="#626262",G=["#DA3A37","#3764A5","#DFA84D","#D8D9C6","#427F56","#CED987","#8C9895","#2D3436","#BBBBBB","#CE4E24"],K=function(e){var t=Math.floor(e/3600);e%=3600;var n=Math.floor(e/60),c=e%60;return t<10&&(t="0"+t),n<10&&(n="0"+n),c<10&&(c="0"+c),"".concat(t," : ").concat(n," : ").concat(c)},Q=function(e){var t=new Date(0);t.setUTCSeconds(e),t.setHours(0,0,0,0);var n=new Date;n.setHours(0,0,0,0);var c=new Date(n);return c.setDate(c.getDate()-1),n.getTime()===t.getTime()?"Today":c.getTime()===t.getTime()?"Yesterday":t.toDateString()},V=function(e){var t=[e.substring(1,3),e.substring(3,5),e.substring(5,7)],n="rgb(".concat(t.map((function(e){return.8*parseInt(e,16)})).join(),")");return"linear-gradient(\n      ".concat(e," 50%,\n      ").concat(n," 100%\n    );")},W=function(e,t){var n="#eeeeee";return e.forEach((function(e){e.labelID===t&&(n=e.colour)})),n},X=function(e,t){var n="None";return e.forEach((function(e){e.labelID===t&&(n=e.name)})),"Category: "+n},Z=function(e,t){var n=new Date(0);n.setUTCSeconds(e),n.setHours(0,0,0,0);var c=new Date(0);return c.setUTCSeconds(t),c.setHours(0,0,0,0),n.getTime()===c.getTime()},$=function(e){var t=e.setLabels,n=e.setToggleLabelForm,r=Object(s.useState)(""),a=Object(i.a)(r,2),o=a[0],l=a[1],b=Object(s.useState)(null),d=Object(i.a)(b,2),h=d[0],f=d[1],O=Object(s.useState)(""),x=Object(i.a)(O,2),m=x[0],g=x[1];return console.log(V(G[0])),Object(c.jsxs)("div",{style:{width:"100%"},children:[Object(c.jsx)(P.a,{id:"labelName",type:"text",placeholder:"Label Name",className:"text-field",onChange:function(e){return g(e.target.value)}}),Object(c.jsx)("br",{}),Object(c.jsx)(J,{dark:!0,children:"Select Colour"}),Object(c.jsx)("div",{className:"label-colours-section",children:G.map((function(e){return Object(c.jsx)("div",{className:"radio-btn-container",children:Object(c.jsx)(S,{colour:V(e),className:h===e?"radio-btn-on":"radio-btn-off",selected:h===e,onClick:function(){return f(e)}})})}))}),o,Object(c.jsxs)(y,{onClick:function(){m.length>0&&null!=h?(n((function(e){return!e})),u.a.post("/label/create",{userID:1,colour:h,name:m}).then((function(e){var n=e.data;t((function(e){return[].concat(Object(z.a)(e),[{userID:1,labelID:n.labelID,name:m,colour:h}])})),g(""),f(null)})).catch((function(e){return console.log(e)}))):(l("Missing Fields"),null===h&&l("Colour tag must be selected"),m.length<=0&&l("Label must be greater than 0 characters"))},style:{float:"right"},children:[Object(c.jsx)(j.f,{size:"12px",color:"#333333"}),Object(c.jsx)(Y,{children:"Create Label"})]})]})};function ee(){var e=Object(h.a)(["\n  height: 255px;\n  overflow: auto;\n"]);return ee=function(){return e},e}function te(){var e=Object(h.a)(["\n  height: auto;\n"]);return te=function(){return e},e}function ne(){var e=Object(h.a)(["\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  background-color: #f2f2f2;\n  z-index: 1;\n  width: 380px;\n  padding: 10px;\n  color: #333333;\n"]);return ne=function(){return e},e}function ce(){var e=Object(h.a)(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.5);\n"]);return ce=function(){return e},e}var se=f.b.div(ce()),re=f.b.div(ne()),ae=Object(f.b)(re)(te()),oe=Object(f.b)(re)(ee());function ie(){var e=Object(h.a)(["\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  gap: 7px;\n"]);return ie=function(){return e},e}function le(){var e=Object(h.a)(["\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  gap: 10px;\n  width: auto;\n\n  &:hover {\n    cursor: ",";\n  }\n"]);return le=function(){return e},e}function ue(){var e=Object(h.a)(["\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 10px;\n"]);return ue=function(){return e},e}function be(){var e=Object(h.a)(["\n  width: 400px;\n  height: 100%;\n  padding: 15px;\n  background-color: #333333;\n  color: #e0e0e0;\n  overflow: auto;\n"]);return be=function(){return e},e}var je=f.b.div(be()),de=f.b.div(ue()),he=f.b.div(le(),(function(e){return e.hover?"pointer":"default"})),fe=f.b.div(ie()),Oe=function(e){u.a.get("/active-tasks/retrieve",{params:{userID:1}}).then((function(t){var n=t.data.tasks_list.sort((function(e,t){return t.start-e.start}));e(n),chrome.storage.local.set({currTasks:n})})).catch((function(e){return console.log(e)}))},xe=function(e){u.a.get("/labels/retrieve",{params:{userID:1}}).then((function(t){var n=t.data.labels;e(n)})).catch((function(e){return console.log(e)}))},me=function(e){u.a.get("/inactive-tasks/retrieve",{params:{userID:1}}).then((function(t){var n=t.data.tasks_list.sort((function(e,t){return t.start-e.start}));e(n)})).catch((function(e){return console.log(e)}))},ge=function(e){chrome.storage.local.get(["currTasks"],(function(t){var n=t.currTasks;u.a.put("/active-tasks/sync",{tasks_list:n}).then((function(){Oe(e)})).catch((function(e){return console.log(e)}))}))},ve=function(e){var t=e.labels,n=e.setLabels,r=Object(s.useState)(!1),a=Object(i.a)(r,2),o=a[0],l=a[1];return Object(c.jsxs)(je,{children:[o&&Object(c.jsxs)("div",{children:[Object(c.jsx)(se,{onClick:function(){return l((function(e){return!e}))}}),Object(c.jsx)(oe,{children:Object(c.jsx)($,{setToggleLabelForm:function(){return l((function(e){return!e}))},labels:t,setLabels:n})})]}),Object(c.jsxs)(_,{children:[Object(c.jsx)(R,{children:"Labels"}),Object(c.jsxs)(y,{onClick:function(){return l((function(e){return!e}))},children:[Object(c.jsx)(j.f,{size:"16px",color:"#333333"}),Object(c.jsx)(Y,{children:"Add Label"})]})]}),Object(c.jsx)("br",{}),Object(c.jsx)("div",{children:Object(c.jsx)(de,{children:Object(c.jsxs)(he,{children:[Object(c.jsx)(N,{colour:V(W(t,0))}),Object(c.jsx)("div",{className:"task-name",children:"None"})]})})}),t.map((function(e,s){return Object(c.jsxs)(de,{children:[Object(c.jsxs)(he,{children:[Object(c.jsx)(N,{colour:V(W(t,e.labelID))}),Object(c.jsx)("div",{className:"task-name",children:e.name})]}),Object(c.jsx)(fe,{children:Object(c.jsx)(F,{title:"Delete",button:C,onClick:function(){return t=e.labelID,void u.a.delete("/label/delete",{params:{userID:1,labelID:t}}).then((function(){xe(n)})).catch((function(e){return console.log(e)}));var t},children:Object(c.jsx)(j.a,{size:"16px",color:"#333333"})})})]},s)}))]})},pe=(n(62),n(35)),ke=function(e){var t=e.setToggleInfo,n=e.task,s=e.labels;return Object(c.jsxs)("div",{children:[Object(c.jsx)(se,{onClick:function(){return t((function(e){return!e}))}}),Object(c.jsxs)(ae,{children:[Object(c.jsxs)("div",{id:"main-info-section",children:[Object(c.jsxs)("div",{className:"name-container",children:[Object(c.jsx)(J,{dark:!0,children:n.name}),Object(c.jsx)("div",{children:n.description}),Object(c.jsx)("div",{className:"task-label",style:{background:W(s,n.labelID)},children:X(s,n.labelID)})]}),Object(c.jsx)("div",{className:"time-container",children:K(n.time)})]}),Object(c.jsx)("br",{}),Object(c.jsxs)("div",{id:"date-info-section",children:[Object(c.jsxs)("div",{className:"date-container",children:[Object(c.jsx)("div",{className:"title",children:"Task Created on"}),Object(c.jsx)("div",{className:"response",children:Q(n.start)})]}),Object(c.jsxs)("div",{className:"date-container",children:[Object(c.jsx)("div",{className:"title",children:n.end?"Task Ended on":"Task Status"}),Object(c.jsx)("div",{className:"response",children:n.end?Q(n.end):"Ongoing Task"})]})]})]})]})},Te=function(e){var t=e.task,n=e.labels,r=e.tab,a=e.showDelete,o=e.showFinish,l=e.setCurrTasks,b=e.setPastTasks,d=Object(s.useState)(!1),h=Object(i.a)(d,2),f=h[0],O=h[1],x=function(e){var t,n,c;e.onPlay&&(t=e.userID,n=e.taskID,c=e.time,u.a.put("/active-task/update",{userID:t,taskID:n,time:c}).catch((function(e){return console.log(e)})),console.log("updated task")),chrome.storage.local.get("currTasks",(function(t){var n=t.currTasks;chrome.storage.local.set({currTasks:n.map((function(t){return t.taskID===e.taskID?Object(pe.a)(Object(pe.a)({},t),{},{onPlay:!e.onPlay}):t}))})}))};return Object(c.jsxs)("div",{children:[Object(c.jsx)("div",{className:f?"":"hide-modal",children:Object(c.jsx)(ke,{setToggleInfo:O,task:t,labels:n})}),Object(c.jsxs)(de,{children:[Object(c.jsxs)(he,{hover:!0,onClick:function(){return O((function(e){return!e}))},children:[Object(c.jsx)(F,{title:X(n,t.labelID),colour:V(W(n,t.labelID)),button:N,children:Object(c.jsx)(j.b,{size:"12px",color:"#333333"})}),Object(c.jsx)(Y,{children:t.name})]}),0===r?Object(c.jsxs)(fe,{children:[Object(c.jsxs)(F,{title:"Play/Pause",button:I,onClick:function(){return x(t)},children:[t.onPlay?Object(c.jsx)(j.d,{size:"16px",color:"#333333"}):Object(c.jsx)(j.e,{size:"16px",color:"#333333"}),Object(c.jsx)("h5",{children:K(t.time)})]}),a&&Object(c.jsx)(F,{title:"Delete",button:C,onClick:function(){return e=t.taskID,ge(l),void u.a.delete("/active-task/delete",{params:{userID:1,taskID:e}}).then((function(){me(b)})).catch((function(e){return console.log(e)}));var e},children:Object(c.jsx)(j.a,{size:"16px",color:"#333333"})}),o&&Object(c.jsx)(F,{title:"Finish",button:C,onClick:function(){return e=t.taskID,n=t.time,ge(l),console.log(n),void u.a.put("/active-task/finish",{userID:1,taskID:e,time:n}).then((function(){Oe(l),me(b)})).catch((function(e){return console.log(e)}));var e,n},children:Object(c.jsx)(j.c,{size:"16px",color:"#333333"})})]}):Object(c.jsx)("div",{className:"buttons-section",children:Object(c.jsx)(I,{style:{cursor:"default"},children:Object(c.jsx)("h5",{children:K(t.time)})})})]})]})},De=function(e){var t=e.tasksList,n=e.totalTime,r=e.labels,a=e.tab,o=e.setCurrTasks,l=e.setPastTasks,b=e.showDelete,j=e.showFinish,d=e.showDate,h=Object(s.useState)([]),f=Object(i.a)(h,2),O=f[0],x=f[1],m=function(e){for(var t=[],n=0;n<e.length;){var c=[];c.push(e[n]);for(var s=n+1;s<e.length;){var r=new Date(0);r.setUTCSeconds(c[0].start),r.setHours(0,0,0,0);var a=new Date(0);if(a.setUTCSeconds(e[s].start),a.setHours(0,0,0,0),r.getTime()!==a.getTime())break;c.push(e[s]),s++}t.push(c),n=s}return t}(t);return Object(s.useEffect)((function(){u.a.get("/time-logs/retrieve",{params:{userID:1}}).then((function(e){var t=e.data;x(t.time_logs.sort((function(e,t){return t.date-e.date})))})).catch((function(e){return console.log(e)}))}),[]),Object(c.jsxs)("div",{className:"task-list-section",children:[d&&Object(c.jsxs)("div",{className:"date-section",children:[Object(c.jsx)(J,{children:"Today"}),Object(c.jsx)("div",{children:K(n)})]}),0===O.length?Object(c.jsx)(c.Fragment,{children:m.map((function(e,t){return Object(c.jsxs)("div",{children:[d&&!Z(e[0].start,Math.floor(Date.now()/1e3))&&Object(c.jsxs)("div",{className:"date-section",children:[Object(c.jsx)(J,{children:Q(e[0].start)}),Object(c.jsx)("div",{children:"Not recorded"})]}),e.map((function(e,t){return Object(c.jsx)(Te,{task:e,labels:r,tab:a,showFinish:j,showDelete:b,setCurrTasks:o,setPastTasks:l},t)}))]},t)}))}):Object(c.jsx)(c.Fragment,{children:O.map((function(e,t){return Object(c.jsxs)("div",{children:[d&&!Z(e.date,Math.floor(Date.now()/1e3))&&Object(c.jsxs)("div",{className:"date-section",children:[Object(c.jsx)(J,{children:Q(e.date)}),Object(c.jsx)("div",{children:K(e.time)})]}),m.map((function(t,n){return Object(c.jsx)("div",{children:t.map((function(n,s){return Object(c.jsx)("div",{children:Z(e.date,t[0].start)&&Object(c.jsx)(Te,{task:n,labels:r,tab:a,showFinish:j,showDelete:b,setCurrTasks:o,setPastTasks:l})},s)}))},n)}))]},t)}))})]})};De.defaultProps={showToday:!1,showTime:!1,showDate:!1,showDelete:!1,showFinish:!1,showInfo:!1};var we=De,Ce=function(e){var t=e.labels,n=e.currTasks,r=e.setCurrTasks,a=e.pastTasks,o=e.totalTime,l=Object(s.useState)(-1),u=Object(i.a)(l,2),b=u[0],j=u[1],d=Object(s.useState)(""),h=Object(i.a)(d,2),f=h[0],x=h[1],m=n;-1!==b&&(m=n.filter((function(e){return e.labelID===b})));var g=a;-1!==b&&(g=a.filter((function(e){return e.labelID===b})));var v="";0===m.length&&0===g.length&&(v="No ongoing or previous tasks have been assigned with this label.");var p=n.filter((function(e){return e.name.toLowerCase().includes(f.toLowerCase())})),k=a.filter((function(e){return e.name.toLowerCase().includes(f.toLowerCase())}));return Object(c.jsxs)(je,{children:[Object(c.jsxs)(_,{children:[Object(c.jsx)(R,{children:"Search"}),Object(c.jsx)(P.a,{label:"Search Task Name",id:"search",variant:"outlined",size:"small",className:"text-field",InputLabelProps:{shrink:!0},onChange:function(e){return x(e.target.value)}})]}),""===f?Object(c.jsxs)("div",{children:[Object(c.jsxs)("div",{className:"label-selection",children:[Object(c.jsx)(O.a,{title:"All",arrow:!0,placement:"top",children:Object(c.jsx)("div",{className:"radio-btn-container",children:Object(c.jsx)(S,{colour:V("#000000"),selected:-1===b,className:-1===b?"radio-btn-on":"radio-btn-off",onClick:function(){return j(-1)}})})}),Object(c.jsx)(O.a,{title:"None",arrow:!0,placement:"top",children:Object(c.jsx)("div",{className:"radio-btn-container",children:Object(c.jsx)(S,{colour:V(q),selected:0===b,className:0===b?"radio-btn-on":"radio-btn-off",onClick:function(){return j(0)}})})}),t.map((function(e,t){return Object(c.jsx)(O.a,{title:e.name,arrow:!0,placement:"top",children:Object(c.jsx)("div",{className:"radio-btn-container",children:Object(c.jsx)(S,{colour:V(e.colour),selected:b===e.labelID,className:b===e.labelID?"radio-btn-on":"radio-btn-off",onClick:function(){return j(e.labelID)}},t)})})}))]}),v,m.length>0&&Object(c.jsxs)("div",{children:[Object(c.jsx)(R,{children:"Ongoing Tasks"}),Object(c.jsx)(we,{tasksList:m,setCurrTasks:r,labels:t,tab:0,totalTime:o,showDelete:!0,showFinish:!0})]}),g.length>0&&Object(c.jsxs)("div",{children:[Object(c.jsx)(R,{children:"Previous Tasks"}),Object(c.jsx)(we,{tasksList:g,labels:t,tab:1,totalTime:o})]})]}):Object(c.jsxs)("div",{children:[p.length>0&&Object(c.jsx)(we,{tasksList:p,setCurrTasks:r,labels:t,tab:0,showDelete:!0,showFinish:!0}),k.length>0&&Object(c.jsx)(we,{tasksList:k,labels:t,tab:1})]})]})},Ne=(n(111),n(71)),Ie=n.n(Ne),ye=n(150),Se=n(147),Fe=function(e){var t=e.setToggleForm,n=e.labels,r=e.setLabels,a=e.setCurrTasks,o=Object(s.useState)(0),l=Object(i.a)(o,2),b=l[0],d=l[1],h=Object(s.useState)(!1),f=Object(i.a)(h,2),x=f[0],m=f[1],g=Object(s.useState)(""),v=Object(i.a)(g,2),p=v[0],k=v[1],T=Object(s.useState)("00:00:00"),D=Object(i.a)(T,2),w=D[0],N=D[1],I=Object(s.useState)(!1),F=Object(i.a)(I,2),L=F[0],z=F[1],E=Object(s.useState)(""),M=Object(i.a)(E,2),B=M[0],A=M[1],U=Object(s.useState)(""),H=Object(i.a)(U,2),R=H[0],G=H[1];return Object(c.jsxs)("div",{children:[Object(c.jsx)(se,{onClick:function(){return t((function(e){return!e}))}}),Object(c.jsxs)(oe,{children:[Object(c.jsxs)(_,{children:[Object(c.jsx)(J,{dark:!0,children:"Create New Task"}),Object(c.jsx)(C,{onClick:function(){return t((function(e){return!e}))},children:Object(c.jsx)(j.h,{size:"16px",color:"#333333"})})]}),Object(c.jsx)("br",{}),Object(c.jsxs)(_,{children:[Object(c.jsx)(P.a,{id:"taskName",label:"Task Name",variant:"outlined",size:"small",className:"text-field",placeholder:"Name",InputLabelProps:{shrink:!0},onChange:function(e){return A(e.target.value)}}),Object(c.jsx)(P.a,{id:"taskDescription",label:"Description",variant:"outlined",size:"small",className:"text-field",placeholder:"Description",InputLabelProps:{shrink:!0},onChange:function(e){return G(e.target.value)}})]}),Object(c.jsx)("br",{}),Object(c.jsxs)(_,{children:[Object(c.jsx)("div",{className:"text-field flex-container",children:Object(c.jsx)(ye.a,{control:Object(c.jsx)(Se.a,{checked:L,onChange:function(){return z((function(e){return!e}))},name:"setTime",color:"primary"}),label:"Set Time"})}),Object(c.jsx)(Ie.a,{value:"00:00:00",input:Object(c.jsx)(P.a,{label:"Time",id:"time",variant:"outlined",size:"small",className:"text-field",disabled:!L}),onChange:function(e){return N(e.target.value)},showSeconds:!0})]}),Object(c.jsx)(J,{dark:!0,children:"Labels Selection"}),Object(c.jsxs)("div",{className:"label-selection-container",children:[Object(c.jsxs)("div",{className:"labels-section",children:[Object(c.jsxs)("div",{className:"label-selection",children:[Object(c.jsx)(O.a,{title:"None",arrow:!0,placement:"top",children:Object(c.jsx)("div",{className:"radio-btn-container",children:Object(c.jsx)(S,{colour:V(q),selected:0===b,className:0===b?"radio-btn-on":"radio-btn-off",onClick:function(){return d(0)}})})}),n.map((function(e,t){return Object(c.jsx)(O.a,{title:e.name,arrow:!0,placement:"top",children:Object(c.jsx)("div",{className:"radio-btn-container",children:Object(c.jsx)(S,{colour:V(e.colour),selected:b===e.labelID,className:b===e.labelID?"radio-btn-on":"radio-btn-off",onClick:function(){return d(e.labelID)}},t)})})}))]}),Object(c.jsx)("div",{id:"add-label-button",children:Object(c.jsx)(O.a,{title:x?"Close Form":"Add Label",arrow:!0,placement:"top",children:Object(c.jsx)(S,{colour:V(q),selected:!0,onClick:function(){return m((function(e){return!e}))},children:x?Object(c.jsx)(j.h,{color:"#333333",size:"12px"}):Object(c.jsx)(j.f,{color:"#333333",size:"12px"})})})})]}),Object(c.jsx)("div",{className:x?"display-form":"hide-form",children:Object(c.jsx)($,{labels:n,setLabels:r,setToggleLabelForm:m})})]}),Object(c.jsx)("br",{}),p,Object(c.jsxs)(y,{onClick:function(){var e=w.split(":"),n=60*parseInt(e[0])*60+60*parseInt(e[1])+parseInt(e[2]);B.length>0&&R.length>0?(t((function(e){return!e})),u.a.post("/active-task/create",{userID:1,labelID:b,name:B,description:R,time:n}).then((function(){ge(a),A(""),G("")})).catch((function(e){return console.log(e)}))):(k("Missing Fields"),R.length<=0&&k("Description must be greater than 0 characters"),B.length<=0&&k("Label must be greater than 0 characters"))},style:{float:"right"},children:[Object(c.jsx)(j.f,{size:"12px",color:"#333333"}),Object(c.jsx)(Y,{children:"Create Task"})]})]})]})},Le=function(e){var t=e.currTasks,n=e.setCurrTasks,r=e.setPastTasks,a=e.totalTime,o=e.labels,l=e.setLabels,u=Object(s.useState)(!1),b=Object(i.a)(u,2),d=b[0],h=b[1],f=t.filter((function(e){return e.onPlay})),O="No task tracking";0!==f.length&&(O=f.map((function(e,t){return Object(c.jsx)(Y,{children:e.name},t)})));return Object(c.jsxs)(je,{children:[d&&Object(c.jsx)(Fe,{setToggleForm:h,labels:o,setLabels:l,setCurrTasks:n}),Object(c.jsxs)(_,{children:[Object(c.jsx)(R,{children:"Tracking"}),Object(c.jsxs)(y,{onClick:function(){return h((function(e){return!e}))},children:[Object(c.jsx)(j.f,{size:"16px",color:"#333333"}),Object(c.jsx)(Y,{children:"Add Task"})]})]}),Object(c.jsxs)("div",{className:"tracking-bar",children:[Object(c.jsx)("div",{className:"tracking-tasks",children:O}),Object(c.jsx)("h1",{children:K(a)}),Object(c.jsx)("div",{className:"stop-btn",onClick:function(){var e=t.map((function(e){return Object(pe.a)(Object(pe.a)({},e),{},{onPlay:!1})}));chrome.storage.local.set({currTasks:e},(function(){return ge(n)}))},children:"STOP"})]}),0===t.length?Object(c.jsx)("div",{children:"No tasks has been created"}):Object(c.jsx)(we,{tasksList:t,labels:o,tab:0,setCurrTasks:n,setPastTasks:r,totalTime:a,showDate:!0,showDelete:!0,showFinish:!0})]})},ze=function(e){var t=e.pastTasks,n=e.labels,s=e.totalTime;return Object(c.jsxs)(je,{children:[Object(c.jsx)(R,{children:"Past Tasks"}),Object(c.jsx)("br",{}),0===t.length?Object(c.jsx)("div",{children:"No tasks has been completed"}):Object(c.jsx)(we,{tasksList:t,labels:n,tab:1,totalTime:s,showDate:!0})]})},Pe=function(e,t){var n=Object(s.useRef)();Object(s.useEffect)((function(){n.current=e}),[e]),Object(s.useEffect)((function(){if(null!==t){var e=setInterval((function(){n.current()}),t);return function(){return clearInterval(e)}}}),[t])},Ee=function(){var e=Object(s.useState)(0),t=Object(i.a)(e,2),n=t[0],r=t[1],a=Object(s.useState)(0),o=Object(i.a)(a,2),l=o[0],b=o[1],j=Object(s.useState)([]),d=Object(i.a)(j,2),h=d[0],f=d[1],O=Object(s.useState)([]),x=Object(i.a)(O,2),m=x[0],g=x[1],v=Object(s.useState)([]),p=Object(i.a)(v,2),k=p[0],T=p[1],D=Object(s.useState)(null),w=Object(i.a)(D,2),C=w[0],N=w[1];Object(s.useEffect)((function(){u.a.get("/time-logs/retrieve",{params:{userID:1}}).then((function(e){var t=e.data.time_logs.sort((function(e,t){return t.date-e.date}));t.length>0&&(Z(t[0].date,Math.floor(Date.now()/1e3))||chrome.storage.local.set({totalTime:0}))})).catch((function(e){return console.log(e)})),chrome.storage.local.get("currTasks",(function(e){e.currTasks.length>0?u.a.put("/active-tasks/sync",{tasks_list:m}).catch((function(e){return console.log(e)})):Oe(g),me(f),xe(T)}))}),[]),Pe((function(){chrome.storage.local.get(["currTasks","totalTime"],(function(e){g(e.currTasks),b(e.totalTime);var t=e.currTasks.filter((function(e){return e.onPlay})).length>0;N(t)}))}),1e3),Object(s.useEffect)((function(){C?chrome.storage.local.get(["start"],(function(e){0===e.start&&chrome.storage.local.set({start:Math.floor((new Date).getTime()/1e3)})})):C||chrome.storage.local.get(["start"],(function(e){var t=e.start;0!==t&&u.a.post("/time-log/create",{userID:1,start:t,end:Math.floor((new Date).getTime()/1e3)}).then((function(){chrome.storage.local.set({start:0})})).catch((function(e){return console.log(e)}))}))}),[C]);var I="Page not found";return 0===n?I=Object(c.jsx)(Le,{currTasks:m,setCurrTasks:g,setPastTasks:f,totalTime:l,labels:k,setLabels:T}):1===n?I=Object(c.jsx)(ze,{pastTasks:h,labels:k,totalTime:l}):2===n?I=Object(c.jsx)(ve,{labels:k,setLabels:T}):3===n&&(I=Object(c.jsx)(Ce,{labels:k,currTasks:m,setCurrTasks:g,pastTasks:h,totalTime:l})),Object(c.jsxs)("div",{className:"Popup",children:[Object(c.jsx)(L,{setTab:r,tab:n}),I]})};n(113);o.a.render(Object(c.jsx)(r.a.StrictMode,{children:Object(c.jsx)(Ee,{})}),document.getElementById("root"))},49:function(e,t,n){},62:function(e,t,n){}},[[114,1,2]]]);