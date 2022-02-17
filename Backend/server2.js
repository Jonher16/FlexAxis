//SOCKET.IO SERVER REQUIREMENTS

const http = require("http"); //Require http to create a http server
const socketIo = require("socket.io"); //Packet to send commands over SocketIo

//AXIS REQUIREMENTS

var Axis = require("./Axis.js");
var axis = new Axis("212.170.116.46", "root", "pass", { camera: "1" });

//Socket.io Server Declarations

const hostname = "127.0.0.1";
const port = 4001;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("SocketIo Server");
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//Stream declarations

const WebSocket = require('ws'); //Packet to send video over WebSocket
const spawn = require('child_process').spawn; //Packet to spawn ffmpeg over a separate process
var stream;
var flag_stream = false;
const STREAM_PORT = 6789

const Fs = require('fs');
const Https = require('https');
const WebSocketServer = require('ws').Server;

const httpsServer = Https.createServer({
  key: Fs.readFileSync("./cert/flexaxis.key"),
  cert: Fs.readFileSync("./cert/flexaxis.cert")
});

httpsServer.on('request', (req, res) => {
  res.writeHead(200);
  res.end('hello HTTPS world\n');
});

//3. Begin web socket server

const webSocketServer = new WebSocketServer({
  path: 'ws://localhost:6789/stream',
  server: httpsServer
});


httpsServer.listen(STREAM_PORT, hostname, () => {
  console.log(`Stream server running at https://${hostname}:${STREAM_PORT}/stream`);
});

// Broadcast the stream via websocket to connected clients
webSocketServer.broadcast = function(data) {
  webSocketServer.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};


//Variables

var zoomstep = 100;
var angle = 20;
var ip = "127.0.0.1";
var username = "root";
var password = "root";

//Socket.io Sockets

io.on("connection", (socket) => {
  console.log("A user has connected");
  io.emit("welcome", "Welcome, new user");
  io.emit("streamstatus", flag_stream);

  socket.on("camera", (msg) => {
    ip = msg.ip;
    username = msg.username;
    password = msg.password;

    console.log(msg.ip);
    console.log(msg.username);
    console.log(msg.password);
    console.log(`rtsp://${username}:${password}@${ip}/axis-media/media.amp`);

    axis = new Axis(msg.ip, msg.username, msg.password, { camera: "1" });
    io.emit("welcome", `Axis camera credentials changed.`);
    flag_stream = true;
    setTimeout(function() {
      var args = [
        "-i", `rtsp://${username}:${password}@${ip}/axis-media/media.amp`,
        "-r", "30",
        "-s", "960x720",
        "-codec:v", "mpeg1video",
        "-b", "800k",
        "-f", "mpegts",
        "https://127.0.0.1:6789/stream",
      ];
    
      // Spawn an ffmpeg instance
      stream = spawn('ffmpeg', args);
    
      //Uncomment if you want to see ffmpeg stream info
      stream.stderr.pipe(process.stderr);
      stream.on("exit", function(code){
          console.log("Failure", code);
      });
    }, 1000);

  });

  socket.on("deletestream", () => {
    console.log("Stream closed.");
    stream.kill('SIGINT');
    flag_stream = false;
    io.emit("welcome", "Stream closed.");
  });

  socket.on("command", (command) => {
    console.log(command);
    switch (command) {
      case "zoomin":
        axis.ptz.rzoom(zoomstep);
        break;
      case "zoomout":
        axis.ptz.rzoom(-zoomstep);
        break;
      case "left":
        axis.ptz.rpan(-angle);
        break;
      case "right":
        axis.ptz.rpan(angle);
        break;
      case "up":
        axis.ptz.rtilt(angle);
        break;
      case "down":
        axis.ptz.rtilt(-angle);
        break;
      case "upspeed":
        axis.ptz.continuouspantiltmove(0, 10);
        break;
      case "downspeed":
        axis.ptz.continuouspantiltmove(0, -10);
        break;
      case "leftspeed":
        axis.ptz.continuouspantiltmove(-10, 0);
        break;
      case "rightspeed":
        axis.ptz.continuouspantiltmove(10, 0);
        break;
      case "stopspeed":
        axis.ptz.continuouspantiltmove(0, 0);
        break;
      case "zoominspeed":
        axis.ptz.continuouszoommove(10);
        break;
      case "zoomoutspeed":
        axis.ptz.continuouszoommove(-10);
        break;
      case "stopzoomspeed":
        axis.ptz.continuouszoommove(0);
        break;
    }
  });

  socket.on("disconnect", () => {
    console.log("A user has disconnected");
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
