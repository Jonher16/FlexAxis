//SOCKET.IO SERVER REQUIREMENTS

const Https = require("https");
const socketIo = require("socket.io"); //Packet to send commands over SocketIo

//WEBSOCKETS MEDIA SERVER REQUIEMENTS

const Fs = require("fs");
const WebSocketServer = require("ws").Server;
const WebSocket = require("ws"); //Packet to send video over WebSocket
const process = require("process");

//AXIS REQUIREMENTS

var Axis = require("./Axis.js");

//.env MODULE

require('dotenv').config()
console.log("ENV",process.env)

//Socket.io Server Declarations

const hostname = process.env.SERVER_IP
const port = 4001;
const server = Https.createServer({
  key: Fs.readFileSync("./cert/key.pem"),
  cert: Fs.readFileSync("./cert/cert.pem"),
});

server.on("request", (req, res) => {
  console.log(
    "Stream Connection on " +
      STREAM_PORT +
      " from: " +
      req.socket.remoteAddress +
      ":" +
      req.socket.remotePort
  );
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Certificates accepted. You may now return to the FlexAxis panel.");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//Stream declarations

const spawn = require("child_process").spawn; //Packet to spawn ffmpeg over a separate process

var stream;
var axis;
var pid;

var flag_stream = false;
const STREAM_PORT = 6789;

const httpsServer = Https.createServer({
  key: Fs.readFileSync("./cert/key.pem"),
  cert: Fs.readFileSync("./cert/cert.pem"),
});

httpsServer
  .on("request", (req, res) => {
    console.log(
      "Stream Connection on " +
        STREAM_PORT +
        " from: " +
        req.socket.remoteAddress +
        ":" +
        req.socket.remotePort
    );

    req.on("data", function (data) {
      // Now that we have data let's pass it to the web socket server
      webSocketServer.broadcast(data);
    });
  })
  .listen(STREAM_PORT);

//3. Begin web socket server

const webSocketServer = new WebSocketServer({
  server: httpsServer,
});

// Broadcast the stream via websocket to connected clients
webSocketServer.broadcast = function (data) {
  webSocketServer.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

//Variables

var zoomstep = 50;
var angle = 20;
var ip = "172.20.85.127"; //Set to "" in credential mode
var username = "root"; //Set to "" in credential mode
var password = "Nuuk2022"; //Set to "" in credential mode

//COMMENT FOR CREDENTIAL CHECK START

axis = new Axis("172.20.85.127", "root", "Nuuk2022", { camera: "1" });
flag_stream = true;
setTimeout(function () {
  var args = [
    "-i",
    `rtsp://${username}:${password}@${ip}/axis-media/media.amp`,
    "-r",
    "30",
    "-s",
    "960x720",
    "-codec:v",
    "mpeg1video",
    "-b",
    "800k",
    "-f",
    "mpegts",
    "https://127.0.0.1:6789/stream",
  ];

  // Spawn an ffmpeg instance
  try {
    stream = spawn("ffmpeg", args);
    pid = stream.pid;
    io.emit("welcome", "Stream started.");
    console.log("Stream started.");
    //Uncomment if you want to see ffmpeg stream info
    // stream.stderr.pipe(process.stderr);
    // stream.on("exit", function (code) {
    //   console.log("Failure", code);
    // });
  } catch (error) {
    io.emit("welcome", error);
    console.log(error);
  }
}, 3000);

//Socket.io Sockets

io.on("connection", (socket) => {
  console.log("A user has connected");
  io.emit("welcome", "Welcome, new user");
  io.emit("streamstatus", true); //change true to flag_stream in credential mode

  socket.on("camera", (msg) => {
    ip = msg.ip;
    username = msg.username;
    password = msg.password;

    console.log(msg.ip);
    console.log(msg.username);
    console.log(msg.password);
    console.log(`rtsp://${username}:${password}@${ip}/axis-media/media.amp`);
    console.log("Starting stream...");
    io.emit("welcome", `Axis camera credentials changed.`);
    io.emit("welcome", "Starting stream...");
    try {
      axis = new Axis(ip, username, password, { camera: "1" });
    } catch (error) {
      console.log(error);
      io.emit("welcome", error);
    }
    flag_stream = true;
    setTimeout(function () {
      var args = [
        "-i",
        `rtsp://${username}:${password}@${ip}/axis-media/media.amp`,
        "-r",
        "30",
        "-s",
        "960x720",
        "-codec:v",
        "mpeg1video",
        "-b",
        "800k",
        "-f",
        "mpegts",
        "https://127.0.0.1:6789/stream",
      ];

      // Spawn an ffmpeg instance
      try {
        stream = spawn("ffmpeg", args);
        pid = stream.pid;
        io.emit("welcome", "Stream started.");
        console.log("Stream started.");
        //Uncomment if you want to see ffmpeg stream info
        // stream.stderr.pipe(process.stderr);
        // stream.on("exit", function (code) {
        //   console.log("Failure", code);
        // });
      } catch (error) {
        io.emit("welcome", error);
        console.log(error);
      }
    }, 3000);
  });

  socket.on("deletestream", () => {
    try {
      console.log("Stream closed.");
      process.kill(pid, "SIGINT");
      axis = null;
    } catch (error) {
      console.log(error);
      io.emit("welcome", error);
    }
    flag_stream = false;
    io.emit("streamstatus", flag_stream);
    io.emit("welcome", "Stream closed.");
  });

  socket.on("restartstream", () => {
    try {
      io.emit("welcome", "Stream closed. Restarting stream...");
      process.kill(pid, "SIGINT");
      console.log("Stream closed.");
      axis = null;
      flag_stream = false;
    } catch (error) {
      console.log(error);
      io.emit("welcome", error);
    }
    try {
      axis = new Axis(ip, username, password, { camera: "1" });
    } catch (error) {
      console.log(error);
      io.emit("welcome", error);
    }
    setTimeout(function () {
      var args = [
        "-i",
        `rtsp://${username}:${password}@${ip}/axis-media/media.amp`,
        "-r",
        "30",
        "-s",
        "960x720",
        "-codec:v",
        "mpeg1video",
        "-b",
        "800k",
        "-f",
        "mpegts",
        "https://127.0.0.1:6789/stream",
      ];

      // Spawn an ffmpeg instance
      try {
        stream = spawn("ffmpeg", args);
        pid = stream.pid;
        io.emit("welcome", "Stream restarted.");
        console.log("Stream restarted.");
        //Uncomment if you want to see ffmpeg stream info
        // stream.stderr.pipe(process.stderr);
        // stream.on("exit", function (code) {
        //   console.log("Failure", code);
        // });
      } catch (error) {
        console.log(error);
      }
    }, 3000);
  });

  socket.on("command", (command) => {
    //console.log(command);
    try {
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
    } catch (error) {
      console.log("Error when sending command: ", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user has disconnected");
  });
});
