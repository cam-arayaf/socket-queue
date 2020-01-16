const fs = require('fs');

class Ticket {
    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }
}

class TicketControl {
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastFour = [];

        let data = require('../data/data.json');

        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.lastFour = data.lastFour;
        } else {
            this.resetCount();
        }
    }

    nextTicket() {
        this.last++;
        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);
        this.writeFile();
        return `Ticket ${ this.last }`;
    }

    getLastTicket() {
        return this.last === 0 ? 'No tickets' : `Ticket ${ this.last }`;
    }

    getLastFour() {
        return this.lastFour;
    }

    attendTicket(desktop) {
        if (this.tickets.length === 0) return 'No tickets';
        let ticketNumber = this.tickets[0].number;
        this.tickets.shift();
        let attendTicket = new Ticket(ticketNumber, desktop);
        this.lastFour.unshift(attendTicket);
        if (this.lastFour.length > 4) this.lastFour.splice(-1, 1);
        console.log('Last four:', this.lastFour);
        this.writeFile();
        return attendTicket;
    }

    resetCount() {
        this.last = 0;
        this.tickets = [];
        this.lastFour = [];
        console.log('System started');
        this.writeFile();
    }

    writeFile() {
        let jsonData = { last: this.last, today: this.today, tickets: this.tickets, lastFour: this.lastFour };
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = { TicketControl }