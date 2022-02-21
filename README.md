# FlexAxis

Web-based platform in order to control PTZ-compatible Axis Cameras using the NodeJS client for AxisPTZ API. It includes a frontend connected via Socket.io to a Backend which uses the NodeJS client to send requests to the Axis Camera via the official AxisPTZ API.

## Architecture

- Frontend ( . ): ReactJS + React Bootstrap + SCSS
- Backend ( ./Backend/server3.js ):
   - Socket.io server. Running over HTTPS (Port 4001)
   - Websockets stream server. Running over HTTPS (Port 6789)
   - Node AxisPTZ client
   - FFMPEG (Needs to be installed in host machine)

## To Fix

- Add environment variables
- Clean & Reorganize code

## Installation

First, install dependencies in both frontend and backend.

```
cd flexaxis
npm install
cd Backend
npm install
```
You may also need to install ffmpeg. For that:

```
sudo apt install ffmpeg
```

Then run
```node server3.js``` in the *Backend* folder, go back to root folder and launch the app using
```npm start```

## Possible errors

The user might experience a Websocket connection error that can be checked in the navigator console. To fix this, the user needs to accept HTTPS certificates for the Socket.io connection. By default, the Socket.io server runs at port 4001. Accesing port 4001 on the navigator and accepting risks will show up a "Certificates accepted" html and solve the connection error.

## Credits

Credits to hermajul, creator of the NodeJS client for AxisPTZ API.
Source: https://github.com/hermajul/axis-ptz-camera

