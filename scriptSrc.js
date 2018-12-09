const message = document.getElementById('message');
const channel = document.getElementById('channel').value;
const host = window.document.location.host.replace(/:.*/, '');

let ws = new WebSocket('ws://' + host + ':8080');

function subscribe() {

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

    ws.onopen = function () {
        ws.send(JSON.stringify({
            request: 'PUBLISH',
            message: message,
            channel: channel
        }));

        ws.close();
    };
}