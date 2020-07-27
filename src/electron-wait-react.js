// The net module provides an asynchronous network API for creating stream-based TCP or IPC servers
const net = require("net");

// Foreman will offset the port number by 100 for processes of different types.
// So, electron-wait-react.js subtracts 100 to set the port number of the React dev server correctly.
const port = process.env.PORT ? process.env.PORT - 100 : 3000;

// Set the ELECTRON_START_URL to localhost:<port> when running in development
process.env.ELECTRON_START_URL = `http://localhost:${port}`;

// Create a IPC communication socket
const client = new net.Socket();

// Set initial connection value to false
let startedElectron = false;
const tryConnection = () =>
    // Open client connection to the port defined in process.env.PORT || port 3000
    client.connect({ port: port }, () => {
        client.end();
        if (!startedElectron) {
            console.log("starting electron");
            // Update electron socket connection to true to avoid the
            // program trying to open new connections while electron is up and running
            startedElectron = true;
            // Use the child-process module to start electron using package.json script
            const exec = require("child_process").exec;
            exec("npm run electron");
        }
    });

tryConnection();

client.on("error", (error) => {
    setTimeout(tryConnection, 1000);
});
