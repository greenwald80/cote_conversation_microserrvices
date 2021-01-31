const cote = require('cote');

const responder = new cote.Responder({ name: 'arbitration API', key: 'arbitration' });

const rates = {};

responder.on('update rate', (req, cb) => {
    rates[req.currencies] = req.rate; // { currencies: 'usd_eur', rate: 0.91 }
    cb('OK!');
});

const publisher = new cote.Publisher({ name: 'arbitration publisher' });
responder.on('update rate', (req, cb) => {
    rates[req.currencies] = req.rate;
    cb('OK!');

    publisher.publish('update rate', req);
});