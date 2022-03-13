const http = require('http');
const WebSocket = require('ws');
const fs   = require('fs');
// const URL = require('url')
const URL = require('url').Url

const server = http.createServer(function(req, res) {
    console.log(req.url)
    // var url = URL.parse(req.url);
    // const baseURL =  req.protocol + '://' + req.headers.host + '/';
    // const baseURL =  'https://' + req.headers.host + '/';
    // console.log(baseURL)
    // const url = new URL(req.url,baseURL);

    // fix this at some point
    var url = new URL(req.url);
    url.pathname = '/index.html'
    url.path = '/index.html'
    url.href = '/index.html'
    // console.log(url)
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(fs.readFileSync(__dirname + url.pathname));
});

// const wss = new WebSocket.Server({ server });


// const Websocket = require("ws");
const wss = new WebSocket.Server({ port: 8082 }) // websocket server

wss.on("connection", ws => {
    console.log("client connected")
    // let text="testing"
    // console.log(text.charAt(1))

    let letter_arr = ''
    let letter_arr_new = RandomLetterArray(letter_arr)
    console.log(letter_arr_new)

    ws.on("message", data => {
        console.log('client has sent:' + data);
    })

    ws.on("close", () => {
        console.log("client has disconnected");
    })
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