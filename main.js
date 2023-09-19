import { startServer } from "./backend/server.js";

console.log('Starting server...');
let port = 8000;
if (process.env.PORT) {
    port = parseInt(process.env.PORT);
}

startServer(port)
    .then(() => {
        console.log('Server started on port ' + port );
    }).catch((err) => {
        console.log(err);
    });