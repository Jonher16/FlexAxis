(this.webpackJsonpflexaxis=this.webpackJsonpflexaxis||[]).push([[0],{61:function(e,t,n){},74:function(e,t,n){},88:function(e,t,n){"use strict";n.r(t);var o=n(0),c=n.n(o),s=n(19),a=n.n(s),i=(n(74),n(6)),d=(n(61),n(59)),r=n(51),m=n(53),l=n.p+"static/media/nuuk.53610b05.svg",u=n(1),p=function(){return Object(u.jsx)("div",{className:"header_nav",children:Object(u.jsxs)(m.a,{bg:"mediumgray",width:"100%",variant:"dark",children:[Object(u.jsx)(m.a.Brand,{children:Object(u.jsx)("a",{href:"/panel",children:Object(u.jsx)("img",{src:l,height:"auto",width:"150vw",alt:"Nuuk logo"})})}),Object(u.jsx)(m.a.Brand,{children:Object(u.jsx)("h2",{className:"title",children:"FlexAxis"})})]})})},j=n(69),h=n(93),g=n(67),b=n.n(g);n(68);var f=n(56),v=n.n(f),x=n(7),O=n(8),y=n(10),w=n(9),k=function(e){Object(y.a)(n,e);var t=Object(w.a)(n);function n(){return Object(x.a)(this,n),t.apply(this,arguments)}return Object(O.a)(n,[{key:"componentDidMount",value:function(){var e=this.props.endpoint,t=Object(r.a)(e),n=v()("#video-canvas");console.log("ready"),n.css("cursor","move");var o=!1,c="",s=0,a=0,i=function(e){n.css("cursor","grab"),e.pageX>s&&e.pageY==a?!1===o&&(o=!0,c="right",console.log(c),t.emit("command","rightspeed")):e.pageX==s&&e.pageY>a?!1===o&&(o=!0,c="down",console.log(c),t.emit("command","downspeed")):e.pageX==s&&e.pageY<a?!1===o&&(o=!0,c="up",console.log(c),t.emit("command","upspeed")):e.pageX<s&&e.pageY==a&&!1===o&&(o=!0,c="left",console.log(c),t.emit("command","leftspeed")),s=e.pageX,a=e.pageY,c};n.on("wheel",(function(e){-1==e.originalEvent.deltaY/Math.abs(e.originalEvent.deltaY)?t.emit("command","zoomin"):t.emit("command","zoomout")})),n.on("touchstart mousedown",(function(e){n.on("touchmove mousemove",i)})),n.on("touchend mouseup",(function(e){n.off("touchend mousemove",i),n.css("cursor","move"),t.emit("command","stopspeed"),o=!1,""}))}},{key:"render",value:function(){return Object(u.jsx)(u.Fragment,{children:Object(u.jsx)("div",{className:"w-100 d-inline-flex justify-content-center",children:Object(u.jsx)("div",{onMouseDown:this.handleEvent,onMouseUp:this.handleEvent,onDrag:this.handleDrag,className:"m-3",id:"video-canvas",style:{height:"500px",width:"800px"}})})})}}]),n}(o.Component),E=(n(57),n(86),n(87),n(2),n(94),"flexcontrol.nuuk.ai"),K="https://".concat(E,":4001"),D=Object(r.a)(K);console.log("APP IP",E);var F=function(){Object(o.useEffect)((function(){console.log("entre"),D.on("welcome",(function(e){return console.log("From server => ",e)})),D.on("streamstatus",(function(e){return function(e){console.log(e),!0===e?a(!1):!1===e&&a(!0)}(e)}))}),[]);var e=Object(o.useState)({ip:"",username:"",password:""}),t=Object(i.a)(e,2),n=(t[0],t[1],Object(o.useState)(!0)),c=Object(i.a)(n,2),s=c[0],a=c[1];Object(o.useEffect)((function(){if(!1===s){var e="wss://".concat(E,":6789/stream"),t=new b.a.VideoElement("#video-canvas",e,{autoplay:!0});console.log(t)}}),[s]);var r=!1,m=!1,l=!1,g=!1,f=!1,v=!1;Object(o.useEffect)((function(){document.addEventListener("keydown",(function(e){"KeyW"===e.code&&!1===r?(console.log("W"),D.emit("command","upspeed"),r=!0):"KeyS"===e.code&&!1===l?(console.log("S"),D.emit("command","downspeed"),l=!0):"KeyA"===e.code&&!1===m?(console.log("A"),m=!0,D.emit("command","leftspeed")):"KeyD"===e.code&&!1===g?(console.log("D"),g=!0,D.emit("command","rightspeed")):"KeyQ"===e.code&&!1===f?(console.log("Q"),f=!0,D.emit("command","zoomoutspeed")):"KeyE"===e.code&&!1===v&&(console.log("E"),v=!0,D.emit("command","zoominspeed"))})),document.addEventListener("keyup",(function(e){"KeyW"===e.code?(r=!1,D.emit("command","stopspeed")):"KeyS"===e.code?(l=!1,D.emit("command","stopspeed")):"KeyA"===e.code?(m=!1,D.emit("command","stopspeed")):"KeyD"===e.code?(g=!1,D.emit("command","stopspeed")):"KeyQ"===e.code?(f=!1,D.emit("command","stopzoomspeed")):"KeyE"===e.code&&(v=!1,D.emit("command","stopzoomspeed"))}))}),[]);var x=Object(u.jsxs)(j.a,{id:"popover-basic",children:[Object(u.jsx)(j.a.Header,{as:"h1",children:"Camera control"}),Object(u.jsxs)(j.a.Body,{children:["Click on the camera canvas and ",Object(u.jsx)("strong",{children:"drag"})," in any direction to start panning the image. Instead, you can use WASD to pan the video with the keyboard.",Object(u.jsx)("h6",{children:"W: up A: left S: right D: down"})]})]});return Object(u.jsx)(u.Fragment,{children:Object(u.jsxs)("div",{className:"App",children:[Object(u.jsx)(p,{}),s?Object(u.jsx)(u.Fragment,{}):Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(k,{endpoint:K,socket:D}),Object(u.jsx)("div",{className:"d-flex justify-content-around mt-2 w-100",children:Object(u.jsx)(d.a,{style:{width:"155px"},onClick:function(e){return function(e){e.preventDefault(),D.emit("restartstream"),console.log("Restart stream emitted")}(e)},children:"Restart streaming"})}),Object(u.jsx)("div",{className:"d-flex justify-content-around mt-2 w-100",children:Object(u.jsx)(h.a,{trigger:"click",placement:"right",overlay:x,children:Object(u.jsx)(d.a,{style:{width:"155px"},children:"Help"})})})]})]})})},S=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,95)).then((function(t){var n=t.getCLS,o=t.getFID,c=t.getFCP,s=t.getLCP,a=t.getTTFB;n(e),o(e),c(e),s(e),a(e)}))};a.a.render(Object(u.jsx)(c.a.StrictMode,{children:Object(u.jsx)(F,{})}),document.getElementById("root")),S()}},[[88,1,2]]]);
//# sourceMappingURL=main.181cc8c2.chunk.js.map