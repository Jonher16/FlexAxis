import { Joystick } from "react-joystick-component";
import { useEffect, useState, useMemo, useRef } from "react";

const joystickSize = {
height: 100,
width: 100,
}

function GobeJoystickController({
    move,
    start,
    stop,
    opactiy = 1.0,
    className
  }) {
    const [containerDiv, setContainerDiv] = useState();
    // the container will always fill it's parent
    const containerStyle = useRef({
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyItems: "center",
      justifyContent: "center"
    }).current;
    const baseColor = useMemo(
      () =>
        `radial-gradient(circle at 50% 50%, rgba(100,100,100,${opactiy}), rgba(100,100,100,${opactiy}), rgba(100,100,100,${opactiy}),  rgba(5,5,5,${opactiy}))`,
      [opactiy]
    );
    const stickColor = useMemo(
      () =>
        `radial-gradient(circle at 50% 50%, rgba(70,70,70,${opactiy}), rgba(70,70,70,${opactiy}), rgba(5,5,5,${opactiy}))`,
      [opactiy]
    );
    return (
      <div ref={setContainerDiv} style={containerStyle} className={className}>
        {containerDiv ? (
          <div className="d-flex flex-row justify-content-center w-100 h-100 border">
          <div className="d-flex flex-row justify-contents-center align-items-center m-3 border">
          <Joystick
            // we are assuming that the container dimensions will never change in the lifetime of this component
            size={(joystickSize.width, joystickSize.height)}
            baseColor={baseColor}
            stickColor={stickColor}
            throttle={200}
            move={move}
            stop={stop}
            start={start}
          />
          </div></div>
        ) : null}
      </div>
    );
  }

export default GobeJoystickController;