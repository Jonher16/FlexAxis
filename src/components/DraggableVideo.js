import React, { Component, component } from "react";
import $ from "jquery";
import io from "socket.io-client";

export default class DraggableVideo extends Component {

  componentDidMount() {
    var ENDPOINT = this.props.endpoint;
    const socket = io(ENDPOINT);
    var lastX, lastY;
    var $box = $("#video-canvas");
    console.log("ready");
    $box.css("cursor", "move");

    var flag_move = false;
    var lastDirection = "none";
    var direction = "";
    var oldx = 0;
    var oldy = 0;

    const mousemovemethod = (e) => {
      $box.css("cursor", "grab");
      // console.log("lastDirection", lastDirection);
      // console.log("flag ", flag_move);
      // console.log(oldx, oldy);
      // console.log(e.pageX, e.pageY);

      if (e.pageX > oldx && e.pageY == oldy) {
        if (
          flag_move === false 
          // || (flag_move === true && lastDirection !== "right")
        ) {
          flag_move = true;
          direction = "right";
          console.log(direction);
          socket.emit("command", "rightspeed");
        }
      } else if (e.pageX == oldx && e.pageY > oldy) {
        if (
          flag_move === false 
          // || (flag_move === true && lastDirection !== "down")
        ) {
          flag_move = true;
          direction = "down";
          console.log(direction);
          socket.emit("command", "downspeed");
        }
      } else if (e.pageX == oldx && e.pageY < oldy) {
        if (
          flag_move === false
          // || (flag_move === true && lastDirection !== "up")
        ) {
          flag_move = true;
          direction = "up";
          console.log(direction);
          socket.emit("command", "upspeed");
        }
      } else if (e.pageX < oldx && e.pageY == oldy) {
        if (
          flag_move === false
          // || (flag_move === true && lastDirection !== "left")
        ) {
          flag_move = true;
          direction = "left";
          console.log(direction);
          socket.emit("command", "leftspeed");
        }
      }
      oldx = e.pageX;
      oldy = e.pageY;

      lastDirection = direction;
    };

    $box.on("wheel", function (e) {
      var delta = e.originalEvent.deltaY / Math.abs(e.originalEvent.deltaY);
      //console.log(delta)
      if (delta == -1) {
        //console.log("up")
        socket.emit("command", "zoomin");
      } // going up
      else {
        socket.emit("command", "zoomout");
      }
    });

    $box.on("touchstart mousedown", function (e) {
      $box.on("touchmove mousemove", mousemovemethod);
    });

    $box.on("touchend mouseup", function (e) {
      $box.off("touchend mousemove", mousemovemethod);
      $box.css("cursor", "move");
      //console.log("ready");
      socket.emit("command", "stopspeed");
      flag_move = false;
      lastDirection = "";
    });
  }

  render() {
    return (
      <>
        <div className="w-100 d-inline-flex justify-content-center">
          <div
            onMouseDown={this.handleEvent}
            onMouseUp={this.handleEvent}
            onDrag={this.handleDrag}
            className="m-3"
            id="video-canvas"
            style={{ height: "500px", width: "800px" }}
          ></div>
        </div>
      </>
    );
  }
}
