(this.webpackJsonptracker_2=this.webpackJsonptracker_2||[]).push([[0],{103:function(e,t,s){},104:function(e,t,s){},108:function(e,t,s){},109:function(e,t,s){},116:function(e,t,s){},117:function(e,t,s){},118:function(e,t,s){"use strict";s.r(t);var a=s(2),c=s(1),n=s.n(c),r=s(12),i=s.n(r),l=s(11),o=s(13),u=s.n(o);u.a.defaults.baseURL="https://ich7sma0mc.execute-api.us-east-2.amazonaws.com";var j=function(e,t){var s=Object(c.useRef)();Object(c.useEffect)((function(){s.current=e}),[e]),Object(c.useEffect)((function(){if(null!==t){var e=setInterval((function(){s.current()}),t);return function(){return clearInterval(e)}}}),[t])},b=(s(103),s(27)),d=s(63),h=function(e){var t=e.tab,s=e.setTab,c="off",n="off",r="off",i="off";0===t&&(c="on"),1===t&&(n="on"),2===t&&(r="on"),3===t&&(i="on");return Object(a.jsxs)("nav",{children:[Object(a.jsx)("div",{className:"nav-item-"+c,onClick:function(){return s(0)},children:Object(a.jsx)(b.a,{size:"25px",color:"on"===c?"#333333":"#F2F2F2"})}),Object(a.jsx)("div",{className:"nav-item-"+n,onClick:function(){return s(1)},children:Object(a.jsx)(b.d,{size:"25px",color:"on"===n?"#333333":"#F2F2F2"})}),Object(a.jsx)("div",{className:"nav-item-"+r,onClick:function(){return s(2)},children:Object(a.jsx)(d.a,{size:"25px",color:"on"===r?"#333333":"#F2F2F2"})}),Object(a.jsx)("div",{className:"nav-item-"+i,onClick:function(){return s(3)},children:Object(a.jsx)(b.c,{size:"25px",color:"on"===i?"#333333":"#F2F2F2"})}),Object(a.jsx)("button",{onClick:function(){chrome.storage.local.set({currTasks:[],totalTime:0}),chrome.storage.local.remove(["lastUsed"])},children:"Reset"})]})},m=(s(104),s(71)),O=s(151),x=(s(62),["#DA3A37","#3764A5","#DFA84D","#D8D9C6","#427F56","#CED987","#8C9895","#2D3436","#BBBBBB","#CE4E24","#F87618","#B1F2BE","#F36F95","#D6D377","#5C5D73","#FCEE48"]),v=function(e){var t=e.setLabels,s=e.setToggleLabelForm,n=Object(c.useState)(""),r=Object(l.a)(n,2),i=r[0],o=r[1],j=Object(c.useState)(null),b=Object(l.a)(j,2),d=b[0],h=b[1],v=Object(c.useState)(""),k=Object(l.a)(v,2),g=k[0],f=k[1];return Object(a.jsxs)("div",{className:"label-form-container",children:[Object(a.jsx)("div",{className:"field-section",children:Object(a.jsx)(O.a,{id:"labelName",type:"text",placeholder:"Label Name",className:"text-field",onChange:function(e){return f(e.target.value)}})}),"Select Tag",Object(a.jsx)("div",{className:"label-colour-tag-container",children:x.map((function(e){return Object(a.jsx)("div",{className:"radio-button-container",children:Object(a.jsx)("div",{style:{backgroundColor:e},className:d===e?"radio-button-on":"radio-button-off",onClick:function(){return h(e)}})})}))}),i,Object(a.jsx)("button",{className:"new-task-button",onClick:function(){null===d&&o("Colour tag must be selected"),g.length<=0&&o("Label must be greater than 0 characters"),g.length>0&&null!=d&&(s((function(e){return!e})),u.a.post("/label/create",{userID:1,colour:d,name:g}).then((function(e){var s=e.data;t((function(e){return[].concat(Object(m.a)(e),[{userID:1,labelID:s.labelID,name:g,colour:d}])})),f(""),h(null)})).catch((function(e){return console.log(e)})))},children:"Create Label"})]})},k=s(28),g=function(e,t){var s="#eeeeee";return e.forEach((function(e){e.labelID===t&&(s=e.colour)})),s},f=function(e){u.a.get("/labels/retrieve",{params:{userID:1}}).then((function(t){var s=t.data.labels;e(s)})).catch((function(e){return console.log(e)}))},D=function(e){var t=e.labels,s=e.setLabels,n=Object(c.useState)(!1),r=Object(l.a)(n,2),i=r[0],o=r[1],j=i&&Object(a.jsxs)("div",{children:[Object(a.jsx)("div",{className:"modal-background",onClick:function(){return o((function(e){return!e}))}}),Object(a.jsx)("div",{className:"form-modal",children:Object(a.jsx)(v,{setToggleLabelForm:function(){return o((function(e){return!e}))},labels:t,setLabels:s})})]});return Object(a.jsxs)("div",{className:"tab-container",children:[j,Object(a.jsxs)("div",{className:"tracking-navbar",children:[Object(a.jsx)("div",{className:"heading",children:"Labels"}),Object(a.jsxs)("div",{className:"new-task-button",onClick:function(){return o((function(e){return!e}))},children:[Object(a.jsx)(b.b,{size:"20px",color:"#333333"}),Object(a.jsx)("h5",{children:"Add Label"})]})]}),Object(a.jsx)("br",{}),Object(a.jsx)("div",{children:Object(a.jsx)("div",{className:"task-item-container",children:Object(a.jsxs)("div",{className:"task-name-container",children:[Object(a.jsx)("div",{className:"task-colour",style:{backgroundColor:g(t,0)}}),Object(a.jsx)("div",{className:"task-name",children:"None"})]})})}),t.map((function(e,t){return Object(a.jsx)("div",{children:Object(a.jsxs)("div",{className:"task-item-container",children:[Object(a.jsxs)("div",{className:"task-name-container",children:[Object(a.jsx)("div",{className:"task-colour",style:{backgroundColor:e.colour}}),Object(a.jsx)("div",{className:"task-name",children:e.name})]}),Object(a.jsx)("div",{className:"buttons-container",children:Object(a.jsx)("div",{className:"circle-button",onClick:function(){return t=e.labelID,void u.a.delete("/label/delete",{params:{userID:1,labelID:t}}).then((function(){f(s)})).catch((function(e){return console.log(e)}));var t},children:Object(a.jsx)(k.a,{size:"16px",color:"#333333"})})})]})},t)}))]})},A=s(154),N=s(51),T=function(e){var t=Math.floor(e/3600);e%=3600;var s=Math.floor(e/60),a=e%60;return t<10&&(t="0"+t),s<10&&(s="0"+s),a<10&&(a="0"+a),"".concat(t," : ").concat(s," : ").concat(a)},C=function(e,t){var s="None";return e.forEach((function(e){e.labelID===t&&(s=e.name)})),"Category: "+s},I=function(e,t,s){u.a.put("https://ich7sma0mc.execute-api.us-east-2.amazonaws.com/active-task/update",{userID:e,taskID:t,time:s}).catch((function(e){return console.log(e)}))},p=function(e){var t=new Date(0);t.setUTCSeconds(e),t.setHours(0,0,0,0);var s=new Date;s.setHours(0,0,0,0);var a=new Date(s);return a.setDate(a.getDate()-1),s.getTime()===t.getTime()?"Today":a.getTime()===t.getTime()?"Yesterday":t.toDateString()},F=(s(108),function(e){var t=e.setToggleInfo,s=e.task,c=e.labels;return Object(a.jsxs)("div",{children:[Object(a.jsx)("div",{className:"modal-background",onClick:function(){return t((function(e){return!e}))}}),Object(a.jsxs)("div",{className:"info-modal",children:[Object(a.jsxs)("div",{id:"main-info-section",children:[Object(a.jsxs)("div",{className:"name-container",children:[Object(a.jsx)("div",{className:"task-name",children:s.name}),Object(a.jsx)("div",{className:"task-description",children:s.description}),Object(a.jsx)("div",{className:"task-label",style:{backgroundColor:g(c,s.labelID)},children:C(c,s.labelID)})]}),Object(a.jsx)("div",{className:"time-container",children:T(s.time)})]}),Object(a.jsx)("br",{}),Object(a.jsxs)("div",{id:"date-info-section",children:[Object(a.jsxs)("div",{className:"date-container",children:[Object(a.jsx)("div",{className:"title",children:"Task Created on"}),Object(a.jsx)("div",{className:"response",children:p(s.start)})]}),Object(a.jsxs)("div",{className:"date-container",children:[Object(a.jsx)("div",{className:"title",children:s.end?"Task Ended on":"Task Status"}),Object(a.jsx)("div",{className:"response",children:s.end?p(s.end):"Ongoing Task"})]})]})]})]})}),w=(s(109),function(e){for(var t=[],s=0;s<e.length;){var a=[];a.push(e[s]);for(var c=s+1;c<e.length;){var n=new Date(0);n.setUTCSeconds(a[0].start),n.setHours(0,0,0,0);var r=new Date(0);if(r.setUTCSeconds(e[c].start),r.setHours(0,0,0,0),n.getTime()!==r.getTime())break;a.push(e[c]),c++}t.push(a),s=c}return t}),E=function(e){u.a.get("/active-tasks/retrieve",{params:{userID:1}}).then((function(t){var s=t.data.tasks_list.sort((function(e,t){return t.start-e.start}));e(s),chrome.storage.local.set({currTasks:s})})).catch((function(e){return console.log(e)}))},Q=function(e){u.a.get("/inactive-tasks/retrieve",{params:{userID:1}}).then((function(t){var s=t.data.tasks_list.sort((function(e,t){return t.start-e.start}));e(s)})).catch((function(e){return console.log(e)}))},S=function(e){chrome.storage.local.get(["currTasks"],(function(t){var s=t.currTasks;u.a.put("/active-tasks/sync",{tasks_list:s}).then((function(){E(e)})).catch((function(e){return console.log(e)}))}))},R=function(e){var t=e.task,s=e.labels,n=e.tab,r=e.showDelete,i=e.showFinish,o=e.setCurrTasks,j=e.setPastTasks,b=Object(c.useState)(!1),d=Object(l.a)(b,2),h=d[0],m=d[1];return Object(a.jsxs)("div",{children:[Object(a.jsx)("div",{className:h?"":"hidden",children:Object(a.jsx)(F,{setToggleInfo:m,task:t,labels:s})}),Object(a.jsxs)("div",{className:"task-item-container",children:[Object(a.jsxs)("div",{className:"task-name-container",onClick:function(){return m((function(e){return!e}))},children:[Object(a.jsx)(A.a,{title:C(s,t.labelID),arrow:!0,placement:"top",children:Object(a.jsx)("div",{className:"task-colour",style:{backgroundColor:g(s,t.labelID)},children:Object(a.jsx)(k.b,{size:"12px",color:"#333333"})})}),Object(a.jsx)("div",{className:"task-name",children:t.name})]}),0===n?Object(a.jsxs)("div",{className:"buttons-container",children:[Object(a.jsx)(A.a,{title:"Play/Pause",arrow:!0,placement:"top",children:Object(a.jsxs)("div",{className:"play-button",onClick:function(){return function(e){e.onPlay&&(I(e.userID,e.taskID,e.time),console.log("updated task")),chrome.storage.local.get("currTasks",(function(t){var s=t.currTasks;chrome.storage.local.set({currTasks:s.map((function(t){return t.taskID===e.taskID?Object(N.a)(Object(N.a)({},t),{},{onPlay:!e.onPlay}):t}))})}))}(t)},children:[t.onPlay?Object(a.jsx)(k.d,{size:"16px",color:"#333333"}):Object(a.jsx)(k.e,{size:"16px",color:"#333333"}),Object(a.jsx)("h5",{children:T(t.time)})]})}),r&&Object(a.jsx)(A.a,{title:"Delete",arrow:!0,placement:"top",children:Object(a.jsx)("div",{className:"circle-button",onClick:function(){return e=t.taskID,S(o),void u.a.delete("/active-task/delete",{params:{userID:1,taskID:e}}).then((function(){Q(j)})).catch((function(e){return console.log(e)}));var e},children:Object(a.jsx)(k.a,{size:"16px",color:"#333333"})})}),i&&Object(a.jsx)(A.a,{title:"Finish",arrow:!0,placement:"top",children:Object(a.jsx)("div",{className:"circle-button",onClick:function(){return e=t.taskID,s=t.time,S(o),void u.a.put("/active-task/finish",{userID:1,taskID:e,time:s}).then((function(){E(o),Q(j)})).catch((function(e){return console.log(e)}));var e,s},AiOutlineCheck:!0,children:Object(a.jsx)(k.c,{size:"16px",color:"#333333"})})})]}):Object(a.jsx)("div",{className:"buttons-container",children:Object(a.jsx)(A.a,{title:"Time",arrow:!0,placement:"top",children:Object(a.jsx)("div",{className:"play-button",children:Object(a.jsx)("h5",{children:T(t.time)})})})})]})]})},B=function(e){var t=e.tasksList,s=e.totalTime,n=e.labels,r=e.tab,i=e.setCurrTasks,o=e.setPastTasks,j=e.showDelete,b=e.showFinish,d=e.showDate,h=e.showToday,m=e.showTime,O=Object(c.useState)([]),x=Object(l.a)(O,2),v=x[0],k=x[1],g=w(t),f=function(e,t){var a=0,c=new Date;c.setHours(0,0,0,0);var n=new Date(0);if(n.setUTCSeconds(t),n.setHours(0,0,0,0),n.getTime()===c.getTime())a=s;else for(var r=0;r<e.length;r++){var i=new Date(0);i.setUTCSeconds(e[r].date),i.setHours(0,0,0,0),i.getTime()===n.getTime()&&(a=e[r].time)}return T(a)};Object(c.useEffect)((function(){u.a.get("/time-logs/retrieve",{params:{userID:1}}).then((function(e){var t=e.data;k(t.time_logs.sort((function(e,t){return t.date-e.date})))})).catch((function(e){return console.log(e)}))}),[]);return Object(a.jsxs)("div",{className:"task-list-section",children:[function(){if(!d||!h||0===g.length||0===g[0].length)return!1;var e=new Date;e.setHours(0,0,0,0);var t=new Date(0);return t.setUTCSeconds(g[0][0].start),t.setHours(0,0,0,0),e.getTime()!==t.getTime()}()&&Object(a.jsxs)("div",{className:"day-container",children:[Object(a.jsx)("div",{className:"sub-heading",children:"Today"}),Object(a.jsx)("div",{children:T(s)})]}),g.map((function(e,t){return Object(a.jsxs)("div",{children:[d&&Object(a.jsxs)("div",{className:"day-container",children:[Object(a.jsx)("div",{className:"sub-heading",children:p(e[0].start)}),m&&Object(a.jsx)("div",{children:f(v,e[0].start)})]}),e.map((function(e,t){return Object(a.jsx)(R,{task:e,labels:n,tab:r,showFinish:b,showDelete:j,setCurrTasks:i,setPastTasks:o})}))]},t)}))]})};B.defaultProps={showToday:!1,showTime:!1,showDate:!1,showDelete:!1,showFinish:!1,showInfo:!1};var L=B,y=function(e){var t=e.labels,s=e.currTasks,n=e.setCurrTasks,r=e.pastTasks,i=e.totalTime,o=Object(c.useState)(-1),u=Object(l.a)(o,2),j=u[0],b=u[1],d=Object(c.useState)(""),h=Object(l.a)(d,2),m=h[0],x=h[1],v=s;-1!==j&&(v=s.filter((function(e){return e.labelID===j})));var k=r;-1!==j&&(k=r.filter((function(e){return e.labelID===j})));var g="";0===v.length&&0===k.length&&(g="No ongoing or previous tasks have been assigned with this label.");var f=s.filter((function(e){return e.name.toLowerCase().includes(m.toLowerCase())})),D=r.filter((function(e){return e.name.toLowerCase().includes(m.toLowerCase())}));return Object(a.jsxs)("div",{className:"tab-container",children:[Object(a.jsxs)("div",{className:"tracking-navbar",children:[Object(a.jsx)("div",{className:"heading",children:"Search"}),Object(a.jsx)(O.a,{label:"Search Task Name",id:"search",variant:"outlined",size:"small",className:"text-field",InputLabelProps:{shrink:!0},onChange:function(e){return x(e.target.value)}})]}),Object(a.jsx)("br",{}),""===m?Object(a.jsxs)(a.Fragment,{children:[" ",Object(a.jsxs)("div",{className:"label-colour-tag-container",children:[Object(a.jsx)(A.a,{title:"All",arrow:!0,children:Object(a.jsx)("div",{className:"radio-button-container",children:Object(a.jsx)("div",{style:{backgroundColor:"#000000"},className:-1===j?"radio-button-on":"radio-button-off",onClick:function(){return b(-1)}})})}),Object(a.jsx)(A.a,{title:"None",arrow:!0,children:Object(a.jsx)("div",{className:"radio-button-container",children:Object(a.jsx)("div",{style:{backgroundColor:"#eeeeee"},className:0===j?"radio-button-on":"radio-button-off",onClick:function(){return b(0)}})})}),t.map((function(e,t){return Object(a.jsx)(A.a,{title:e.name,arrow:!0,children:Object(a.jsx)("div",{className:"radio-button-container",children:Object(a.jsx)("div",{style:{backgroundColor:e.colour},className:j===e.labelID?"radio-button-on":"radio-button-off",onClick:function(){return b(e.labelID)}},t)})})}))]}),g,v.length>0&&Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("div",{className:"heading",children:"Ongoing Tasks"}),Object(a.jsx)(L,{tasksList:v,setCurrTasks:n,labels:t,tab:0,showDelete:!0,showFinish:!0,totalTime:i})]}),k.length>0&&Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("div",{className:"heading",children:"Previous Tasks"}),Object(a.jsx)(L,{tasksList:k,labels:t,tab:1,totalTime:i})]})]}):Object(a.jsxs)(a.Fragment,{children:[f.length>0&&Object(a.jsx)(a.Fragment,{children:Object(a.jsx)(L,{tasksList:f,setCurrTasks:n,labels:t,tab:0,showDelete:!0,showFinish:!0})}),D.length>0&&Object(a.jsx)(a.Fragment,{children:Object(a.jsx)(L,{tasksList:D,labels:t,tab:1})})]})]})},H=s(69),J=s.n(H),X=s(155),Z=s(152),M=s(70),Y=s.n(M),z=function(e){var t=e.setToggleForm,s=e.labels,n=e.setLabels,r=e.setCurrTasks,i=Object(c.useState)(0),o=Object(l.a)(i,2),j=o[0],b=o[1],d=Object(c.useState)(!1),h=Object(l.a)(d,2),m=h[0],x=h[1],k=Object(c.useState)(""),g=Object(l.a)(k,2),f=g[0],D=g[1],N=Object(c.useState)("00:00:00"),T=Object(l.a)(N,2),C=T[0],I=T[1],p=Object(c.useState)(!1),F=Object(l.a)(p,2),w=F[0],E=F[1],Q=Object(c.useState)(""),R=Object(l.a)(Q,2),B=R[0],L=R[1],y=Object(c.useState)(""),H=Object(l.a)(y,2),M=H[0],z=H[1];return Object(a.jsxs)("div",{children:[Object(a.jsx)("div",{className:"modal-background",onClick:function(){return t((function(e){return!e}))}}),Object(a.jsxs)("div",{className:"form-modal",children:[Object(a.jsxs)("div",{className:"tracking-navbar",children:[Object(a.jsx)("div",{className:"sub-heading",children:"Create New Task"}),Object(a.jsx)("img",{className:"button-img",src:"data:image/png;base64,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",alt:"Exit",onClick:function(){return t((function(e){return!e}))}})]}),Object(a.jsx)("br",{}),Object(a.jsxs)("div",{className:"field-section",children:[Object(a.jsx)(O.a,{id:"taskName",label:"Task Name",variant:"outlined",size:"small",className:"text-field",placeholder:"Name",InputLabelProps:{shrink:!0},onChange:function(e){return L(e.target.value)}}),Object(a.jsx)(O.a,{id:"taskDescription",label:"Description",variant:"outlined",size:"small",className:"text-field",placeholder:"Description",InputLabelProps:{shrink:!0},onChange:function(e){return z(e.target.value)}})]}),Object(a.jsx)("br",{}),Object(a.jsxs)("div",{className:"field-section",children:[Object(a.jsx)("div",{className:"text-field flex-container",children:Object(a.jsx)(X.a,{control:Object(a.jsx)(Z.a,{checked:w,onChange:function(){return E((function(e){return!e}))},name:"setTime",color:"primary"}),label:"Set Time"})}),Object(a.jsx)("div",{children:Object(a.jsx)(J.a,{value:"00:00:00",input:Object(a.jsx)(O.a,{label:"Time",id:"time",variant:"outlined",size:"small",className:"text-field",disabled:!w}),onChange:function(e){return I(e.target.value)},showSeconds:!0})})]}),Object(a.jsx)("div",{className:"sub-heading",children:"Labels Selection"}),Object(a.jsxs)("div",{className:"label-selection",children:[Object(a.jsxs)("div",{className:"label-selection-row",children:[Object(a.jsxs)("div",{className:"label-selection-container",children:[Object(a.jsx)(A.a,{title:"None",arrow:!0,children:Object(a.jsx)("div",{className:"radio-button-container",children:Object(a.jsx)("div",{style:{backgroundColor:"#eeeeee"},className:0===j?"radio-button-on":"radio-button-off",onClick:function(){return b(0)}})})}),s.map((function(e,t){return Object(a.jsx)(A.a,{title:e.name,arrow:!0,children:Object(a.jsx)("div",{className:"radio-button-container",children:Object(a.jsx)("div",{style:{backgroundColor:e.colour},className:j===e.labelID?"radio-button-on":"radio-button-off",onClick:function(){return b(e.labelID)}},t)})})}))]}),Object(a.jsx)("div",{id:"add-label-button",children:Object(a.jsx)(A.a,{title:"Add Label",arrow:!0,children:Object(a.jsx)("div",{style:{backgroundColor:"#eeeeee"},className:"radio-button-on",onClick:function(){return x((function(e){return!e}))},children:Object(a.jsx)(Y.a,{style:{color:"#000000"}})})})})]}),Object(a.jsx)("div",{className:m?"label-form":"hidden",children:Object(a.jsx)(v,{labels:s,setLabels:n,setToggleLabelForm:x})})]}),Object(a.jsx)("br",{}),f,Object(a.jsx)("button",{className:"new-task-button",id:"Submit",type:"submit",onClick:function(){var e=C.split(":"),s=60*parseInt(e[0])*60+60*parseInt(e[1])+parseInt(e[2]);M.length<=0&&D("Description must be greater than 0 characters"),B.length<=0&&D("Label must be greater than 0 characters"),B.length>0&&M.length>0?(t((function(e){return!e})),u.a.post("/active-task/create",{userID:1,labelID:j,name:B,description:M,time:s}).then((function(){S(r),L(""),z("")})).catch((function(e){return console.log(e)}))):D("Missing Fields")},children:"Add Task"})]})]})},U=(s(116),function(e){var t=e.currTasks,s=e.setCurrTasks,n=e.setPastTasks,r=e.totalTime,i=e.labels,o=e.setLabels,u=Object(c.useState)(!1),j=Object(l.a)(u,2),d=j[0],h=j[1],m=t.filter((function(e){return e.onPlay})),O=Object(a.jsx)("div",{className:"tracking-task-list",children:"No task tracking"});0!==m.length&&(O=m.map((function(e,t){return Object(a.jsx)("div",{className:"task-name",children:e.name},t)})));var x=d&&Object(a.jsx)("div",{children:Object(a.jsx)(z,{setToggleForm:h,labels:i,setLabels:o,setCurrTasks:s})});return Object(a.jsxs)("div",{className:"tab-container",children:[x,Object(a.jsxs)("div",{className:"tracking-navbar",children:[Object(a.jsx)("div",{className:"heading",children:"Tracking"}),Object(a.jsxs)("div",{className:"new-task-button",onClick:function(){return h((function(e){return!e}))},children:[Object(a.jsx)(b.b,{size:"20px",color:"#333333"}),Object(a.jsx)("h5",{children:"Add Task"})]})]}),Object(a.jsxs)("div",{className:"tracking-section",children:[Object(a.jsx)("div",{className:"tracking-task-list",children:O}),Object(a.jsx)("h1",{children:T(r)})]}),Object(a.jsx)(L,{tasksList:t,labels:i,tab:0,showDelete:!0,showFinish:!0,showInfo:!0,setCurrTasks:s,setPastTasks:n,totalTime:r,showTime:!0,showToday:!0,showDate:!0})]})}),V=function(e){var t=e.pastTasks,s=e.labels,c=e.totalTime;return Object(a.jsxs)("div",{className:"tab-container",children:[Object(a.jsx)("div",{className:"heading",children:"Past Tasks"}),0===t.length?Object(a.jsx)("div",{children:"No completed tasks available to show"}):Object(a.jsx)(L,{tasksList:t,labels:s,tab:1,showDate:!0,showInfo:!0,totalTime:c,showTime:!0,showToday:!1})]})},P=function(){var e=Object(c.useState)(0),t=Object(l.a)(e,2),s=t[0],n=t[1],r=Object(c.useState)(0),i=Object(l.a)(r,2),o=i[0],b=i[1],d=Object(c.useState)([]),m=Object(l.a)(d,2),O=m[0],x=m[1],v=Object(c.useState)([]),k=Object(l.a)(v,2),g=k[0],A=k[1],N=Object(c.useState)([]),T=Object(l.a)(N,2),C=T[0],I=T[1],p=Object(c.useState)(null),F=Object(l.a)(p,2),w=F[0],S=F[1];Object(c.useEffect)((function(){chrome.storage.local.get(["lastUsed"],(function(e){var t=e.lastUsed;console.log(t);var s=new Date;s.setHours(0,0,0,0),t.setHours(0,0,0,0),t.getTime()!==s.getTime()&&chrome.storage.local.set({totalTime:0}),chrome.storage.local.set({lastUsed:new Date})})),chrome.storage.local.get("currTasks",(function(e){e.currTasks.length>0?u.a.put("/active-tasks/sync",{tasks_list:g}).catch((function(e){return console.log(e)})):E(A),Q(x),f(I)}))}),[]),j((function(){chrome.storage.local.get(["currTasks","pastTasks","totalTime"],(function(e){A(e.currTasks),b(e.totalTime);var t=e.currTasks.filter((function(e){return e.onPlay})).length>0;S(t)}))}),1e3),Object(c.useEffect)((function(){w?chrome.storage.local.get(["start"],(function(e){0===e.start&&chrome.storage.local.set({start:Math.floor((new Date).getTime()/1e3)})})):w||chrome.storage.local.get(["start"],(function(e){var t=e.start;0!==t&&u.a.post("/time-log/create",{userID:1,start:t,end:Math.floor((new Date).getTime()/1e3)}).then((function(){chrome.storage.local.set({start:0})})).catch((function(e){return console.log(e)}))}))}),[w]);var R="Page not found";return 0===s?R=Object(a.jsx)(U,{currTasks:g,setCurrTasks:A,setPastTasks:x,totalTime:o,labels:C,setLabels:I}):1===s?R=Object(a.jsx)(V,{pastTasks:O,labels:C,totalTime:o}):2===s?R=Object(a.jsx)(D,{labels:C,setLabels:I}):3===s&&(R=Object(a.jsx)(y,{labels:C,currTasks:g,setCurrTasks:A,pastTasks:O,totalTime:o})),Object(a.jsxs)("div",{className:"Popup",children:[Object(a.jsx)(h,{setTab:n,tab:s}),R]})};s(117);i.a.render(Object(a.jsx)(n.a.StrictMode,{children:Object(a.jsx)(P,{})}),document.getElementById("root"))},62:function(e,t,s){}},[[118,1,2]]]);