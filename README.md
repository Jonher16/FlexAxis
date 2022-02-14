# FlexAxis

Web-based platform in order to control PTZ-compatible Axis Cameras using the NodeJS client for AxisPTZ API. It includes a frontend connected via Socket.io to a Backend which uses the NodeJS client to send requests to the Axis Camera via the official AxisPTZ API.

## State

First commit. Simple button and keyboard functionalities in the frontend capable of sending commands via Socket.io to backend node server, which sends requests to the API and controls the camera

## To Fix

- Frontend style and archtiecture
- Add Video source

## Installation

First, install dependencies in both frontend and backend.

```
cd flex-axis-ptz
npm install
cd Backend
npm install
```

## Credits

Credits to hermajul, creator of the NodeJS client for AxisPTZ API.
Source: https://github.com/hermajul/axis-ptz-camera

