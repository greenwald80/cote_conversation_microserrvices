const cote = require('cote');

const responder = new cote.Responder({ name: 'currency conversion responder' });

const rates = { usd_eur: 0.91, eur_usd: 1.10 };

responder.on('convert', (req, cb) => { // в идеале, тут хорошо бы привести в порядок входные данные
    cb(req.amount * rates[`${req.from}_${req.to}`]);
});

const subscriber = new cote.Subscriber({ name: 'arbitration subscriber' });
subscriber.on('update rate', (update) => {
    rates[update.currencies] = update.rate;
});


//node conversion-service.js