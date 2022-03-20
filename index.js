const http = require('http');
const WebSocket = require('ws');
const fs   = require('fs');
// const URL = require('url')
const URL = require('url').Url

const server = http.createServer(function(req, res) {
    if(req.url === '/home' || req.url === '/'){
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(fs.readFileSync(__dirname + '/index.html'));
    } else if (req.url === "/assets/style.css"){
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(fs.readFileSync(__dirname + '/assets/style.css'));
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(fs.readFileSync(__dirname + '/html404.html'));
    }
});



// const Websocket = require("ws");
const wss = new WebSocket.Server({ port: 8082 }) // websocket server

wss.on("connection", ws => {
    console.log('Client connected !')
    ws.on('message',(msg)=>{    // (3)
        console.log("receive test")
        console.log(`Message:${msg}`);
        broadcast(msg)
    })

    console.log("client connected")

    let letter_arr = ''
    let letter_arr_new = RandomLetterArray(letter_arr)
    console.log(letter_arr_new)

    ws.on("message", data => {
        console.log('client has sent:' + data);
    })

    ws.on("close", () => {
        console.log("client has disconnected");
    })

    function broadcast(msg) {       // (4)
        for(const client of wss.clients){
            if(client.readyState === ws.OPEN){
                client.send(msg)
            }
        }
    }
})

server.listen(8081); // http server on 8081
// ----------------------------------------------------------------------
function RandomLetterArray (arr) {
    let result         = arr;
    let characters     = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let characters_len = characters.length;
    result += characters.charAt(Math.floor(Math.random() * characters_len));
   
   return result;
}

