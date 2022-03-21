import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";

const ControlButtons = ({ onClick }) => {
  return (
    <>
      {/* Controls Column*/}
      <Col xs={12} sm={6} className="d-flex justify-content-center w-100">
        {/* Edit Credentials Div */}
        <div className="w-100 h-100 mt-2">
          <div className="d-flex mt-1 justify-content-center w-100">
            <Button
              variant="primary"
              style={{ width: "120px" }}
              onClick={(e) => onClick(e, "zoomin")}
            >
              Zoom in
            </Button>
          </div>

          {/* Joysticks div*/}

          <div className="d-flex flex-column mt-3 justify-content-center">
            {/* Tilt Up div */}
            <div className="d-flex justify-content-around w-100">
              <Button
                style={{ width: "120px", height: "auto" }}
                onClick={(e) => onClick(e, "up")}
              >
                Tilt Up
              </Button>
            </div>
            {/* Pan Left/Right Container */}
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
                    onClick={(e) => onClick(e, "left")}
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
                    onClick={(e) => onClick(e, "right")}
                  >
                    Pan Right
                  </Button>
                </Col>
              </Row>
            </Container>
            {/* Tilt down div */}
            <div className="d-flex justify-content-around mt-2">
              <Button
                style={{ width: "120px" }}
                onClick={(e) => onClick(e, "down")}
              >
                Tilt Down
              </Button>
            </div>
          </div>
          {/* Zoom out div */}
          <div className="d-flex justify-content-around mt-2 w-100">
            <Button
              style={{ width: "120px" }}
              onClick={(e) => onClick(e, "zoomout")}
            >
              Zoom Out
            </Button>
          </div>
        </div>
      </Col>
      {/* Controls Column Close */}
    </>
  );
};

export default ControlButtons;
