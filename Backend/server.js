//SOCKET.IO SERVER REQUIREMENTS

const http = require('http'); //Require http to create a http server
const socketIo = require("socket.io"); //Packet to send commands over SocketIo

//AXIS REQUIREMENTS

var Axis = require('./Axis.js');
var axis = new Axis("212.170.116.46","root","pass",{'camera':'1'});


//Socket.io Server Declarations

const hostname = '127.0.0.1';
const port = 4001;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('SocketIo Server');
});
const io = socketIo(server);
var zoomstep = 100
var angle = 20

//Socket.io Sockets

io.on("connection", (socket) => {

  console.log("A user has connected")
  io.emit("welcome", "Welcome, new user");
  
  socket.on("camera", (msg) => {
    console.log(msg.ip)
    console.log(msg.username)
    console.log(msg.password)
    axis = new Axis(msg.ip,msg.username,msg.password,{'camera':'1'});
    io.emit("welcome", `Axis camera credentials changed.`);
    
  });
  
  socket.on("command", (command) => {
    console.log(command)
    switch(command){
      case "zoomin":
      axis.ptz.rzoom(zoomstep)
      break;
      case "zoomout":
      axis.ptz.rzoom(-zoomstep)
      break;
      case "left":
      axis.ptz.rpan(-angle)
      break;
      case "right":
      axis.ptz.rpan(angle)
      break;
      case "up":
      axis.ptz.rtilt(angle)
      break;
      case "down":
      axis.ptz.rtilt(-angle)
      break;
      case "upspeed":
      axis.ptz.continuouspantiltmove(0, 10)
      break;
      case "downspeed":
      axis.ptz.continuouspantiltmove(0, -10)
      break;
      case "leftspeed":
      axis.ptz.continuouspantiltmove(-10, 0)
      break;
      case "rightspeed":
      axis.ptz.continuouspantiltmove(10, 0)
      break;
      case "stopspeed":
      axis.ptz.continuouspantiltmove(0,0)
      break;
      case "zoominspeed":
      axis.ptz.continuouszoommove(10)
      break;
      case "zoomoutspeed":
      axis.ptz.continuouszoommove(-10)
      break;
      case "stopzoomspeed":
      axis.ptz.continuouszoommove(0)
      break;
    }

  });

  socket.on("disconnect", () => {
    console.log("A user has disconnected")
  });


});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});