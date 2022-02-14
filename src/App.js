import "./App.scss";
import Button from "react-bootstrap/Button";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import HeaderNav from "./components/HeaderNav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form } from "react-bootstrap";

const ENDPOINT = "http://127.0.0.1:4001";
const socket = io(ENDPOINT);

function App() {

  const handleButton = (e, command) => {
    e.preventDefault();
    socket.emit("command", command);
    console.log(`Command ${command} emitted`);
  };

  useEffect(() => {
    socket.on("welcome", (msg) => console.log(msg));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCamera(tempcamera);
    socket.emit("camera", tempcamera);
    setTempCamera({
      ip: "",
      username: "",
      password: "",
    })
    alert("Axis camera credentials changed successfuly")
    setFlagCredentials(false)
  };

  const [camera, setCamera] = useState({ ip: "", username: "", password: "" });
  const [tempcamera, setTempCamera] = useState({
    ip: "",
    username: "",
    password: "",
  });

  const [flagCredentials, setFlagCredentials] = useState(true)

  var flagW = false;
  var flagA = false;
  var flagS = false;
  var flagD = false;
  var flagQ = false;
  var flagE = false;
  var flagSL = false;
  var flagSpace = false;

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.code === "KeyW" && flagW === false) {

        console.log("W");
        socket.emit("command", "upspeed");
        flagW = true;

      } else if (e.code === "KeyS" && flagS === false) {

        console.log("S");
        socket.emit("command", "downspeed");
        flagS = true;

      } else if (e.code === "KeyA" && flagA === false) {
        console.log("A");
        flagA = true;
        socket.emit("command", "leftspeed");

      } else if (e.code === "KeyD" && flagD === false) {
        console.log("D");
        flagD = true;
        socket.emit("command", "rightspeed");
       
      } else if (e.code === "KeyQ" && flagQ === false) {
        console.log("Q");
        flagQ = true;
        socket.emit("command", "zoominspeed");
        
      } else if (e.code === "KeyE" && flagE === false) {
        console.log("E");
        flagE = true;
        socket.emit("command", "zoomoutspeed");
      } else if (e.code === "Space" && flagSpace === false) {
        console.log("Space");
        flagE = true;
        
      } else if (e.code === "ShiftLeft" && flagSL === false) {
        console.log("ShiftLeft");
        flagE = true;
      
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.code === "KeyW") {

        // console.log("No W");
        flagW = false;
        socket.emit("command", "stopspeed");

      } else if (e.code === "KeyS") {
        // console.log("No S");
        flagS = false;
        socket.emit("command", "stopspeed");

      } else if (e.code === "KeyA") {

        // console.log("No A");
        flagA = false;
        socket.emit("command", "stopspeed");

      } else if (e.code === "KeyD") {

        console.log("No D");
        flagD = false;
        socket.emit("command", "stopspeed");
        
      } else if (e.code === "KeyQ") {
        //console.log("No Q");
        flagQ = false;
        socket.emit("command", "stopzoomspeed");
        
      } else if (e.code === "KeyE") {
        // console.log("No E");
        flagE = false;
        socket.emit("command", "stopzoomspeed");
        
      } else if (e.code === "Space") {
        console.log("No Space");
        flagSpace = false;
        
      } else if (e.code === "ShiftLeft") {
        // console.log("No ShiftLeft");
        flagSL = false;
       
      }
    });
  }, []);

  return (
    <>
      <div className="App">
        <HeaderNav />
        {flagCredentials ? 
        <Form className="pt-5 pl-5 pr-5">
          <Form.Group className="mb-3" controlId="formBasicIP">
            <Form.Label>Camera IP address</Form.Label>
            <Form.Control
              type="ip"
              placeholder="IP address"
              value={tempcamera.ip}
              onChange={(e) =>
                setTempCamera({ ...tempcamera, ip: e.target.value })
              }
            />
            <Form.Text className="text-muted">
              Private or Public. If public, make sure port 443 is port
              forwarded.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicUser">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="user"
              placeholder="Username"
              value={tempcamera.username}
              onChange={(e) =>
                setTempCamera({ ...tempcamera, username: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={tempcamera.password}
              onChange={(e) =>
                setTempCamera({ ...tempcamera, password: e.target.value })
              }
            />
          </Form.Group>

          <Button className="mt-2" onClick={(e) => handleSubmit(e)}>
            Apply Changes
          </Button>
        </Form> : <Button className="mt-5 ml-5" onClick={()=>setFlagCredentials(true)}>Edit Credentials</Button>
        }
        <Container className=" w-50 mt-1" fluid>
          {/* Zoom row*/}
          <Row
            className="d-flex mt-1 justify-content-center w-3"
            xs="12"
            lg="6"
            md="6"
          >
            <Col className="w-50 d-flex justify-content-center">
              <Button
                variant="primary"
                style={{ width: "120px" }}
                onClick={(e) => handleButton(e, "zoomin")}
              >
                Zoom in
              </Button>
            </Col>

            <Col className="w-50 d-flex justify-content-center">
              <Button
                style={{ width: "120px" }}
                onClick={(e) => handleButton(e, "zoomout")}
              >
                Zoom Out
              </Button>
            </Col>
          </Row>

          {/* Joysticks row */}

          <Row
            className="d-flex mt-3 justify-content-center"
            xs="12"
            lg="6"
            md="6"
          >
            <Col className=" w-50">
              <div className="d-flex justify-content-around">
                <Button
                  style={{ width: "120px", height: "auto" }}
                  onClick={(e) => handleButton(e, "up")}
                >
                  Tilt Up
                </Button>
              </div>

              <Container className="w-100">
                <Row
                  xs="12"
                  lg="6"
                  md="6"
                  className="d-flex mt-2 justify-content-center"
                >
                  <Col
                    className="d-flex justify-content-center"
                    style={{ width: "120px" }}
                  >
                    <Button
                      style={{ width: "120px" }}
                      onClick={(e) => handleButton(e, "left")}
                    >
                     Pan Left
                    </Button>
                  </Col>
                  <Col
                    className="d-flex justify-content-center"
                    style={{ width: "120px" }}
                  >
                    <Button
                      style={{ width: "120px" }}
                      onClick={(e) => handleButton(e, "right")}
                    >
                     Pan Right
                    </Button>
                  </Col>
                </Row>
              </Container>

              <div className="d-flex justify-content-around mt-2">
                <Button
                  style={{ width: "120px" }}
                  onClick={(e) => handleButton(e, "down")}
                >
                  Tilt Down
                </Button>
              </div>
            </Col>

            <Col className="w-50">
              <div className="d-flex justify-content-around">
                <Button
                  style={{ width: "120px" }}
                  onClick={(e) => handleButton(e, "movespeed")}
                >
                  MoveSpeed
                </Button>
              </div>

              <Container className="">
                <Row
                  xs="12"
                  lg="6"
                  md="6"
                  className="d-flex mt-2 justify-content-center"
                >
                  <Col
                    className="d-flex justify-content-center"
                    style={{ width: "100px" }}
                  >
                    <Button
                      style={{ width: "90px" }}
                      onClick={(e) => handleButton(e, "flip l")}
                    >
                      Flip L!
                    </Button>
                  </Col>
                  <Col
                    className="d-flex justify-content-center"
                    style={{ width: "100px" }}
                  >
                    <Button
                      style={{ width: "90px" }}
                      onClick={(e) => handleButton(e, "flip r")}
                    >
                      Flip R!
                    </Button>
                  </Col>
                </Row>
              </Container>
              <div className="d-flex justify-content-around mt-2">
                <Button
                  style={{ width: "90px" }}
                  onClick={(e) => handleButton(e, "flip b")}
                >
                  Flip B!
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
        <div id="video-canvas" style={{ height: "480px", width: "640px" }}></div>
      </div>
    </>
  );
}

export default App;