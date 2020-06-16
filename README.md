# socket-io room demo

- npm i
- node server.js

- open browser with localhost:3000/#any_room_name

- clients automatically join rooms based on hash of url
- they can only join rooms on the server, so this is done by emitting an event named 'join' with the room name
- any 'message' sent by the client will be emitted to all of the sockets connected to that room
