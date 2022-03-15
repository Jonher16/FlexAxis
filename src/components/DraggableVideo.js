import React, { Component, component } from "react";
import $ from "jquery";
import io from "socket.io-client";

export default class DraggableVideo extends Component {
  
  componentDidMount() {
    var ENDPOINT = this.props.endpoint
    const socket = io(ENDPOINT);
    var flag_move = false;
    var lastX, lastY;
    var $box = $("#video-canvas");
    console.log("ready");
    $box.css('cursor','pointer');


    $box.on('wheel', function(e) { 
      var delta = e.originalEvent.deltaY/Math.abs(e.originalEvent.deltaY);
      console.log(delta)
      if (delta == -1){
        console.log("up")
        socket.emit("command","zoomin")
      } // going up
      else {
        socket.emit("command","zoomout")
      }
      return false;
    });


    $box.on("touchstart mousedown", function (e) {
      $box.on("touchmove mousemove", touchmove);
      $box.css('cursor','grab');
      
    });

    $box.on("touchend mouseup", function (e) {
      $box.off("touchend mousemove", touchmove);
      $box.css('cursor','pointer');
      console.log("ready");
      socket.emit("command", "stopspeed");
      flag_move = false;
    });

    function touchmove(e) {
      var currentX, currentY;
      var buffer = 1000;
    var lastDirection = "";
      currentX = e.originalEvent.touches
        ? e.orginalEvent.touches[0].clientX
        : e.originalEvent.clientX;
      currentY = e.originalEvent.touches
        ? e.originalEvent.touches[0].clientY
        : e.originalEvent.clientY;

      if (currentY > lastY) {
        if (flag_move === false || (flag_move === true && lastDirection !== "down")) {
          console.log("down");
          socket.emit("command", "downspeed");
          flag_move = true;
          lastDirection = "down"
        }
      } else if (currentY < lastY) {
        if (flag_move === false || (flag_move === true && lastDirection !== "up")) {
          console.log("up");
          socket.emit("command", "upspeed");
          flag_move = true;
          lastDirection="up"
        }
      }
      lastY = currentY;

      if (currentX > lastX) {
        if (flag_move === false || (flag_move === true && lastDirection !== "right")) {
          console.log("right");
          socket.emit("command", "rightspeed");
          flag_move = true;
          lastDirection = "right"
        }
      } else if (currentX < lastX) {
        if (flag_move === false || (flag_move === true && lastDirection !== "left")) {
          console.log("left");
          socket.emit("command", "leftspeed");
          flag_move = true;
          lastDirection="left"
        }
      }
      lastX = currentX;

    }
  }

  render() {
    return (
      <div
        className="m-3 d-flex flex-row justify-content-center border w-75 dragcanvas"
        id="video-canvas"
        style={{ height: "300px", width: "500px" }}
      ></div>
    );
  }
}
