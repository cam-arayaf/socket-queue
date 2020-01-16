let socket = io();

const AddData = selector => document.querySelector(selector);

let lblTickets = [AddData('#lblTicket1'), AddData('#lblTicket2'), AddData('#lblTicket3'), AddData('#lblTicket4')];

let lblDesktops = [AddData('#lblDesktop1'), AddData('#lblDesktop2'), AddData('#lblDesktop3'), AddData('#lblDesktop4')];

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Connection refused');
});

socket.on('currentState', (data) => {
    updateHTML(data.lastFour);
});

socket.on('lastFour', (data) => {
    new Audio('audio/new-ticket.mp3').play();
    updateHTML(data.lastFour);
});

const updateHTML = lastFour => {
    lastFour.forEach((currentValue, index) => {
        lblTickets[index].innerText = `Ticket ${ currentValue.number }`;
        lblDesktops[index].innerText = `Desktop ${ currentValue.desktop }`;
    });
}