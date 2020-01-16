let socket = io();

let label = document.querySelector('#lblNewTicket');

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Connection refused');
});

socket.on('currentState', (resp) => {
    console.log(resp);
    label.innerText = resp.state;
});

document.querySelector('button').addEventListener('click', () => {
    socket.emit('nextTicket', null, (nextTicket) => {
        label.innerText = nextTicket;
    });
});