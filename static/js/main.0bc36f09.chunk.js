(this.webpackJsonpFlexAxis=this.webpackJsonpFlexAxis||[]).push([[0],{38:function(e,t,c){},52:function(e,t,c){},61:function(e,t,c){"use strict";c.r(t);var n=c(0),o=c.n(n),s=c(19),i=c.n(s),a=(c(52),c(12)),d=(c(38),c(22)),l=c(47),r=c(33),m=c.p+"static/media/nuuk.53610b05.svg",j=c(1),u=function(){return Object(j.jsx)("div",{className:"header_nav",children:Object(j.jsxs)(r.a,{bg:"mediumgray",width:"100%",variant:"dark",children:[Object(j.jsx)(r.a.Brand,{children:Object(j.jsx)("a",{href:"/panel",children:Object(j.jsx)("img",{src:m,height:"auto",width:"150vw",alt:"Nuuk logo"})})}),Object(j.jsx)(r.a.Brand,{children:Object(j.jsx)("h2",{className:"title",children:"FlexAxis"})})]})})},x=c(36),f=c(37),h=c(30),p=c(46),b=c.n(p),O="flexcontrol-dev.nuuk.ai",y="https://".concat(O,":4001"),g=Object(l.a)(y);var w=function(){var e=function(e,t){e.preventDefault(),g.emit("command",t),console.log("Command ".concat(t," emitted"))};Object(n.useEffect)((function(){g.emit("camera",i),g.on("welcome",(function(e){return console.log("From server => ",e)})),g.on("streamstatus",(function(e){return function(e){console.log(e),!0===e?p(!1):!1===e&&p(!0)}(e)}))}),[]);var t=Object(n.useState)({ip:"212.170.116.46",username:"root",password:"pass"}),c=Object(a.a)(t,2),o=(c[0],c[1],Object(n.useState)({ip:"212.170.116.46",username:"root",password:"pass"})),s=Object(a.a)(o,2),i=s[0],l=(s[1],Object(n.useState)(!1)),r=Object(a.a)(l,2),m=r[0],p=r[1];Object(n.useEffect)((function(){if(!1===m){var e="wss://".concat(O,":6789/stream"),t=new b.a.VideoElement("#video-canvas",e,{autoplay:!0});console.log(t)}}),[m]);var y=!1,w=!1,v=!1,N=!1,S=!1,k=!1,K=!1,C=!1;return Object(n.useEffect)((function(){document.addEventListener("keydown",(function(e){"KeyW"===e.code&&!1===y?(console.log("W"),g.emit("command","upspeed"),y=!0):"KeyS"===e.code&&!1===v?(console.log("S"),g.emit("command","downspeed"),v=!0):"KeyA"===e.code&&!1===w?(console.log("A"),w=!0,g.emit("command","leftspeed")):"KeyD"===e.code&&!1===N?(console.log("D"),N=!0,g.emit("command","rightspeed")):"KeyQ"===e.code&&!1===S?(console.log("Q"),S=!0,g.emit("command","zoominspeed")):"KeyE"===e.code&&!1===k?(console.log("E"),k=!0,g.emit("command","zoomoutspeed")):"Space"===e.code&&!1===C?(console.log("Space"),k=!0):"ShiftLeft"===e.code&&!1===K&&(console.log("ShiftLeft"),k=!0)})),document.addEventListener("keyup",(function(e){"KeyW"===e.code?(y=!1,g.emit("command","stopspeed")):"KeyS"===e.code?(v=!1,g.emit("command","stopspeed")):"KeyA"===e.code?(w=!1,g.emit("command","stopspeed")):"KeyD"===e.code?(console.log("No D"),N=!1,g.emit("command","stopspeed")):"KeyQ"===e.code?(S=!1,g.emit("command","stopzoomspeed")):"KeyE"===e.code?(k=!1,g.emit("command","stopzoomspeed")):"Space"===e.code?(console.log("No Space"),C=!1):"ShiftLeft"===e.code&&(K=!1)}))}),[]),Object(j.jsx)(j.Fragment,{children:Object(j.jsxs)("div",{className:"App",children:[Object(j.jsx)(u,{}),Object(j.jsx)(j.Fragment,{children:Object(j.jsx)(x.a,{className:"d-flex flex-row w-100 h-100",fluid:!0,children:Object(j.jsxs)(f.a,{className:"w-100",children:[Object(j.jsx)(h.a,{xs:12,sm:6,className:"d-flex justify-content-center w-100 mt-5",children:Object(j.jsx)("div",{id:"video-canvas",style:{height:"300px",width:"500px"}})}),Object(j.jsx)(h.a,{xs:12,sm:6,className:"d-flex justify-content-center w-100",children:Object(j.jsxs)("div",{className:"w-100 h-100 mt-2",children:[Object(j.jsx)("div",{className:"d-flex mt-1 justify-content-center w-100",children:Object(j.jsx)(d.a,{variant:"primary",style:{width:"120px"},onClick:function(t){return e(t,"zoomin")},children:"Zoom in"})}),Object(j.jsxs)("div",{className:"d-flex flex-column mt-3 justify-content-center",children:[Object(j.jsx)("div",{className:"d-flex justify-content-around w-100",children:Object(j.jsx)(d.a,{style:{width:"120px",height:"auto"},onClick:function(t){return e(t,"up")},children:"Tilt Up"})}),Object(j.jsx)(x.a,{className:"w-100",children:Object(j.jsxs)(f.a,{xs:"12",lg:"6",md:"6",className:"d-flex mt-2 justify-content-center",children:[Object(j.jsx)(h.a,{className:"d-flex justify-content-center",style:{width:"120px"},children:Object(j.jsx)(d.a,{style:{width:"120px"},onClick:function(t){return e(t,"left")},children:"Pan Left"})}),Object(j.jsx)(h.a,{className:"d-flex justify-content-center",style:{width:"120px"},children:Object(j.jsx)(d.a,{style:{width:"120px"},onClick:function(t){return e(t,"right")},children:"Pan Right"})})]})}),Object(j.jsx)("div",{className:"d-flex justify-content-around mt-2",children:Object(j.jsx)(d.a,{style:{width:"120px"},onClick:function(t){return e(t,"down")},children:"Tilt Down"})})]}),Object(j.jsx)("div",{className:"d-flex justify-content-around mt-2 w-100",children:Object(j.jsx)(d.a,{style:{width:"120px"},onClick:function(t){return e(t,"zoomout")},children:"Zoom Out"})})]})})]})})})]})})},v=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,64)).then((function(t){var c=t.getCLS,n=t.getFID,o=t.getFCP,s=t.getLCP,i=t.getTTFB;c(e),n(e),o(e),s(e),i(e)}))};i.a.render(Object(j.jsx)(o.a.StrictMode,{children:Object(j.jsx)(w,{})}),document.getElementById("root")),v()}},[[61,1,2]]]);
//# sourceMappingURL=main.0bc36f09.chunk.js.map