let socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Connection refused');
});

let searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('desktop')) {
    window.location = 'index.html';
    throw new Error('Desktop is necessary');
}

let desktop = searchParams.get('desktop');

console.log(desktop);

document.querySelector('h1').innerText = `Desktop ${ desktop }`;

let label = document.querySelector('small');

document.querySelector('button').addEventListener('click', () => {
    socket.emit('attendTicket', { desktop }, (resp) => {
        label.innerText = resp === 'No tickets' ? resp : `Ticket ${ resp.number }`;
    });
});