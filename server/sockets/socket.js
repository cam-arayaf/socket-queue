const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', client => {
    client.on('nextTicket', (data, callback) => {
        let nextTicket = ticketControl.nextTicket();
        console.log(nextTicket);
        callback(nextTicket);
    });

    client.emit('currentState', { state: ticketControl.getLastTicket(), lastFour: ticketControl.getLastFour() });

    client.on('attendTicket', (data, callback) => {
        if (!data.desktop) return callback({ err: true, message: 'Desktop is necessary' });
        let attendTicket = ticketControl.attendTicket(data.desktop);
        callback(attendTicket);
        client.broadcast.emit('lastFour', { lastFour: ticketControl.getLastFour() });
    });
});