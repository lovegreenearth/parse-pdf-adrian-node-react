(this.webpackJsonpmcash=this.webpackJsonpmcash||[]).push([[1],{19:function(e,t,n){"use strict";var a=n(0);t.a=Object(a.createContext)(null)},22:function(e,t,n){"use strict";t.a={BACKEND_URL:"http://81.181.160.210"}},53:function(e,t,n){},79:function(e,t,n){"use strict";n.r(t);var a={};n.r(a),n.d(a,"Layout1",(function(){return S})),n.d(a,"Layout2",(function(){return I})),n.d(a,"Layout3",(function(){return D}));var c=n(1),r=n(0),s=n.n(r),o=n(30),i=n.n(o),l=(n(53),n(26)),u=n.n(l),j=n(32),d=n(14),b=n(21),h=n.n(b),O=n(81),x=n(8),f=n(3),m=n(13),v=n(42),p=n.n(v),g={display:"block",margin:"0 auto",borderColor:"#3f7fe9"},k=function(){return Object(c.jsx)("div",{className:"loading-component",children:Object(c.jsx)(p.a,{color:"yellow",loading:!0,cssOverride:g,size:150})})},y=[{path:"/",key:"ROOT",layout:"Layout2",exact:!0,component:Object(m.a)((function(){return n.e(5).then(n.bind(null,231))}),{fallback:Object(c.jsx)(k,{})})},{path:"/tickets",key:"ROOT",layout:"Layout2",exact:!0,component:Object(m.a)((function(){return Promise.all([n.e(0),n.e(3),n.e(9)]).then(n.bind(null,232))}),{fallback:Object(c.jsx)(k,{})})},{path:"/signup",key:"ROOT",layout:"Layout1",exact:!0,component:Object(m.a)((function(){return n.e(7).then(n.bind(null,234))}),{fallback:Object(c.jsx)(k,{})})},{path:"/signin",key:"ROOT",layout:"Layout1",exact:!0,component:Object(m.a)((function(){return n.e(6).then(n.bind(null,235))}),{fallback:Object(c.jsx)(k,{})})},{path:"/read/:id",key:"ROOT",layout:"Layout3",exact:!0,component:Object(m.a)((function(){return Promise.all([n.e(0),n.e(8)]).then(n.bind(null,236))}),{fallback:Object(c.jsx)(k,{})})}],N=function(){return Object(c.jsx)("header",{children:Object(c.jsxs)("div",{className:"top-header",children:[Object(c.jsx)("div",{className:"header-logo",children:"MayaTravel"}),Object(c.jsx)("div",{className:"user-mode",children:Object(c.jsxs)("div",{className:"auth-link",children:[Object(c.jsx)(x.b,{to:"/signin",children:"SignIn"}),"/",Object(c.jsx)(x.b,{to:"/signup",children:"SignUp"})]})})]})})},L=function(){return Object(c.jsx)("div",{className:"footer",children:"Copyright @ 2023 developed by MayaTravel"})},S=function(e){var t=e.children;return Object(c.jsxs)(s.a.Fragment,{children:[Object(c.jsx)(N,{}),Object(c.jsx)("div",{className:"auth-page",children:t}),Object(c.jsx)(L,{})]})},C=n(19),T=function(){var e=Object(r.useContext)(C.a),t=(e.userData,e.setUserData),n=Object(f.f)(),a=Object(r.useState)(!1),s=Object(d.a)(a,2),o=(s[0],s[1]),i=Object(r.useState)(!1),l=Object(d.a)(i,2),u=(l[0],l[1]);return Object(r.useEffect)((function(){var e=localStorage.getItem("token");o(!!e);var t=localStorage.getItem("role");u("admin"==t)}),[]),Object(c.jsx)("header",{children:Object(c.jsxs)("div",{className:"top-header",children:[Object(c.jsx)("div",{className:"header-logo",children:Object(c.jsx)("h1",{children:"MayaTravel"})}),Object(c.jsxs)("div",{className:"user-mode",children:[Object(c.jsx)(x.b,{to:"/tickets",className:"contact-us auth-link",children:"Ticket"}),Object(c.jsx)(x.b,{to:"/",className:"contact-us auth-link",children:"Home"}),Object(c.jsx)("div",{className:"auth-link",children:Object(c.jsx)("a",{onClick:function(){t({token:void 0,user:void 0}),localStorage.setItem("token",""),localStorage.setItem("role",""),n.push("/signin")},children:"Logout"})})]})]})})},I=function(e){var t=e.children;return Object(c.jsxs)(s.a.Fragment,{children:[T(),Object(c.jsx)("div",{className:"content",children:t}),Object(c.jsx)("div",{className:"footer",children:"Copyright @ 2023 developed by MayaTravel"})]})},D=function(e){var t=e.children;return Object(c.jsxs)(s.a.Fragment,{children:[Object(c.jsx)("div",{className:"",children:t}),Object(c.jsx)(L,{})]})},E=n(20),R=n(43),F=n.n(R),U=function e(t,n){var a=null;return F.a.forEach(n,(function(n){if(n.routes)e(t,n.routes);else{var c=Object(f.e)(t,n);c&&c.isExact&&(a=n)}})),a},w=function(e){return Object(c.jsx)(f.a,{path:e.path,exact:e.exact,render:function(t){return Object(c.jsx)(e.component,Object(E.a)(Object(E.a)({},t),{},{routes:e.routes}))}})},B=function(e){var t=e.routes;return Object(c.jsx)(f.c,{children:t.map((function(e){return Object(c.jsx)(w,Object(E.a)({},e),e.key)}))})},M=function(){var e=Object(f.g)(),t=U(e.pathname,y),n=a[t.layout];return Object(c.jsx)(n,{children:Object(c.jsx)(B,{routes:y})})},P=n(22);var A=function(){var e=Object(r.useState)({token:void 0,user:void 0}),t=Object(d.a)(e,2),n=t[0],a=t[1];return Object(r.useEffect)((function(){(function(){var e=Object(j.a)(u.a.mark((function e(){var t,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return null===(t=localStorage.getItem("auth-token"))&&(localStorage.setItem("auth-token",""),t=""),e.next=4,h.a.post(P.a.BACKEND_URL+"/users/tokenIsValid",null,{headers:{"x-auth-token":t}});case 4:if(!e.sent.data){e.next=10;break}return e.next=8,h.a.get(P.a.BACKEND_URL+"/users/",{headers:{"x-auth-token":t}});case 8:n=e.sent,a({token:t,user:n.data});case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),Object(c.jsx)(O.a,{locale:"en",children:Object(c.jsx)(x.a,{children:Object(c.jsx)(C.a.Provider,{value:{userData:n,setUserData:a},children:Object(c.jsx)(M,{})})})})},K=function(e){e&&e instanceof Function&&n.e(10).then(n.bind(null,237)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),a(e),c(e),r(e),s(e)}))};n(78);i.a.render(Object(c.jsx)(s.a.StrictMode,{children:Object(c.jsx)(A,{})}),document.getElementById("root")),K()}},[[79,2,4]]]);
//# sourceMappingURL=main.93a56bae.chunk.js.map