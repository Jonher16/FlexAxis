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
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//Stream declarations

Stream = require("node-rtsp-stream");
var stream;

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

    this.stream = new Stream({
      name: "Stream",
      // streamUrl: "rtsp://YOUR_IP:PORT",
      streamUrl: `rtsp://${username}:${password}@${ip}/axis-media/media.amp`,
      wsPort: 6789,
      ffmpegOptions: {
        // options ffmpeg flags
        "-f": "mpegts", // output file format.
        "-codec:v": "mpeg1video", // video codec
        "-b:v": "1000k", // video bit rate
        "-stats": "",
        "-r": 25, // frame rate
        "-s": "640x480", // video size
        "-bf": 0,
        // audio
        "-codec:a": "mp2", // audio codec
        "-ar": 44100, // sampling rate (in Hz)(in Hz)
        "-ac": 1, // number of audio channels
        "-b:a": "128k", // audio bit rate
      },
    });
    io.emit("welcome", `stream => ${this.stream}`);
    axis.ptz.rpan("50").then(async (res) => {
      console.log(res); //true
      axis.ptz.reachPos().then((reached) => {
        console.log(reached); // true when reached
      });
    });
  });

  socket.on("deletestream", () => {
    io.emit("welcome", `stream end => ${this.stream}`);
    this.stream.destroy();
    console.log("Stream closed.");
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
