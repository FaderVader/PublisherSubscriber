const message = document.getElementById('message');
const channel = document.getElementById('channel').value;
const host = window.document.location.host.replace(/:.*/, '');
let ws = new WebSocket('ws://' + host + ':8080');

function subscribe() {
    // var message = document.getElementById('message');
    // var channel = document.getElementById('channel').value;
    // var host = window.document.location.host.replace(/:.*/, '');

    // var ws = new WebSocket('ws://' + host + ':8080');
    ws.onopen = function () {
        ws.send(JSON.stringify({
            request: 'SUBSCRIBE',
            message: '',
            channel: channel
        }));
        ws.onmessage = function(event){
            data = JSON.parse(event.data);
            message.innerHTML = data.message;
        };
    };
}


function publish() {
    // var message = document.getElementById('message').value;
    // var channel = document.getElementById('channel').value;
    // var host = window.document.location.host.replace(/:.*/, '');

    // var ws = new WebSocket('ws://' + host + ':8080');
    ws.onopen = function () {
        ws.send(JSON.stringify({
            request: 'PUBLISH',
            message: message,
            channel: channel
        }));
        ws.close();
    };
}