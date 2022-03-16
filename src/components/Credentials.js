import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const Credentials = ({onClick}) => {


  const [tempcamera, setTempCamera] = useState({
    ip: "172.20.85.127",
    username: "root",
    password: "Nuuk2022",
  });

  return (
    <>
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

            <Button className="mt-2" onClick={(e) => onClick(e, tempcamera)}>
              Apply Changes
            </Button>
          </Form>
    </>
  )
}

export default Credentials