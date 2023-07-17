const svc = require('../services');

const pass = 'BLABLA';

const e = new svc.encrypter();

e.encrypt(pass)
    .then(data => {console.log(data);});