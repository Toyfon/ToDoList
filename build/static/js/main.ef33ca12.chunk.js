(this.webpackJsonptodolist=this.webpackJsonptodolist||[]).push([[0],{111:function(t,e,a){},118:function(t,e,a){},138:function(t,e,a){"use strict";a.r(e);var n=a(0),c=a.n(n),r=a(26),o=a.n(r);a(111),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var s,i=a(182),l=a(13),d=a(97),u=a(179),j=a(61),b=a(176),O=a(2),p=c.a.memo((function(t){var e=t.callBack,a=(Object(d.a)(t,["callBack"]),Object(n.useState)("")),c=Object(l.a)(a,2),r=c[0],o=c[1],s=Object(n.useState)(null),i=Object(l.a)(s,2),p=i[0],f=i[1];return Object(O.jsxs)("div",{children:[Object(O.jsx)(u.a,{variant:"outlined",value:r,size:"small",color:"secondary",onChange:function(t){o(t.currentTarget.value),f(null)},onKeyPress:function(t){null!==p&&f(null),"Enter"===t.key&&r.trim()?(e(r),o("")):f("Title is required")},error:!!p,helperText:p&&"Title is required!",label:"title",sx:{input:{height:"20px"}}}),Object(O.jsx)(j.a,{onClick:function(){r.trim()?(e(r),o("")):f("Title is required")},color:"secondary",children:Object(O.jsx)(b.a,{color:"inherit"})})]})})),f=a(190),k=a(191),h=a(189),v=a(185),x=a(192),T=a(186),y=a(96),m=a.n(y),C=(a(118),a(24)),S=a.n(C),g=a(38),I=a(15),w=a(14),E=a(59),A=a.n(E),D=A.a.create({baseURL:"https://social-network.samuraijs.com/api/1.1",withCredentials:!0,headers:{"API-KEY":"4c618d05-4087-4c56-9fa2-e412fa4c037d"}}),L=function(){return D.get("/todo-lists")},R={todos:[]},K=a(4);!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(s||(s={}));var N=A.a.create({baseURL:"https://social-network.samuraijs.com/api/1.1",withCredentials:!0,headers:{"API-KEY":"4c618d05-4087-4c56-9fa2-e412fa4c037d"}}),B=function(t){return N.get("/todo-lists/".concat(t,"/tasks")).then((function(t){return t.data}))},G=function(t,e){return N.post("/todo-lists/".concat(t,"/tasks"),{title:e})},H=function(t,e){return N.delete("/todo-lists/".concat(t,"/tasks/").concat(e))},F=function(t,e,a){return N.put("/todo-lists/".concat(t,"/tasks/").concat(e),a)},P={},_=function(t,e){return{type:"tasks/REMOVE-TASK",payload:{taskId:t,todolistId:e}}},M=function(t,e,a){return{type:"tasks/CHANGE-TASK-STATUS",payload:{status:t,taskId:e,todolistId:a}}},U=function(t,e){return{type:"tasks/SET_TASKS",payload:{tasks:t,todoListId:e}}},V=a(28),Y=a(187),q=a(177),z=c.a.memo((function(t){var e=Object(n.useState)(!1),a=Object(l.a)(e,2),c=a[0],r=a[1],o=Object(n.useState)(""),s=Object(l.a)(o,2),i=s[0],d=s[1],b=function(){r(!0),t.title&&d(t.title)},p=function(){r(!1),t.callBack(i)};return c?Object(O.jsx)(u.a,{variant:"standard",sx:{width:"130px"},value:i,color:"secondary",onBlur:p,autoFocus:!0,onChange:function(t){d(t.currentTarget.value)},onKeyPress:function(t){"Enter"===t.key&&p()}}):Object(O.jsxs)("span",{onDoubleClick:b,children:[t.title,Object(O.jsx)(j.a,{onClick:b,children:Object(O.jsx)(q.a,{fontSize:"small"})})]})})),J=a(60),W=a.n(J),$=a(188),Q=a(183),X=a(181),Z=c.a.memo((function(t){var e=t.task,a=t.changeTaskTitleCallback,c=t.changeTaskStatusCallback,r=t.onRemoveHandler,o=Object(n.useCallback)((function(t){a(e.id,t)}),[a,e.id]);return Object(O.jsx)("div",{children:Object(O.jsxs)(Q.a,{disableGutters:!0,divider:!0,sx:{paddingTop:"0px,3px",display:"flex",justifyContent:"space-between"},className:e.status===s.Completed?"isDone":"",children:[Object(O.jsx)(X.a,{checked:e.status===s.Completed,color:"secondary",onChange:function(t){var a=t.currentTarget.checked;c(e.id,a?s.Completed:s.New)}}),Object(O.jsx)(z,{title:e.title,callBack:o}),Object(O.jsx)(j.a,{onClick:function(){return r(e.id)},color:"secondary",children:Object(O.jsx)(W.a,{})})]},e.id)})})),tt=c.a.memo((function(t){var e=t.id,a=t.filter,c=t.title,r=t.tasks,o=t.changeFilter,i=t.changeTaskStatus,l=t.removeTodolist,d=t.changeTaskTitle,u=t.changeTodolistTitle,b=Object(V.b)();Object(n.useEffect)((function(){var t;b((t=e,function(){var e=Object(g.a)(S.a.mark((function e(a){var n;return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,B(t);case 3:n=e.sent,a(U(n.items,t)),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.warn(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}()))}),[]);var f=Object(n.useCallback)((function(t){b(function(t,e){return function(){var a=Object(g.a)(S.a.mark((function a(n){return S.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,H(e,t);case 3:0===a.sent.data.resultCode&&n(_(t,e)),a.next=11;break;case 8:throw a.prev=8,a.t0=a.catch(0),new Error("\u0447\u0442\u043e \u0442\u043e \u043d\u0435 \u0442\u0430\u043a");case 11:case"end":return a.stop()}}),a,null,[[0,8]])})));return function(t){return a.apply(this,arguments)}}()}(t,e))}),[b,e]),k=Object(n.useCallback)((function(t){b(function(t,e){return function(){var a=Object(g.a)(S.a.mark((function a(n){var c,r;return S.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,G(e,t);case 3:c=a.sent,0===(r=c.data).resultCode&&n({type:"tasks/ADD-TASK",payload:{task:r.data.item}}),a.next=10;break;case 8:a.prev=8,a.t0=a.catch(0);case 10:case"end":return a.stop()}}),a,null,[[0,8]])})));return function(t){return a.apply(this,arguments)}}()}(t,e))}),[b,e]),x=Object(n.useCallback)((function(t){return o(t,e)}),[o,e]),T=Object(n.useCallback)((function(){l(e)}),[l,e]),y=Object(n.useCallback)((function(t){u(t,e)}),[u,e]),m=Object(n.useCallback)((function(t,a){i(t,a,e)}),[i,e]),C=Object(n.useCallback)((function(t,a){d(t,a,e)}),[d,e]),I=r;"active"===a&&(I=r.filter((function(t){return t.status===s.New}))),"completed"===a&&(I=r.filter((function(t){return t.status===s.Completed})));var w=I.map((function(t){return Object(O.jsx)(Z,{changeTaskStatusCallback:m,task:t,changeTaskTitleCallback:C,onRemoveHandler:f},t.id)}));return Object(O.jsxs)("div",{children:[Object(O.jsxs)(h.a,{variant:"h6",align:"center",children:[Object(O.jsx)(z,{title:c,callBack:y}),Object(O.jsx)(j.a,{color:"secondary",onClick:T,children:Object(O.jsx)(W.a,{})})]}),Object(O.jsx)(p,{callBack:k}),Object(O.jsx)($.a,{children:w}),Object(O.jsxs)("div",{children:[Object(O.jsx)(v.a,{variant:"all"===a?"contained":"text",color:"secondary",onClick:function(){return x("all")},children:"all"}),Object(O.jsx)(v.a,{variant:"active"===a?"contained":"text",color:"secondary",onClick:function(){return x("active")},children:"active "}),Object(O.jsx)(v.a,{variant:"completed"===a?"contained":"text",color:"secondary",onClick:function(){return x("completed")},children:" completed"})]})]})})),et=a(64),at=a(95),nt=Object(et.b)({tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"tasks/REMOVE-TASK":return Object(w.a)(Object(w.a)({},t),{},Object(K.a)({},e.payload.todolistId,t[e.payload.todolistId].filter((function(t){return t.id!==e.payload.taskId}))));case"tasks/ADD-TASK":return Object(w.a)(Object(w.a)({},t),{},Object(K.a)({},e.payload.task.todoListId,[e.payload.task].concat(Object(I.a)(t[e.payload.task.todoListId]))));case"tasks/CHANGE-TASK-STATUS":return Object(w.a)(Object(w.a)({},t),{},Object(K.a)({},e.payload.todolistId,t[e.payload.todolistId].map((function(t){return t.id===e.payload.taskId?Object(w.a)(Object(w.a)({},t),{},{status:e.payload.status}):t}))));case"tasks/CHANGE-TASK-TITLE":return Object(w.a)(Object(w.a)({},t),{},Object(K.a)({},e.payload.todolistId,t[e.payload.todolistId].map((function(t){return t.id===e.payload.taskId?Object(w.a)(Object(w.a)({},t),{},{title:e.payload.title}):t}))));case"tasks/ADD-ARRAY-TASK":return Object(w.a)(Object(w.a)({},t),{},Object(K.a)({},e.payload.todoListId,[]));case"tasks/SET_TASKS":return Object(w.a)(Object(w.a)({},t),{},Object(K.a)({},e.payload.todoListId,e.payload.tasks));case"todos/SET-TODOS":var a=Object(w.a)({},t);return e.todos.forEach((function(t){a[t.id]=[]})),a;default:return t}},todoLists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:R,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"todos/REMOVE-TODOLIST":return Object(w.a)(Object(w.a)({},t),{},{todos:t.todos.filter((function(t){return t.id!==e.payload.id}))});case"todos/ADD-TODOLIST":var a=Object(w.a)(Object(w.a)({},e.payload),{},{filter:"all"});return Object(w.a)(Object(w.a)({},t),{},{todos:[].concat(Object(I.a)(t.todos),[a])});case"todos/CHANGE-TODOLIST_TITLE":return Object(w.a)(Object(w.a)({},t),{},{todos:t.todos.map((function(t){return t.id===e.payload.id?Object(w.a)(Object(w.a)({},t),{},{title:e.payload.title}):t}))});case"todos/CHANGE-TODOLIST_FILTER":return Object(w.a)(Object(w.a)({},t),{},{todos:t.todos.map((function(t){return t.id===e.payload.id?Object(w.a)(Object(w.a)({},t),{},{filter:e.payload.filter}):t}))});case"todos/SET-TODOS":return Object(w.a)(Object(w.a)({},t),{},{todos:e.todos.map((function(t){return Object(w.a)(Object(w.a)({},t),{},{filter:"all"})}))});default:return t}}}),ct=Object(et.c)(nt,Object(et.a)(at.a)),rt=V.c;window.store=ct;var ot=function(){var t=rt((function(t){return t.todoLists.todos})),e=rt((function(t){return t.tasks})),a=Object(V.b)(),c=Object(n.useCallback)((function(t,e,n){a(function(t,e,a){return function(){var n=Object(g.a)(S.a.mark((function n(c,r){var o,s,i;return S.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(o=r(),s=o.tasks[t].find((function(t){return t.id===e}))){n.next=5;break}return console.warn("task not found in the state"),n.abrupt("return");case 5:return i={status:a,title:s.title,deadline:s.deadline,description:s.description,priority:s.priority,startDate:s.startDate},n.prev=6,n.next=9,F(t,e,i);case 9:c(M(a,e,t)),n.next=14;break;case 12:n.prev=12,n.t0=n.catch(6);case 14:case"end":return n.stop()}}),n,null,[[6,12]])})));return function(t,e){return n.apply(this,arguments)}}()}(n,t,e))}),[a]),r=Object(n.useCallback)((function(t,e,n){a(function(t,e,a){return{type:"tasks/CHANGE-TASK-TITLE",payload:{title:e,taskId:t,todolistId:a}}}(t,e,n))}),[a]),o=Object(n.useCallback)((function(t,e){a(function(t,e){return{type:"todos/CHANGE-TODOLIST_FILTER",payload:{filter:e,id:t}}}(e,t))}),[a]),s=Object(n.useCallback)((function(t,e){a(function(t,e){return{type:"todos/CHANGE-TODOLIST_TITLE",payload:{title:e,id:t}}}(e,t))}),[a]),i=Object(n.useCallback)((function(t){a({type:"todos/REMOVE-TODOLIST",payload:{id:t}})}),[a]);Object(n.useEffect)((function(){a(function(){var t=Object(g.a)(S.a.mark((function t(e){var a;return S.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,L();case 3:a=t.sent,e({type:"todos/SET-TODOS",todos:a.data}),t.next=10;break;case 7:throw t.prev=7,t.t0=t.catch(0),new Error("ERROR");case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}())}),[]);var l=t.map((function(t){var a=e[t.id];return Object(O.jsx)(T.a,{item:!0,children:Object(O.jsx)(Y.a,{elevation:2,sx:{padding:"10px"},children:Object(O.jsx)(tt,{id:t.id,title:t.title,filter:t.filter,tasks:a,changeFilter:o,changeTaskStatus:c,removeTodolist:i,changeTaskTitle:r,changeTodolistTitle:s},t.id)})},t.id)}));return Object(O.jsx)(O.Fragment,{children:l})};var st=function(){var t=Object(V.b)(),e=Object(n.useCallback)((function(e){var a=Object(i.a)();t(function(t,e){return{type:"todos/ADD-TODOLIST",payload:{title:t,id:e}}}(e,a)),t(function(t){return{type:"tasks/ADD-ARRAY-TASK",payload:{todoListId:t}}}(a))}),[t]);return Object(O.jsxs)("div",{children:[Object(O.jsx)(f.a,{position:"static",color:"secondary",children:Object(O.jsxs)(k.a,{children:[Object(O.jsx)(j.a,{size:"large",edge:"start",color:"inherit","aria-label":"menu",sx:{mr:2},children:Object(O.jsx)(m.a,{})}),Object(O.jsx)(h.a,{variant:"h6",component:"div",sx:{flexGrow:1},children:"TodoLists"}),Object(O.jsx)(v.a,{color:"inherit",children:"Login"})]})}),Object(O.jsxs)(x.a,{fixed:!0,children:[Object(O.jsx)(T.a,{container:!0,sx:{padding:"20px 0",marginBottom:"30px"},children:Object(O.jsx)(p,{callBack:e})}),Object(O.jsx)(T.a,{container:!0,spacing:4,children:Object(O.jsx)(ot,{})})]})]})};o.a.render(Object(O.jsxs)(V.a,{store:ct,children:[Object(O.jsx)(st,{}),","]}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[138,1,2]]]);
//# sourceMappingURL=main.ef33ca12.chunk.js.map